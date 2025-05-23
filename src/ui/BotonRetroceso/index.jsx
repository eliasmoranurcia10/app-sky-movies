import { useLocation, useNavigate, useParams } from "react-router-dom";

const BotonRetroceso = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const {slug} = useParams();
    
    const irPaginaAnterior = () => {
        navigate(-1);
    }

    if(location.pathname === "/") {
        return;
    } else {
        return (
            <>
                <span 
                    className={`header-arrow ${slug?"header-arrow--white":""}`}
                    onClick={irPaginaAnterior}
                >
                    &lt;
                </span>
            </>
        )
    }
}
 
export default BotonRetroceso;