// ============================================================================
// MÓDULO DE FUNÇÕES PURAS — o "código de produção" que vamos testar
// ============================================================================
//
// Este arquivo NÃO tem nenhum teste dentro dele. Ele guarda apenas a LÓGICA
// (as funções que fazem o trabalho de verdade). Os testes ficam em um arquivo
// separado: `funcoes.test.js`.
//
// Por que separar? Porque assim a mesma função pode ser usada pelo site E pelo
// Jest, sem misturar as coisas. Essa separação "código X teste" é uma das
// primeiras boas práticas de quem começa a escrever testes automatizados.
//
// As duas funções abaixo são FUNÇÕES PURAS — o conceito ideal para começar a
// testar. Uma função pura:
//   • Sempre devolve o MESMO resultado para as MESMAS entradas.
//   • NÃO depende de nada de fora (data/hora, internet, variáveis globais).
//   • NÃO altera nada de fora (não mexe na tela, não grava em banco).
// Isso as torna 100% previsíveis — e o que é previsível é fácil de testar.
// ============================================================================


// Recebe dois números e devolve a soma. Entrada previsível → saída previsível.
function soma(a, b) {
    return a + b
}

// Devolve `true` se o número for par, `false` se for ímpar.
// O operador `%` (módulo/resto) devolve o resto da divisão. Se o resto da
// divisão por 2 é 0, o número é par.
function ehPar(numero) {
    return numero % 2 === 0
}


// ============================================================================
// EXPORTANDO PARA O JEST (CommonJS — `module.exports`)
// ============================================================================
// O Jest roda em cima do Node.js, e o Node (por padrão, sem configuração extra)
// usa o sistema de módulos CommonJS. Para que o arquivo de teste consiga
// ENXERGAR estas funções, precisamos "exportá-las" aqui...
//   module.exports = { soma, ehPar }
// ...e "importá-las" lá no teste com:
//   const { soma, ehPar } = require("./funcoes")
//
// Sem esse par exporta/importa, o teste não teria acesso às funções.
// Docs Node (módulos): https://nodejs.org/api/modules.html
// ============================================================================
module.exports = { soma, ehPar }
