const jwt = require('jsonwebtoken');
const config = require('../config/config');
const jwtKey = config.jsonWebToken;
const jwtExpiresTime = config.jsonWebTokenExpiresTime;

const auth = {
    
    /**
     * verifica o token enviado pelo usuário
     */
    verify: function(req, res, next){
        console.log("APP: auth.verify");
        const tokenHeader = req.headers.token;
        if(!tokenHeader) return res.status(401).send({ error: "Token ausente"});
        jwt.verify( tokenHeader, jwtKey, (err, decoded)=>{
            if(err) return res.status(401).send({ error: "Token incorreto"});
            res.locals.token_id = decoded;
            return next();
        });
    },

    /**
     * @argument userId recebe objeto no formato: { id: dataId }
    * @description cria um token para o usuário
    */
    create: function(userId){
        console.log("APP: auth.create");
        return jwt.sign( userId, jwtKey, { expiresIn: jwtExpiresTime } );
    }
}
module.exports = auth;