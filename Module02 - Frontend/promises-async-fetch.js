// ============================================================================
// ASSINCRONISMO EM JAVASCRIPT — Promise, async/await, fetch e Promise.all
// ============================================================================
//
// JavaScript roda em uma ÚNICA thread (uma fila de execução só). Se uma tarefa
// demorada (esperar a água ferver, baixar dados da internet) bloqueasse essa
// thread, a página inteira congelaria. A solução é o código ASSÍNCRONO: a gente
// "dispara" a tarefa demorada e segue a vida; quando ela termina, somos avisados.
//
// Existem 3 ferramentas centrais — e elas se complementam:
//
//   1) PROMISE      → o "comprovante" de uma tarefa que vai terminar no futuro.
//   2) async/await  → açúcar sintático para LER promises como se fossem síncronas.
//   3) fetch        → a API do navegador para requisições HTTP (devolve uma Promise).
//
// E um utilitário poderoso:
//
//   4) Promise.all  → espera VÁRIAS promises em PARALELO (todas de uma vez).
//
// Os blocos abaixo demonstram cada conceito usando a metáfora de "fazer um café".
// ============================================================================


// ============================================================
// PARTE 1 — A PROMISE (a "promessa" de um resultado futuro)
// ============================================================
// Uma Promise é um objeto que representa um valor que AINDA NÃO existe, mas que
// existirá (ou falhará) no futuro. Ela vive em um de três estados:
//   • pending   (pendente)  → ainda está rodando.
//   • fulfilled (resolvida) → terminou com sucesso  → chama resolve(valor).
//   • rejected  (rejeitada) → terminou com erro     → chama reject(erro).
//
// O executor recebe duas funções: resolve (deu certo) e reject (deu errado).
// ============================================================

// Ferver a água é DEMORADO → devolvemos uma Promise que só resolve em 5 segundos.
function ferverAgua() {
    console.log("Ferver a Água")

    // `new Promise` recebe um "executor" com os callbacks resolve/reject.
    return new Promise((resolve, reject) => {
        // setTimeout simula uma tarefa que leva tempo (5000 ms = 5 segundos).
        setTimeout(() => {
            console.log("Água fervida")
            resolve()  // Avisa que a tarefa terminou com SUCESSO (estado fulfilled).
            // Se algo desse errado, usaríamos: reject(new Error("fogão apagou"))
        }, 5000)
    })
}

// Tarefa SÍNCRONA (rápida, instantânea) — não precisa de Promise.
function prepararCoado() {
    console.log('Passo 1')
    console.log('Passo 2')
    console.log('Passo 3')
    console.log('Passo 4')
    console.log('Passo 5')
}

// Outra tarefa síncrona simples.
function passarCafe() {
    console.log("Despejar a água sobre o pó e deixar agir.")
}


// ============================================================
// PARTE 2 — CONSUMINDO PROMISES COM .then() / .catch()
// ============================================================
// A forma "clássica" de reagir a uma Promise: encadear .then() (sucesso) e
// .catch() (erro). Cada .then() recebe o valor passado ao resolve().
// ============================================================

// ferverAgua()
//     .then(() => {
//         // Só executa DEPOIS que a água ferveu (resolve() foi chamado).
//         prepararCoado()
//         passarCafe()
//     })
//     .catch((erro) => {
//         // Captura qualquer reject() ou exceção lançada na cadeia acima.
//         console.error("algo deu errado:", erro)
//     })


// ============================================================
// PARTE 3 — Promise.all (esperar VÁRIAS promises em PARALELO)
// ============================================================
// Promise.all recebe um ARRAY de promises e devolve UMA promise só, que:
//   • resolve quando TODAS resolverem (com um array de resultados, na ordem);
//   • rejeita assim que QUALQUER UMA falhar (comportamento "tudo ou nada").
//
// Use quando as tarefas são INDEPENDENTES e podem rodar ao mesmo tempo —
// é muito mais rápido do que esperar uma de cada vez.
//
// OBS.: prepararCoado() é síncrona; Promise.resolve(...) a "embrulha" como
// uma promise já resolvida, para podermos colocá-la no mesmo array.
// ============================================================

