import { Link } from "react-router-dom";
import './navigator.css';

const Navigator = (props) => {
    return(
        <nav>
            <Link to={'/'} className={"navigator-button"}>Contacto</Link>
            <Link to={'/'} className={"navigator-button"}>Manuales</Link>
            <Link to={'/'} className={"navigator-button"}>Wiki</Link>
            <Link to={'/'} className={"navigator-button"}>Noticias</Link>
            <Link to={'/'} className={"navigator-button"}>Social</Link>
        </nav>
    )
}

export default Navigator