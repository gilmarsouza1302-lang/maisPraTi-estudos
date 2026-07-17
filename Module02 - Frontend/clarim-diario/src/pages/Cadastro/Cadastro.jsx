import { useState } from 'react'
import { buscarCep } from '../../services/viacep'
import './Cadastro.css'

function Cadastro() {
    const [ form, setForm ] = useState({
        nome: '',
        email: '',
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: '',
        numero: '',
        complemento: ''
    })

    const [ erroCep, setErroCep ] = useState('')
    const [ buscando, setBuscando ] = useState(false)
    const [ enviado, setEnviado ] = useState(false)

    function atualizarCampo(campo, valor) {
        setForm(formAnterior => ({ ...formAnterior, [campo]: valor }))
    }

    async function aoSairDoCep() {
        setErroCep('')

        if (!form.cep) return

        try {
            setBuscando(true)
            const endereco = await buscarCep(form.cep)

            setForm(formAnterior => ({
                ...formAnterior,
                logradouro: endereco.logradouro,
                bairro: endereco.bairro,
                cidade: endereco.localidade,
                estado: endereco.uf
            }))
        } catch (erro) {
            setErroCep(erro.message)
        } finally {
            setBuscando(false)
        }
    }

    function aoEnviar(evento) {
        evento.preventDefault()
        console.log('Cadastro enviado:', form)
        setEnviado(true)
    }

    if (enviado) {
        return (
            <main className="container cadastro">
                <h1 className="cadastro__titulo">Cadastro realizado!</h1>
                <p>Obrigado por assinar O Clarim Diário, {form.nome}.</p>
            </main>
        )
    }

    return (
        <main className="container cadastro">
            <h1 className="cadastro__titulo">Assine O Clarim Diário</h1>
            <p className="cadastro__subtitulo">Preencha seus dados para receber as notícias em primeira mão.</p>

            <form className="cadastro__form" onSubmit={aoEnviar}>
                <label className="campo">
                    Nome completo
                    <input
                        type="text"
                        required
                        value={form.nome}
                        onChange={(e) => atualizarCampo('nome', e.target.value)}
                    />
                </label>

                <label className="campo">
                    E-mail
                    <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => atualizarCampo('email', e.target.value)}
                    />
                </label>

                <label className="campo">
                    CEP
                    <input
                        type="text"
                        required
                        placeholder="00000-000"
                        value={form.cep}
                        onChange={(e) => atualizarCampo('cep', e.target.value)}
                        onBlur={aoSairDoCep}
                    />
                </label>

                {buscando && <p className="cadastro__aviso">Buscando endereço...</p>}
                {erroCep && <p className="cadastro__erro">{erroCep}</p>}

                <label className="campo">
                    Rua
                    <input
                        type="text"
                        value={form.logradouro}
                        onChange={(e) => atualizarCampo('logradouro', e.target.value)}
                    />
                </label>

                <div className="cadastro__linha">
                    <label className="campo">
                        Número
                        <input
                            type="text"
                            value={form.numero}
                            onChange={(e) => atualizarCampo('numero', e.target.value)}
                        />
                    </label>

                    <label className="campo">
                        Complemento
                        <input
                            type="text"
                            value={form.complemento}
                            onChange={(e) => atualizarCampo('complemento', e.target.value)}
                        />
                    </label>
                </div>

                <label className="campo">
                    Bairro
                    <input
                        type="text"
                        value={form.bairro}
                        onChange={(e) => atualizarCampo('bairro', e.target.value)}
                    />
                </label>

                <div className="cadastro__linha">
                    <label className="campo">
                        Cidade
                        <input
                            type="text"
                            value={form.cidade}
                            onChange={(e) => atualizarCampo('cidade', e.target.value)}
                        />
                    </label>

                    <label className="campo campo--curto">
                        UF
                        <input
                            type="text"
                            maxLength={2}
                            value={form.estado}
                            onChange={(e) => atualizarCampo('estado', e.target.value)}
                        />
                    </label>
                </div>

                <button type="submit" className="cadastro__botao">Assinar agora</button>
            </form>
        </main>
    )
}

export default Cadastro