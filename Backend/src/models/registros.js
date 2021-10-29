const { Schema,model } = require('mongoose')

const registroSchema = new Schema({
    turno: Number,
    nombre: String,
    telefono: Number,
    tiempo: Number,
    accion: String,
    blink: Boolean,
    createdAt: Date | String,

})

module.exports = model('Registro', registroSchema)