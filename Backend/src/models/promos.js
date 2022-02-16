const { Schema,model } = require('mongoose')

const promoSchema = new Schema({
    correo: String,
    telefono: Number | String,
    codigo: String,    

},
{
  timestamps: true
})

module.exports = model('Promo', promoSchema)