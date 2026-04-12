class Router {
    constructor(routes){
        this.routes = routes;
        this.init();
    }

    init() {
        window.addEventListener("hashchange", () => this.handleRouteChange());
        this.handleRouteChange();
    }

    handleRouteChange() {
        const currentPath = window.location.hash.slice(1);
        const route = this.routes[currentPath];
        if(route) {
            route();
        } else {
            this.routes["/404"]();
        }
    }
}



export function createRouter(routes) {
function router() {
    const path = window.location.pathname
    const view = routes[path]

    document.querySelector("#app").innerHTML = view()
}

    return router;
}