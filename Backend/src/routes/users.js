const { Router } = require('express')
const router = Router()

const User = require('../models/user')

router.get('/', (req, res) => {
    res.send('toor')
})

router.get('/users', (req, res) => {
    res.send('hello world')
})

router.post('/signup', (req, res) => {
    console.log(req.body)
    res.send('hello world')
})

module.exports = router;