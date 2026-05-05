// services/AuthService.js
import { fetchService } from "./FetchService.js";

class AuthService {
    register(form) {
        const data = Object.fromEntries(new FormData(form));
        return fetchService.post("/api/register/", data);
    }

    login(form) {
        const data = Object.fromEntries(new FormData(form));
        return fetchService.post("/api/login/", data);
    }
}

export const authService = new AuthService();