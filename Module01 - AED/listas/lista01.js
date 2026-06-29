// ============================================================
// EXERCÍCIOS DE LÓGICA DE PROGRAMAÇÃO — JavaScript (Node.js)
// ============================================================

const PROMPT = require('prompt-sync')()

// ============================================================
// EXERCÍCIO 1 — ESTACIONAMENTO COM FAIXAS DE TEMPO (switch/case)
// ============================================================
// Objetivo: calcular o valor a pagar com base no número de horas.
// Tabela:
//   1ª hora  → R$ 8,00
//   2ª hora  → + R$ 6,00  (total R$ 14,00)
//   3ª hora  → + R$ 4,00  (total R$ 18,00)
//   >3 horas → R$ 18,00 + R$ 2,00 por hora adicional
// ============================================================

console.log("\n========== EXERCÍCIO 1: ESTACIONAMENTO ==========")

// Lê a entrada do usuário e converte para número inteiro
let horas = parseInt(PROMPT("Informe o número de horas estacionado: "))

// Valida se o valor é um número positivo
if (!horas || horas < 1) {
    console.error("Número de horas inválido.")
} else {
    let valor = 0   // Acumula o valor total a pagar
    let extras = 0  // Guarda as horas excedentes (acima de 3)

    // switch(true) permite usar expressões booleanas nos cases —
    // o JS avalia cada case como verdadeiro/falso, não por igualdade
    switch (true) {

        case horas === 1:
            // Apenas a 1ª hora: R$ 8,00
            valor = 8
            break

        case horas === 2:
            // 1ª + 2ª hora: R$ 8,00 + R$ 6,00
            valor = 8 + 6
            break

        case horas === 3:
            // 1ª + 2ª + 3ª hora: R$ 8,00 + R$ 6,00 + R$ 4,00
            valor = 8 + 6 + 4
            break

        default:
            // Acima de 3 horas: calcula as horas extras além das 3 primeiras
            extras = horas - 3
            // As 3 primeiras horas somam R$ 18,00 (4+6+8)
            // Cada hora extra custa R$ 2,00
            valor = 18 + (extras * 2)
    }

    console.log(`Tempo estacionado: ${horas} hora(s)`)
    // toFixed(2) garante 2 casas decimais na exibição (ex: 18.00)
    console.log(`Valor a pagar: R$ ${valor.toFixed(2)}`)
}

// ============================================================
// EXERCÍCIO 2 — MATRIZ IDENTIDADE [7x7]
// ============================================================
// Objetivo: criar e imprimir uma matriz onde a diagonal principal
// (onde o índice de linha === índice de coluna) é 1 e o restante é 0.
//
// Exemplo (3x3):
//   1 0 0
//   0 1 0
//   0 0 1
// ============================================================

console.log("\n========== EXERCÍCIO 2: MATRIZ IDENTIDADE [7x7] ==========")

const n = 7  // Tamanho da matriz (linhas e colunas)

// Cria um array vazio que representará as linhas da matriz
let MI = []

// Loop externo: percorre cada linha de 1 até n
for (let i = 1; i <= n; i++) {
    MI[i] = []  // Inicializa a sublinha como array vazio

    // Loop interno: percorre cada coluna da linha atual
    for (let j = 1; j <= n; j++) {
        // Na diagonal principal, i === j → valor 1
        // Em todos os outros casos → valor 0
        MI[i][j] = (i === j) ? 1 : 0
    }
}

// Exibe a matriz formatada
console.log("Matriz Identidade [1..7][1..7]")
for (let i = 1; i <= n; i++) {
    let linha = ""
    for (let j = 1; j <= n; j++) {
        // Concatena cada elemento separado por espaço
        linha += MI[i][j] + " "
    }
    console.log(linha.trim())  // trim() remove o espaço extra no final
}

// ============================================================
// EXERCÍCIO 3 — NOME E DIAS DO MÊS (switch/case + bissexto)
// ============================================================
// Objetivo: receber um número de 1 a 12 e exibir o nome do mês
// e quantos dias ele possui. Para fevereiro, perguntar se é bissexto.
// ============================================================

console.log("\n========== EXERCÍCIO 3: NOME E DIAS DO MÊS ==========")

let mes = parseInt(PROMPT("Digite o número do mês (1 a 12): "))

let nomeMes = ""  // Armazenará o nome do mês
let diasMes = 0   // Armazenará a quantidade de dias

