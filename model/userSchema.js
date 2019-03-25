const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    pass: { type:String, required: true, select:false },
    create: { type: Date, default: Date.now }
});
module.exports = mongoose.model( 'User', userSchema);
