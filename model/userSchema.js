const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    pass: { type:String, required: true, select:false },
    create: { type: Date, default: Date.now },
    admin: { type: Boolean, default: false }
});

/**
 * @description encriptar a senha quando salvar
 * afinal ninguem quer suas senhas aparecendo
 */
userSchema.pre('save', function(next){
    let user = this;
    if ( !user.isModified('pass') ) return next;
    bcrypt.hash( user.pass, 10, (err, encrypted)=>{
        user.pass = encrypted;
        return next();
    });
});

module.exports = mongoose.model( 'User', userSchema);
