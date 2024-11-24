// Módulo de configuração e aplicação da web API

// Importa o pacote express para configurar o servidor
const express = require('express');

// Importa o pacote CORS para permitir o acesso a partir de outras origens (cross-origin)
const cors = require('cors');

// Importa o pacote dotenv para gerenciar variáveis de ambiente a partir de um arquivo .env
const dotenv = require('dotenv').config();

// Importa o pacote path para manipulação de caminhos de arquivos e diretórios
const path = require('path');

// Importa o pacote fs (file system) para manipulação de arquivos (embora não seja usado aqui)
const fs = require('fs');

// Importa o pacote express-fileupload para gerenciar uploads de arquivos
const fileUpload = require('express-fileupload');


// Importa o roteador de empresas, responsável pelas rotas relacionadas às empresas
const equipamentosRouter = require('./routes/equipamentosRouter');

// Instancia o express na variável app, iniciando o servidor
const app = express();

// Define a porta do servidor. Primeiro tenta usar a variável PORT definida no arquivo .env, senão assume a porta 3000
app.set('port', process.env.PORT || 3003);

// Middleware para permitir o parsing de requisições com payload em JSON
app.use(express.json());

// Middleware para habilitar o CORS, permitindo que o servidor seja acessado de diferentes domínios
app.use(cors());

// Middleware para habilitar o upload de arquivos através das requisições
app.use(fileUpload());

// Configura o caminho para servir arquivos estáticos (como imagens ou arquivos de upload) na rota /uploads
app.use('/uploads', express.static(path.join(__dirname, "uploads")));


// Define a rota base para as rotas relacionadas às empresas
app.use('/api', equipamentosRouter);

// Exporta o app para que ele possa ser utilizado por outros módulos (como o arquivo principal que inicia o servidor)
module.exports = app;
