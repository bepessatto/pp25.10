let button = document.getElementById("handleSubmit")

button.onclick = async function() {
    let title       = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let data        = {title, description}

    const response = await fetch('http://localhost:3000/api/store/task', {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    });

    let content = await response.json();

    if(content.success) {
        alert("Sucesso!")
    } else {
        alert("Não")
    }
}

deleteBtn.addEventListener('click', async () => {
    console.log(`Tentando deletar empresa com ID: ${empresa.id}`);
    const deleteResponse = await fetch(`http://localhost:3000/api/delete/empresa/${empresa.id}`, {
        method: 'DELETE'
    });
    const deleteResult = await deleteResponse.json();
    if (deleteResult.success) {
        card.remove();
        console.log('Empresa deletada com sucesso');
    } else {
        console.error('Erro ao deletar:', deleteResult.message);
    }
});
