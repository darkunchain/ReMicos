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

    console.log('dia: ',fechaAct.getDay())
    //console.log('semana: ',fechaAct.getWeek())

    
    const aggre = await Registro.aggregate([
        {
            "$project": {                
                "dateWeek": { "$week": "$isoDate" },
                "dateMonth": { "$month": "$isoDate" },
                "dateDay" : { "$dayOfWeek" : "$isoDate"},
                "Rank": 1
            }
        },
        {
            "$group": {
                "_id" : "$_id",
                "semana": { $first: "$dateWeek"},                
                "mesReg": { $first: "$dateMonth"},
                "diaReg": { $first: "$dateDay"},
            }
        }
        
    ])


    const contSemAct = await Registro.aggregate([
        {
            "$project": {                
                "dateWeek": { "$week": "$isoDate" },                
            }
        },
        {
            "$group": {
                "_id" : "$_id",
                "semana": { $first: "$dateWeek"}                
            }
        },
        {"$match": {"semana" : semAct}},
        {$count: "count"}
    ])

    const contDiaAct = await Registro.aggregate([
        {
            "$project": {                
                "dateDay" : { "$dayOfWeek" : "$isoDate"},                
            }
        },
        {
            "$group": {
                "_id" : "$_id",
                "diaReg": { $first: "$dateDay"},
            }
        },
        {"$match": {"diaReg" : diaAct}},
        {$count: "count"}
    ])

    //const semanaCero = aggre.semana[0]
    //const contarSem = aggre.semana

    //const clienteAggre = Registro.find({"semana":45})
    //console.log('contarSem: ', contarSem)


    res.status(200).send({ ClientesCount, contSemAct, contDiaAct, aggre, Clientes })
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //next();
})

module.exports = router;