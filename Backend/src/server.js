const express = require('express')
const path = require('path')
require('dotenv').config();
require('./db')






//inicializacion
const app = express();
app.use(express.json())

app.use('/api',require('./routes/asientos'))
app.use('/api',require('./routes/registros'))
app.use('/api',require('./routes/users'))


//configuraciones
app.set('port',process.env.PORT || 3000)
app.listen(app.get('port'), ()=>{
    console.log('Server on port ',app.get('port'))
})

//Midlewares

app.use(express.urlencoded({extended:false}))



//globales

//Routes



//static



