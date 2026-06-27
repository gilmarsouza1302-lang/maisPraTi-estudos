export async function buscarCep(cep){

      // replace() cria uma nova string substituindo partes da string original.
    // /\D/g é uma expressão regular:
    // \D  -> significa "qualquer caractere que NÃO seja um número (0 a 9)".
    // g   -> significa "global", ou seja, procura TODOS os caracteres que não são números.
    //
    // Então, tudo que não for número (como ".", "-", espaços, letras etc.)
    // é substituído por uma string vazia ("") e acaba sendo removido.
    //
    // Exemplo:
    // "90.010-000" -> "90010000"
    // "90010-000"  -> "90010000"

    let cepLimpo = cep.replace(/\D/g, '')

    if(cepLimpo.length !== 8) {
        throw new Error('O CEP deve ter 8 dígitos.')
    }
    // Verifica se o CEP possui exatamente 8 dígitos.
    // A propriedade .length retorna a quantidade de caracteres da string.
    // O operador !== significa "diferente de" (valor e tipo).
    // Se o CEP não tiver 8 caracteres, é lançado um erro.
    // throw interrompe a execução do código e envia a mensagem de erro.

    let resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)

    // fetch() faz uma requisição para a API do ViaCEP.
    // A URL é criada usando o CEP digitado pelo usuário.
    // ${cepLimpo} insere o valor da variável dentro da URL.
    // await faz o código esperar a resposta da API antes de continuar.
    let dados = await resposta.json()

    // A resposta da API vem no formato JSON.
    // .json() converte esse JSON em um objeto JavaScript,
    // permitindo acessar os dados pelo nome das propriedades.
    // await espera essa conversão terminar.

    if(dados.erro) {
        throw new Error ('CEP não encontrado.')
    }

    return dados
}
    // Verifica se a API retornou a propriedade "erro".
    // Quando um CEP não existe, o ViaCEP responde com:
    // { "erro": true }
    //
    // Se dados.erro existir e for true, significa que o CEP não foi encontrado.
    // throw cria e lança um erro com uma mensagem personalizada.
    // A execução da função é interrompida aqui e o erro poderá
    // ser tratado em outro lugar usando try...catch.
    // Se não houve erro, a função retorna o objeto "dados"
    // com todas as informações do CEP.