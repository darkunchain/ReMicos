const { Router } = require('express')
const promos = require('../models/promos')
const router = Router()

const Registro = require('../models/promos')


router.post('/addPromo', async (req, res) => {

    console.log(req.body)
    const newPromo = new promos(req.body);
    await newPromo.save();

    res.redirect('/')

})


router.get('/promos/data', async (req, res) => {

    const dataPromos = await promos.find()
    console.log(Cli30p)
    var variable = 5

    res.status(200).send({
        variable
    })
})




module.exports = router;