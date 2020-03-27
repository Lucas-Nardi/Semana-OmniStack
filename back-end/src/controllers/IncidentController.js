const connection = require('../database/connection');

module.exports={

    async create(request, response){ // Cria uma ong
        const {title, description, value} = request.body; /* Pega os dados do corpo da requisição*/ 
        const ong_id = request.headers.authorization; // Authorization é o nome que coloquei no header no isomnia

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        
        return response.json({id});
    },

    async index(request,response){ // Lista todas as Ongs

        const {page = 1} = request.query;

        const [count] = await connection('incidents').count(); // Uso [] para nao pegar uma array e sim , pegar o valor da posição 0

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', "=", 'incidents.ong_id')
            .limit(5)              // Esquema de paginação pegando 5 em 5
            .offset((page -1) * 5) // e começando com o 0
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]); /* Faz uma operaçao de consulta do banco */
        
        response.header('X-Total-Count',count['count(*)']);

        return response.json(incidents);
    },

    async delete (request, response){
        const {id} = request.params;  // Pega o id que esta sendo passado com parametro
        const ong_id = request.headers.authorization; // Authorization é o nome que coloquei no header no isomnia
        
        const incident = await connection('incidents')
            .where('id',id)
            .select('ong_id')
            .first();

         if(incident.ong_id != ong_id){   // Ver se aquela ong realmente possui esse incident
             return response.status(401).json({error: 'Operation not permitted.'});
         }
         await connection('incidents').where('id',id).delete();
         return response.status(204).send(); 
    },
};