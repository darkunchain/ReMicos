const { Schema,model } = require('mongoose')

const rolesSchema = new Schema({
    nombre: String,
    descripcion: String   
},{
    versionKey: false
});


module.exports = model('Roles', rolesSchema);