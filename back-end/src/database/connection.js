 const knex = require('knex');
 const configuration = require('../../knexfile'); /* usei ../ para ir ate a pasta src e outro ../ para sair do src, já que o arquivo knexfile esta fora do src */

 const connection = knex(configuration.development);

 module.exports = connection;