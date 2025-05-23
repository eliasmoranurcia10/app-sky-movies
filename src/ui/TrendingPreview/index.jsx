import { useEffect, useState } from "react";
import { api } from "../../routes/data/secrets";
import CargarDatos from "../CargaDatos";
import { useNavigate } from "react-router-dom";


const TrendingPreview = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect( () => {

        api.get('trending/movie/day')
        .then(response => {
            setMovies(response.data.results);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });

    } ,[])

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const navegarATendencias = () =>{
        navigate('/movies')
    }

    return (
        <>
            <section id="trendingPreview" className="trendingPreview-container">
                <div className="trendingPreview-header">
                    <h2 className="trendingPreview-title">Tendencias</h2>
                    <button 
                        className="trendingPreview-btn"
                        onClick={navegarATendencias}
                    >
                        Ver más
                    </button>
                </div>
                  
                <article className="trendingPreview-movieList">

                    <CargarDatos 
                        loading={loading}
                        movies={movies}
                    />
                    
                </article>

            </section>
        </>
    )
}

export default TrendingPreview;