switch (mes) {
    case 1:
        nomeMes = "Janeiro"
        diasMes = 31
        break
    case 2:
        nomeMes = "Fevereiro"
        // Pergunta ao usuário se o ano é bissexto para definir 28 ou 29 dias
        let bissexto = PROMPT("O ano é bissexto? (s/n): ").toLowerCase()
        // Operador ternário: se 's', 29 dias; senão, 28 dias
        diasMes = (bissexto === 's') ? 29 : 28
        break
    case 3:
        nomeMes = "Março"
        diasMes = 31
        break
    case 4:
        nomeMes = "Abril"
        diasMes = 30
        break
    case 5:
        nomeMes = "Maio"
        diasMes = 31
        break
    case 6:
        nomeMes = "Junho"
        diasMes = 30
        break
    case 7:
        nomeMes = "Julho"
        diasMes = 31
        break
    case 8:
        nomeMes = "Agosto"
        diasMes = 31
        break
    case 9:
        nomeMes = "Setembro"
        diasMes = 30
        break
    case 10:
        nomeMes = "Outubro"
        diasMes = 31
        break
    case 11:
        nomeMes = "Novembro"
        diasMes = 30
        break
    case 12:
        nomeMes = "Dezembro"
        diasMes = 31
        break
    default:
        // Mês fora do intervalo 1–12
        console.log("Mês inválido! Digite um número de 1 a 12.")
}

// Só exibe o resultado se um mês válido foi digitado
if (nomeMes) {
    console.log(`Mês: ${nomeMes}`)
    console.log(`Dias: ${diasMes}`)
}

// ============================================================
// EXERCÍCIO 4 — MATRIZ M[6x8]: VETOR COM NEGATIVOS POR LINHA
// ============================================================
// Objetivo: preencher uma matriz de 6 linhas e 8 colunas e criar
// um vetor C onde cada posição contém a quantidade de elementos
// negativos da linha correspondente de M.
// ============================================================

console.log("\n========== EXERCÍCIO 4: MATRIZ M[6x8] — NEGATIVOS POR LINHA ==========")

const LINHAS = 6   // Total de linhas da matriz
const COLUNAS = 8  // Total de colunas da matriz

let m = []  // Matriz principal (bidimensional)

// Leitura dos elementos da matriz via teclado
for (let i = 1; i <= LINHAS; i++) {
    m[i] = []  // Inicializa a linha como array vazio
    for (let j = 1; j <= COLUNAS; j++) {
        // parseInt converte a string do prompt para inteiro
        m[i][j] = parseInt(PROMPT(`M[${i}][${j}]: `))
    }
}

// Vetor C: um valor por linha, indicando quantos negativos há nela
const C = []

for (let i = 1; i <= LINHAS; i++) {
    let contador = 0  // Reinicia o contador a cada nova linha

    for (let j = 1; j <= COLUNAS; j++) {
        // Verifica se o elemento atual é negativo
        if (m[i][j] < 0) {
            contador++  // Incrementa o contador de negativos
        }
    }

    C[i] = contador  // Armazena o total de negativos desta linha
}

// Exibe o resultado do vetor C
console.log("\nResultado (negativos por linha):")
for (let i = 1; i <= LINHAS; i++) {
    console.log(`C[${i}] = ${C[i]} negativo(s)`)
}

// ============================================================
// EXERCÍCIO 5 — CAIXA ELETRÔNICO (menor número de cédulas)
// ============================================================
// Objetivo: dado um valor de saque (múltiplo de 10), calcular a
// combinação com a menor quantidade de cédulas possível usando:
//   R$ 100, R$ 50, R$ 20 e R$ 10.
//
// Estratégia: algoritmo guloso — sempre usa a maior cédula possível
// Math.floor(x / cédula) → quantas cédulas cabem no valor restante
// x % cédula             → quanto sobra para as cédulas menores
// ============================================================

console.log("\n========== EXERCÍCIO 5: CAIXA ELETRÔNICO ==========")

let valor = parseInt(PROMPT("Informe o valor do saque (múltiplo de R$ 10): "))

// Valida: deve ser positivo e divisível por 10
// O operador % retorna o resto da divisão — se for 0, é múltiplo de 10
if (!valor || valor <= 0 || valor % 10 !== 0) {
    console.log("Valor inválido! Deve ser positivo e múltiplo de 10.")
} else {
    let restante = valor  // Começa com o valor total e vai subtraindo

    // Cédulas de R$ 100: quantas cabem no valor restante?
    let notas100 = Math.floor(restante / 100)
    restante = restante % 100  // Atualiza o que ainda falta pagar

    // Cédulas de R$ 50
    let notas50 = Math.floor(restante / 50)
    restante = restante % 50

    // Cédulas de R$ 20
    let notas20 = Math.floor(restante / 20)
    restante = restante % 20

    // Cédulas de R$ 10 (o que restar, dividido por 10)
    let notas10 = Math.floor(restante / 10)

    // Soma total de cédulas entregues
    let totalCedulas = notas100 + notas50 + notas20 + notas10

    console.log(`\nSaque: R$ ${valor}`)
    console.log(`--------------------`)
    console.log(`Cédulas de R$ 100: ${notas100}`)
    console.log(`Cédulas de R$ 50:  ${notas50}`)
    console.log(`Cédulas de R$ 20:  ${notas20}`)
    console.log(`Cédulas de R$ 10:  ${notas10}`)
    console.log(`--------------------`)
    console.log(`Total de cédulas:  ${totalCedulas}`)
}