const { soma, ehPar} = require("./funcoes")

test("Soma - deve somar dois números corretamente", () => {
    expect(soma(2, 3)).toBe(5)
})

test("Eh par - Deve indicar se um número é par", () => {
    expect(ehPar(4)).toBe(true)
})