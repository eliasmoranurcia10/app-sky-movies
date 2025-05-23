import useLikedMovies from "../../hooks/useLikedMovies";
import CargarDatos from "../CargaDatos";

const LikedTrending = () => {

    const moviesFavorites = useLikedMovies();

    const disLikeMovie = (favoritemovie) => {
        const updated = moviesFavorites.filter(movie => movie.id != favoritemovie.id);

        localStorage.setItem('liked_movies', JSON.stringify(updated));
        window.dispatchEvent(new Event('likedMoviesUpdate')); 
    }

    return (
        <>
            <section id="liked" className="liked-container">
                <div className="liked-header">
                    <h2 className="liked-title">Películas Favoritas</h2>
                </div>
                <article className="liked-movieList">
                    {
                        !moviesFavorites.length && <p>Aún no hay películas favoritas</p>
                    }

                    <CargarDatos 
                        loading={false}
                        movies={moviesFavorites}
                        likeDislikeMovie={disLikeMovie}
                    />
                </article>
            </section>
        </>
    )
}

export default LikedTrending;