async function buscarCEP() {
    // Pega o valor do input de CEP e remove caracteres que não sejam números
    const cep = document.getElementById('cep').value.replace(/\D/g, '');

    // Valida se o CEP tem 8 dígitos
    if (cep.length !== 8) {
        alert("Por favor, digite um CEP válido com 8 números.");
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        // Faz a requisição para a API ViaCEP
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.erro) {
            alert("CEP não encontrado.");
            limparFormulario();
            return;
        }

        // Preenche os campos com os dados retornados
        document.getElementById('rua').value = dados.logradouro;
        document.getElementById('bairro').value = dados.bairro;
        document.getElementById('cidade').value = dados.localidade;
        document.getElementById('uf').value = dados.uf;

    } catch (erro) {
        alert("Erro ao buscar o CEP. Tente novamente mais tarde.");
        console.error(erro);
    }
}

function limparFormulario() {
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
}