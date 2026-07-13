import Header from './components/Header/Header'
import NewsCard from './components/NewsCard/NewsCard'
import { noticias } from './data/noticias'
import './App.css'

function App() {
  const [ manchete, ...demais ] = noticias

  return (
    <>
      <Header />

      <main className='container'>
        <section className='manchete'>
          <NewsCard 
            categoria = {manchete.categoria}
            titulo = {manchete.titulo}
            resumo = {manchete.resumo}
          />
        </section>

        <section className='grade'>
          {demais.map((noticia) => (
            <NewsCard
              key={noticia.id}
              categoria={noticia.categoria}
              titulo={noticia.titulo}
              resumo={noticia.resumo}
            />
          ))}
        </section>
      </main>
    </>
  )
}

export default App