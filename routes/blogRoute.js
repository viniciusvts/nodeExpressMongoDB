const express = require('express');
const router = express.Router();
const Blog = require('../model/blogSchema');
const auth = require('../middlewares/auth');
const route = "/blog/";

//rotas

/** 
 * @description retorna todos as entradas do blog do usuário autenticado
*/
router.get('/', auth.verify,(req, res)=>{
    console.log("APP: GET to: "+route+" from: " + req.ip); //logs
    userID = res.locals.token_id.id;
    userIsAdmin = res.locals.isAdmin
    console.log( userID );

    if( userIsAdmin ){
        Blog.find( {}, (err, data)=>{
            if (err) return res.status(500).send( {error: "erro na consulta"} );
            return res.send(data);
        });
    }else{
        //se o solicitante não é administrador retorna só os posts proprios
        Blog.find({ idAuthor: userID }, (err, data)=>{
            if (err) return res.status(500).send( {error: "erro na consulta"} );
            return res.send(data);
        })
    };
})

/**
 * @description cria uma nova entrada de blog no BD
 * verifica se foi recebido dados suficientes
 * procura se já existe alguma postagem com titulo igual
 * lança nova postagem no BD e retorna a postagem
 */
router.post('/create', auth.verify, (req, res)=>{
    console.log("APP: POST to: "+route+"create from: " + req.ip); //logs
    const obj = req.body;
    userID = res.locals.token_id.id;
    console.log( userID );
    
    if (!obj.title || !obj.body)
        return res.status(400).send({error: "Dados incorretos ou faltantes"});

    Blog.findOne( {title: obj.title}, (err, data)=>{
        if (err) return res.status(500).send( {error: "Erro no banco"});
        if (data) return res.status(400).send( {error: "Título já existe"});

        obj.idAuthor = res.locals.token_id.id; //adiciona id do solicitante ao objeto
        Blog.create( obj, (err, data)=>{
            if (err) return res.status(500).send( {error: "Erro no banco"});
            return res.status(201).send( data );
        });
    });
});
//fim rotas


module.exports = router;