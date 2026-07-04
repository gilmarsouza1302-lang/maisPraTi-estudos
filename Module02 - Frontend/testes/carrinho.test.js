const { adicionarItem, calcularTotal, limparCarrinho, contarItens} = require("./carrinho.js")

beforeEach(() => {
    limparCarrinho()
})

test("Deve adicionar um item ao carrinho", () => {
    adicionarItem("Camiseta", 49.90)
    expect(contarItens()).toBe(1)
})

test("Deve calcular o total corretamente com vários itens", () => {
    adicionarItem("Camiseta", 49.90)
    adicionarItem("Calça", 89.90)
    expect(calcularTotal()).toBe(139.80)
})

//Quando o carrinho está vazio, total deve ser zero.