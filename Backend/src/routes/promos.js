const { Router } = require('express')
const promos = require('../models/promos')
const Aprob = require('../models/aprobadores')
const router = Router()
const http = require('http');
//const swal =require('sweetalert2')
import swal from 'sweetalert2';


const jwt = require('jsonwebtoken')
const Registro = require('../models/promos');





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
    const userId = await promos.findById(req.params.userid, function (err, doc) {
        if (err) {
            msg = { errorMsg: "Ha ocurrido un error Inesperado" }
            rend = 'error'
        } else {
            if (!doc) {
                msg = { errorMsg: "Este bono no existe o ya fue redimido" }
                rend = 'error'
            } else {
                valid = true
                rend = 'redime'
            }
        }
    })
    if (valid) {
        msg = { userId }
        rend = 'redime'
    }

    res.render(rend, msg);

})


router.post('/redime', async (req, res) => {

    console.log('req.body', req.body)
    const { codAprob, id } = req.body
    var establec = ""
    console.log('codAprob', codAprob, 'id', id)


    
    const codRemicosAll = await Aprob.findOne({"establecimiento": "Remicos"})
    const codCaprichosAll = await Aprob.findOne({"establecimiento": "Caprichos"})    

    
    const codRemicosDec = await Aprob.comparePassword(codAprob, codRemicosAll.codigo)
    const codCaprichosDec = await Aprob.comparePassword(codAprob, codCaprichosAll.codigo)

    console.log(' codRemicosDec:',codRemicosDec, ' codCaprichosDec:',codCaprichosDec)
    
    if(!codRemicosDec) {
        console.log('remicos falso')
        if(!codCaprichosDec) {
            console.log('caprichos falso')
            swal("Good job!", "You clicked the button!", "success");


            return res.status(401).send('Este codigo de aprobación no es valido')
        }else establec = "Caprichos"
        console.log(' establec:',establec)
        
    }else {
        establec = "Remicos"
        

        const promo = await promos.findById(id, function (err, doc) {
            if (err) {
                msg = { errorMsg: "Ha ocurrido un error Inesperado" }
                rend = 'error'
            } else {
                if (!doc) {
                    msg = { errorMsg: "Este bono no existe o ya fue redimido" }
                    rend = 'error'
                } else {
                    valid = true
                    rend = 'redime'                
                }
            }
        })
        if (valid) {
            msg = { id }
            rend = 'redime'
        }
    
        
        
        
    }
    
    console.log(' establecAfuera:',establec)

    

    res.status(200).render('okis')

})

/* 
//%%%%%%%%%%%%%%%%%%%%%% Codigos de aprobacion %%%%%%%%%%%%%%%%%%%%%%%%//
router.post('/promos/signup', async (req, res) => {    
    const {codigo,establecimiento} = req.body;    
    
    const codeValidate = await Aprob.findOne({codigo})    
    if(codeValidate) return res.status(401).send("este codigo ya existe, por favor seleccione otro");
    const newCodigo = new Aprob({ codigo,establecimiento});
       
    newCodigo.codigo = await Aprob.encryptPassword(codigo)     
    
    await newCodigo.save();    
    const token = jwt.sign({_id:newCodigo._id}, process.env.SECRET_ENC);
    res.status(201).json({token})
})

 */




module.exports = router;