import { useAuth } from '../../contexts/AuthContext'

function Painel() {
    const { usuario } = useAuth()

    return (
        <main className='container' style={{padding: '32px 16px'}}>
            <h1>Área do assinante</h1>
            <p>Bem-vindo de volta, {usuario.nome}</p>
            <p>Sua edição exclusiva com o dossiê completo contra o aracnídeo chega as 6h</p>
        </main>
    )
}

export default Painel