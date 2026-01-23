import Header from "../../components/header/Header";
import Navigator from "../../components/navigator/Navigator";
import './main.css';

const Main = (props) => {
    return(
        <div className={"mainR"}>
            <Header></Header>
            <Navigator></Navigator>
        </div>
    )
}

export default Main;