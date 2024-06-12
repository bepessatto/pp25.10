document.addEventListener('DOMContentLoaded', async ()  => {
	const response = await fetch('http://localhost:3000/api/get/empresas');
	const result = await response.json();
 
	// console.log(result);
 
	if(result.success) {
		const empresasList = document.querySelector('.empresas-list');
		result.data.forEach(empresa => {
			const card = document.createElement('div');
			card.className = 'empresa-card';
 
			const img = document.createElement('img');
			img.src = empresa.imagem;
 
			const infoDiv = document.createElement('div');
			infoDiv.className = 'info';
 
			const nome = document.createElement('h2');
			nome.textContent = empresa.nome;
 
			const endereco = document.createElement('p');
			endereco.textContent = empresa.endereco;
 
			const telefone = document.createElement('p');
			telefone.textContent = empresa.telefone;
 
			infoDiv.appendChild(nome);
			infoDiv.appendChild(endereco);
			infoDiv.appendChild(telefone);
 
			card.appendChild(img);
			card.appendChild(infoDiv);
 
			empresasList.appendChild(card)
		})
	} else {
	    console.log("Erro", result.sql);
	}
});