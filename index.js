/**
 * @author Vinicius de Santana
 * @description servidor node utilizando MongoDB
 * npm init
 * npm install express body-parser mongoose bcrypt jsonwebtoken --save
 */
console.log("APP: Iniciando...")
 //express e rotas
const express = require('express');
const app = express();
const routeIndex = require('./routes/index'); //rotas '/'
const routeUsers = require('./routes/users'); //rotas '/users'
//util
const port = 8080;
const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded( { extended: true }));
app.use( bodyParser.json() );
//BD
console.log("BD: Start connection")
const mongoose = require('mongoose');
const uri = require('./assets/keys').mongodb; // a uri com user e senha está aqui
const options = { reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 5,
    useNewUrlParser: true
};
mongoose.connect(uri, options, (err)=>{
    if(err){
        console.log("BD: Erro ao conectar >>>>>>\n", err);
    }
})
/*mongoose.connection.on('error', ()=>{
    console.log("BD: Erro na conexão");
})*/
mongoose.connection.on('disconnected', ()=>{
    console.log("BD: desconectado");
})
mongoose.connection.on('connected', ()=>{
    console.log("BD: conectado");
})


app.use('/', routeIndex); //rotas '/'
app.use('/users', routeUsers); //rotas '/users'

app.listen(port, ()=>{
    console.log( "APP: Servidor escutando na porta " + port );
});
    
module.exports = app;