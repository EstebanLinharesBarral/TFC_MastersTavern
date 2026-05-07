// services/FetchService.js
import { global } from "../global.js";

class FetchService {
    async post(endpoint, payload) {
        const response = await fetch(global.BASE_URL + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error");
        }

        return data;
    }

    async get(endpoint, jwt = null) {
        const headers = {};
        console.log(jwt)

        if (jwt) {
            headers["Authorization"] = `Bearer ${jwt}`;
        }

        const response = await fetch(global.BASE_URL + endpoint, {
            method: "GET",
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error");
        }

        return data;
    }
}

export const fetchService = new FetchService();