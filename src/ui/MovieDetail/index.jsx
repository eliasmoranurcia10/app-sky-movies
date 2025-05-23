import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../routes/data/secrets";
import CargaCategorias from "../CargaCategorias";
import CargarDatos from "../CargaDatos";
import BotonRetroceso from "../BotonRetroceso";

const MovieDetail = () => {

    const { slug } = useParams();
    const [movie, setMovie] = useState([]);
    const [error, setError] = useState(null);
    const [loadingMovie, setLoadingMovie] = useState(true);
    const [moviesRelacionados, setMoviesRelacionados] = useState([])
    const [loadingMoviesRelacionados, setLoadingMoviesRelacionados] =  useState(true);
    const [errorMoviesRelacionados, setErrorMoviesRelacionados] = useState(null)


    useEffect(()=>{
        api.get('movie/' + slug)
        .then(response=>{
            setMovie(response.data);
            setLoadingMovie(false);
        })
        .catch(error=> {
            setError(error);
            setLoadingMovie(false);
        })

        api.get(`movie/${slug}/recommendations`)
        .then(response=>{
            setMoviesRelacionados(response.data.results)
            setLoadingMoviesRelacionados(false);
        })
        .catch(error=> {
            setErrorMoviesRelacionados(error);
            setLoadingMoviesRelacionados(false);
        })

    },[slug])
    
    if(error) return <p>Error: {error.message}</p>;
    if(errorMoviesRelacionados) return <p>Error: {errorMoviesRelacionados.message}</p>;

    return (
        <>
            <div id="header" className="header-container--long" style={{background: `
                linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
                url(${'https://image.tmdb.org/t/p/w500' + movie.poster_path})
            `}}>
                <BotonRetroceso />
            </div>
            <section id="movieDetail" className="movieDetail-container">
                <h1 className="movieDetail-title">{movie.title}</h1>
                <span className="movieDetail-score">{movie.vote_average}</span>
                <p className="movieDetail-description">
                {movie.overview}
                </p>

                <CargaCategorias
                    loading={loadingMovie} 
                    categorias={movie.genres}
                />

                <article className="relatedMovies-container">
                    <h2 className="relatedMovies-title">Películas similares</h2>

                    <div className="relatedMovies-scrollContainer">
                        {
                        !moviesRelacionados.length && <p>No hay películas relacionadas</p>
                        }
                        <CargarDatos 
                            loading={loadingMoviesRelacionados}
                            movies={moviesRelacionados}
                        />
                    </div>
                </article>
            </section>
            
        </>
    )
}

export default MovieDetail;