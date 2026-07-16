import './Footer.css'

function Footer() {
    const anoAtual = new Date().getFullYear()

    return (
        <footer className="rodape">
            <nav className="rodape__menu">
                <a href="">Sobre o Jornal</a>
                <a href="">Anuncie Conosco</a>
                <a href="">Fale com a Redação</a>
                <a href="">Política de Privacidade</a>
            </nav>

            <p className="rodape__copyright">
                &copy; {anoAtual} O Clarim Diário — Todos os direitos reservados.
            </p>

            <p className="rodape__lema">
                Impresso desde 1963 na cidade de Nova York
            </p>
        </footer>
    )
}

export default Footer