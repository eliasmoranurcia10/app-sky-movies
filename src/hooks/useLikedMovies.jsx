import { useEffect, useState } from "react";
import LikedMoviesList from "../routes/data/LikedMoviesList";

const useLikedMovies = () => {
    const [likedMovies, setLikedMovies] = useState(LikedMoviesList())

    useEffect( () =>{
        const updateLikedMovies = () => {
            setLikedMovies(LikedMoviesList());
        }

        window.addEventListener('likedMoviesUpdate', updateLikedMovies);

        return () => {
            window.removeEventListener('likedMoviesUpdate', updateLikedMovies);
        }
    },[])

    return likedMovies;
}

export default useLikedMovies;
