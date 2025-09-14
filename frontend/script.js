const apiUrl = "http://127.0.0.1:5000/dados";

async function buscarDados() {
    try {
        const resposta = await fetch(apiUrl);
        const dados = await resposta.json();
        console.log("Dados recebidos da API:", dados);

        preencherTabela(dados);
        criarGrafico(dados)

        return dados;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
    }
}

// Tabela
function preencherTabela(dados) {
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

// Grafico
function agruparDadosGrafico(dados) {
    const quantidadePorEstado = {};

    dados.forEach(item => {
        const estado = item.estado;
        const quantidade = item.quantidade;

        if (quantidadePorEstado[estado] === undefined) {
            quantidadePorEstado[estado] = quantidade;
        } else {
            quantidadePorEstado[estado] += quantidade;
        }
        
    });

    return quantidadePorEstado;
}

let graficoAtual = null;

function criarGrafico(dados) {

    const quantidadePorEstado = agruparDadosGrafico(dados);

    const estados = Object.keys(quantidadePorEstado);
    const valores = Object.values(quantidadePorEstado);

    const ctx = document.getElementById("grafico-barras").getContext("2d");

    if (graficoAtual) {
        graficoAtual.destroy();
    }

    graficoAtual = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: estados, //
        datasets: [{
            label: 'Quantidade por Estado',
            data: valores,

            backgroundColor: [
                'rgba(38, 255, 0, 1)',
                'rgba(38, 255, 0, 1)',
                'rgba(38, 255, 0, 1)'
            ],
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString();
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const valor = context.parsed.y;
                        return valor.toLocaleString();
                    }
                }
            }
        }
    }
});
}

buscarDados();
