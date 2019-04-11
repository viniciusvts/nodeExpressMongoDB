const env = process.env.NODE_ENV || 'dev'; 

const config = () => {
    switch (env)
    {
    case 'dev':
    return{
        mongodb: 'mongodb://localhost:27017/test',
        jsonWebToken: 'senhaSegura(ouNao)',
        jsonWebTokenExpiresTime: "2m"
    }

    case 'prod':
    return{
        mongodb: 'mongodb://mongodb:27017/app',
        jsonWebToken: 'outraSenhaSegura(ouNaoTbm)',
        jsonWebTokenExpiresTime: "1h"
    }

    }
}

console.log(console.log( "APP: API em ambiente "+ env.toUpperCase() ) );
module.exports = config();