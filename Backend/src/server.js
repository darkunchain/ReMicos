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


//app.options('*', cors());



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");  
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS"
  );
  next();
});

app.use(cors({ origin: true, methods: 'POST,GET,PUT,OPTIONS,DELETE'  }));


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



