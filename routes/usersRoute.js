const express = require('express');
const router = express.Router();
const Users = require('../model/userSchema');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');
const route = "/users/";

//rotas

/** 
 * @description retorna todos os users do banco caso o user seja adm
 * retorna só o próprio user caso seja user comum
*/
router.get('/', auth.verify,(req, res)=>{
    console.log("APP: GET to: "+route+" from: " + req.ip); //logs

    userId = res.locals.token_id.id;
    userIsAdmin = res.locals.isAdmin;
    console.log("user: "+userId );
    if(userIsAdmin){
        Users.find({}, (err, data)=>{
            if (err) return res.status(500).send( {error: "erro na consulta"} );
            return res.send(data);
        });
    }else{
        //se não for admin
        Users.findOne( {_id: userId }, (err, data)=>{
            if (err) return res.status(500).send( {error: "erro na consulta"} );
            return res.send(data);
        });
    }
});

/**
 * @description cria novo usuário no banco
 * verifica se foi recebido dados suficientes
 * procura se já existe usuário no banco
 * lança novo usuário no banco e retorna esse usuário (sem a senha).
 */
router.post('/create', auth.verify, (req, res)=>{
    console.log("APP: POST to: "+route+"create from: " + req.ip); //logs
    userId = res.locals.token_id.id;
    userIsAdmin = res.locals.isAdmin;
    console.log("user: "+userId );
    if( userIsAdmin ){
        const obj = req.body;
        if (!obj.email || !obj.pass)
            return res.status(400).send({error: "Dados incorretos ou faltantes"});
        Users.findOne( {email: obj.email}, (err, data)=>{
            if (err) return res.status(500).send( {error: "Erro no banco"});
            if (data) return res.status(400).send( {error: "Usuário já existe"});

            Users.create( obj, (err, data)=>{
                if (err) return res.status(500).send( {error: "Erro no banco"});
                data.pass = undefined;
                return res.status(201).send( data );
            });
        });
    }
    //se o usuário solicitante não for admin
    res.status(401).send( {error: "Usuário não autorizado"});
});

/**
 * @description autenticar usuário
 */
router.post('/auth', (req, res)=>{
    console.log("APP: POST to: "+route+"auth from: " + req.ip); //logs
    const obj = req.body;
    if (!obj.email || !obj.pass)
        return res.status(400).send({error: "Dados incorretos ou faltantes"});
    Users.findOne( {email: obj.email}, (err, data)=>{
        if (err) return res.status(500).send( {error: "Erro no banco"});
        if (!data) return res.status(401).send( {error: "Usuário/Senha não existe"});
        
        bcrypt.compare(obj.pass, data.pass,(err, same)=>{
            if (err) return res.status(500).send( {error: "Falha ao comparar senha"});
            if (!same) return res.status(401).send( {error: "Usuário/Senha incorreto"});
            data.pass = undefined; //não enviar a senha
            return res.send( { data, token: auth.create( {id: data.id} ) } );
        });
    }).select('pass'); //força o select do password
});
//fim rotas

module.exports = router;