import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import './App.css'

function App() {
  const [ tema, setTema ] = useState(() => {
    const salvo = localStorage.getItem('tema')
    if (salvo) return salvo

    const preferenciaEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (preferenciaEscuro) return 'dark'

    return 'light'
  })

  function alternarTema() {
    setTema(t => (t === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema)
    localStorage.setItem('tema', tema)
  }, [tema])

  return (
    <>
      <Header tema={tema} aoAlternarTema={alternarTema} />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App