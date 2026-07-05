// ============================================================================
// "JEST CASEIRO" — construindo um mini-framework de testes do zero
// ============================================================================
//
// Antes de confiar no Jest como uma "caixa-preta mágica", vale entender que ele
// NÃO tem nada de mágico. No fundo, `test()` e `expect().toBe()` são apenas
// funções JavaScript comuns. Este arquivo RECONSTRÓI uma versão minúscula delas,
// só para desmistificar o que acontece por baixo dos panos.
//
// Depois de ler isto, o Jest de verdade (nos arquivos *.test.js) vai parecer
// muito mais familiar — porque a ideia é exatamente a mesma, só que turbinada.
//
// Compare mentalmente:
//    • AQUI (caseiro):  nós escrevemos expect/test na mão, contamos na unha.
//    • Jest (de verdade): traz expect/test prontos + dezenas de matchers,
//      relatório colorido, isolamento, hooks (beforeEach), rodar em paralelo…
// ============================================================================


// "Estado" do nosso mini-framework: dois contadores para o placar final.
let totalTestes = 0   // quantas verificações (expect) rodaram no total.
let testesOk = 0      // quantas dessas passaram.


// ----------------------------------------------------------------------------
// expect(valorRecebido) — a função de VERIFICAÇÃO
// ----------------------------------------------------------------------------
// Segredo revelado: `expect` apenas DEVOLVE UM OBJETO com métodos (os matchers).
// É por isso que no Jest escrevemos `expect(x).toBe(y)` — o `.toBe` é um método
// do objeto que o `expect` retornou. Aqui implementamos só um matcher: `toBe`.
function expect(valorRecebido) {
    return {
        // toBe = compara com === (igualdade estrita), igual ao Jest de verdade.
        toBe(valorEsperado) {
            totalTestes++
            if (valorRecebido === valorEsperado) {
                testesOk++
                console.log('Passou')
            } else {
                // O Jest real mostraria aqui "esperado X, recebido Y".
                console.log('Reprovou')
            }
        }

        // 👉 EXERCÍCIO: tente adicionar outros matchers, como no Jest:
        //    toBeTruthy() { totalTestes++; if (valorRecebido) { ... } }
        //    not: { toBe(v) { ...inverte a condição... } }
    }
}


// ----------------------------------------------------------------------------
// test(nome, funcaoDeTeste) — o REGISTRO/EXECUÇÃO de um teste
// ----------------------------------------------------------------------------
// Aqui a versão caseira é bem simples: só executa a função recebida. O nome nem
// é usado (a linha abaixo mostra como aproveitá-lo). O Jest de verdade faz muito
// mais: captura erros com try/catch, agrupa, isola e monta um relatório bonito.
function test(nome, funcaoDeTeste) {
    console.log(`\n▶ ${nome}`)   // mostra o nome do teste (melhoria didática).
    funcaoDeTeste()
}


// ----------------------------------------------------------------------------
// resumoFinal() — imprime o placar (algo que o Jest faz automaticamente)
// ----------------------------------------------------------------------------
function resumoFinal() {
    console.log(`\n${testesOk}/${totalTestes} testes passaram.`)
}


// Exporta para quem quiser importar este mini-framework em outro arquivo.
module.exports = { expect, test, resumoFinal }


// ============================================================================
// DEMONSTRAÇÃO — só roda quando executamos ESTE arquivo diretamente
// ============================================================================
// `require.main === module` é verdadeiro apenas quando chamamos
// `node mini-teste.js` no terminal. Se outro arquivo fizer require deste, o
// bloco NÃO roda (evita "poluir" quem só quer importar as funções).
// Experimente no terminal:  node mini-teste.js
// ============================================================================
if (require.main === module) {
    test("2 + 2 deve ser 4", () => {
        expect(2 + 2).toBe(4)     // Passou
    })

    test("Este vai reprovar de propósito", () => {
        expect(2 + 2).toBe(5)     // Reprovou (para você ver a diferença)
    })

    resumoFinal()                 // 1/2 testes passaram.
}
