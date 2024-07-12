const { Router } = require('express')
const router = Router()
const Registro = require('../models/registros')


router.get('/graf1', async (req, res) => {

    const constante = 0

    const fechaAct = new Date()
    fechaAct.setTime(fechaAct.getTime() - fechaAct.getTimezoneOffset() * 60 * 1000)
    console.log('fechaAct: ', fechaAct)   


    var currentDate = new Date();
    currentDate.setTime(currentDate.getTime() - currentDate.getTimezoneOffset() * 60 * 1000)    
    var lunes = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    var martes = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 2));
    var miercoles = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 3));
    var jueves = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 4));
    var viernes = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 5));
    var sabado = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6));
    var domingo = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7));
    
    
    var nextweek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
    nextweek.setTime(nextweek.getTime() - nextweek.getTimezoneOffset() * 60 * 1000)    
    var lunessig = new Date(nextweek.setDate(nextweek.getDate() - nextweek.getDay()));

    console.log(' lunes:', lunes, ' martes:',martes, 
    ' miercoles:', miercoles, ' jueves:',jueves,
    ' viernes:', viernes, ' sabado:',sabado,' domingo:', domingo,' nextweek:',nextweek,' lunessig:',lunessig)

    const lunesIni = new Date(lunes.setUTCHours(5, 0, 0, 0)).toISOString()
    const lunesFin = new Date(martes.setUTCHours(4, 59, 59, 999)).toISOString()

    const martesIni = new Date(martes.setUTCHours(5, 0, 0, 0)).toISOString()
    const martesFin = new Date(miercoles.setUTCHours(4, 59, 59, 999)).toISOString()

    const miercolesIni = new Date(miercoles.setUTCHours(5, 0, 0, 0)).toISOString()
    const miercolesFin = new Date(jueves.setUTCHours(4, 59, 59, 999)).toISOString()

    const juevesIni = new Date(jueves.setUTCHours(5, 0, 0, 0)).toISOString()
    const juevesFin = new Date(viernes.setUTCHours(4, 59, 59, 999)).toISOString()

    const viernesIni = new Date(viernes.setUTCHours(5, 0, 0, 0)).toISOString()
    const viernesFin = new Date(sabado.setUTCHours(4, 59, 59, 999)).toISOString()

    const sabadoIni = new Date(sabado.setUTCHours(5, 0, 0, 0)).toISOString()
    const sabadoFin = new Date(domingo.setUTCHours(4, 59, 59, 999)).toISOString()

    const domingoIni = new Date(domingo.setUTCHours(5, 0, 0, 0)).toISOString()
    const domingoFin = new Date(lunessig.setUTCHours(4, 59, 59, 999)).toISOString()

    console.log(' lunesIni:', lunesIni, ' lunesFin:', lunesFin,' martesIni:', martesIni, ' martesFin:', martesFin,
    ' miercolesIni:', miercolesIni, ' miercolesFin:', miercolesFin,' juevesIni:', juevesIni, ' juevesFin:', juevesFin,
    ' viernesIni:', viernesIni, ' viernesFin:', viernesFin,' sabadoIni:', sabadoIni, ' sabadoFin:', sabadoFin,
    ' domingoIni:', domingoIni, ' domingoFin:', domingoFin)
    
 
    let queryObj = {}
    const startOfDay = new Date(fechaAct.setUTCHours(0, 0, 0, 0)).toISOString()
    const endOfDay = new Date(fechaAct.setUTCHours(23, 59, 59, 999)).toISOString()

    console.log('startOfDay: ', startOfDay, 'endOfDay: ', endOfDay)

    const obj = queryObj.isoDate = {
        $gte: startOfDay, // 2019-11-08T00:00:00.000Z
        $lt: endOfDay // 2019-11-08T23:59:59.999Z
    }

    const lunes15 = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: lunesIni, $lt: lunesFin}}).count()
    const lunes15c = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: lunesIni, $lt: lunesFin}})
    const lunes30 = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: lunesIni, $lt: lunesFin}}).count()
    const lunes30c = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: lunesIni, $lt: lunesFin}})
    const lunes60 = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: lunesIni, $lt: lunesFin}}).count()
    const lunes60c = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: lunesIni, $lt: lunesFin}})
    const lunes15p = await Registro.find({ 'tiempo': 960, 'isoDate': {$gte: lunesIni, $lt: lunesFin}}).count()
    const lunes15pc = await Registro.find({ 'tiempo': 960, 'isoDate': {$gte: lunesIni, $lt: lunesFin}})
    const lunes30p = await Registro.find({ 'tiempo': 1860, 'isoDate': {$gte: lunesIni, $lt: lunesFin}}).count()
    const lunes30pc = await Registro.find({ 'tiempo': 1860, 'isoDate': {$gte: lunesIni, $lt: lunesFin}})

    const martes15 = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: martesIni, $lt: martesFin}}).count()
    const martes15c = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: martesIni, $lt: martesFin}})
    const martes30 = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: martesIni, $lt: martesFin}}).count()
    const martes30c = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: martesIni, $lt: martesFin}})
    const martes60 = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: martesIni, $lt: martesFin}}).count()
    const martes60c = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: martesIni, $lt: martesFin}})
    const martes15p = await Registro.find({ 'tiempo': 960, 'isoDate': {$gte: martesIni, $lt: martesFin}}).count()
    const martes15pc = await Registro.find({ 'tiempo': 960, 'isoDate': {$gte: martesIni, $lt: martesFin}})
    const martes30p = await Registro.find({ 'tiempo': 1860, 'isoDate': {$gte: martesIni, $lt: martesFin}}).count()
    const martes30pc = await Registro.find({ 'tiempo': 1860, 'isoDate': {$gte: martesIni, $lt: martesFin}})

    const miercoles15 = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}}).count()
    const miercoles15c = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}})
    const miercoles30 = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}}).count()
    const miercoles30c = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}})
    const miercoles60 = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}}).count()
    const miercoles60c = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}})
    const miercoles15p = await Registro.find({ 'tiempo': 960, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}}).count()
    const miercoles15pc = await Registro.find({ 'tiempo': 960, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}})
    const miercoles30p = await Registro.find({ 'tiempo': 1860, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}}).count()
    const miercoles30pc = await Registro.find({ 'tiempo': 1860, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}})

    const jueves15 = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: juevesIni, $lt: juevesFin}}).count()
    const jueves15c = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: juevesIni, $lt: juevesFin}})
    const jueves30 = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: juevesIni, $lt: juevesFin}}).count()
    const jueves30c = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: juevesIni, $lt: juevesFin}})
    const jueves60 = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: juevesIni, $lt: juevesFin}}).count()
    const jueves60c = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: juevesIni, $lt: juevesFin}})
    const jueves15p = await Registro.find({ 'tiempo': 960, 'isoDate': {$gte: juevesIni, $lt: juevesFin}}).count()
    const jueves15pc = await Registro.find({ 'tiempo': 960, 'isoDate': {$gte: juevesIni, $lt: juevesFin}})
    const jueves30p = await Registro.find({ 'tiempo': 1860, 'isoDate': {$gte: juevesIni, $lt: juevesFin}}).count()
    const jueves30pc = await Registro.find({ 'tiempo': 1860, 'isoDate': {$gte: juevesIni, $lt: juevesFin}})

    const viernes15 = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: viernesIni, $lt: viernesFin}}).count()
    const viernes15c = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: viernesIni, $lt: viernesFin}})
    const viernes30 = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: viernesIni, $lt: viernesFin}}).count()
    const viernes30c = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: viernesIni, $lt: viernesFin}})
    const viernes60 = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: viernesIni, $lt: viernesFin}}).count()
    const viernes60c = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: viernesIni, $lt: viernesFin}})
    const viernes15p = await Registro.find({ 'tiempo': 960, 'isoDate': {$gte: viernesIni, $lt: viernesFin}}).count()
    const viernes15pc = await Registro.find({ 'tiempo': 960, 'isoDate': {$gte: viernesIni, $lt: viernesFin}})
    const viernes30p = await Registro.find({ 'tiempo': 1860, 'isoDate': {$gte: viernesIni, $lt: viernesFin}}).count()
    const viernes30pc = await Registro.find({ 'tiempo': 1860, 'isoDate': {$gte: viernesIni, $lt: viernesFin}})

    const sabado15 = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}}).count()
    const sabado15c = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}})
    const sabado30 = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}}).count()
    const sabado30c = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}})
    const sabado60 = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}}).count()
    const sabado60c = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}})
    const sabado15p = await Registro.find({ 'tiempo': 960, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}}).count()
    const sabado15pc = await Registro.find({ 'tiempo': 960, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}})
    const sabado30p = await Registro.find({ 'tiempo': 1860, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}}).count()
    const sabado30pc = await Registro.find({ 'tiempo': 1860, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}})

    const domingo15 = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: domingoIni, $lt: domingoFin}}).count()
    const domingo15c = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: domingoIni, $lt: domingoFin}})
    const domingo30 = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: domingoIni, $lt: domingoFin}}).count()
    const domingo30c = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: domingoIni, $lt: domingoFin}})
    const domingo60 = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: domingoIni, $lt: domingoFin}}).count()
    const domingo60c = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: domingoIni, $lt: domingoFin}})
    const domingo15p = await Registro.find({ 'tiempo': 960, 'isoDate': {$gte: domingoIni, $lt: domingoFin}}).count()
    const domingo15pc = await Registro.find({ 'tiempo': 960, 'isoDate': {$gte: domingoIni, $lt: domingoFin}})
    const domingo30p = await Registro.find({ 'tiempo': 1860, 'isoDate': {$gte: domingoIni, $lt: domingoFin}}).count()
    const domingo30pc = await Registro.find({ 'tiempo': 1860, 'isoDate': {$gte: domingoIni, $lt: domingoFin}})
    console.log(' lunes15:', lunes15)

    res.status(200).send({
        constante,
        lunes15, lunesIni, lunesFin, lunes15c, lunes30, lunes30c, lunes60,  lunes60c,lunes15p,lunes15pc,lunes30p,lunes30pc,
        martes15, martesIni, martesFin, martes15c, martes30, martes30c, martes60,  martes60c,martes15p,martes15pc,martes30p,martes30pc,
        miercoles15, miercolesIni, miercolesFin, miercoles15c, miercoles30, miercoles30c, miercoles60,  miercoles60c,miercoles15p,miercoles15pc,miercoles30p,miercoles30pc,
        jueves15, juevesIni, juevesFin, jueves15c, jueves30, jueves30c, jueves60,  jueves60c,jueves15p,jueves15pc,jueves30p,jueves30pc,
        viernes15, viernesIni, viernesFin, viernes15c, viernes30, viernes30c, viernes60,  viernes60c,viernes15p,viernes15pc,viernes30p,viernes30pc,
        sabado15, sabadoIni, sabadoFin, sabado15c, sabado30, sabado30c, sabado60,  sabado60c,sabado15p,sabado15pc,sabado30p,sabado30pc,
        domingo15, domingoIni, domingoFin, domingo15c, domingo30, domingo30c, domingo60,  domingo60c,domingo15p,domingo15pc,domingo30p,domingo30pc,


    })

})


