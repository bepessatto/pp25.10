const { Router } = require('express');
const router = Router();

const { storeTask } = require('../controller/TaskController');

router.post('/store/task', storeTask);

module.exports = router;