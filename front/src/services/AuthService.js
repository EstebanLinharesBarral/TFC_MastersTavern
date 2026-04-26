// services/AuthService.js
import { fetchService } from "./FetchService.js";

class AuthService {
    async register(form) {
        const payload = {};
        const formData = new FormData(form);
        
        for (let [key, value] of formData.entries()) {
            payload[key] = value;
        }

        const response = await fetchService.post('register/', payload);
        return response;
    }
}

export const authService = new AuthService();