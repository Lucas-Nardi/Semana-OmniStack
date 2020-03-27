const connection = require('../database/connection');
const crypto = require('crypto');

module.exports={

    async create(request, response){ // Cria uma ong

        const {name, email, whatsapp, city, uf}= request.body; /* Pega os dados do corpo da requisição*/ 
    
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert({ // Faz uma operaçao de inserção no banco
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })    
        return response.json({id});
    },

    async index(request,response){ // Lista todas as Ongs

        const ongs = await connection('ongs').select('*'); /* Faz uma operaçao de consulta do banco */
        return response.json(ongs);
    }
};