router.post('/graf2', async (req, res) => {

    console.log(' req.body:', req.body)
    const { anio, mes } = req.body
    
    const fechaIni = new Date(anio,+mes-1,1,0,0,0,0)
    const fechaFin = new Date(anio,mes,1,0,0,0,0)
    console.log('fechaIni:',fechaIni,'fechaFin:',fechaFin)

    const fechaReq = new Date()

    let queryObj = {}    

    const obj = queryObj.isoDate = {
        $gte: fechaIni.toISOString(), // 2019-11-08T00:00:00.000Z
        $lt: fechaFin.toISOString() // 2019-11-08T23:59:59.999Z
    }
    console.log( 'obj:',obj, 'queryObj:', queryObj)

    const encontrar = await Registro.find(queryObj).count()

    console.log('encontrar:', encontrar)

    const ingresosDia = await Registro.aggregate([
        {
            $match: {
                isoDate: {$gte: new Date(fechaIni), $lt: new Date(fechaFin)}
            }
        },
        {$project :{
            day : {"$dayOfMonth" : { date : "$isoDate", timezone: "-0500"}},
            month : {"$month" : { date : "$isoDate", timezone: "-0500"}},
            year : {"$year" : { date : "$isoDate", timezone: "-0500"}},
            ingresos : { "$sum" : "$ingresos"},
            tiempo : { "$sum" : "$tiempo"}
            
        }},
        {$group: {
            _id : {year : "$year", month : "$month", day : "$day"},
            clientes : { "$sum" : 1},
            ingresoDia : {"$sum" : "$ingresos"},
            dia : {$first : "$day"},
            itemsSold : { $push:  { tiempo: "$tiempo", ingreso: "$ingresos", nombre: "$nombre" } }
        }},
        {
            "$sort": { "_id.day": 1 }
        }
    ])

    console.log('ingresosDia:',ingresosDia)


    res.status(200).send({
        ingresosDia
    })

})



