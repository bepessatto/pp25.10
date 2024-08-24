var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'bd_pessatto',
        charset: 'utf8',
        port: 3306
    }
})

module.express = knex