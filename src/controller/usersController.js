// Importa a configuração da conexão com o banco de dados
const connection = require('../config/db');

// Função assíncrona para armazenar um novo usuário no banco de dados
async function storeUser(request, response) {
    // Recupera os dados enviados no corpo da solicitação
    // Cria um array com os dados do usuário para serem usados na consulta SQL
    const params = Array(
        request.body.usuario,   // Nome de usuário
        request.body.email,     // Email do usuário
        request.body.senha,      // Senha do usuário
        request.body.tipoUsuario // Tipo de usuário
    );
    
    // Define o comando SQL para inserir um novo usuário na tabela 'users'
    // '?' são usados como placeholders para os valores dos parâmetros
    const query = "INSERT INTO users(name, email, password, tipo) VALUES(?,?,?,?)";

    // Executa a consulta SQL no banco de dados
    connection.query(query, params, (err, results) => {
        // Imprime o erro e os resultados no console para depuração
        console.log(err, results);

        // Verifica se houve um resultado da consulta
        if (results)  {
            // Se a consulta foi bem-sucedida, envia uma resposta JSON com status 200
            // e uma mensagem de sucesso, incluindo os resultados da operação
            response
                .status(200)
                .json({
                    success: true,
                    message: "Cadastro Realizado Com Sucesso!",
                    data: results
                });
        } else {
            // Se a consulta falhou, envia uma resposta JSON com status 400
            // e uma mensagem de falha, incluindo o erro encontrado
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso!",
                data: err
            });
        }
    });
}

// Exporta a função storeUser para que possa ser utilizada em outros módulos
module.exports = {
    storeUser
};
