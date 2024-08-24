// Importa a configuração da conexão com o banco de dados
const connection = require('../config/db');

// Função assíncrona para realizar o login do usuário
async function login(request, response) {
    // Recupera o email do usuário enviado no corpo da solicitação
    const email = request.body.email;

    // Define o comando SQL para buscar o email e a senha na tabela 'users'
    // '?' é um placeholder para o valor do email
    const query = "SELECT email, password FROM users WHERE email = ?";

    // Executa a consulta SQL no banco de dados
    connection.query(query, email, (err, results) => {
        // Verifica se há resultados para o email fornecido
        if (results.length > 0) {
            // Recupera a senha fornecida pelo usuário
            const password = request.body.senha;
            // Recupera a senha armazenada no banco de dados
            const passwordQuery = results[0].password;

            // Compara a senha fornecida com a senha armazenada
            if (password == passwordQuery) {
                // Se as senhas coincidirem, envia uma resposta JSON com status 200
                // e uma mensagem de sucesso, incluindo os dados do usuário
                response
                    .status(200)
                    .json({
                        success: true,
                        message: "Sucesso",
                        data: results[0]
                    });
            } else {
                // Se as senhas não coincidirem, envia uma resposta JSON com status 400
                // e uma mensagem de erro indicando senha incorreta
                response
                    .status(400)
                    .json({
                        success: false,
                        message: "Senha incorreta",
                        data: results
                    });
            }
        } else {
            // Se não houver resultados, significa que o email não está cadastrado
            // Envia uma resposta JSON com status 400 e uma mensagem de erro
            response
                .status(400)
                .json({
                    success: false,
                    message: "Email Não Cadastrado!",
                    data: err
                });
        }
    });
}

// Exporta a função login para que possa ser utilizada em outros módulos
module.exports = {
    login
};
