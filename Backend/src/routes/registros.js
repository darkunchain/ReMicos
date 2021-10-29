const { Router } = require('express')
const router = Router()

const Registro = require('../models/registros')


router.post('/add', async (req,res) => {
    
    console.log(req.body)
    const newRegistro = new Registro(req.body);
    await newRegistro.save();
   
    res.redirect('/')
    
})

router.get('/registros', async (req, res) => {
    //const Clientes = await Registro.findById(req.params.userid)
    const Clientes = await Registro.find()    
    res.status(200).send(Clientes)
})

module.exports = router;