import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Header = () => {

    const [inputSearch, setInputSearch] = useState("");
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const query = params.get("search") || "";

    useEffect(()=>{
        setInputSearch(query);
    },[query])
    

    const buscarMovie = (e) => {
        e.preventDefault();
        if(inputSearch==="") return;
        navigate('/movies?search='+inputSearch);    
    }

    return (
        <>
            <header id="header" className="header-container">
                <h1 className="header-title">SkyMovies</h1>
                <h1 className="header-title header-title--categoryView inactive"> Acción </h1>

                <form id="searchForm" className="header-searchForm" onSubmit={buscarMovie} >
                    <input 
                        type="text" 
                        placeholder="Ingrese una palabra clave para buscar" 
                        value={inputSearch} 
                        onChange={(e) => setInputSearch(e.target.value)}
                    />
                    <button id="searchBtn">🔍</button>
                </form>
            </header>
        </>
    )
}

export default Header;