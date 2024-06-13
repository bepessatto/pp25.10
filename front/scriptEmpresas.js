let button = document.getElementById("enviar");

button.onclick = async function() {
   let form = document.getElementById("formulario");
   let dadosForm = new FormData(form);

    const response = await fetch('http://localhost:3000/api/store/empresas', {
        method: "POST",
        body: dadosForm
    });

    let content = await response.json();

    if(content.success) {
        alert("Sucesso!")
    } else {
        alert("Não foi criado!")
        console.log(content.sql);
    }
}