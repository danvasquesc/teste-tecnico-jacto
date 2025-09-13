const apiUrl = "http://127.0.0.1:5000/dados";

async function buscarDados() {
    try {
        const resposta = await fetch(apiUrl);
        const dados = await resposta.json();
        console.log("Dados recebidos da API:", dados); //Teste
        preecherTabela(dados);
        return dados;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
    }
}

function preecherTabela(dados) {
    const tbody = document.querySelector("#tabela-dados tbody");
    tbody.innerHTML = "";

    dados.forEach(item => {
        const tr = document.createElement("tr")

        const tdEstado = document.createElement("td");
        tdEstado.textContent = item.estado;
        tr.appendChild(tdEstado);

        const tdProduto = document.createElement("td");
        tdProduto.textContent = item.produto;
        tr.appendChild(tdProduto);

        const tdQuantidade = document.createElement("td");
        tdQuantidade.textContent = item.quantidade;
        tr.appendChild(tdQuantidade);

        tbody.appendChild(tr);
    });
}

buscarDados();
