const { Router } = require('express')
const promos = require('../models/promos')
const Aprob = require('../models/aprobadores')
const router = Router()
const http = require('http');
//const swal =require('sweetalert2')
//import swal from 'sweetalert2';


const jwt = require('jsonwebtoken')
const Registro = require('../models/promos');





router.post('/addPromo', async (req, res) => {
    var token = "0"

    console.log(req.body)
    console.log('req.body',req.body)
    const codRemicosAll = await Aprob.findOne({ "establecimiento": "Remicos" })
    const codCaprichosAll = await Aprob.findOne({ "establecimiento": "Caprichos" })
    const codRemicosDec = await Aprob.comparePassword(req.body.codigo, codRemicosAll.codigo)
    const codCaprichosDec = await Aprob.comparePassword(req.body.codigo, codCaprichosAll.codigo)

    console.log(
    ' codRemicosDec:',codRemicosDec,
    ' codCaprichosDec:',codCaprichosDec
    )

    if (!codRemicosDec) {
        console.log('remicos falso')
        if (!codCaprichosDec) {
            console.log('caprichos falso')
            
            msg = { errorMsg: "Este codigo de aprobación no es valido",
                    title: "Codigo Invalido" }
            rend = "error_msg"
            id="1234aef1234aef1234aef123"
            console.log(' rend:',rend,' msg:',msg,' id:',id)
            //return res.status(401).send('Este codigo de aprobación no es valido')
            token = "0"            
        }
        
    }else{
        const newPromo = new promos(req.body);
        console.log('newPromo: ', newPromo)
        const guardado = await newPromo.save();
        token = guardado._id
    }   

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



    const codRemicosAll = await Aprob.findOne({ "establecimiento": "Remicos" })
    const codCaprichosAll = await Aprob.findOne({ "establecimiento": "Caprichos" })


    const codRemicosDec = await Aprob.comparePassword(codAprob, codRemicosAll.codigo)
    const codCaprichosDec = await Aprob.comparePassword(codAprob, codCaprichosAll.codigo)

    console.log(' codRemicosDec:', codRemicosDec, ' codCaprichosDec:', codCaprichosDec)

    if (!codRemicosDec) {
        console.log('remicos falso')
        if (!codCaprichosDec) {
            console.log('caprichos falso')
            msg = { errorMsg: "Este codigo de aprobación no es valido" }
            rend = "error_codigo"
            //return res.status(401).send('Este codigo de aprobación no es valido')
            return res.render(rend, { msg, id });
        }

    }

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

    if (promo.redCaprichos && promo.redRemicos) {
        msg = { title: "Bono NO valido !!!", errorMsg: "Este bono ya fue redimido en ambos establecimientos" }
        rend = 'error_msg'
        console.log('entro al IF: 3')
        return res.render(rend, { msg, id });
    } else {
        if (codRemicosDec) {
            establec = "Remicos"
            redim = "redRemicos"
            console.log('se entro al remicos')
            if (promo.redRemicos) {
                msg = { title: "Bono NO valido !!!", errorMsg: "Este bono ya fue redimido en Remicos" }
                rend = 'error_msg'
                return res.render(rend, { msg, id });
            } else {
                await promos.findOneAndUpdate({ _id: id }, { redRemicos: codRemicosDec })
                return res.status(200).render('okis', { establec })
            }



        } else if (codCaprichosDec) {
            establec = "Caprichos"
            redim = "redCaprichos"
            console.log('se entro al caprichos')
            if (promo.redCaprichos) {
                msg = { title: "Bono NO valido !!!", errorMsg: "Este bono ya fue redimido en Caprichos" }
                rend = 'error_msg'
                return res.render(rend, { msg, id });
            } else {
                await promos.findOneAndUpdate({ _id: id }, { redCaprichos: codCaprichosDec })
                return res.status(200).render('okis', { establec })
            }

        }

    }

  



    res.status(200).render('okis', { establec })

})


//%%%%%%%%%%%%%%%%%%%%%% Codigos de aprobacion %%%%%%%%%%%%%%%%%%%%%%%%//
router.post('/promos/signup', async (req, res) => {
    const { codigo, establecimiento } = req.body;

    const codeValidate = await Aprob.findOne({ codigo })
    if (codeValidate) return res.status(401).send("este codigo ya existe, por favor seleccione otro");
    const newCodigo = new Aprob({ codigo, establecimiento });

    newCodigo.codigo = await Aprob.encryptPassword(codigo)

    await newCodigo.save();
    const token = jwt.sign({ _id: newCodigo._id }, process.env.SECRET_ENC);
    res.status(201).json({ token })
})






module.exports = router;