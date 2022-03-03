const { Schema,model } = require('mongoose')

const promoSchema = new Schema({
    correo: String,
    telefono: Number | String,
    codigo: String,
    redCaprichos:Boolean,
    redRemicos:Boolean,
    valido:Boolean,
    comboNumber:Number,
    comboName:String

},
{
  timestamps: true
})

module.exports = model('Promo', promoSchema)