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

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS"
  );
  next();
});


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.use('/api',require('./routes/asientos'))
app.use('/api',require('./routes/registros'))
app.use('/api',require('./routes/users'))
app.use('/api',require('./routes/estadisticas'))


//app.options('*', cors());




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



