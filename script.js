// Depoimentos dinâmicos
document.getElementById("form-depoimento").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const nome = document.getElementById("nome").value;
    const texto = document.getElementById("texto").value;
    
    if (nome && texto) {
        const depoimento = document.createElement("div");
        depoimento.innerHTML = `<strong>${nome}</strong><p>${texto}</p>`;
        document.getElementById("lista-depoimentos").appendChild(depoimento);
        e.target.reset();
    }
});