export function createRouter(routes) {
function router() {
    const path = window.location.pathname
    const view = routes[path]

    document.querySelector("#app").innerHTML = view()
}

    return router;
}