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
    const fechaAct = new Date()
    const diaAct = fechaAct.getDay() + 1    
    const semAct = 45
    const mesAct = fechaAct.getMonth() + 1    
    const anioAct = fechaAct.getFullYear()

    //console.log('dia: ',diaAct,'mes: ',mesAct, 'año: ', anioAct)
    //console.log('semana: ',fechaAct.getWeek())

    
    const aggre = await Registro.aggregate([
        {
            "$project": {                
                "dateWeek": { "$week": "$isoDate" },
                "dateMonth": { "$month": "$isoDate" },
                "dateDay" : { "$dayOfWeek" : "$isoDate"},
                "dateYear" : { "$year" : "$isoDate"},
                "Rank": 1
            }
        },
        {
            "$group": {
                "_id" : "$_id",
                "semana": { $first: "$dateWeek"},                
                "mesReg": { $first: "$dateMonth"},
                "diaReg": { $first: "$dateDay"},
                "anoReg": { $first: "$dateYear"},
            }
        }
        
    ])


    
    
    const contHoyA = await Registro.aggregate([
        {
            "$project": {                
                "dateDay" : { "$dayOfWeek" : "$isoDate"},
                "dateWeek": { "$week": "$isoDate" },
                "dateYear" : { "$year" : "$isoDate"},
            }
        },
        {
            "$group": {
                "_id" : "$_id",
                "diaReg": { $first: "$dateDay"},
                "semana": { $first: "$dateWeek"},
                "anio": { $first: "$dateYear"},
            }
        },
        {"$match": {"diaReg" : diaAct, "semana" : semAct, "anio" : anioAct}},
        {$count: "conteo"}
    ])

    const contSemA = await Registro.aggregate([
        {
            "$project": {                
                "dateWeek": { "$week": "$isoDate" },
                "dateYear" : { "$year" : "$isoDate"},
            }
        },
        {
            "$group": {
                "_id" : "$_id",
                "semana": { $first: "$dateWeek"},
                "anio": { $first: "$dateYear"},
            }
        },
        {"$match": {"semana" : semAct, "anio" : anioAct}},
        {$count: "conteo"}
    ])

    const contMesA = await Registro.aggregate([
        {
            "$project": {                
                "dateMonth": { "$month": "$isoDate" },
                "dateYear" : { "$year" : "$isoDate"},
            }
        },
        {
            "$group": {
                "_id" : "$_id",
                "mesReg": { $first: "$dateMonth"},
                "anio": { $first: "$dateYear"},
            }
        },
        {"$match": {"mesReg" : mesAct, "anio" : anioAct}},
        {$count: "conteo"}
    ])

    const contMesAct = contMesA[0].conteo
    const contSemAct = contSemA[0].conteo    
    const contHoy = contHoyA[0].conteo
    console.log('contHoy: ', contHoy)


    
    


    res.status(200).send({ ClientesCount, contMesAct, contSemAct, contHoy, aggre, Clientes })
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //next();
})

module.exports = router;