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
    const fechaAct = new Date()
    const diaAct = fechaAct.getDay()
    console.log('dia: ',fechaAct.getDay())
    //console.log('semana: ',fechaAct.getWeek())

    
    const aggre = await Registro.aggregate([
        {
            "$project": {                
                "dateWeek": { "$week": "$isoDate" },
                "dateMonth": { "$month": "$isoDate" },
                "Rank": 1
            }
        },
        {
            "$group": {
                "_id" : "$_id",
                "semana": { $first: "$dateWeek"},                
                "mesReg": { $first: "$dateMonth"}
            }
        }
    ])

    //const semanaCero = aggre.semana[0]
    //const contarSem = await Registro.find({ aggre.semana[0] : 45})
    //const clienteAggre = Registro.find({"semana":45})
    //console.log('aggre: ', clienteAggre)


    res.status(200).send({ Clientes, aggre })
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //next();
})

module.exports = router;