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
    const Clientes = await Registro.find().aggregate([        

        {
            "$project": {                
                "DueDateWeek": { "$week": "$isoDate" },
                "DueDateMonth": { "$month": "$isoDate" },
                "Rank": 1
            }
        },
        {
            "$group": {
                "_id": {"$count":"$DueDateWeek"},                
                "MonthValue": { "$first": "$DueDateMonth" }
            }
        }
    ])


    res.status(200).send({ Clientes, aggre })
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //next();
})

module.exports = router;