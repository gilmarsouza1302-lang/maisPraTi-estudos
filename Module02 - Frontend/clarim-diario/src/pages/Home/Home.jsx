import NewsCard from '../../components/NewsCard/NewsCard'
import { noticias } from '../../data/noticias'
import './Home.css'

function Home() {
    const [ manchete, ...demais ] = noticias

    return (
      <main className='container'>
        <section className='manchete'>
          <NewsCard 
            id = {manchete.id}
            categoria = {manchete.categoria}
            titulo = {manchete.titulo}
            resumo = {manchete.resumo}
          />
        </section>

        <section className='grade'>
          {demais.map((noticia) => (
            <NewsCard
              id={noticia.id}
              categoria={noticia.categoria}
              titulo={noticia.titulo}
              resumo={noticia.resumo}
            />
          ))}
        </section>
      </main>
    )
}

export default Home