router.get('/graf2', async (req, res) => {
    console.log(' req.body:', req.body, ' req.params:', req.params)
    const constante = 0

    res.status(200).send({
        constante,

    })

})



router.post('/graf3', async (req, res) => {

    console.log(' req.body:', req.body)
    const { anio, mes } = req.body

    const fechaAct = new Date()
    fechaAct.setTime(fechaAct.getTime() - fechaAct.getTimezoneOffset() * 60 * 1000)
    console.log('fechaAct: ', fechaAct)

    const fechaReq = new Date()

    

    const contHoyA = await Registro.aggregate([
        { $group: { _id: { "$month": "$isoDate"}, click: { $sum: 1 } } }
    ])

    console.log('contHoyA:',contHoyA)


    res.redirect('/')

})

router.get('/graf3', async (req, res) => {
    console.log(' req.body:', req.body, ' req.params:', req.params)
    const constante = 0

    res.status(200).send({
        constante,

    })

})



router.get('/grafAnual', async (req, res) => {
    console.log(' req.body:', req.body, ' req.params:', req.params)
    const constante = 0

    res.status(200).send({
        constante,

    })

})



router.post('/grafAnual', async (req, res) => {

    console.log(' req.body:', req.body)
    const { year } = req.body

    // Verifica que el año sea un número y conviértelo si es necesario
    const anio = parseInt(year, 10);
    if (isNaN(anio)) {
    console.error('El año proporcionado no es un número válido:', year);
    return;
    }
    
    const fechaIni = new Date(anio, 0, 1, 0, 0, 0, 0); // Inicio del año
    const fechaFin = new Date(anio + 1, 0, 1, 0, 0, 0, 0); // Inicio del siguiente año
    console.log('fechaIni:',fechaIni,'fechaFin:',fechaFin)

    if (isNaN(fechaIni.getTime()) || isNaN(fechaFin.getTime())) {
        console.error('Fecha de inicio o fin inválida.');
        return;
      }

    let queryObj = {}    

    const obj = queryObj.isoDate = {
        $gte: fechaIni.toISOString(), // 2019-11-08T00:00:00.000Z
        $lt: fechaFin.toISOString() // 2019-11-08T23:59:59.999Z
    }
    console.log( 'obj:',obj, 'queryObj:', queryObj)

    try {
        const encontrar = await Registro.find(queryObj).count()        
        console.log('encontrar:', encontrar)
    } catch (error) {
        console.error('Error al buscar registros:', error);
      }

      const ingresosMes = await Registro.aggregate([
        {
          $match: {
            isoDate: { $gte: fechaIni, $lt: fechaFin }
          }
        },
        {
          $project: {
            month: { "$month": { date: "$isoDate", timezone: "-0500" } },
            year: { "$year": { date: "$isoDate", timezone: "-0500" } },
            ingresos: { "$sum": "$ingresos" },
            tiempo: { "$sum": "$tiempo" }
          }
        },
        {
          $group: {
            _id: { year: "$year", month: "$month" },
            clientes: { "$sum": 1 },
            ingresoMes: { "$sum": "$ingresos" },
            itemsSold: {
              $push: {
                tiempo: "$tiempo",
                ingreso: "$ingresos",
                nombre: "$nombre"
              }
            }
          }
        },
        {
          "$sort": { "_id.month": 1 }
        }
      ]);

      console.log('ingresosMes:', ingresosMes);


    res.status(200).send({
        ingresosMes
    })

})

