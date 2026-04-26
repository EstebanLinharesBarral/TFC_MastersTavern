import { Header } from "./components/header.js"
import { createRouter } from "./router.js";
import { renderHomepage } from "./pages/Homepage.js";
import { renderSignInPage } from "./pages/SignInPage.js";
import { renderLogInPage } from "./pages/LogInPage.js";

const routes = {
    "/": () => renderHomepage(),
    "/sign-in": () => renderSignInPage(),
    "/log-in": () => renderLogInPage(),
    "/404": () => "<h1>404 Not Found</h1>"
};

createRouter(routes);

lucide.createIcons();

/*const router = createRouter(routes);

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("popstate", router);*/