const { Router } = require('express')
const router = Router()

const User = require('../models/user')
const Rol = require('../models/roles')
const jwt = require('jsonwebtoken')
require('dotenv').config();



router.get('/', (req, res) => {
    res.send('toor')
})

router.get('/users', (req, res) => {
    res.send('hello world')
})

router.post('/signup', async (req, res) => {    
    const {username,password,roles} = req.body;    
    if(username.length == 0 || password.length == 0 ) return res.status(401).send('el usuario o password no puede estar vacio')
    const userValidate = await User.findOne({username})    
    if(userValidate) return res.status(401).send("este usuario ya existe, por favor seleccione otro");
    const newUser = new User({ username,password,roles});
    if(roles){
        const foundRol = await Roles.find({nombre:roles})
        const rol = foundRol[0]._id
        newUser.roles = rol                
    }else{
        const role = await Roles.find({nombre:"operador"})        
        const roles = role[0]._id        
        newUser.roles = roles        
    }    
    newUser.password = await User.encryptPassword(password)     
    
    await newUser.save();    
    const token = jwt.sign({_id:newUser._id}, process.env.SECRET_ENC);
    res.status(201).json({token})
})

router.post('/signin', async (req,res) => {
    const { username, password } = req.body;
    if(username.length == 0 || password.length == 0 ) return res.status(401).send('el usuario o password no puede estar vacio')
    const user = await User.findOne({username})    
    if(!user) return res.status(401).send("este usuario no existe");    
    const passworddec = await User.comparePassword(password, user.password)    
    if(!passworddec) return res.status(401).send('password incorrecto')    
    const token = jwt.sign({_id:user._id}, process.env.SECRET_ENC, {
        expiresIn: 43200
    })
    res.status(200).json({token})
})

router.get('/admin', verifyToken, async (req,res) => {
    const roles = await Roles.find()
    res.json(usuarios)
    
})

router.post('/admin/roles', [verifyToken, rolAdmin], async (req,res) => {
    
    const { nombre, descripcion,jwt } = req.body;
    req.body.jwt
    /* if(nombre.length == 0) return res.status(401).send('el nombre del rol no puede estar vacio')
    const rolesActuales = await Rol.findOne({nombre})    
    if(rolesActuales) return res.status(401).send("este Rol ya existe, por favor seleccione otro");   
    const newRol = new Roles({ nombre,descripcion });
    const token = jwt.sign({_id:newUser._id}, process.env.SECRET_ENC); */
   
    res.json(nombre)
    
})


router.get('/edit/:userid', verifyToken, async (req, res) => {
    const userId = await User.findById(req.params.userid)
    res.status(200).json(userId)
})

module.exports = router;

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Acceso no autorizado')
    }
    const token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Acceso no autorizdo')
    }    
    const payload = jwt.verify(token, process.env.SECRET_ENC)
    console.log('payload:',payload)
    req.userid = payload._id;
    next()    
}

async function rolAdmin(req, res, next) {
    console.log('req.userid',req.userid)
    const user = User.findById('610b4bf209c5c84b94d969c3')
    console.log('user',user)
    const roles = await Roles.find({_id:user.roles})
    console.log('roles: ',user.roles)
    next()
     
}

async function rolOperador(req, res, next){
    const user = User.findById(req.userid)
    const roles = await Roles.find({_id:user.roles})
    next() 
}

async function rolContador(req, res, next){
    const user = User.findById(req.userid)
    const roles = await Roles.find({_id:user.roles})
    next() 
}

async function rolMonitoreo(req, res, next){
    const user = User.findById(req.userid)
    const roles = await Roles.find({_id:user.roles})
    next() 
}