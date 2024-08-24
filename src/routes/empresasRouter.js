// Importa o pacote Router do express para criar um roteador
const { Router } = require('express');

// Cria uma instância do roteador para gerenciar as rotas relacionadas às empresas
const router = Router();

// Importa as funções do controlador de empresas para manipular as operações de CRUD
const { storeEmpresas, getEmpresas, deleteEmpresa, updateEmpresa } = require('../controller/empresasController');

// Define uma rota POST para criar novas empresas. Quando a rota '/store/empresas' for acessada,
// a função storeEmpresas será chamada para lidar com o armazenamento de uma nova empresa
router.post('/store/empresas', storeEmpresas);

// Define uma rota GET para obter a lista de empresas. Quando a rota '/get/empresas' for acessada,
// a função getEmpresas será chamada para retornar todas as empresas cadastradas
router.get('/get/empresas', getEmpresas);

// Define uma rota DELETE para remover uma empresa com base no ID fornecido na URL.
// Quando a rota '/delete/empresa/:id' for acessada, a função deleteEmpresa será chamada
// para remover a empresa correspondente ao ID especificado
router.delete('/delete/empresa/:id', deleteEmpresa);

// Define uma rota PUT para atualizar os dados de uma empresa com base no ID fornecido na URL.
// Quando a rota '/update/empresa/:id' for acessada, a função updateEmpresa será chamada
// para atualizar a empresa correspondente ao ID especificado
router.put('/update/empresa/:id', updateEmpresa);

// Exporta o roteador para que ele possa ser utilizado em outros módulos da aplicação
module.exports = router;
