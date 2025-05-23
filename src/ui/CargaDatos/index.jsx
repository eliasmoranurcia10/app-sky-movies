import { useNavigate } from "react-router-dom";
import useLikedMovies from "../../hooks/useLikedMovies";

const CargarDatos = ({loading, movies}) => {

    const navigate = useNavigate();
    const likedMovies = useLikedMovies();

    const gotoDetailsMovie = (movie) => {
        navigate('/movie/'+movie.id)
    }

    const likedMovieIds = likedMovies.map(movie => movie.id);

    //Agregar o desagregar movies a localStores
    const likeDislikeMovie = (movielike, isLiked) =>{
        let updated = [];
        //Se verifica si esta likeado
        if(isLiked) {
            //Quita el movie de la lista de like
            updated = likedMovies.filter(movie => movie.id != movielike.id);
        } else {
            //Agrega el movie a la lista de like
            updated = [ ...likedMovies, movielike ];
        }

        localStorage.setItem('liked_movies', JSON.stringify(updated));

        // Evento personalizado  
        window.dispatchEvent(new Event('likedMoviesUpdate')); 
    }

    return (

        loading ? 
        <>
        <div className="movie-container movie-container--loading"></div>
        <div className="movie-container movie-container--loading"></div>
        <div className="movie-container movie-container--loading"></div>
        <div className="movie-container movie-container--loading"></div>
        </> :
        movies.map((movie,index) => {

            const isLiked = likedMovieIds.includes(movie.id);
            
            return (
                <div className="movie-container" key={index} >
                    <img  
                        src={movie.poster_path? 'https://image.tmdb.org/t/p/w300' + movie.poster_path: 'https://e0.pxfuel.com/wallpapers/912/253/desktop-wallpaper-game-over-no-signal-error-glitch-ideas-in-2021-glitch-glitch.jpg' } 
                        className="movie-img"
                        alt={movie.title}
                        onClick={() => gotoDetailsMovie(movie) }
                    />
                    <button 
                        className={`movie-btn ${isLiked? 'movie-btn--liked' : ''}`}  
                        onClick={ () => likeDislikeMovie(movie, isLiked)}
                    >
                    </button>
                </div>
            )
        })

    )
}

export default CargarDatos;

