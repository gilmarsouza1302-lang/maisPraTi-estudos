# 🧪 Testes Automatizados com Jest — do zero

Estudo prático de **testes automatizados** em JavaScript usando o **Jest**.
A ideia é entender *o que é* um teste, *por que* testar e *como* o Jest funciona —
partindo dos fundamentos, sem pular etapas.

---

## 🤔 O que é um teste automatizado (e por que usar)?

Um teste automatizado é **código que verifica outro código**. Em vez de abrir o
navegador e conferir na mão toda vez que mudamos algo, escrevemos a regra uma vez
(*"2 + 3 tem que dar 5"*) e o computador confere sozinho, em segundos.

| Sem testes | Com testes |
|---|---|
| Você testa "na mão" a cada mudança | O computador testa por você |
| Um bug pode passar despercebido | O teste fica **vermelho** na hora |
| Medo de mexer no código antigo | Segurança para refatorar |

---

## 📦 O que é o Jest?

**[Jest](https://jestjs.io/pt-BR/)** é um *framework* de testes para JavaScript
(criado pela Meta). Ele já vem com tudo pronto:

- **`test()` / `it()`** — descrevem um teste.
- **`expect()` + matchers** (`.toBe`, `.toEqual`…) — verificam o resultado.
- **hooks** (`beforeEach`, `afterEach`…) — preparam/limpam o cenário.
- um **test runner** que encontra os arquivos `*.test.js` e roda todos.

---

## 📁 Arquivos desta pasta

| Arquivo | O que é | Conceitos que ensina |
|---|---|---|
| `mini-teste.js` | Um **"Jest caseiro"** feito à mão | como `expect()`/`test()` funcionam por dentro |
| `funcoes.js` | Código-fonte: funções **puras** | função pura, `module.exports` |
| `funcoes.test.js` | Testes das funções puras | `test()`, `expect()`, **matchers**, padrão **AAA** |
| `carrinho.js` | Código-fonte: lógica **com estado** | estado, `reduce`, exportação condicional (Node + navegador) |
| `carrinho.test.js` | Testes do carrinho | **`beforeEach`**, isolamento de testes, decimais |
| `index.html` | O carrinho rodando no **navegador** | o mesmo `.js` servindo p/ Jest **e** p/ a tela |

> 💡 **Roteiro sugerido:** comece por `mini-teste.js` (para ver que `expect`/`test`
> são só funções — rode `node mini-teste.js`); depois `funcoes.test.js` (Jest de
> verdade, o mais simples); e por fim `carrinho.test.js`, que introduz estado e o
> hook `beforeEach`.

---

## ▶️ Como rodar

A partir **desta** pasta (`Module02 - Frontend/testes`), no terminal:

```bash
npm install        # 1ª vez: baixa o Jest e cria a pasta node_modules
npm test           # roda todos os testes uma vez
npx jest --watch   # modo observação: re-roda ao salvar um arquivo
```

O `npm test` funciona porque o `package.json` tem:

```json
"scripts": { "test": "jest" }
```

Um relatório **verde** = tudo passou. **Vermelho** = algo quebrou (o Jest mostra
o que era esperado vs. o que veio).

---

## 🧠 Anatomia de um teste — o padrão **AAA**

```js
test("Soma - deve somar dois números corretamente", () => {
  // Arrange (preparar) — dados de entrada
  const a = 2, b = 3;

  // Act (agir) — executa o que está sendo testado
  const resultado = soma(a, b);

  // Assert (afirmar) — compara com o esperado
  expect(resultado).toBe(5);
});
```

### Matchers mais usados

| Matcher | Quando usar |
|---|---|
| `.toBe(v)` | igualdade estrita (`===`) — números, strings, booleanos |
| `.toEqual(v)` | conteúdo de **objetos/arrays** campo a campo |
| `.toBeCloseTo(v, casas)` | números **decimais** (evita erro de ponto flutuante) |
| `.toBeTruthy()` / `.toBeFalsy()` | valor "verdadeiro/falso" sem valor exato |
| `.not.toBe(v)` | nega qualquer matcher |
| `.toThrow()` | verifica se uma função **lança erro** |

Lista completa: **https://jestjs.io/pt-BR/docs/expect**

---

## 🔗 Documentação oficial

- Começando com o Jest → https://jestjs.io/pt-BR/docs/getting-started
- API `test` / `it` → https://jestjs.io/pt-BR/docs/api
- Matchers (`expect`) → https://jestjs.io/pt-BR/docs/expect
- Hooks (setup/teardown) → https://jestjs.io/pt-BR/docs/setup-teardown
- Módulos no Node (CommonJS) → https://nodejs.org/api/modules.html
