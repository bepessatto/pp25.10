// Importa a função Router do pacote express para criar um novo roteador
const { Router } = require('express');

// Cria uma instância do roteador para gerenciar as rotas relacionadas aos usuários
const router = Router();

// Importa a função storeUser do controlador de usuários, que vai ser chamada quando a rota for acessada
const { storeUser } = require('../controller/usersController');

// Define uma rota POST para criar um novo usuário. Quando a rota '/user/create' for acessada,
// a função storeUser será executada para lidar com a lógica de criação do usuário
router.post('/user/create', storeUser);

// Exporta o roteador para que ele possa ser utilizado em outros módulos da aplicação
module.exports = router;