// Promise.all([
//     ferverAgua(),
//     Promise.resolve(prepararCoado())
// ])
//     .then(passarCafe)  // Só passa o café quando a água ferveu E o coado ficou pronto.
//     .catch((erro) => {
//         console.error("algo deu errado:", erro)
//     })


// ============================================================
// PARTE 4 — async / await (a forma moderna e mais legível)
// ============================================================
// `async` antes de uma função faz com que ela SEMPRE devolva uma Promise.
// `await` PAUSA a execução da função até a Promise ao lado resolver — sem
// travar o resto do programa. O código fica com "cara" de síncrono, lido de
// cima para baixo, mas continua assíncrono por baixo dos panos.
//
// O bloco try/catch substitui o .catch(): qualquer reject vira uma exceção
// capturável, deixando o tratamento de erro natural e centralizado.
// ============================================================

async function rotinaCafe() {
    try {
        await ferverAgua()    // PAUSA aqui por 5s; só continua quando a água ferver.
        await prepararCoado() // Roda em sequência, depois da água.
        await passarCafe()    // E por fim, passa o café.
    } catch (erro) {
        // Pega erros de QUALQUER await acima (equivale ao .catch da cadeia).
        console.error("algo deu errado:", erro)
    }
}

rotinaCafe()

// IMPORTANTÍSSIMO: este log aparece ANTES de "Água fervida"!
// Como rotinaCafe() é assíncrona e "pausa" no await, o JS NÃO espera ela
// terminar para seguir a linha de baixo. Isso prova que o código não bloqueia.
console.log('teste')


// ============================================================
// PARTE 5 — fetch (requisições HTTP) + async/await na prática
// ============================================================
// fetch() faz uma requisição de rede e devolve uma Promise que resolve para um
// objeto Response. Atenção a dois detalhes clássicos:
//   • Precisamos de DOIS awaits: um para a resposta chegar (fetch) e outro
//     para LER/converter o corpo (resposta.json()), que também é assíncrono.
//   • fetch NÃO rejeita em erros HTTP (404, 500); ele só rejeita se a rede
//     falhar. Por isso checamos `resposta.ok` manualmente.
// ============================================================

async function buscarUsuario(id) {
    try {
        // 1º await — espera a resposta da rede chegar.
        const resposta = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

        // fetch não trata 404/500 como erro: precisamos verificar nós mesmos.
        if (!resposta.ok) {
            throw new Error(`Falha na requisição: status ${resposta.status}`)
        }

        // 2º await — converte o corpo da resposta (JSON) em objeto JavaScript.
        const usuario = await resposta.json()
        return usuario
    } catch (erro) {
        // Erros de rede OU o throw acima caem aqui.
        console.error("Erro ao buscar usuário:", erro.message)
        throw erro  // Repassa o erro para quem chamou decidir o que fazer.
    }
}


// ============================================================
// PARTE 6 — Promise.all + fetch: VÁRIAS requisições em paralelo
// ============================================================
// Buscar 3 usuários "um de cada vez" (await em sequência) somaria os tempos.
// Com Promise.all disparamos as 3 requisições JUNTAS e esperamos todas — o
// tempo total passa a ser o da requisição MAIS LENTA, não a soma delas.
// ============================================================

async function buscarVariosUsuarios() {
    try {
        // .map() cria um array de PROMISES (as requisições já saem disparadas aqui).
        const requisicoes = [1, 2, 3].map((id) => buscarUsuario(id))

        // Promise.all aguarda as 3 em paralelo e devolve os resultados na ordem.
        const usuarios = await Promise.all(requisicoes)

        usuarios.forEach((u) => console.log(`Usuário: ${u.name}`))
        return usuarios
    } catch (erro) {
        // Se QUALQUER uma das 3 falhar, o Promise.all rejeita e caímos aqui.
        console.error("Erro ao buscar a lista de usuários:", erro.message)
    }
}

// Descomente para testar as requisições reais (precisa de conexão com a internet):
// buscarVariosUsuarios()
