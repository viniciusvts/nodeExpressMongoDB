const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

/**
 * @description fornecer o esquema para postagem na área de blog para o usuário do sistema
 */
const blogSchema = new Schema({
    title: { type: String, required: true, unique: true },
    body: { type:String, required: true },
    date: { type: Date, default: Date.now },
    idAuthor: { type: String,  required: true, lowercase: true },
    comments: [
        { 
            body: { type: String },
            date: { type: Date, default: Date.now }
        }
    ],
    likes: { type: Number, default: 0 },
    hidden: { type: Boolean, default: true}
});

module.exports = mongoose.model( 'Blog', blogSchema);
