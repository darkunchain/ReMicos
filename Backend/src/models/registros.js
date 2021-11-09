const { Schema,model } = require('mongoose')

const registroSchema = new Schema({
    turno: Number,
    nombre: String,
    telefono: Number,
    tiempo: Number,
    accion: String,
    blink: Boolean,
    createdAt: Date | String,
    isoDate: Date

})

module.exports = model('Registro', registroSchema)