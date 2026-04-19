// router.js

import { Header } from "./components/header.js";

export function createRouter(routes) {

    function router() {
        // 1. Obtener la ruta actual
        const path = window.location.hash.slice(1) || "/";

        // 2. Buscar la vista correspondiente
        const view = routes[path] || routes["/404"];

        // 3. Renderizar en el DOM
        const app = document.querySelector("#app");
        app.innerHTML = Header() + view();
    }

    // 4. Escuchar cambios en el hash
    window.addEventListener("hashchange", router);

    // 5. Ejecutar al cargar la app
    window.addEventListener("load", router);
}