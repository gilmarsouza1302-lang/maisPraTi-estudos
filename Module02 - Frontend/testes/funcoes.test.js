// ============================================================================
// INTRODUÇÃO AOS TESTES AUTOMATIZADOS COM JEST — o "olá, mundo" dos testes
// ============================================================================
//
// O QUE É UM TESTE AUTOMATIZADO?
// É um código que verifica se OUTRO código funciona como esperado. Em vez de
// abrir o navegador e conferir "na mão" toda vez que mudamos algo, escrevemos
// uma vez a regra ("2 + 3 tem que dar 5") e o computador confere sozinho,
// quantas vezes for preciso, em segundos. Se um dia alguém quebrar a função
// `soma`, o teste ACUSA na hora (fica "vermelho").
//
// O QUE É O JEST?
// Jest é um FRAMEWORK de testes para JavaScript (criado pela Meta/Facebook).
// Ele traz "na caixa" tudo que precisamos:
//   • um jeito de DESCREVER cada teste  → test() / it()
//   • um jeito de VERIFICAR resultados  → expect(...).toBe(...)
//   • um "test runner" que acha os arquivos `*.test.js` e roda todos.
// Docs oficiais: https://jestjs.io/pt-BR/docs/getting-started
//
// COMO O JEST ACHA ESTE ARQUIVO?
// Por convenção, ele procura arquivos terminados em `.test.js` (ou `.spec.js`),
// ou dentro de uma pasta `__tests__`. Por isso o nome `funcoes.test.js`.
//
// COMO RODAR? (a partir da pasta `testes/`, no terminal)
//   npm install     → baixa o Jest (só na 1ª vez; cria a pasta node_modules)
//   npm test        → roda TODOS os testes uma vez
//   npx jest --watch → fica observando os arquivos e re-roda ao salvar
// ============================================================================


// ----------------------------------------------------------------------------
// PASSO 1 — IMPORTAR o que vamos testar
// ----------------------------------------------------------------------------
// `require` é a forma do CommonJS (o padrão do Node) de trazer código de outro
// arquivo. Aqui pegamos as funções que `funcoes.js` exportou. O `./` significa
// "no mesmo diretório que este arquivo".
const { soma, ehPar } = require("./funcoes")


// ----------------------------------------------------------------------------
// PASSO 2 — ESCREVER cada teste
// ----------------------------------------------------------------------------
// A estrutura de todo teste no Jest segue o padrão "AAA":
//   1. ARRANGE (preparar)  → montar os dados de entrada.
//   2. ACT     (agir)      → executar a função que queremos testar.
//   3. ASSERT  (afirmar)   → comparar o resultado com o esperado (expect).
//
// A função `test(descrição, callback)` registra UM teste:
//   • 1º argumento: um TEXTO explicando o que o teste verifica (aparece no
//     relatório). Escreva-o pensando em quem for LER o resultado depois.
//   • 2º argumento: a FUNÇÃO com a lógica do teste.
// (Existe o apelido `it(...)`, idêntico a `test(...)` — questão de estilo.)
// Docs: https://jestjs.io/pt-BR/docs/api#testname-fn-timeout
// ----------------------------------------------------------------------------

test("Soma - deve somar dois números corretamente", () => {
    // ACT:    chamamos a função com as entradas 2 e 3.
    // ASSERT: `expect(valorObtido).toBe(valorEsperado)` afirma a igualdade.
    //         Se soma(2, 3) NÃO for 5, o Jest marca o teste como FALHO e mostra
    //         exatamente o que veio vs. o que era esperado.
    expect(soma(2, 3)).toBe(5)
})

test("Eh par - Deve indicar se um número é par", () => {
    // Para valores booleanos, `toBe(true)` / `toBe(false)` deixa a intenção clara.
    expect(ehPar(4)).toBe(true)
})


// ============================================================================
// ANATOMIA DO expect() E OS "MATCHERS"
// ============================================================================
// `expect(x)` NÃO faz a verificação sozinho — ele devolve um objeto com vários
// métodos chamados MATCHERS, e é o MATCHER que define a regra de comparação:
//
//   .toBe(valor)          → igualdade ESTRITA (===). Ideal para números,
//                           strings e booleanos (valores "primitivos").
//   .toEqual(valor)       → compara o CONTEÚDO de objetos/arrays campo a campo.
//                           Use este para { }, [ ] — .toBe compararia se são o
//                           MESMO objeto na memória, o que quase nunca é o caso.
//   .toBeCloseTo(valor)   → para números com casas decimais (0.1 + 0.2 ≈ 0.3),
//                           evitando o clássico erro de arredondamento do float.
//   .not.toBe(valor)      → nega qualquer matcher (o `.not` inverte o resultado).
//   .toBeTruthy() /       → checa se o valor é "verdadeiro"/"falso" no sentido
//     .toBeFalsy()          booleano, sem precisar do valor exato.
//   .toThrow()            → verifica se uma função LANÇA um erro.
//
// Lista completa de matchers: https://jestjs.io/pt-BR/docs/expect
//
// DICA DE OURO — por que .toBe e não .toEqual em número?
//   toBe usa === (comparação por referência/valor primitivo). Para 5 === 5 dá
//   certo. Já para objetos, { a: 1 } === { a: 1 } é FALSO (são dois objetos
//   diferentes na memória, mesmo com conteúdo igual) → nesses casos use toEqual.
// ============================================================================
