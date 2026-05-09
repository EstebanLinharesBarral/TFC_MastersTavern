import { authService } from "../services/AuthService.js";

// components/header.js
export function Header() {

    setTimeout(async () => {
        const menuSidebarBtn = document.getElementById('menu-sidebar-btn');
        const menuSidebar = document.getElementById('menu-sidebar');
        const closeSidebarBtn = document.getElementById('sidebar-close-btn');

        const profileContainer = document.getElementById('profile-container');
        if(profileContainer) {
            let profile;

            if(authService.getToken()){
                try{
                    const user = await authService.getMe();
                    profile = `<div class="hidden sm:flex gap-2 text-lg">
                        <p>${user.username}</p>
                        <button class="logout-btn cursor-pointer hover:text-red-500 transition duration-100"><i data-lucide="log-out"></i></button>
                    </div>`
                }catch(error) {
                    console.error(error);
                }
            } else {
                profile = `<div class="hidden sm:block text-xs tracking-widest">
                    <a href="#/sign-in" class="rounded-lg py-2 px-4 border border-gold hover:bg-amber-100/10">Sign up</a>
                    <a href="#/log-in" class="rounded-lg py-2 px-4 border border-gold bg-gradient-red hover:saturate-120">Log in</a>
                </div>`
            }

            profileContainer.innerHTML = profile;
        }

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
    <header class="sticky top-0 z-50 w-full border-b-2 border-gold bg-gradient-brown text-mt-light cinzel-regular shadow-lg">
        <div class="flex items-center justify-between px-4 py-3">
            <button id="menu-sidebar-btn" class="block md:hidden border"><i data-lucide="Menu"></i></button>

            <!-- LOGO -->
            <a href="#/" class="flex items-center gap-3 text-xl decorative-bold">
                MastersTavern
            </a>

            <!-- NAV (desktop) -->
            <nav class="hidden md:flex items-center gap-6 px-6 tracking-widest">
                <a href="#/my-characters" class="flex items-center p-2 rounded-xl hover:bg-amber-100/10">
                    Mis Personajes
                </a>

                <a href="#/" class="flex items-center p-2 rounded-xl hover:bg-amber-100/10">
                    Mis Campañas
                </a>

                <a href="#/" class="flex items-center p-2 rounded-xl hover:bg-amber-100/10">
                    Mis Sesiones
                </a>

                <a href="#/" class="flex items-center p-2 rounded-xl hover:bg-amber-100/10">
                    Social
                </a>
            </nav>

            <!-- USER -->
            <div id="profile-container" class="flex items-center gap-3">
                <div class="rounded-full w-10 h-10 border-2 overflow-hidden">
                    <img src="./src/assets/avatar.png" class="w-full h-full object-cover">
                </div>

                <div class="hidden sm:block text-sm">
                    <a href="#/sign-in" class="p-2 border border-gold">Sign up</a>
                    <a href="#/log-in" class="p-2 border border-gold bg-gradient-red">Log in</a>
                </div>
            </div>
        </div>
    </header>`
}