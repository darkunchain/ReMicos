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