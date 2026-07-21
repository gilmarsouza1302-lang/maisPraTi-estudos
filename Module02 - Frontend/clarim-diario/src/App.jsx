import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Materia from './pages/Materia/Materia'
import Cadastro from './pages/Cadastro/Cadastro'
import Login from './pages/Login/Login'
import RotaProtegida from './components/RotaProtegida'
import Painel from './pages/Painel/Painel'
import './App.css'

function App() {
  const [ tema, setTema ] = useState(() => {
    const salvo = localStorage.getItem('tema') || 'light'
    if(salvo) return salvo

    const preferenciaEscuro = window.matchMedia('(preferes-color-scheme: dark)').matches
    if(preferenciaEscuro) return 'dark'

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
        <Route path="/materia/:id" element={<Materia />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} /> 
        <Route path='/painel' element={
          <RotaProtegida>
            <Painel />
          </RotaProtegida>
        } />
      </Routes>
    </>
  )
}

export default App