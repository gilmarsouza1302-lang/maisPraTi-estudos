let itens = []

function adicionarItem(nome, preco) {
    itens.push({ nome, preco })
}

function calcularTotal() {
    return itens.reduce((total, item) => total + item.preco, 0)
}

function limparCarrinho() {
    itens = []
}

function contarItens() {
    return itens.length
}

if(typeof module !== "undefined" && module.exports){
    module.exports = { adicionarItem, calcularTotal, limparCarrinho, contarItens}
}
