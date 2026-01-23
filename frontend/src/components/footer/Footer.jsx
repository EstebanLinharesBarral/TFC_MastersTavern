import { Link } from "react-router-dom"
import './footer.css'
import facebook from '../../img/pagina/facebook.png';
import instagram from '../../img/pagina/Instagram.png';
import twitter from '../../img/pagina/Twitter.png';

const Footer = (props) => {
    return(
        <footer>
            <nav className={"info-legal"}>
                <Link to={''}>Contacto</Link>
                <Link to={''}>Términos y condiciones</Link>
                <Link to={''}>Política de privacidad</Link>
            </nav>
            <p>Copyright © 2025 MastersTavern - All rights reserved</p>
            <nav className={"redes"}>
                <Link to={''}><img src={facebook} /></Link>
                <Link to={''}><img src={instagram} /></Link>
                <Link to={''}><img src={twitter} /></Link>
            </nav>
        </footer>
    )
}

export default Footer