const express = require('express')
const path = require('path')
const cors = require('cors');
require('dotenv').config();
require('./db')


crearRoles = require('./funciones/crearRoles');



//inicializacion
const app = express();

crearRoles();  //crea roles iniciales desde el archivo funciones

app.use(express.json())

app.use('/api',require('./routes/asientos'))
app.use('/api',require('./routes/registros'))
app.use('/api',require('./routes/users'))

app.use(cors());
app.options('*', cors());


//configuraciones
app.set('port',process.env.PORT || 8081)
app.listen(app.get('port'), ()=>{
    console.log('Server on port ',app.get('port'))
})

//Midlewares

app.use(express.urlencoded({extended:false}))



//globales

//Routes



//static



