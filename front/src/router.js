// router.js

import { Footer } from "./components/footer.js";
import { Header } from "./components/header.js";

export function createRouter(routes) {
    let currentController = null;

    // ── Utilidades ──────────────────────────────────────────────

    function getCurrentPath() {
        // Siempre hash-mode: #/ruta → /ruta
        return window.location.hash.slice(1) || "/";
    }

    function navigate(path, options = {}) {
        if (options.replace) {
            window.location.replace("#" + path);
        } else {
            window.location.hash = path;
        }
        // hashchange se dispara solo, no hace falta llamar render()
    }

    // ── Matching con params dinámicos ───────────────────────────

    function matchRoute(path) {
        for (const pattern of Object.keys(routes)) {
            const keys = [];
            const regexStr = pattern
                .replace(/:([^/]+)/g, (_, key) => { keys.push(key); return "([^/]+)"; })
                .replace(/\//g, "\\/");

            const match = path.match(new RegExp(`^${regexStr}$`));
            if (match) {
                const params = Object.fromEntries(
                    keys.map((key, i) => [key, decodeURIComponent(match[i + 1])])
                );
                return { handler: routes[pattern], params };
            }
        }
        return { handler: routes["/404"] ?? (() => "<h1>404 — Not Found</h1>"), params: {} };
    }

    // ── Query params ────────────────────────────────────────────

    function getQueryParams() {
        return Object.fromEntries(new URLSearchParams(window.location.search));
    }

    // ── Guardias ────────────────────────────────────────────────

    const beforeEachHooks = [];
    const afterEachHooks  = [];

    function runGuards(to, from) {
        return beforeEachHooks.every(hook => hook(to, from) !== false);
    }

    // ── Scroll ──────────────────────────────────────────────────

    const scrollPositions = new Map();

    function saveScroll(path) {
        scrollPositions.set(path, { x: window.scrollX, y: window.scrollY });
    }

    function restoreScroll(path) {
        const saved = scrollPositions.get(path);
        window.scrollTo(saved?.x ?? 0, saved?.y ?? 0);
    }

    // ── Renderizado ─────────────────────────────────────────────

    const history = [];
    let currentIndex = -1;

    async function render() {
        const path = getCurrentPath();
        const from = history[currentIndex] ?? null;
        const to   = { path, params: {}, query: getQueryParams() };

        if (!runGuards(to, from)) return;

        currentController?.abort();
        currentController = new AbortController();
        const { signal } = currentController;

        const { handler, params } = matchRoute(path);
        to.params = params;

        const app = document.querySelector("#app");
        if (!app) return console.error("[Router] No se encontró #app en el DOM.");

        if (from) saveScroll(from.path);
        history.splice(++currentIndex, Infinity, to);

        app.classList.add("route-leave");
        await new Promise(r => setTimeout(r, 150));
        if (signal.aborted) return;

        try {
            const content = await Promise.resolve(handler({ params, query: to.query, signal }));
            if (signal.aborted) return;

            app.innerHTML = Header({ currentPath: path }) + content + Footer();
            app.classList.remove("route-leave");
            app.classList.add("route-enter");
            requestAnimationFrame(() => app.classList.remove("route-enter"));

            restoreScroll(path);

            if (handler.title) {
                document.title = typeof handler.title === "function"
                    ? handler.title(params)
                    : handler.title;
            }

            afterEachHooks.forEach(hook => hook(to, from));
        } catch (err) {
            if (err.name !== "AbortError") {
                console.error("[Router] Error al renderizar vista:", err);
                app.innerHTML = routes["/500"]?.() ?? "<h1>500 — Error interno</h1>";
            }
        }
    }

    // ── Captura de clicks en <a> ────────────────────────────────

    document.addEventListener("click", (e) => {
        const anchor = e.target.closest("a[href]");
        if (!anchor || anchor.hasAttribute("data-router-ignore")) return;

        const href = anchor.getAttribute("href");

        // Ignorar externas, mailto:, target="_blank"…
        if (
            !href ||
            href.startsWith("http") ||
            href.startsWith("//") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            anchor.target === "_blank"
        ) return;

        // Si ya viene con # no lo doblamos
        if (!href.startsWith("#")) {
            e.preventDefault();
            navigate(href);
        }
    });

    // ── Eventos ─────────────────────────────────────────────────

    window.addEventListener("hashchange", render);
    window.addEventListener("load", render);

    // ── API pública ─────────────────────────────────────────────

    return {
        navigate,
        back:           () => window.history.back(),
        forward:        () => window.history.forward(),
        beforeEach:     (fn) => beforeEachHooks.push(fn),
        afterEach:      (fn) => afterEachHooks.push(fn),
        getCurrentPath,
        getQueryParams,
        get history()   { return [...history]; },
    };
}