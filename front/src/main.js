import { Header } from "./components/header.js"
import { createRouter } from "./router.js";
import { renderHomepage } from "./pages/Homepage.js";
import { renderSignInPage } from "./pages/SignInPage.js";
import { renderLogInPage } from "./pages/LogInPage.js";
import { renderCharactersPage } from "./pages/CharactersPage.js";
import { renderCharacterForm } from "./pages/CharacterForm.js";

const routes = {
    "/": () => renderHomepage(),
    "/sign-in": () => renderSignInPage(),
    "/log-in": () => renderLogInPage(),
    "/my-characters": () => renderCharactersPage(),
    "/new-character": () => renderCharacterForm(),
    "/404": () => "<h1>404 Not Found</h1>"
};

createRouter(routes);

lucide.createIcons();