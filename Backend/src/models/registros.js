const { Schema,model } = require('mongoose')

const registroSchema = new Schema({
    ficha: Number,
    nombre: String,
    telefono: Number,
    opcion: Number,

})

module.exports = model('Registro', registroSchema)