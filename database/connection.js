var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'bd_4med',
        charset: 'utf8',
        port: 3306
    }
})

module.express = knex