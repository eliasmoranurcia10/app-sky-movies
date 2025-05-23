import { useEffect, useState } from "react";
import { api } from "../../routes/data/secrets";
import CargaCategorias from "../CargaCategorias";
 
const CategoriesPreview = () => {

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        
        api.get('genre/movie/list')
        .then( response => {
            setCategorias(response.data.genres);
            setLoading(false);
        })
        .catch( error => {
            setError(error);
            setLoading(false);
        });
    }, [] )

    if(error){
        return <p>Error: {error.message}</p>;
    }


    return (
        <>
            <section id="categoriesPreview" className="categoriesPreview-container">
                <h2 className="categoriesPreview-title">Categorías</h2>
                <CargaCategorias
                    loading={loading}
                    categorias={categorias}
                />
            </section>
        </>
    )
}

export default CategoriesPreview;