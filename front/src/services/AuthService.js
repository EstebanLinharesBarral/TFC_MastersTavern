// services/AuthService.js
import { fetchService } from "./FetchService.js";
import { router } from "../main.js";

class AuthService {
    register(form) {
        const data = Object.fromEntries(new FormData(form));
        return fetchService.post("/api/register/", data);
    }

    login(form) {
        const data = Object.fromEntries(new FormData(form));
        return fetchService.post("/api/token/", data);
    }

    logout() {
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('refresh_token');
        
        window.location.hash = '/';
        router.render();
    }

    getToken(){
        return sessionStorage.getItem('auth_token');
    }

    async getMe() {
        const jwt = this.getToken();
        const response = await fetchService.get("/api/me/", jwt);

        return response;
    }
}

export const authService = new AuthService();