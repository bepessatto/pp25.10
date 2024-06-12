const {Router} = require('express');

const router = Router();

const {storeEmpresas, getEmpresas} = require('../controller/empresasController');

router.post('/store/empresas', storeEmpresas);
router.get('/get/empresas', getEmpresas);

module.exports = router;