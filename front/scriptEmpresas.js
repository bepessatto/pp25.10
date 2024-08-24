let button = document.getElementById("enviar");
// Obtém o botão com o ID "enviar" e armazena na variável "button"

button.onclick = async function() {
    // Define uma função assíncrona que será executada quando o botão for clicado

    let form = document.getElementById("formulario");
    // Obtém o formulário pelo seu ID "formulario" e armazena na variável "form"

    let dadosForm = new FormData(form);
    // Cria um objeto FormData contendo todos os dados do formulário para envio

    const response = await fetch('http://localhost:3000/api/store/empresas', {
        // Faz uma requisição HTTP do tipo POST para a URL especificada

        method: "POST",
        // Especifica o método da requisição como POST

        body: dadosForm
        // Envia os dados do formulário no corpo da requisição, no formato FormData
    });

    let content = await response.json();
    // Converte a resposta do servidor para um objeto JSON

    if(content.success) {
        // Verifica se a resposta contém a propriedade "success" como verdadeira
        alert("Sucesso!");
        // Exibe um alerta de sucesso
    } else {
        alert("Não foi criado!");
        // Exibe um alerta indicando que a criação falhou

        console.log(content.sql);
        // Exibe no console a mensagem SQL retornada, útil para depuração
    }
}
