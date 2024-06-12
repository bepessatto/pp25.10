// Módulo de configuração e aplicação da webapi

// Importar pacote express (servidor)
const express = require('express');
// Importar pacote dotenv, gerenciador de variáveis de ambiente
const dotenv = require('dotenv').config();
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');

const taskRouter = require('./routes/taskRouter');
const empresasRouter = require('./routes/empresasRouter')
const cors = require('cors');

// Instanciar o express na variável app
const app = express();

// Setar a porta do servidor, a partir do arquivo .env ou assumir 3000
app.set('port', process.env.PORT || 3000)

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use('/api', taskRouter);
app.use('/api', empresasRouter);

module.exports = app;