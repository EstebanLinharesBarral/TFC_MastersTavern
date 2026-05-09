// services/AuthService.js
import { fetchService } from "./FetchService.js";

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
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        
        setTimeout(() => {window.location.hash = '#/'}, 1000)
    }

    getToken(){
        return localStorage.getItem('auth_token');
    }

    async getMe() {
        const jwt = this.getToken();
        const response = await fetchService.get("/api/me/", jwt);

        return response;
    }
}

export const authService = new AuthService();