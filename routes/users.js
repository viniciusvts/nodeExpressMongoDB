const express = require('express');
const router = express.Router();
const Users = require('../model/userSchema');

//rotas
/** 
 * @description retorna todos os usuários do banco
*/
router.get('/',(req, res)=>{
    Users.find({}, (err, data)=>{
        if (err) return res.send( {error: "erro na consulta"} );
        return res.send(data);
    });
})

/**
 * @description cria novo usuário no banco
 * verifica se foi recebido dados suficientes
 * procura se já existe usuário no banco
 * lança novo usuário no banco e retorna esse usuário (sem a senha).
 */
router.post('/create', (req, res)=>{
    console.log(req.body);
    const obj = req.body;
    if (!obj.email || !obj.pass) return res.send({error: "Dados incorretos ou faltantes"});
    Users.findOne( {email: obj.email}, (err, data)=>{
        if (err) return res.send( {error: "Erro no banco"});
        if (data) return res.send( {message: "Usuário já existe"});

        Users.create( obj, (err, data)=>{
            if (err) return res.send( {error: "Erro no banco"});
            data.pass = undefined;
            return res.send( data );
        });
    });
});
//fim rotas

module.exports = router;