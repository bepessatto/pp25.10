const { Router } = require('express');
const router = Router();
const { storeEmpresas, getEmpresas, deleteEmpresa, updateEmpresa } = require('../controller/empresasController');

router.post('/store/empresas', storeEmpresas);
router.get('/get/empresas', getEmpresas);
router.delete('/delete/empresa/:id', deleteEmpresa); // Rota para deletar empresa
router.put('/update/empresa/:id', updateEmpresa); // Rota para atualizar empresa

module.exports = router;
