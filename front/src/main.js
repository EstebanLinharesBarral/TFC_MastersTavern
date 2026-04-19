//import { createRouter } from "./router";

const routes = {

}

import { Header } from "./components/header.js"
import { renderHomepage } from "./pages/Homepage.js"

const container = document.querySelector("#app")
container.innerHTML = Header()
container.insertAdjacentHTML('beforeend', renderHomepage())

lucide.createIcons();

/*const router = createRouter(routes);

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("popstate", router);*/