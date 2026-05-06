// components/header.js
export function Header() {

    setTimeout(async () => {
        const menuSidebarBtn = document.getElementById('menu-sidebar-btn');
        const menuSidebar = document.getElementById('menu-sidebar');
        const closeSidebarBtn = document.getElementById('sidebar-close-btn');

        if(menuSidebarBtn && menuSidebar) {
            menuSidebarBtn.addEventListener('click', () => {
                menuSidebar.classList.toggle('show');
            });
        }

        if(closeSidebarBtn && menuSidebar) {
            closeSidebarBtn.addEventListener('click', () => {
                menuSidebar.classList.toggle('show');
            })
        }
        lucide.createIcons();
    }, 0)

    return `
    <header class="sticky top-0 z-50 w-full border-b border-[#301B0F] back-mt-light text-mt-dark caudex-bold shadow-lg">
        <div class="flex items-center justify-between px-4 py-3">
            <button id="menu-sidebar-btn" class="block md:hidden border"><i data-lucide="Menu"></i></button>

            <!-- LOGO -->
            <div class="flex items-center gap-3">
                <img src="src/assets/LogoEstiradoSinFondo.png" alt="logo" class="h-10">
            </div>

            <!-- NAV (desktop) -->
            <nav class="hidden md:flex items-center gap-6 border-x-2 px-6">
                <a href="#/" class="flex items-center gap-2 hover:opacity-70">
                    <i data-lucide="user"></i> Mis Personajes
                </a>

                <a href="#/" class="flex items-center gap-2 hover:opacity-70">
                    <i data-lucide="book-text"></i> Mis Campañas
                </a>

                <a href="#/" class="flex items-center gap-2 hover:opacity-70">
                    <i data-lucide="clock"></i> Mis Sesiones
                </a>

                <a href="#/" class="flex items-center gap-2 hover:opacity-70">
                    <i data-lucide="globe"></i> Social
                </a>
            </nav>

            <!-- USER -->
            <div class="flex items-center gap-3">
                <div class="rounded-full w-10 h-10 border-2 overflow-hidden">
                    <img src="./src/assets/avatar.png" class="w-full h-full object-cover">
                </div>

                <div class="hidden sm:block text-sm">
                    <a href="#/sign-in">Sign up</a>
                    <span> / </span>
                    <a href="#/log-in">Log in</a>
                </div>
            </div>
        </div>
    </header>`
}