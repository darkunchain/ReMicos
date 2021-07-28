const { Schema,model } = require('mongoose')

const asientoSchema = new Schema({
    fecha: Date,
    descripcion: String,
    valor: Number
});


module.exports = model('Asiento', asientoSchema);