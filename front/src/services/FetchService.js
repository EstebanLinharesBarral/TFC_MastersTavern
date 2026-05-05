// services/FetchService.js

class FetchService {
    async post(endpoint, payload) {
        const BASE_URL = "http://127.0.0.1:8000";
        const response = await fetch(BASE_URL + endpoint, {
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
}

export const fetchService = new FetchService();