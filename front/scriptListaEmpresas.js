document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/api/get/empresas');
    const result = await response.json();

    if (result.success) {
        const empresasList = document.querySelector('.empresas-list');
        result.data.forEach(empresa => {
            const card = document.createElement('div');
            card.className = 'empresa-card';

            const img = document.createElement('img');
            img.src = `http://localhost:3000/uploads/${empresa.imagem}`;

            const infoDiv = document.createElement('div');
            infoDiv.className = 'info';

            const nome = document.createElement('h2');
            nome.textContent = empresa.nome;

            const endereco = document.createElement('p');
            endereco.textContent = empresa.endereco;

            const telefone = document.createElement('p');
            telefone.textContent = empresa.telefone;

            // Botão de deletar
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Deletar';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', async () => {
                const deleteResponse = await fetch(`http://localhost:3000/api/delete/empresa/${empresa.id}`, {
                    method: 'DELETE'
                });
                const deleteResult = await deleteResponse.json();
                if (deleteResult.success) {
                    card.remove();
                } else {
                    console.error('Erro ao deletar:', deleteResult.message);
                }
            });

            // Botão de editar
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.className = 'edit-btn';
            editBtn.addEventListener('click', () => {
                const novoNome = prompt("Digite o novo nome:", empresa.nome);
                const novoEndereco = prompt("Digite o novo endereço:", empresa.endereco);
                const novoTelefone = prompt("Digite o novo telefone:", empresa.telefone);

                if (novoNome && novoEndereco && novoTelefone) {
                    fetch(`http://localhost:3000/api/update/empresa/${empresa.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            nome: novoNome,
                            endereco: novoEndereco,
                            telefone: novoTelefone
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            nome.textContent = novoNome;
                            endereco.textContent = novoEndereco;
                            telefone.textContent = novoTelefone;
                        } else {
                            console.error('Erro ao atualizar:', data.message);
                        }
                    });
                }
            });

            const btnContainer = document.createElement('div');
            btnContainer.className = 'btn-container';
            btnContainer.appendChild(editBtn);
            btnContainer.appendChild(deleteBtn);

            infoDiv.appendChild(nome);
            infoDiv.appendChild(endereco);
            infoDiv.appendChild(telefone);

            card.appendChild(img);
            card.appendChild(infoDiv);
            card.appendChild(btnContainer);

            empresasList.appendChild(card);
        });
    } else {
        console.log("Erro", result.sql);
    }
});
