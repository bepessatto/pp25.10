// Importa o pacote Router do express para criar um roteador
const { Router } = require('express');

// Cria uma instância do roteador para gerenciar as rotas relacionadas às equipamentos
const router = Router();

// Importa as funções do controlador de equipamentos para manipular as operações de CRUD
const { storeEquipamentos, getEquipamentos, deleteEmpresa, updateEmpresa } = require('../controller/equipamentosController');

// Define uma rota POST para criar novas equipamentos. Quando a rota '/store/equipamentos' for acessada,
// a função storeEquipamentos será chamada para lidar com o armazenamento de uma nova empresa

/**
 * @swagger
 * /store/equipamentos:
 *  post:
 *    summary: Cadastra uma nova empresa
 *    responses:
 *      200:
 *        description: Sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/store/equipamentos', storeEquipamentos);

// Define uma rota GET para obter a lista de equipamentos. Quando a rota '/get/equipamentos' for acessada,
// a função getEquipamentos será chamada para retornar todas as equipamentos cadastradas

/**
 * @swagger
 * /get/equipamentos:
 *  get:
 *    summary: Retorna todas as equipamentos
 *    responses:
 *      200:
 *        description: Uma lista de equipamentos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.get('/get/equipamentos', getEquipamentos);

// Define uma rota DELETE para remover uma empresa com base no ID fornecido na URL.
// Quando a rota '/delete/empresa/:id' for acessada, a função deleteEmpresa será chamada
// para remover a empresa correspondente ao ID especificado

// Rota para atualizar uma tarefa existente (PUT).
/**
 * @swagger
 * /delete/empresa/:id:
 *  delete:
 *    summary: Remove uma empresa pelo ID
 *    responses:
 *      200:
 *        description: Remoção de equipamentos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.delete('/delete/empresa/:id', deleteEmpresa);

// Define uma rota PUT para atualizar os dados de uma empresa com base no ID fornecido na URL.
// Quando a rota '/update/empresa/:id' for acessada, a função updateEmpresa será chamada
// para atualizar a empresa correspondente ao ID especificado

/**
 * @swagger
 * /update/equipamentos/:id:
 *  put:
 *    summary: Atualiza os dados da empresa com base no ID fornecido na URL
 *    responses:
 *      200:
 *        description: Atualização de dados
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.put('/update/empresa/:id', updateEmpresa);

// Exporta o roteador para que ele possa ser utilizado em outros módulos da aplicação
module.exports = router;
