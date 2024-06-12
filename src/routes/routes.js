const TaskController = require('../controller/TaskController')
const express = require('express')
const router = express.Router()

router.post('/task', TaskController.createTask)

module.exports = router