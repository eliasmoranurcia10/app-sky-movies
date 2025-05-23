import { useNavigate } from "react-router-dom"


const CargaCategorias = ({loading, categorias}) => {

    const navigate = useNavigate()

    const buscarMoviesPorCategoria = (categoria) =>{
        navigate('/movies?category='+categoria.id+'-'+categoria.name)
    }

    return(
        <article className="categoriesPreview-list">
        {
            loading ?
            <>
                <div className="category-container category-container--loading"></div>
                <div className="category-container category-container--loading"></div> 
                <div className="category-container category-container--loading"></div>  
            </> :
            categorias.map( (category) => (
                <div 
                    className="category-container" 
                    key={category.id}
                    onClick={() => buscarMoviesPorCategoria(category)}
                >
                    <h3 id={'id'+category.id} className="category-title" >{category.name}</h3>
                </div>
            ))
        }
        </article>
    )
}

export default CargaCategorias;