router.post('/grafMes', async (req, res) => {
    console.log('req.body:', req.body);
    const { month } = req.body;
  
    // Verifica que el mes sea un número y conviértelo si es necesario
    const mes = parseInt(month, 10);
    if (isNaN(mes) || mes < 1 || mes > 12) {
      console.error('El mes proporcionado no es un número válido:', month);
      return res.status(400).send({ error: 'El mes proporcionado no es un número válido.' });
    }
  
    const fechaInicio = new Date(2021, mes - 1, 1, 0, 0, 0, 0); // Inicio de enero de 2021
    const fechaFin = new Date(); // Fecha actual
    console.log('fechaInicio:', fechaInicio, 'fechaFin:', fechaFin);
  
    if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
      console.error('Fecha de inicio o fin inválida.');
      return res.status(400).send({ error: 'Fecha de inicio o fin inválida.' });
    }
  
    const queryObj = {
      isoDate: {
        $gte: fechaInicio.toISOString(),
        $lt: fechaFin.toISOString()
      }
    };
  
    console.log('queryObj:', queryObj);
  
    try {
      const ingresosMes = await Registro.aggregate([
        {
          $match: {
            isoDate: { $gte: fechaInicio, $lt: fechaFin },
            $expr: { $eq: [{ $month: "$isoDate" }, mes] }
          }
        },
        {
          $project: {
            year: { $year: { date: "$isoDate", timezone: "-0500" } },
            ingresos: "$ingresos",
            tiempo: "$tiempo"
          }
        },
        {
          $group: {
            _id: { year: "$year" },
            clientes: { $sum: 1 },
            ingresoMes: { $sum: "$ingresos" },
            itemsSold: {
              $push: {
                tiempo: "$tiempo",
                ingreso: "$ingresos",
                nombre: "$nombre"
              }
            }
          }
        },
        {
          $sort: { "_id.year": 1 }
        }
      ]);
  
      console.log('ingresosMes:', ingresosMes);
  
      res.status(200).send({
        ingresosMes
      });
    } catch (error) {
      console.error('Error al agrupar registros:', error);
      res.status(500).send({ error: 'Error al agrupar registros.' });
    }
  });






module.exports = router;