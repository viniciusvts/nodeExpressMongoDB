/**
 * @author Vinicius de Santana
 * @description servidor node utilizando MongoDB
 * npm init
 * npm install express body-parser mongoose bcrypt jsonwebtoken --save
 */
console.log("APP: Iniciando...");
const config = require('./config/config'); //APP: API em ambiente DEV||PROD
 //express e rotas
const express = require('express');
const app = express();
const routeIndex = require('./routes/indexRoute'); //rotas '/'
const routeUsers = require('./routes/usersRoute'); //rotas '/users/'
const routeBlog = require('./routes/blogRoute'); //rotas '/blog/'
//util
const port = 8080;
const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded( { extended: true }));
app.use( bodyParser.json() );
//BD
console.log("BD: Start connection to BD")
const mongoose = require('mongoose');
const uri = config.mongodb;
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
    //se for a primeira vez que o sistema inicia, não há admin, então crio um
    Users = require("./model/userSchema");
    Users.findOne( {admin: true}, (err, data)=>{
        if (err) console.log(" APP: erro ao verificar existencia de admins");
        if (!data) {
            Users.create( {email:"admin", pass: "admin", admin:true}, (err, data)=>{
                if (err) console.log(" APP: erro ao criar primeiro admin");
                console.log(" APP: primeiro admin criado");
                console.log(data);
            });
        }
    });
})

// as rotas
app.use('/', routeIndex);
app.use('/users', routeUsers);
app.use('/blog', routeBlog);

app.listen(port, ()=>{
    console.log( "APP: Servidor escutando na porta " + port );
});
    
module.exports = app;