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
    const semAct = getNumberOfWeek() - 1
    const Clientes = await Registro.find()
    const ClientesCount = await Registro.find().count()
    const fechaAct = new Date()
    const diaAct = fechaAct.getDay() + 1
    //const semAct = 45
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
    if(typeof contHoyA[0] === 'undefined') contHoy = 0
    else contHoy = contHoyA[0].conteo
    if(typeof contMesA[0] === 'undefined') contMesAct = 0
    else contMesAct = contMesA[0].conteo
    if(typeof contSemA[0] === 'undefined') contSemAct = 0
    else contSemAct = contSemA[0].conteo

    


    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Grafica por dias  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  
    
    var perDias = []
    //const diaDelMesOb =diaDelMesA.find({"diaMes": 9})
    if(mesAct == 2) mesArray = 28
    else if(mesAct == 1||mesAct == 3||mesAct == 5||mesAct == 7||mesAct == 8||mesAct == 10||mesAct == 12) mesArray = 31        
    else mesArray = 30

    for(var i = 0 ; i < mesArray; i++){
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
            { "$match": { "_id.diaMes" : i+1, "_id.mes": mesAct, "_id.anio": anioAct} },    
        ])

        if(typeof diaDelMesA[0] === 'undefined') perDias[i] = 0
        else perDias[i] = diaDelMesA[0].Total
    }   


    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Grafica por meses  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  
    
    var perMes = []    
    
    for(var i = 0 ; i < 12; i++){
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
            { "$match": { "mesReg": i+1, "anio": anioAct } },
            { $count: "conteo" }
        ])
        if(typeof perMesA[0] === 'undefined') perMes[i] = 0
        else perMes[i] = perMesA[0].conteo
    }    


    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Grafica por dias de la semana este mes  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  
    
    var perDiaSemMesAct = []    
    
    for(var i = 0 ; i < 7; i++){
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
            { "$match": { "diaReg": i+1, "anio": mesAct, "anio": anioAct } },
            { $count: "conteo" }
        ])
        if(typeof perDiaSemMesActA[0] === 'undefined') perDiaSemMesAct[i] = 0
        else perDiaSemMesAct[i] = perDiaSemMesActA[0].conteo
    }
    console.log('perDiaSemMesAct: ',perDiaSemMesAct)


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
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //next();
})


router.get('/ingresos', async (req, res) => {

    const semAct = getNumberOfWeek() - 1
    const fechaAct = new Date()
    const diaAct = fechaAct.getDay() + 1   
    const anioAct = fechaAct.getFullYear()
    

    function getNumberOfWeek() {
        const today = new Date();        
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);        
        const pastDaysOfYear = ((today - firstDayOfYear) / 86400000);        
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7);
    }   

    

       //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Grafica costos  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  

       const cont15 = await Registro.aggregate([
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
        { "$match": { "tiempo" : 15, "diaReg": diaAct, "semana": semAct, "anio": anioAct } },
        { $count: "conteo" }
    ])

    const cont30 = await Registro.aggregate([        {
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
    { "$match": { "tiempo" : 30, "diaReg": diaAct, "semana": semAct, "anio": anioAct } },
    { $count: "conteo" }
])

const cont60 = await Registro.aggregate([        {
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
{ "$match": { "tiempo" : 60, "diaReg": diaAct, "semana": semAct, "anio": anioAct } },
{ $count: "conteo" }
])

    if(typeof cont15[0] === 'undefined') cont15Hoy = 0
    else cont15Hoy = cont15[0].conteo
    if(typeof cont30[0] === 'undefined') cont30Hoy = 0
    else cont30Hoy = cont30[0].conteo
    if(typeof cont60[0] === 'undefined') cont60Hoy = 0
    else cont60Hoy = cont60[0].conteo



    res.status(200).send({
        cont15Hoy,
        cont30Hoy,
        cont60Hoy
    })

})





router.get('/registros/:mes/:anio', async (req, res) => {

    var variable = 5
    
    
    res.status(200).send({
        variable
    })
})






module.exports = router;