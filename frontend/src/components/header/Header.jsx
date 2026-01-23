import { Link } from "react-router-dom"
import  LogoMastersTavern from '../../img/LogoMastersTavernSinFondo.png';
import menuH from '../../img/menu.png';
import UserInfo from "../user_info/UserInfo";
import './header.css';

const Header = (props) => {
    return(
        <header>
            <button><img src={menuH}/></button>
            <Link to={'/'} className={"logo-link"}><img src={LogoMastersTavern} alt="MastersTavernInicio"/></Link>
            <UserInfo />
        </header>
    )
}

export default Header