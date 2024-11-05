// Importa o pacote Router do express para criar um roteador
const { Router } = require('express');

// Cria uma instância do roteador para gerenciar as rotas relacionadas às empresas
const router = Router();

// Importa as funções do controlador de empresas para manipular as operações de CRUD
const { storeEmpresas, getEmpresas, deleteEmpresa, updateEmpresa } = require('../controller/empresasController');

// Define uma rota POST para criar novas empresas. Quando a rota '/store/empresas' for acessada,
// a função storeEmpresas será chamada para lidar com o armazenamento de uma nova empresa

/**
 * @swagger
 * /store/empresas:
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

router.post('/store/empresas', storeEmpresas);

// Define uma rota GET para obter a lista de empresas. Quando a rota '/get/empresas' for acessada,
// a função getEmpresas será chamada para retornar todas as empresas cadastradas

/**
 * @swagger
 * /get/empresas:
 *  get:
 *    summary: Retorna todas as empresas
 *    responses:
 *      200:
 *        description: Uma lista de empresas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.get('/get/empresas', getEmpresas);

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
 *        description:Remoção de empresas
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
 * /update/empresas/:id:
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
