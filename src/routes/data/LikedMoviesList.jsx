
function LikedMoviesList() {
    //Convirtiendo a objeto lo que viene de localStorage
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;

    if(item){
        movies = item;
    } else {
        movies = {};
    }
    
    return Object.values(movies);
}

export default LikedMoviesList;