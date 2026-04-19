import { Header } from "./components/header.js"
import { createRouter } from "./router.js";
import { renderHomepage } from "./pages/Homepage.js";

const routes = {
    "/": () => renderHomepage(),
    "/about": () => "<h1>About</h1>",
    "/404": () => "<h1>404 Not Found</h1>"
};

createRouter(routes);

lucide.createIcons();

/*const router = createRouter(routes);

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("popstate", router);*/