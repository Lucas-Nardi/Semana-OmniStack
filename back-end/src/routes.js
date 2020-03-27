const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();


routes.post('/sessions', SessionController.create);

routes.get('/ongs',OngController.index); // Listar todas as ongs
routes.post('/ongs', OngController.create);  /* Criar uma ong*/

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index); // Lista todos os casos de uma ong
routes.post('/incidents', IncidentController.create); // Cria um caso de uma ong
routes.delete('/incidents/:id',IncidentController.delete); // Deleta um caso de uma ong  

module.exports = routes;



/*
  * Métodos HTTP:
  *
  * GET: Buscar/listar uma informação do back-end
  * POST: Criar uma informação no back-end
  * PUT: Alterar uma informação do back-end
  * DELETE: Deletar uma informação do back-end  
*/

/*
  * Tipos de parâmetros:
  *
  * Query Params: Parâmetros nomeados enviados na rota apôs "?" (Filtros,paginação)  
  * Route Params: Parâmetros utilizados para identificar recursos 
  * Requets Body: Corpo da requisição utilizado para criar ou alterar recursos

*/ 