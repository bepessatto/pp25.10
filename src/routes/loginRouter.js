// Importa o pacote express para criar o roteador
const express = require('express');

// Cria uma instância do roteador para gerenciar as rotas relacionadas ao login
const router = express.Router();

// Importa a função login do controlador de login, que vai ser chamada quando a rota for acessada
const { login } = require("../controller/loginController");

// Define uma rota POST para o login. Quando a rota '/login' for acessada,
// a função login será executada para lidar com a lógica de autenticação
router.post('/login', login);

// Exporta o roteador para que ele possa ser utilizado em outros módulos da aplicação
module.exports = router;
