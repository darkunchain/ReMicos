const { Schema,model } = require('mongoose')
const bcrypt = require('bcryptjs')

const aprobadorSchema = new Schema({
    codigo: String,
    establecimiento: String,    
},{
    timestamps: true
});

aprobadorSchema.statics.encryptPassword = async (codigo) => {
    const salt = await bcrypt.genSalt(10)    
    return await bcrypt.hash(codigo, salt)
}

aprobadorSchema.statics.comparePassword = async (codigo, codigoRecibido) => {
    return await bcrypt.compare(codigo, codigoRecibido)

}

module.exports = model('Aprobador',aprobadorSchema)