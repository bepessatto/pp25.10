// Seleciona o botão de "login" na interface principal
const sign_in_btn = document.querySelector("#sign-in-btn");

// Seleciona o botão de "cadastro" na interface principal
const sign_up_btn = document.querySelector("#sign-up-btn");

// Seleciona o container principal que envolve todo o formulário
const container = document.querySelector(".container");

// Seleciona o botão de "login" na segunda interface (mobile ou responsivo)
const sign_in_btn2 = document.querySelector("#sign-in-btn2");

// Seleciona o botão de "cadastro" na segunda interface (mobile ou responsivo)
const sign_up_btn2 = document.querySelector("#sign-up-btn2");

// Adiciona um ouvinte de evento para o clique no botão de "cadastro" na interface principal
sign_up_btn.addEventListener("click", () => {
    // Adiciona a classe "sign-up-mode" ao container, ativando a animação de transição para o modo de cadastro
    container.classList.add("sign-up-mode");
});

// Adiciona um ouvinte de evento para o clique no botão de "login" na interface principal
sign_in_btn.addEventListener("click", () => {
    // Remove a classe "sign-up-mode" do container, voltando para o modo de login
    container.classList.remove("sign-up-mode");
    // Chama a função para buscar os dados do usuário (pode ser utilizada para preencher informações)
    getUser();
});

// Adiciona um ouvinte de evento para o clique no botão de "cadastro" na segunda interface
sign_up_btn2.addEventListener("click", () => {
    // Adiciona a classe "sign-up-mode2" ao container, ativando o modo de cadastro na segunda interface
    container.classList.add("sign-up-mode2");
});

// Adiciona um ouvinte de evento para o clique no botão de "login" na segunda interface
sign_in_btn2.addEventListener("click", () => {
    // Remove a classe "sign-up-mode2" do container, voltando para o modo de login na segunda interface
    container.classList.remove("sign-up-mode2");
});

// Função assíncrona para buscar dados do usuário (a ser usada para login ou obtenção de informações)
async function getUser() {
    // Faz uma requisição POST para a API de login
    const response = await fetch('http://localhost:3000/api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Define o tipo de conteúdo como JSON
        body: JSON.stringify(data) // Envia os dados no corpo da requisição
    });

    // Converte a resposta em formato JSON
    const result = await response.json();

    // Verifica se o login foi bem-sucedido
    if (result.success) {
        console.log(result.data); // Exibe os dados do usuário no console
        alert(result.message); // Exibe uma mensagem de sucesso
    } else {
        alert(result.message); // Exibe uma mensagem de erro
    }
}

// Função assíncrona para lidar com o envio de cadastro
async function handleSubmit(event) {
    event.preventDefault();

    let usuario = document.getElementById("usuario").value;
    let email = document.getElementById("emailCadastro").value;
    let senha = document.getElementById("senhaCadastro").value;
    let tipoUsuario = document.getElementById("tipoUsuario").value;  // Captura o tipo de usuário

    let data = { usuario, email, senha, tipoUsuario };  // Inclui o tipo de usuário nos dados

    const response = await fetch('http://localhost:3000/api/user/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    const results = await response.json();

    if (results.success) {
        alert(results.message);
        window.location.href = './login-cadastro.html';
    } else {
        alert(results.message);
    }
}
 

// Função assíncrona para lidar com o login
async function handleLogin(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário (recarregar a página)

    // Obtém os valores inseridos pelo usuário nos campos de login
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    // Cria um objeto com os dados de login
    let data = { email, senha };

    // Faz uma requisição POST para a API de login
    const response = await fetch('http://localhost:3000/api/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify(data) // Envia os dados no corpo da requisição
    });

    // Converte a resposta em formato JSON
    const results = await response.json();

    // Verifica se o login foi bem-sucedido
    if (results.success) {
        // Redireciona o usuário para a página de empresas
        window.location.href = '../front/empresas.html';
        alert(results.message); // Exibe uma mensagem de sucesso
    } else {
        alert(results.message); // Exibe uma mensagem de erro
    }
}
