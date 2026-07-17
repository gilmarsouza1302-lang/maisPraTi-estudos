import { Link } from 'react-router-dom'
import './NewsCard.css'

function NewsCard ({ id, categoria, titulo, resumo }) {
    return (
        <article className='card'>
            <span className='card__categoria'>{categoria}</span>
            <Link to={`/materia/${id}`} className='card__link'>
                <h3 className='card__titulo'>{titulo}</h3>
            </Link>

            {resumo && <p className='card__resumo'>{resumo}</p>}
        </article>
    )
}

export default NewsCard