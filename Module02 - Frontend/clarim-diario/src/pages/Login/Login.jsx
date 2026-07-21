import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [aviso, setAviso] = useState('')

    const { login } = useAuth()

    const navigate = useNavigate()

    function enviar(e) {
        e.preventDefault()
        try {
            login(email, senha)
            navigate('/')
        } catch (erro) {
            setAviso(erro.message)
        }
    }

    return (
        <main className='container'>
            <form className='formulario' onSubmit={enviar}>
                <h1>Entrar no Clarim</h1>
                <label htmlFor="email">E-mail</label>
                <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="senha">Senha</label>
                <input type="password" id='senha' value={senha} onChange={(e) => setSenha(e.target.value)} required />

                {aviso && <p className='aviso'>{aviso}</p>}

                <button type='submit'>Entrar</button>

                <p className='rodape-form'>
                    Ainda não é assinante? <Link to='/cadastro'>Assine o Clarim</Link>
                </p>
            </form>
        </main>
    )
}

export default Login