import { Link } from "react-router-dom";
import avatar from '../../img/avatarElfo.png';
import './userInfo.css'

const UserInfo = (props) => {
    return(
        <div className={"user-info-container"}>
            <figure className={"avatar"}><img src={avatar}/></figure>
            <div className={"log-user"}>
                <Link to={'/log-in'} className={"log-sign"}>Log in</Link>
                <span>/</span>
                <Link to={'/sign-up'} className={"log-sign"}>Sign up</Link>
            </div>
        </div>
    )
}

export default UserInfo