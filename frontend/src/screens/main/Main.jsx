import Header from "../../components/header/Header";
import Navigator from "../../components/navigator/Navigator";
import Footer from "../../components/footer/Footer";
import './main.css';

const Main = (props) => {
    return(
        <div className={"mainR"}>
            <Header></Header>
            <Navigator></Navigator>
            <Footer></Footer>
        </div>
    )
}

export default Main;