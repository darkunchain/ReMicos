const { Router } = require('express')
const router = Router()

const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config();

router.get('/', (req, res) => {
    res.send('toor')
})

router.get('/users', (req, res) => {
    res.send('hello world')
})

router.post('/signup', async (req, res) => {    
    const {username,password} = req.body;
    if(username.length == 0 || password.length == 0 ) return res.status(401).send('el usuario o password no puede estar vacio')
    const userValidate = await User.findOne({username})    
    if(userValidate) return res.status(401).send("este usuario ya existe, por favor seleccione otro");    
    const newUser = new User({ username,password });    
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
    const token = jwt.sign({_id:user._id}, process.env.SECRET_ENC)
    res.json({token})
})

router.get('/admin', verifyToken, async (req,res) => {
    const usuarios = await User.find()
    res.json(usuarios)
    
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