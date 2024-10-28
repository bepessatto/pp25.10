// Importa a configuração da conexão com o banco de dados
const connection = require('../config/db');
// Importa e configura variáveis de ambiente
const dotenv = require('dotenv').config();
// Importa o módulo 'fs' para manipulação de arquivos
const fs = require('fs');
// Importa o módulo 'path' para manipulação de caminhos de arquivos
const path = require('path');

// Define o caminho para a pasta de uploads
const uploadPath = path.join(__dirname, '..', 'uploads');

// Verifica se a pasta de uploads existe
// Se não existir, cria a pasta
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

// Função assíncrona para armazenar novas empresas
async function storeEmpresas(request, response) {

    // Verifica se um arquivo foi enviado
    if (!request.files) {
        return response.status(400).json({
            success: false,
            message: "Você não enviou o arquivo de foto."
        });
    }

    // Recupera o arquivo de imagem enviado
    const imagem = request.files.imagem;
    // Gera um nome único para a imagem com base no timestamp atual e na extensão do arquivo
    const imagemNome = Date.now() + path.extname(imagem.name);

    // Move a imagem para a pasta de uploads
    imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
        if (erro) {
            return response.status(400).json({
                success: false,
                message: "Erro ao mover o arquivo"
            });
        }
        // Prepara os parâmetros para a inserção no banco de dados
        const params = [
            request.body.nome,
            request.body.endereco,
            imagemNome,
            request.body.telefone,
            request.body.userId
        ];

        console.log(params)

        // Define o comando SQL para inserir uma nova empresa
        const query = "INSERT INTO empresas(nome, endereco, imagem, telefone, user_id) VALUES(?, ?, ?, ?, ?)";

        // Executa a consulta SQL no banco de dados
        connection.query(query, params, (err, results) => {
            if (results) {
                response.status(200).json({
                    success: true,
                    message: "Sucesso!",
                    data: results
                });
            } else {
                response.status(400).json({
                    success: false,
                    message: "Erro!",
                    sql: err,
                });
            }
        });
    });
}

// Função assíncrona para obter todas as empresas
async function getEmpresas(request, response) {
    // Define o comando SQL para selecionar todas as empresas
    const query = "SELECT * FROM empresas";

    // Executa a consulta SQL no banco de dados
    connection.query(query, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro!",
                sql: err
            });
        }
    });
}

// Função assíncrona para deletar uma empresa
async function deleteEmpresa(request, response) {
    // Recupera o ID da empresa a ser deletada do parâmetro da solicitação
    const { id } = request.params;

    // Define o comando SQL para deletar uma empresa com base no ID
    const query = "DELETE FROM empresas WHERE id = ?";
    // Executa a consulta SQL no banco de dados
    connection.query(query, [id], (err, results) => {
        if (results.affectedRows > 0) {
            response.status(200).json({
                success: true,
                message: "Empresa deletada com sucesso"
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao deletar empresa",
                sql: err
            });
        }
    });
}

// Função assíncrona para atualizar uma empresa
async function updateEmpresa(request, response) {
    // Recupera o ID da empresa e os novos dados da solicitação
    const { id } = request.params;
    const { nome, endereco, telefone } = request.body;

    // Define os campos a serem atualizados e o comando SQL inicial
    let updateFields = [nome, endereco, telefone];
    let updateQuery = "UPDATE empresas SET nome = ?, endereco = ?, telefone = ? WHERE id = ?";

    // Verifica se um novo arquivo de imagem foi enviado
    if (request.files && request.files.imagem) {
        const imagem = request.files.imagem;
        const imagemNome = Date.now() + path.extname(imagem.name);
        // Move a nova imagem para a pasta de uploads
        imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
            if (erro) {
                return response.status(400).json({
                    success: false,
                    message: "Erro ao mover o arquivo"
                });
            }
        });
        // Atualiza os campos e o comando SQL para incluir a imagem
        updateFields = [nome, endereco, telefone, imagemNome];
        updateQuery = "UPDATE empresas SET nome = ?, endereco = ?, telefone = ?, imagem = ? WHERE id = ?";
    }

    // Executa a consulta SQL para atualizar a empresa
    connection.query(updateQuery, [...updateFields, id], (err, results) => {
        if (results.affectedRows > 0) {
            response.status(200).json({
                success: true,
                message: "Empresa atualizada com sucesso"
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao atualizar empresa",
                sql: err
            });
        }
    });
}

// Exporta as funções para que possam ser usadas em outros módulos
module.exports = {
    storeEmpresas,
    getEmpresas,
    deleteEmpresa,
    updateEmpresa
};
