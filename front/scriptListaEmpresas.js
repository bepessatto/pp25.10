document.addEventListener('DOMContentLoaded', async () => {
    // Aguarda o carregamento completo do conteúdo da página e então executa a função assíncrona

    const response = await fetch('http://localhost:3003/api/get/empresas');
    // Faz uma requisição HTTP GET para buscar a lista de empresas no servidor

    const result = await response.json();
    // Converte a resposta do servidor para um objeto JSON

    if (result.success) {
        // Verifica se a resposta contém a propriedade "success" como verdadeira

        const empresasList = document.querySelector('.empresas-list');
        // Seleciona o elemento da lista de empresas na interface
        let userId = sessionStorage.getItem("userId");
        let tipoUsuario = sessionStorage.getItem("tipoUsuario");
        


        function criaCardEmpresa(empresa){

                // Percorre cada empresa retornada no resultado

                const card = document.createElement('div');
                card.className = 'empresa-card';
                // Cria um novo elemento "div" para o card da empresa e define sua classe

                const img = document.createElement('img');
                img.src = `http://localhost:3003/uploads/${empresa.imagem}`;
                // Cria um elemento de imagem e define a fonte para a imagem da empresa

                const infoDiv = document.createElement('div');
                infoDiv.className = 'info';
                // Cria um "div" para as informações da empresa e define sua classe

                const nome = document.createElement('h2');
                nome.textContent = empresa.nome;
                // Cria um elemento de título "h2" e define o nome da empresa como texto

                const endereco = document.createElement('p');
                endereco.textContent = empresa.endereco;
                // Cria um parágrafo "p" e define o endereço da empresa como texto

                const telefone = document.createElement('p');
                telefone.textContent = empresa.telefone;
                // Cria um parágrafo "p" e define o telefone da empresa como texto

                // Botão de deletar
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Deletar';
                deleteBtn.className = 'delete-btn';

                // Cria o botão de deletar e define seu texto e classe

                deleteBtn.addEventListener('click', async () => {
                    // Adiciona um evento de clique no botão de deletar

                    const deleteResponse = await fetch(`http://localhost:3003/api/delete/empresa/${empresa.id}`, {
                        method: 'DELETE'
                        // Faz uma requisição HTTP DELETE para remover a empresa pelo seu ID
                    });

                    const deleteResult = await deleteResponse.json();
                    // Converte a resposta do servidor para um objeto JSON

                    if (deleteResult.success) {
                        card.remove();
                        // Se a exclusão for bem-sucedida, remove o card da empresa da interface
                    } else {
                        console.error('Erro ao deletar:', deleteResult.message);
                        // Exibe um erro no console caso a exclusão falhe
                    }
                });

                // Botão de editar
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Editar';
                editBtn.className = 'edit-btn';
                // Cria o botão de editar e define seu texto e classe

                editBtn.addEventListener('click', () => {
                    // Adiciona um evento de clique no botão de editar

                    const novoNome = prompt("Digite o novo nome:", empresa.nome);
                    // Solicita ao usuário o novo nome da empresa

                    const novoEndereco = prompt("Digite o novo endereço:", empresa.endereco);
                    // Solicita ao usuário o novo endereço da empresa

                    const novoTelefone = prompt("Digite o novo telefone:", empresa.telefone);
                    // Solicita ao usuário o novo telefone da empresa

                    if (novoNome && novoEndereco && novoTelefone) {
                        // Verifica se todos os novos valores foram preenchidos

                        fetch(`http://localhost:3003/api/update/empresa/${empresa.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                nome: novoNome,
                                endereco: novoEndereco,
                                telefone: novoTelefone
                            })
                            // Faz uma requisição HTTP PUT para atualizar as informações da empresa
                        })
                        .then(response => response.json())
                        .then(data => {
                            // Converte a resposta do servidor para um objeto JSON

                            if (data.success) {
                                nome.textContent = novoNome;
                                endereco.textContent = novoEndereco;
                                telefone.textContent = novoTelefone;
                                // Atualiza os elementos da interface com os novos valores
                            } else {
                                console.error('Erro ao atualizar:', data.message);
                                // Exibe um erro no console caso a atualização falhe
                            }
                        });
                    }
                });

                const btnContainer = document.createElement('div');
                btnContainer.className = 'btn-container';
                // Cria um "div" para conter os botões e define sua classe

                btnContainer.appendChild(editBtn);
                btnContainer.appendChild(deleteBtn);
                // Adiciona os botões de editar e deletar ao container de botões

                infoDiv.appendChild(nome);
                infoDiv.appendChild(endereco);
                infoDiv.appendChild(telefone);
                // Adiciona as informações da empresa ao "div" de informações

                card.appendChild(img);
                card.appendChild(infoDiv);
                card.appendChild(btnContainer);
                // Adiciona a imagem, as informações e os botões ao card da empresa

                empresasList.appendChild(card);
                // Adiciona o card da empresa à lista de empresas na interface

        }


            result.data.forEach(empresa => {

                if(userId == empresa.user_id){
                    criaCardEmpresa(empresa);
            
            
                }else if(tipoUsuario == "Refugiado"){
                    criaCardEmpresa(empresa);

                    let botaoEditar = document.getElementsByClassName("edit-btn");
                    let botaoDeletar = document.getElementsByClassName("delete-btn");
                    
                    for (let i = 0; i < botaoEditar.length; i++) {
                        botaoEditar[i].style.display = "none";
                        botaoDeletar[i].style.display = "none";
                      }
                }
            });
    
    } else {
        console.log("Erro", result.sql);
        // Exibe um erro no console caso a requisição para buscar empresas falhe
    }
});

