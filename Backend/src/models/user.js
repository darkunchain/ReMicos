const { Schema,model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: String,
    password: String
},{
    timestamps: true
},{
    roles: [{
        ref: "Roles",
        type: Schema.Types.ObjectId
    }]
});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)    
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, passRecibido) => {
    return await bcrypt.compare(password, passRecibido)

}

module.exports = model('User',userSchema)