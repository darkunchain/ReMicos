const { Router } = require('express')
const promos = require('../models/promos')
const router = Router()
const http = require('http');


const Registro = require('../models/promos')


router.post('/addPromo', async (req, res) => {

    console.log(req.body)
    const newPromo = new promos(req.body);
    const guardado = await newPromo.save();    
    const token = guardado._id   

    res.status(200).send({
        token
    })

})

router.get('/promos/:userid', async (req, res) => {
    var msg = {}
    var valid = false
    const userId = await promos.findById(req.params.userid, function(err, doc){
        if(err){
            msg = {errorMsg: "Ha ocurrido un error Inesperado"}
            rend = 'error'
        } else {
            if (!doc) {
                msg = {errorMsg: "Este bono no existe o ya fue redimido"}
                rend = 'error'
            } else {
                valid = true
                rend = 'redime'
            }
        }
      })
      if(valid){
          msg = {userId}
          rend = 'redime'
      }
     
      res.render(rend, msg);
    
})

router.post('/redime', async (req, res) => {

    console.log('req.body', req.body)
    codAprob = req.body.codAprob

    res.status(200).send('enviado')

})








module.exports = router;