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
                "semana": { $push: "$dateWeek"},                
                "mesReg": { $push: "$dateMonth"}
            }
        }
    ])

    const contarSem= await Registro.find({"aggre.semana": 45})

    console.log('aggre: ', aggre)


    res.status(200).send({ Clientes, aggre, contarSem })
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //next();
})

module.exports = router;