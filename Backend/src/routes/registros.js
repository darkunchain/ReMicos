const { Router } = require('express')
const router = Router()

const Registro = require('../models/registros')


router.post('/add', async (req, res) => {

    console.log(req.body)
    const newRegistro = new Registro(req.body);
    await newRegistro.save();

    res.redirect('/')

})

router.get('/registros', async (req, res) => {
    //const Clientes = await Registro.findById(req.params.userid)

    const Clientes = await Registro.find()
    const ClientesCount = await Registro.find().count()
    const fechaAct = new Date();
    fechaAct.setTime(fechaAct.getTime() - fechaAct.getTimezoneOffset() * 60 * 1000)
    console.log('fechaAct_regitros:', fechaAct)
    const diaAct = fechaAct.getDay() + 1
    const semAct = getNumberOfWeek() - 1
    const mesAct = fechaAct.getMonth() + 1
    const anioAct = fechaAct.getFullYear()
    var contMesAct = {}
    var contSemAct = {}
    var contHoy = {}
    var mesArray = []


    function getNumberOfWeek() {
        const today = new Date();
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const pastDaysOfYear = ((today - firstDayOfYear) / 86400000);
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7);
    }


    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Grafica cilindro  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  

    const contHoyA = await Registro.aggregate([
        {
            "$project": {
                "dateDay": { "$dayOfWeek": "$isoDate" },
                "dateWeek": { "$week": "$isoDate" },
                "dateYear": { "$year": "$isoDate" },
            }
        },
        {
            "$group": {
                "_id": "$_id",
                "diaReg": { $first: "$dateDay" },
                "semana": { $first: "$dateWeek" },
                "anio": { $first: "$dateYear" },
            }
        },
        { "$match": { "diaReg": diaAct, "semana": semAct, "anio": anioAct } },
        { $count: "conteo" }
    ])

    const contSemA = await Registro.aggregate([
        {
            "$project": {
                "dateWeek": { "$week": "$isoDate" },
                "dateYear": { "$year": "$isoDate" },
            }
        },
        {
            "$group": {
                "_id": "$_id",
                "semana": { $first: "$dateWeek" },
                "anio": { $first: "$dateYear" },
            }
        },
        { "$match": { "semana": semAct, "anio": anioAct } },
        { $count: "conteo" }
    ])

    const contMesA = await Registro.aggregate([
        {
            "$project": {
                "dateMonth": { "$month": "$isoDate" },
                "dateYear": { "$year": "$isoDate" },
            }
        },
        {
            "$group": {
                "_id": "$_id",
                "mesReg": { $first: "$dateMonth" },
                "anio": { $first: "$dateYear" },
            }
        },
        { "$match": { "mesReg": mesAct, "anio": anioAct } },
        { $count: "conteo" }
    ])
    //console.log('contMesA: ', contMesA,'contSemA: ', contSemA,'contHoyA: ', contHoyA)
    console.log('contHoy: ', typeof contHoyA[0])
    if (typeof contHoyA[0] === 'undefined') contHoy = 0
    else contHoy = contHoyA[0].conteo
    if (typeof contMesA[0] === 'undefined') contMesAct = 0
    else contMesAct = contMesA[0].conteo
    if (typeof contSemA[0] === 'undefined') contSemAct = 0
    else contSemAct = contSemA[0].conteo




    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Grafica por dias  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  

    var perDias = []
    //const diaDelMesOb =diaDelMesA.find({"diaMes": 9})
    if (mesAct == 2) mesArray = 28
    else if (mesAct == 1 || mesAct == 3 || mesAct == 5 || mesAct == 7 || mesAct == 8 || mesAct == 10 || mesAct == 12) mesArray = 31
    else mesArray = 30

    for (var i = 0; i < mesArray; i++) {
        var diaDelMesA = await Registro.aggregate([
            {
                "$group": {
                    "_id": {
                        "diaMes": { "$dayOfMonth": "$isoDate" },
                        "mes": { "$month": "$isoDate" },
                        "anio": { "$year": "$isoDate" },
                    },
                    Total: { $sum: 1 }
                }
            },
            { "$match": { "_id.diaMes": i + 1, "_id.mes": mesAct, "_id.anio": anioAct } },
        ])

        if (typeof diaDelMesA[0] === 'undefined') perDias[i] = 0
        else perDias[i] = diaDelMesA[0].Total
    }


    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Grafica por meses  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  

    var perMes = []

    for (var i = 0; i < 12; i++) {
        const perMesA = await Registro.aggregate([
            {
                "$project": {
                    "dateMonth": { "$month": "$isoDate" },
                    "dateYear": { "$year": "$isoDate" },
                }
            },
            {
                "$group": {
                    "_id": "$_id",
                    "mesReg": { $first: "$dateMonth" },
                    "anio": { $first: "$dateYear" },
                }
            },
            { "$match": { "mesReg": i + 1, "anio": anioAct } },
            { $count: "conteo" }
        ])
        if (typeof perMesA[0] === 'undefined') perMes[i] = 0
        else perMes[i] = perMesA[0].conteo
    }


    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Grafica por dias de la semana este mes  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  

    var perDiaSemMesAct = []

    for (var i = 0; i < 7; i++) {
        const perDiaSemMesActA = await Registro.aggregate([
            {
                "$project": {
                    "dateDay": { "$dayOfWeek": "$isoDate" },
                    "dateMonth": { "$month": "$isoDate" },
                    "dateYear": { "$year": "$isoDate" },
                }
            },
            {
                "$group": {
                    "_id": "$_id",
                    "diaReg": { $first: "$dateDay" },
                    "mes": { $first: "$dateMonth" },
                    "anio": { $first: "$dateYear" },
                }
            },
            { "$match": { "diaReg": i + 1, "anio": mesAct, "anio": anioAct } },
            { $count: "conteo" }
        ])
        if (typeof perDiaSemMesActA[0] === 'undefined') perDiaSemMesAct[i] = 0
        else perDiaSemMesAct[i] = perDiaSemMesActA[0].conteo
    }
    console.log('perDiaSemMesAct: ', perDiaSemMesAct)


    res.status(200).send({
        ClientesCount,
        contMesAct,
        contSemAct,
        contHoy,
        perDias,
        perMes,
        perDiaSemMesAct,
        Clientes
    })
})


