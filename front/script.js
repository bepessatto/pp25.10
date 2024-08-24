let button = document.getElementById("handleSubmit")
// Obtém o botão pelo seu ID "handleSubmit" e armazena na variável "button"

button.onclick = async function() {
    // Define uma função assíncrona que será executada quando o botão for clicado

    let title = document.getElementById("title").value;
    // Obtém o valor do campo de texto com o ID "title" e armazena na variável "title"

    let description = document.getElementById("description").value;
    // Obtém o valor do campo de texto com o ID "description" e armazena na variável "description"

    let data = {title, description}
    // Cria um objeto "data" com as propriedades "title" e "description"

    const response = await fetch('http://localhost:3000/api/store/task', {
        // Faz uma requisição HTTP do tipo POST para a URL especificada

        method: "POST",
        // Especifica o método da requisição como POST

        headers: {"Content-type": "application/json;charset=UTF-8"},
        // Define os cabeçalhos da requisição, especificando o tipo de conteúdo como JSON

        body: JSON.stringify(data)
        // Converte o objeto "data" em uma string JSON e envia como corpo da requisição
    });

    let content = await response.json();
    // Espera a resposta do servidor e a converte para um objeto JSON

    if (content.success) {
        // Verifica se a resposta contém a propriedade "success" como verdadeira
        alert("Sucesso!");
        // Exibe um alerta de sucesso
    } else {
        alert("Não");
        // Exibe um alerta indicando falha
    }
}

deleteBtn.addEventListener('click', async () => {
    // Adiciona um evento de clique ao botão "deleteBtn" que executa uma função assíncrona

    console.log(`Tentando deletar empresa com ID: ${empresa.id}`);
    // Exibe no console uma mensagem indicando a tentativa de deletar a empresa com o ID específico

    const deleteResponse = await fetch(`http://localhost:3000/api/delete/empresa/${empresa.id}`, {
        // Faz uma requisição HTTP do tipo DELETE para a URL específica da empresa

        method: 'DELETE'
        // Especifica o método da requisição como DELETE
    });

    const deleteResult = await deleteResponse.json();
    // Espera a resposta do servidor e a converte para um objeto JSON

    if (deleteResult.success) {
        // Verifica se a resposta contém a propriedade "success" como verdadeira

        card.remove();
        // Remove o elemento "card" da interface, simulando a exclusão da empresa

        console.log('Empresa deletada com sucesso');
        // Exibe no console uma mensagem de sucesso
    } else {
        console.error('Erro ao deletar:', deleteResult.message);
        // Exibe no console uma mensagem de erro caso a exclusão falhe
    }
});
