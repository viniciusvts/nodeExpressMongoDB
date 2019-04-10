const express = require('express');
const router = express.Router();

//rotas
router.get('/',(req, res)=>{
    //GET: localhost:8080?nome=nomeexemplo
    console.log("APP: GET to: / from: " + req.ip); //logs
    let obj = req.query;
    let mensagem = "GET ok, ";
    if (obj.nome){
        mensagem += "recebido nome " + obj.nome
    }else{
        mensagem += "nenhum nome recebido";
    }
    return res.send({ route: "/", message: mensagem });
})
router.post('/', (req, res)=>{
    console.log("APP: POST to: / from: " + req.ip); //logs
    return res.send({ route: "/", message:"POST ok"});
})
//fim rotas

module.exports = router;