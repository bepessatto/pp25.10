const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
    getUser();
});
sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});


// let button = document.getElementById("botao-cadastro");

// button.onclick = async function() {
//    let form = document.getElementById("formulario");
//    let dadosForm = new FormData(form);

//     const response = await fetch('http://localhost:3000/user/create', {
//         method: "POST",
//         body: dadosForm
//     });

//     let content = await response.json();

//     if(content.success) {
//         alert("Sucesso!")
//     } else {
//         alert("Não foi criado!")
//         console.log(content.sql);
//     }
// }


async function getUser() {



    const response = await fetch('http://localhost:3000/api/login', {
        method: "POST",
        headers: { "Content-Type": "application/js" },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
        console.log(result.data);
        alert(result.message);
    } else {
        alert(result.message);
    }
}

//let call = getUser();

async function handleSubmit(event) {
    event.preventDefault();

    let usuario = document.getElementById("usuario").value;
    let email = document.getElementById("emailCadastro").value;
    let senha = document.getElementById("senhaCadastro").value;

    let data = { usuario, email, senha }

    const response = await fetch('http://localhost:3000/api/user/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if (results.success) {
        window.location.href = './login-cadastro.html';
        alert(results.message);
    } else {
        alert(results.message);
    }
}

async function handleLogin(event){
    event.preventDefault();

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let data = { email, senha }

    const response = await fetch('http://localhost:3000/api/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if (results.success) {
        window.location.href = '../front/empresas.html';
        
        alert(results.message);
    } else {
        alert(results.message);
    }
}