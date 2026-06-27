import { buscarCep } from "../services/viacep.js";

// Importa a função buscarCep do arquivo viacep.js.
// Essa função será usada para consultar um CEP na API do ViaCEP.

let form = document.querySelector('#form-cadastro') 
// Seleciona o formulário pelo id "form-cadastro"
// e guarda esse elemento na variável form.

let campoCep = document.querySelector('#cep') 
// Seleciona o campo de CEP pelo id "cep"
// para poder acessar seu valor e adicionar eventos.

campoCep.addEventListener('blur', async () => {
    if(!campoCep.value) return
  // Adiciona um evento ao campo CEP.
  // O evento "blur" acontece quando o usuário sai do campo.
  // A função é assíncrona (async) porque fará uma consulta na API.

    try {
        let endereco = await buscarCep(campoCep.value)
        document.querySelector('#logradouro').value = endereco.logradouro
        document.querySelector('#bairro').value = endereco.bairro
        document.querySelector('#cidade').value = endereco.localidade
        document.querySelector('#uf').value = endereco.uf
    } catch (error) {
        console.error(error.message)
    }
})