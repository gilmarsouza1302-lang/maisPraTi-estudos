// ============================================================================
// CARRINHO DE COMPRAS — testando código que guarda ESTADO
// ============================================================================
//
// No arquivo `funcoes.js` testamos funções PURAS (sem memória). Aqui subimos um
// degrau: este módulo tem ESTADO — uma variável (`itens`) que é lembrada entre
// uma chamada e outra. Adicionar um item hoje afeta o resultado de amanhã.
//
// Estado é ótimo para programas reais (um carrinho PRECISA lembrar o que você
// colocou), mas é a principal fonte de "testes que interferem uns nos outros":
// se o teste A adiciona 2 itens e o teste B não limpa antes de rodar, o teste B
// começa "sujo". É exatamente por isso que, no arquivo de teste, usaremos um
// `beforeEach(limparCarrinho)` para ZERAR o carrinho antes de CADA teste.
// ============================================================================


// O "estado" do módulo: uma lista de itens. Começa vazia.
// Cada item será um objeto no formato { nome, preco }.
let itens = []

// Adiciona um produto ao carrinho.
// `{ nome, preco }` é a sintaxe abreviada de objeto (shorthand): equivale a
// escrever `{ nome: nome, preco: preco }`.
function adicionarItem(nome, preco) {
    itens.push({ nome, preco })
}

// Soma o preço de todos os itens e devolve o total.
// `reduce` percorre o array acumulando um valor: começa em 0 (o 2º argumento) e,
// a cada item, soma o preço ao total acumulado. Docs:
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
function calcularTotal() {
    return itens.reduce((total, item) => total + item.preco, 0)
}

// Esvazia o carrinho, voltando ao estado inicial (lista vazia).
// É a função-chave para deixar os testes ISOLADOS uns dos outros.
function limparCarrinho() {
    itens = []
}

// Devolve quantos itens existem no carrinho (o tamanho do array).
function contarItens() {
    return itens.length
}


// ============================================================================
// EXPORTAÇÃO CONDICIONAL — o mesmo arquivo servindo p/ o NAVEGADOR e p/ o JEST
// ============================================================================
// Este arquivo é usado em DOIS ambientes diferentes:
//
//   1) No NAVEGADOR (via <script src="./carrinho.js"> no index.html): lá NÃO
//      existe a variável `module`, então as funções ficam disponíveis
//      globalmente para os botões da página chamarem (onclick).
//
//   2) No JEST/Node (via require): lá `module.exports` EXISTE e é assim que o
//      teste importa as funções.
//
// O `if` abaixo verifica se estamos num ambiente que TEM `module` (o Node).
// Se estiver, exporta. Se não (navegador), simplesmente pula. Isso evita o erro
// "module is not defined" que aconteceria ao abrir o HTML no navegador.
// ============================================================================
if (typeof module !== "undefined" && module.exports) {
    module.exports = { adicionarItem, calcularTotal, limparCarrinho, contarItens }
}
