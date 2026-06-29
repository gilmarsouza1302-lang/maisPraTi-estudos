// ============================================================
// LISTA 03 — ESTRUTURAS DE DADOS LINEARES (Fila e Lista Ligada)
// ============================================================
// Esta lista trabalha com duas estruturas de dados clássicas:
//   • FILA (Queue)        → política FIFO: o primeiro a entrar é o primeiro a sair.
//   • LISTA LIGADA (Linked List) → nós encadeados, cada um apontando para o próximo.
// ============================================================

// ============================================================
// EXERCÍCIO 11 — FILA DE ATENDIMENTO (Queue / FIFO)
// ============================================================
// Objetivo: simular o atendimento de uma clínica usando um array como FILA.
// Regra FIFO (First In, First Out): quem chega primeiro é atendido primeiro.
//   • chegarPaciente(nome) → enqueue: adiciona ao FINAL da fila (push).
//   • chamarProximo()      → dequeue: remove do INÍCIO da fila (shift).
//   • exibirFila()         → mostra o estado atual da fila.
//
// OBS.: este exercício está desativado (comentado) para que cada exercício
// possa ser executado isoladamente. Para testá-lo, descomente o bloco abaixo.
// ============================================================

// let fila = []  // O array funciona como a fila: índice 0 = próximo a ser atendido.

// // ENQUEUE — adiciona um paciente ao FINAL da fila.
// function chegarPaciente(nome) {
//     fila.push(nome)  // push() insere no fim do array (última posição da fila).
//     console.log(`Paciente "${nome}" chegou e entrou na fila`)

//     exibirFila()
// }

// // DEQUEUE — atende (remove) o paciente que está há mais tempo na fila.
// function chamarProximo() {
//     // Guarda de segurança: não há ninguém para atender.
//     if(fila.length === 0) {
//         console.log(`A fila está vazia. Não há pacientes para atender.`)
//         return
//     }

//     let atendido = fila.shift()  // shift() remove e retorna o PRIMEIRO elemento (índice 0).
//     console.log(`Atendemos o paciente "${atendido}"`)

//     exibirFila()
// }

// // Exibe o conteúdo atual da fila, na ordem de atendimento.
// function exibirFila() {
//     if(fila.length === 0) {
//         console.log(`A fila atual está vazia`)
//         return
//     }

//     // join(", ") transforma o array numa string legível separada por vírgulas.
//     console.log(`Fila atual: ${fila.join(", ")}\n`)
// }

// console.log("=== Chegada dos Pacientes ===\n")

// chegarPaciente("Peter")
// chegarPaciente("Bruce")
// chegarPaciente("Matthew")
// chegarPaciente("Bilbo")
// chegarPaciente("Legolas")

// console.log("=== Início dos Atendimentos === \n")

// // Como é FIFO, os 3 primeiros a chegar (Peter, Bruce, Matthew) saem primeiro.
// chamarProximo()
// chamarProximo()
// chamarProximo()

// ============================================================
// EXERCÍCIO 12 — LISTA LIGADA SIMPLES (Singly Linked List)
// ============================================================
// Objetivo: implementar uma lista ligada usando NÓS no formato { valor, proximo }.
// Diferente do array, os elementos NÃO ficam em posições contíguas na memória:
// cada nó "aponta" para o próximo através da propriedade `proximo`.
//
// Visualização:
//   inicio → [valor|proximo] → [valor|proximo] → [valor|proximo] → null
//
//   • adicionar(tarefa) → insere um novo nó no FINAL da lista.
//   • remover(tarefa)   → desencadeia (remove) o nó cujo valor casa com `tarefa`.
//   • exibir()          → percorre todos os nós do início até o `null`.
// ============================================================

// `inicio` (head) é a referência para o PRIMEIRO nó da lista.
// Enquanto for null, a lista está vazia.
let inicio = null

// Adiciona uma nova tarefa ao FINAL da lista ligada.
function adicionar(tarefa) {
    // Todo elemento da lista é um nó: o valor em si + o ponteiro para o próximo.
    let novoNo = { valor: tarefa, proximo: null }

    if(inicio === null) {
        // Caso 1 — lista vazia: o novo nó vira o início da lista.
        inicio = novoNo
    } else {
        // Caso 2 — lista já tem nós: precisamos chegar até o ÚLTIMO nó.
        let atual = inicio

        // Caminha enquanto houver um próximo; para quando `atual` for o último.
        while(atual.proximo !== null) {
            atual = atual.proximo
        }

        // O antigo último nó passa a apontar para o novo nó.
        atual.proximo = novoNo
    }

    console.log(`Tarefa "${tarefa}" adicionada.`)
}

// Remove o primeiro nó cujo `valor` seja igual a `tarefa`.
function remover(tarefa) {

    // Guarda de segurança: não há nada para remover.
    if(inicio === null) {
        console.log(`Lista vazia. Não foi possível remover.`)
        return
    }

    // Caso especial — o nó a remover é o PRIMEIRO da lista.
    // Basta o `inicio` passar a apontar para o segundo nó.
    if(inicio.valor === tarefa){
        inicio = inicio.proximo
        console.log(`Tarefa "${tarefa}" removida`)
        return
    }

    // Caso geral — percorremos a lista mantendo DUAS referências:
    //   • anterior → o nó imediatamente antes do que estamos analisando.
    //   • atual    → o nó que estamos verificando agora.
    let anterior = inicio
    let atual = inicio.proximo

    while(atual !== null) {
        if(atual.valor === tarefa) {
            // Achamos! O nó anterior "pula" o atual e aponta direto para o próximo.
            // Assim o nó atual fica fora da cadeia (será coletado pelo garbage collector).
            anterior.proximo = atual.proximo
            console.log(`Tarefa "${tarefa}" removida.`)
            return
        }

        // Avança as duas referências uma posição à frente.
        anterior = atual
        atual = atual.proximo
    }

    // Percorremos a lista inteira e não encontramos o valor procurado.
    console.log(`Tarefa "${tarefa}" não encontrada.`)
}

// Percorre a lista do início ao fim, montando uma representação visual.
function exibir() {
    if(inicio === null) {
        console.log(`Lista vazia.`)
        return
    }

    let atual = inicio  // Começamos sempre pelo início (head).
    let saida = ""

    // Enquanto não chegarmos no `null` (fim da lista), concatena o valor.
    while(atual !== null) {
        saida += atual.valor

        // Adiciona a seta apenas ENTRE os nós (não depois do último).
        if(atual.proximo !== null) {
            saida += " -> "
        }

        atual = atual.proximo  // Avança para o próximo nó.
    }

    console.log(`Lista: ${saida} -> null\n`)
}

console.log("=== Adicionando Tarefas ===")
adicionar("Estudar front-end")
adicionar("Lavar a louça")
adicionar("Responder e-mails")
adicionar("Fazer exercícios")

exibir()

console.log("=== Removendo Uma Tarefa ===")
remover("Responder e-mails")  // Remove um nó do MEIO da lista (caso geral).
exibir()
