const { Router } = require('express')
const router = Router()

const User = require('../models/user')
const Rol = require('../models/roles')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const roles = ['admin','operador','contador','monitor']

router.get('/', (req, res) => {
    res.send('toor')
})

router.get('/users', (req, res) => {
    res.send('hello world')
})

router.post('/signup', async (req, res) => {    
    const {username,password,roles} = req.body;
    console.log('routes/user - req.body: ', req.body)
    if(username.length == 0 || password.length == 0 ) return res.status(401).send('el usuario o password no puede estar vacio')
    const userValidate = await User.findOne({username})    
    if(userValidate) return res.status(401).send("este usuario ya existe, por favor seleccione otro");    
    const newUser = new User({ username,password,roles});    
    newUser.password = await User.encryptPassword(password)
    if(roles){
        const foundRol = await Roles.find({nombre:{$in:roles}})
        newUser.roles = foundRol._id
        console.log('routes/user - foundRol: ', foundRol,'newUser.roles: ', newUser.roles)
    }else{
        const role = await Roles.find({nombre:"operador"})        
        newUser.roles = role._id
        console.log('routes/user - role: ', role,'newUser.roles: ', newUser.roles)
    }
    
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

router.post('/admin/roles', verifyToken, async (req,res) => {
    
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
    req.userid = payload._id;
    next()
    
}