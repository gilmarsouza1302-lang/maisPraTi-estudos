// ============================================================
//   SERVICE — camada que fala com a API (json-server) das notícias
// ============================================================
// Boa prática: isolar as chamadas HTTP num "service". Assim os
// componentes não sabem NADA sobre axios/URLs — só chamam funções
// como listarNoticias(). Se a API mudar, mexemos só aqui.
import axios from 'axios'

// Criamos uma instância do axios com a URL base já configurada, para
// não repetir 'http://localhost:3333' em toda chamada.
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080' })

// Utilitário didático: uma Promise que resolve após `ms` milissegundos.
// Usamos abaixo para SIMULAR a demora de uma rede real e enxergar as
// telas de "Carregando..." funcionando.
// const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// async/await: a função "pausa" no await até a Promise resolver.
export async function listarNoticias() {
    // await esperar(1000)                        // atraso proposital
    const { data } = await api.get('/api/noticias') // desestrutura só o `data` da resposta
    return data
}

export async function buscarNoticia(id) {
    // await esperar(1000)
    // Template string monta a rota do item específico: /noticias/3
    const { data } = await api.get(`api/noticias/${id}`)
    return data
}