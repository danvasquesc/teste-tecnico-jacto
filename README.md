# teste-tecnico-jacto
Aplicação web simples (Flask + HTML/JS) para visualização de dados do agronegócio.

## Requisitos funcionais (API /dados, tabela, gráfico)
### Backend
- API no Flask com rota `/dados`
- Rota deve retornar uma lista de objetos no formato JSON
- Essa lista de objetos deve retornar três campos: `estado`, `produto` e `quantidade`

### Frontend
- Consumir a API `/dados`
- Exibir os dados em uma tabela
- Exibir um gráfico de barras com a quantidade por estado
