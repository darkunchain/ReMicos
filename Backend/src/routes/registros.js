const { Router } = require('express')
const router = Router()

const Registro = require('../models/registros')


router.post('/add', async (req, res) => {

    console.log(req.body)
    const newRegistro = new Registro(req.body);
    await newRegistro.save();

    res.redirect('/')

})

router.get(['/registros', '/registros/ultimos/:days'], async (req, res, next) => {
  try {
    // ------- parámetros -------
    const rawDays = req.query.days ?? req.params.days ?? 7;
    let days = parseInt(String(rawDays), 10);
    if (Number.isNaN(days) || days < 1) days = 7;
    days = Math.min(days, 31); // cota de seguridad

    const now  = new Date();
    const from = new Date(now.getTime() - days * 86400_000);

    // límites de hoy, semana actual (ISO) y mes actual
    const startOfDay   = new Date(now); startOfDay.setHours(0,0,0,0);
    const startOfWeek  = new Date(startOfDay);
    const day = (startOfWeek.getDay() + 6) % 7; // 0=lunes
    startOfWeek.setDate(startOfWeek.getDate() - day);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // ------- una sola agregación con $facet -------
    const [result] = await Registro.aggregate([
      {
        $facet: {
          // documentos del rango (últimos N días)
          Clientes: [
            { $match: { isoDate: { $gte: from, $lte: now } } },
            { $sort:  { isoDate: -1 } },
            { $project: { __v: 0 } } // quita lo que no necesites
          ],

          // contadores rápidos por rangos (sin $group, solo $count)
          contHoyA: [
            { $match: { isoDate: { $gte: startOfDay,   $lt: now } } },
            { $count: 'c' }
          ],
          contSemA: [
            { $match: { isoDate: { $gte: startOfWeek,  $lt: now } } },
            { $count: 'c' }
          ],
          contMesA: [
            { $match: { isoDate: { $gte: startOfMonth, $lt: now } } },
            { $count: 'c' }
          ],

          // total en el rango (últimos N días)
          ClientesCountA: [
            { $match: { isoDate: { $gte: from, $lte: now } } },
            { $count: 'total' }
          ],

          // por día del mes (solo mes actual)
          perDiasA: [
            { $match: { isoDate: { $gte: startOfMonth, $lt: startOfNextMonth } } },
            { $group: { _id: { $dayOfMonth: '$isoDate' }, total: { $sum: 1 } } },
            { $sort:  { _id: 1 } }
          ],

          // por mes del año actual
          perMesA: [
            { $match: {
                isoDate: {
                  $gte: new Date(now.getFullYear(), 0, 1),
                  $lt:  new Date(now.getFullYear() + 1, 0, 1)
                }
              }
            },
            { $group: { _id: { $month: '$isoDate' }, total: { $sum: 1 } } },
            { $sort:  { _id: 1 } }
          ],

          // por día de la semana (mes actual)
          perDiaSemMesActA: [
            { $match: { isoDate: { $gte: startOfMonth, $lt: startOfNextMonth } } },
            { $group: { _id: { $dayOfWeek: '$isoDate' }, total: { $sum: 1 } } },
            { $sort:  { _id: 1 } }
          ]
        }
      }
    ]);

    // ------- normalización de arrays (completar huecos) -------
    const diasEnMes = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const zeros = n => Array.from({ length: n }, () => 0);

    const perDias = zeros(diasEnMes);
    for (const r of (result.perDiasA || [])) perDias[(r._id ?? 1) - 1] = r.total;

    const perMes = zeros(12);
    for (const r of (result.perMesA || [])) perMes[(r._id ?? 1) - 1] = r.total;

    const perDiaSemMesAct = zeros(7); // 1..7 (dom..sab en $dayOfWeek)
    for (const r of (result.perDiaSemMesActA || [])) perDiaSemMesAct[(r._id ?? 1) - 1] = r.total;

    res.status(200).json({
      days, from, to: now,
      ClientesCount: (result.ClientesCountA[0]?.total ?? 0),
      contHoy: (result.contHoyA[0]?.c ?? 0),
      contSemAct: (result.contSemA[0]?.c ?? 0),
      contMesAct: (result.contMesA[0]?.c ?? 0),
      perDias,
      perMes,
      perDiaSemMesAct,
      Clientes: result.Clientes // documentos de los últimos N días
    });
  } catch (err) {
    next(err);
  }
});

router.get('/ingresos', async (req, res) => {


    const fechaAct = new Date()
    //console.log('fechaAct: ', fechaAct)
    fechaAct.setTime(fechaAct.getTime() - fechaAct.getTimezoneOffset() * 60 * 1000)    
    var tomorrow = new Date();
    tomorrow.setTime(tomorrow.getTime() - tomorrow.getTimezoneOffset() * 60 * 1000)
    tomorrow.setDate(tomorrow.getDate() + 1);

    //console.log('fechaAct: ', fechaAct,' tomorrow:',tomorrow)


    const semAct = getNumberOfWeek(fechaAct) - 1
    const diaAct = fechaAct.getDay() + 1
    const anioAct = fechaAct.getFullYear()
    const diaHoy = fechaAct.getDate()

    //console.log('diaHoy:', diaHoy, ' anioAct:', anioAct, ' diaAct:', diaAct, ' semAct:', semAct)


    function getNumberOfWeek(date) {
        const today = new Date(date);
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const pastDaysOfYear = ((today - firstDayOfYear) / 86400000);
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7);

    }

    let queryObj = {}
    const startOfDay = new Date(fechaAct.setUTCHours(5, 0, 0, 0)).toISOString()
    const endOfDay = new Date(tomorrow.setUTCHours(4, 59, 59, 999)).toISOString()

    //console.log('startOfDay: ', startOfDay, 'endOfDay: ', endOfDay)

    const obj = queryObj.isoDate = {
        $gte: startOfDay, // 2019-11-08T00:00:00.000Z
        $lt: endOfDay // 2019-11-08T23:59:59.999Z
    }

    //console.log(' obj:', obj)

    const Cli15 = await Registro.find({ 'tiempo': 900, 'isoDate': obj }).count()
    //console.log(Cli15)

    const Cli30 = await Registro.find({ 'tiempo': 1800, 'isoDate': obj }).count()
    //console.log(Cli30)

    const Cli60 = await Registro.find({ 'tiempo': 3600, 'isoDate': obj }).count()
    //console.log(Cli60)

    const Cli15p = await Registro.find({ 'tiempo': 960, 'isoDate': obj }).count()
    //console.log(Cli15p)

    const Cli30p = await Registro.find({ 'tiempo': 1860, 'isoDate': obj }).count()
    //console.log(Cli30p)

    const ClientesHoy = await Registro.find({ 'isoDate': obj })
    //console.log(ClientesHoy)

    res.status(200).send({
        Cli15,
        Cli30,
        Cli60,
        Cli15p,
        Cli30p,
        ClientesHoy,
        startOfDay,
        endOfDay
    })

})

router.get('/registros/:mes/:anio', async (req, res) => {

    var variable = 5




    res.status(200).send({
        variable
    })
})






module.exports = router;