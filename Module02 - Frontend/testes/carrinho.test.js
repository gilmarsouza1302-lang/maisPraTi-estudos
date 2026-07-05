// ============================================================================
// TESTANDO CÓDIGO COM ESTADO + HOOKS DE CICLO DE VIDA (beforeEach)
// ============================================================================
//
// Este arquivo testa o `carrinho.js`, que — diferente das funções puras de
// `funcoes.js` — GUARDA ESTADO (a lista de itens é lembrada entre chamadas).
//
// O GRANDE PERIGO do estado nos testes: eles podem "vazar" um para o outro. Se
// um teste adiciona itens e o próximo roda sem limpar, o segundo teste começa
// com lixo do primeiro e pode passar (ou falhar) por engano. A regra de ouro é:
//
//     TODO TESTE DEVE SER ISOLADO — começar do zero e não depender da ordem.
//
// A ferramenta do Jest para garantir isso são os HOOKS de ciclo de vida.
// ============================================================================


// Importa as funções do módulo que será testado (padrão CommonJS do Node).
const { adicionarItem, calcularTotal, limparCarrinho, contarItens } = require("./carrinho.js")


// ----------------------------------------------------------------------------
// HOOK beforeEach — "faça isto ANTES DE CADA teste"
// ----------------------------------------------------------------------------
// `beforeEach(fn)` registra uma função que o Jest executa automaticamente
// ANTES de cada `test(...)` deste arquivo. Aqui usamos para LIMPAR o carrinho,
// garantindo que todo teste comece com a lista vazia (isolamento total).
//
// A família de hooks do Jest (docs: https://jestjs.io/pt-BR/docs/setup-teardown):
//   • beforeEach(fn) → roda ANTES de CADA teste    (preparar/resetar).
//   • afterEach(fn)  → roda DEPOIS de CADA teste    (limpar/desfazer).
//   • beforeAll(fn)  → roda UMA vez, antes de todos (setup caro: abrir conexão).
//   • afterAll(fn)   → roda UMA vez, depois de todos (fechar conexão).
// ----------------------------------------------------------------------------
beforeEach(() => {
    limparCarrinho()
})


// ----------------------------------------------------------------------------
// OS TESTES (cada um segue o padrão Arrange → Act → Assert)
// ----------------------------------------------------------------------------

test("Deve adicionar um item ao carrinho", () => {
    adicionarItem("Camiseta", 49.90)          // ACT: adiciona 1 item.
    expect(contarItens()).toBe(1)             // ASSERT: agora deve haver 1 item.
})

test("Deve calcular o total corretamente com vários itens", () => {
    adicionarItem("Camiseta", 49.90)          // ARRANGE + ACT: monta o cenário
    adicionarItem("Calça", 89.90)             // com dois produtos.
    expect(calcularTotal()).toBe(139.80)      // ASSERT: 49.90 + 89.90 = 139.80.

    // ⚠️ CUIDADO COM NÚMEROS DECIMAIS (ponto flutuante)!
    // Este teste funciona, mas em muitos casos somas de decimais dão erros
    // minúsculos (ex.: 0.1 + 0.2 === 0.30000000000000004 → não é 0.3 exato).
    // Quando isso acontecer, troque `.toBe(...)` por `.toBeCloseTo(...)`:
    //     expect(calcularTotal()).toBeCloseTo(139.80, 2)  // 2 casas decimais
    // Docs: https://jestjs.io/pt-BR/docs/expect#tobeclosetonumber-numdigits
})

test("Quando o carrinho está vazio, total deve ser zero.", () => {
    // Sem adicionar nada. Graças ao beforeEach, o carrinho JÁ começa vazio —
    // este teste NÃO enxerga os itens dos testes acima. Isso é o isolamento
    // em ação: comente o beforeEach lá em cima e veja este teste quebrar.
    expect(calcularTotal()).toBe(0)
    expect(contarItens()).toBe(0)
})


// ============================================================================
// LEMBRETE DE FLUXO DE TRABALHO (setup na sua máquina)
// ============================================================================
//   git pull                → traz as últimas mudanças do repositório.
//   cd "Module02 - Frontend/testes"   → entra na pasta que tem o package.json.
//   npm install             → instala o Jest (1ª vez; cria node_modules).
//   npm test                → roda todos os *.test.js e mostra o relatório.
// ============================================================================
