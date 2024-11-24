// Função para verificar se todos os checkboxes estão marcados
function verificarKit() {
    // Seleciona todos os checkboxes da página
    const checkboxes = document.querySelectorAll('.checkbox');
    let todosMarcados = true;

    // Verifica se todos os checkboxes estão marcados
    checkboxes.forEach(function(checkbox) {
        if (!checkbox.checked) {
            todosMarcados = false;
        }
    });

    // Exibe a mensagem se todos os checkboxes estiverem marcados
    if (todosMarcados) {
        alert('Kit concluído!');
    } else {
        alert('Por favor, preencha todos os itens antes de concluir.');
    }
}

// Adiciona um ouvinte de evento no botão "Concluir"
document.addEventListener('DOMContentLoaded', function() {
    const concluirBtn = document.getElementById('concluir-btn');
    if (concluirBtn) {
        concluirBtn.addEventListener('click', verificarKit);
    }
});
