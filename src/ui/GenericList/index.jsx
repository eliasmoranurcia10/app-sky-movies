import { useSearchParams } from "react-router-dom";
import Header from "../Header";
import { useEffect, useState } from "react";
import { api } from "../../routes/data/secrets";
import Footer from "../Footer";
import CargarDatos from "../CargaDatos";
import BotonRetroceso from "../BotonRetroceso";

const GenericList = () => {

    const [params] = useSearchParams();
    const query = params.get("search");
    const [moviesBySearch, setMoviesBySearch] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [idCategory,nameCategory] = (params.get("category") || "").split('-');

    
    // Este código me permite resetear page cuando salgo de la página e ingrreso con otra categoría
    useEffect(()=>{
        setPage(1);
    },[])
    
    useEffect(()=>{
        
        //Función para cargar datos, si no hay un query entonces buscar por pagina, 
        // caso contrario, busca por query
        const cargarDatos = () => {
            const endpoint = !query && !idCategory ? "trending/movie/day" : query? "search/movie" : idCategory? "discover/movie": "trending/movie/day";
            const params = !query && !idCategory ? { page } : query? {query,}: idCategory? {with_genres:idCategory, page} : { page };
            //Si hay un query entonces se limpian los datos
            if(query) {setMoviesBySearch([]);}


            api.get(endpoint, {params})
                .then(response => {
                    setMoviesBySearch( 
                        page > 1 && !query? 
                            prev=>[...prev, ...response.data.results] //Agrega los resultados a la página
                            : response.data.results //Mantiene los mismos resultados
                    );
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                })
        }

        cargarDatos();

        // Scroll infinito, en esta sección cambia l variable page
        const handleScroll = () => {
            const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                setPage(prev => prev + 1 )
            }
        }
        //Si no hay un query entonces se habilita el Scroll para aumentar "page"
        if(!query) {
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    },[query, idCategory, page])

    if(error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            <BotonRetroceso />
            <Header />
            {
                nameCategory && <h2 className="header-category" >{nameCategory}</h2>
            }
            <section id="genericList" className="genericList-container">
                <CargarDatos 
                    key={page}
                    loading={loading}
                    movies={moviesBySearch}
                />
            </section>
            <Footer />
        </>
    )
}

export default GenericList;