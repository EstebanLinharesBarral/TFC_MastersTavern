// services/FetchService.js
import { global } from "../global.js";

class FetchService {
    async request(endpoint, options = {}, retry = true) {

        const {
            method = "GET",
            body = null,
            requiresAuth = true
        } = options;

        const headers = {};

        // JWT automático
        if (requiresAuth) {
            const token = localStorage.getItem("auth_token");

            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
        }

        const isFormData = body instanceof FormData;

        if (!isFormData && body) {
            headers["Content-Type"] = "application/json";
        }

        const response = await fetch(global.BASE_URL + endpoint, {
            method,
            headers,
            body: isFormData ? body : (body ? JSON.stringify(body) : null)
        });

        // Token expirado
        if (response.status === 401 && retry) {

            const refresh = localStorage.getItem("refresh_token");

            // Si no hay refresh → logout
            if (!refresh) {
                this.logout();
                throw new Error("Sesión expirada");
            }

            // Intentar refresh
            const refreshResponse = await fetch(
                global.BASE_URL + "/api/token/refresh/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        refresh
                    })
                }
            );

            // Refresh inválido
            if (!refreshResponse.ok) {
                this.logout();
                throw new Error("Sesión expirada");
            }

            const refreshData = await refreshResponse.json();

            // Guardar nuevo access token
            localStorage.setItem("auth_token", refreshData.access);

            // Repetir request original
            return this.request(endpoint, options, false);
        }

        // Intentar parsear JSON
        let data = null;

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        }

        // Manejo de errores
        if (!response.ok) {
            throw new Error(data?.error || "Error");
        }

        return data;
    }

    async get(endpoint) {
        return this.request(endpoint, {
            method: "GET"
        });
    }

    async post(endpoint, payload) {
        return this.request(endpoint, {
            method: "POST",
            body: payload,
        });
    }
}

export const fetchService = new FetchService();