router.get('/ingresos', async (req, res) => {


    const fechaAct = new Date()
    console.log('fechaAct: ', fechaAct)
    fechaAct.setTime(fechaAct.getTime() - fechaAct.getTimezoneOffset() * 60 * 1000)    
    var tomorrow = new Date();
    tomorrow.setTime(tomorrow.getTime() - tomorrow.getTimezoneOffset() * 60 * 1000)
    tomorrow.setDate(tomorrow.getDate() + 1);

    console.log('fechaAct: ', fechaAct,' tomorrow:',tomorrow)


    const semAct = getNumberOfWeek(fechaAct) - 1
    const diaAct = fechaAct.getDay() + 1
    const anioAct = fechaAct.getFullYear()
    const diaHoy = fechaAct.getDate()

    console.log('diaHoy:', diaHoy, ' anioAct:', anioAct, ' diaAct:', diaAct, ' semAct:', semAct)


    function getNumberOfWeek(date) {
        const today = new Date(date);
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const pastDaysOfYear = ((today - firstDayOfYear) / 86400000);
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7);

    }

    let queryObj = {}
    const startOfDay = new Date(fechaAct.setUTCHours(5, 0, 0, 0)).toISOString()
    const endOfDay = new Date(tomorrow.setUTCHours(4, 59, 59, 999)).toISOString()

    console.log('startOfDay: ', startOfDay, 'endOfDay: ', endOfDay)

    const obj = queryObj.isoDate = {
        $gte: startOfDay, // 2019-11-08T00:00:00.000Z
        $lt: endOfDay // 2019-11-08T23:59:59.999Z
    }

    console.log(' obj:', obj)

    const Cli15 = await Registro.find({ 'tiempo': 900, 'isoDate': obj }).count()
    console.log(Cli15)

    const Cli30 = await Registro.find({ 'tiempo': 1800, 'isoDate': obj }).count()
    console.log(Cli30)

    const Cli60 = await Registro.find({ 'tiempo': 3600, 'isoDate': obj }).count()
    console.log(Cli60)

    const Cli15p = await Registro.find({ 'tiempo': 960, 'isoDate': obj }).count()
    console.log(Cli15p)

    const Cli30p = await Registro.find({ 'tiempo': 1860, 'isoDate': obj }).count()
    console.log(Cli30p)

    const ClientesHoy = await Registro.find({ 'isoDate': obj })
    console.log(ClientesHoy)

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

    const martes15 = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: martesIni, $lt: martesFin}}).count()
    const martes15c = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: martesIni, $lt: martesFin}})
    const martes30 = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: martesIni, $lt: martesFin}}).count()
    const martes30c = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: martesIni, $lt: martesFin}})
    const martes60 = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: martesIni, $lt: martesFin}}).count()
    const martes60c = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: martesIni, $lt: martesFin}})

    const miercoles15 = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}}).count()
    const miercoles15c = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}})
    const miercoles30 = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}}).count()
    const miercoles30c = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}})
    const miercoles60 = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}}).count()
    const miercoles60c = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: miercolesIni, $lt: miercolesFin}})

    const jueves15 = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: juevesIni, $lt: juevesFin}}).count()
    const jueves15c = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: juevesIni, $lt: juevesFin}})
    const jueves30 = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: juevesIni, $lt: juevesFin}}).count()
    const jueves30c = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: juevesIni, $lt: juevesFin}})
    const jueves60 = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: juevesIni, $lt: juevesFin}}).count()
    const jueves60c = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: juevesIni, $lt: juevesFin}})

    const viernes15 = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: viernesIni, $lt: viernesFin}}).count()
    const viernes15c = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: viernesIni, $lt: viernesFin}})
    const viernes30 = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: viernesIni, $lt: viernesFin}}).count()
    const viernes30c = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: viernesIni, $lt: viernesFin}})
    const viernes60 = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: viernesIni, $lt: viernesFin}}).count()
    const viernes60c = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: viernesIni, $lt: viernesFin}})

    const sabado15 = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}}).count()
    const sabado15c = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}})
    const sabado30 = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}}).count()
    const sabado30c = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}})
    const sabado60 = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}}).count()
    const sabado60c = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: sabadoIni, $lt: sabadoFin}})

    const domingo15 = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: domingoIni, $lt: domingoFin}}).count()
    const domingo15c = await Registro.find({ 'tiempo': 900, 'isoDate': {$gte: domingoIni, $lt: domingoFin}})
    const domingo30 = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: domingoIni, $lt: domingoFin}}).count()
    const domingo30c = await Registro.find({ 'tiempo': 1800, 'isoDate': {$gte: domingoIni, $lt: domingoFin}})
    const domingo60 = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: domingoIni, $lt: domingoFin}}).count()
    const domingo60c = await Registro.find({ 'tiempo': 3600, 'isoDate': {$gte: domingoIni, $lt: domingoFin}})
    console.log(' lunes15:', lunes15)

    res.status(200).send({
        constante,
        lunes15, lunesIni, lunesFin, lunes15c, lunes30, lunes30c, lunes60,  lunes60c,
        martes15, martesIni, martesFin, martes15c, martes30, martes30c, martes60,  martes60c,
        miercoles15, miercolesIni, miercolesFin, miercoles15c, miercoles30, miercoles30c, miercoles60,  miercoles60c,
        jueves15, juevesIni, juevesFin, jueves15c, jueves30, jueves30c, jueves60,  jueves60c,
        viernes15, viernesIni, viernesFin, viernes15c, viernes30, viernes30c, viernes60,  viernes60c,
        sabado15, sabadoIni, sabadoFin, sabado15c, sabado30, sabado30c, sabado60,  sabado60c,
        domingo15, domingoIni, domingoFin, domingo15c, domingo30, domingo30c, domingo60,  domingo60c,


    })

})


router.get('/graf2', async (req, res) => {
    console.log(' req.body:', req.body, ' req.params:', req.params)

    const constante = 0




    res.status(200).send({
        constante,

    })

})





router.get('/registros/:mes/:anio', async (req, res) => {

    var variable = 5




    res.status(200).send({
        variable
    })
})






module.exports = router;