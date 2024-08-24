// Importa o pacote mysql2 para gerenciar a conexão com o banco de dados MySQL
const mysql = require('mysql2');
// Importa e configura as variáveis de ambiente usando o pacote dotenv
const dotenv = require('dotenv').config();

// Cria uma conexão com o banco de dados MySQL usando as configurações das variáveis de ambiente
const connection = mysql.createConnection({
    // Define o host do banco de dados (endereço do servidor)
    host: process.env.DB_HOST,
    // Define o usuário do banco de dados
    user: process.env.DB_USER,
    // Define a senha do usuário do banco de dados
    password: process.env.DB_PASSWORD,
    // Define o nome do banco de dados
    database: process.env.DB_DATABASE
});

// Estabelece a conexão com o banco de dados
connection.connect(function(err){
    // Se ocorrer um erro ao conectar, o erro é lançado e o processo é interrompido
    if(err) {
        throw err;
    } else {
        // Se a conexão for bem-sucedida, uma mensagem é exibida no console
        console.log("MySql conectado!");
    }
});

// Exporta a conexão para que possa ser utilizada em outros módulos
module.exports = connection;
