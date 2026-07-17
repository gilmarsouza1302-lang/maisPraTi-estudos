import { Link } from 'react-router-dom'
import './Header.css'

function Header({ tema, aoAlternarTema }) {
    const hoje = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    })

    return (
        <header className="cabecalho">
            <div className="cabecalho__faixa">
                <span>Edição de Nova York</span>
                <span>{hoje}</span>
                <span>U$ 1,50</span>
                <button className="cabecalho__tema" onClick={aoAlternarTema}>
                    {tema === 'light' ? 'Escuro' : 'Claro'}
                </button>
            </div>

            <Link to="/" className="cabecalho__link-titulo">
                <h1 className="cabecalho__titulo">O CLARIM DIÁRIO</h1>
            </Link>
            <p className="cabecalho__lema">A verdade doa a quem doer - Inclusive a certos aracnídeos</p>

            <nav className="cabecalho__menu">
                <Link to="/">Cidade</Link>
                <Link to="/">Ameaças Urbanas</Link>
                <Link to="/">Opinião do Editor</Link>
                <Link to="/">Esportes</Link>
                <Link to="/cadastro">Assine</Link>
            </nav>
        </header>
    )
}

export default Header