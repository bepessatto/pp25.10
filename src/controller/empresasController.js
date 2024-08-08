const connection = require('../config/db');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

async function storeEmpresas(request, response) {
    if (!request.files) {
        return response.status(400).json({
            success: false,
            message: "Você não enviou o arquivo de foto."
        });
    }

    const imagem = request.files.imagem;
    const imagemNome = Date.now() + path.extname(imagem.name);

    imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
        if (erro) {
            return response.status(400).json({
                success: false,
                message: "Erro ao mover o arquivo"
            });
        }
        const params = [
            request.body.nome,
            request.body.endereco,
            imagemNome,
            request.body.telefone
        ];

        const query = "INSERT INTO empresas(nome, endereco, imagem, telefone) VALUES(?, ?, ?, ?)";

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

async function getEmpresas(request, response) {
    const query = "SELECT * FROM empresas";

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

async function deleteEmpresa(request, response) {
    const { id } = request.params;

    const query = "DELETE FROM empresas WHERE id = ?";
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

async function updateEmpresa(request, response) {
    const { id } = request.params;
    const { nome, endereco, telefone } = request.body;

    let updateFields = [nome, endereco, telefone];
    let updateQuery = "UPDATE empresas SET nome = ?, endereco = ?, telefone = ? WHERE id = ?";

    if (request.files && request.files.imagem) {
        const imagem = request.files.imagem;
        const imagemNome = Date.now() + path.extname(imagem.name);
        imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
            if (erro) {
                return response.status(400).json({
                    success: false,
                    message: "Erro ao mover o arquivo"
                });
            }
        });
        updateFields = [nome, endereco, telefone, imagemNome];
        updateQuery = "UPDATE empresas SET nome = ?, endereco = ?, telefone = ?, imagem = ? WHERE id = ?";
    }

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

module.exports = {
    storeEmpresas,
    getEmpresas,
    deleteEmpresa,
    updateEmpresa
};
