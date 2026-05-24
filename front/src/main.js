import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";
import { createRouter } from "./router.js";
import { renderHomepage } from "./pages/Homepage.js";
import { renderSignInPage } from "./pages/SignInPage.js";
import { renderLogInPage } from "./pages/LogInPage.js";
import { renderCharactersPage } from "./pages/CharactersPage.js";
import { renderCharacterForm } from "./pages/CharacterForm.js";

// Servicios
import { authService } from "./services/AuthService.js";

export function initGlobalEvents() {
    document.getElementById('header-root').innerHTML = Header();
    document.getElementById('footer-root').innerHTML = Footer();
    document.addEventListener("click", (e) => {
        const logoutBtn = e.target.closest(".logout-btn");
        if (logoutBtn) {
            authService.logout();
        }
    });
}

const routes = {
    "/": () => renderHomepage(),
    "/sign-in": () => renderSignInPage(),
    "/log-in": () => renderLogInPage(),
    "/my-characters": () => renderCharactersPage(),
    "/character-form": () => renderCharacterForm(),
    "/character-form/:id": ({params}) => renderCharacterForm(params.id),
    "/404": () => "<h1>404 Not Found</h1>"
};

export const router = createRouter(routes);
initGlobalEvents();

lucide.createIcons();