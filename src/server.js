// Módulo de inicialização do servidor web onde nossa webapi estará hospedada

// Importar o arquivo app
const app = require('./app');
// Importar a porta do servidor
const port = app.get('port');

const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API de Tarefas",
            version: "1.0.0",
            description: "API CRUD para gerenciar tarefas",
        },
        servers: [{ url: "http://localhost:3003" }],
    },
    apis: [`${__dirname}/routes/*.js`], 
};

const taskRouter = require('./routes/tasksRouter');
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Testar API
app.listen(port, () => console.log(`Rodando na porta ${port}!`));


