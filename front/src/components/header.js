import { authService } from "../services/AuthService.js";

// components/header.js
export function Header() {

    setTimeout(async () => {
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
            <button id="menu-sidebar-btn" class="block md:hidden"><i data-lucide="Menu"></i></button>

            <!-- LOGO -->
            <a href="#/" class="flex items-center gap-3 text:lg lg:text-xl decorative-bold">
                MastersTavern
            </a>

            <!-- NAV (desktop) -->
            <nav class="hidden md:flex items-center gap-6 px-6 md: text-sm lg:text-base tracking-widest">
                <a href="#/my-characters" class="flex items-center p-2 rounded-xl hover:bg-amber-100/10">
                    Mis Personajes
                </a>

                <a href="#/my-campaings" class="flex items-center p-2 rounded-xl hover:bg-amber-100/10">
                    Mis Campañas
                </a>

                <a href="#/my-sessions" class="flex items-center p-2 rounded-xl hover:bg-amber-100/10">
                    Mis Sesiones
                </a>

                <a href="#/social" class="flex items-center p-2 rounded-xl hover:bg-amber-100/10">
                    Social
                </a>

                <a href="#/social" class="flex items-center p-2 rounded-xl hover:bg-amber-100/10">
                    Manuales
                </a>
            </nav>

            <!-- USER -->
            <div id="profile-container" class="hidden md:flex items-center gap-3">
                
            </div>
        </div>
    </header>

    <aside id="menu-sidebar" class="md:hidden w-[220px] h-screen fixed left-0 top-0 z-40 flex flex-col bg-gradient-brown border-r border-gold-light">

        <!-- LOGO -->
        <div class="px-4 py-[18px] border-b border-gold-light">
            <p class="decorative-bold text-mt-light text-[13px] tracking-wide">MastersTavern</p>
        </div>

        <!-- NAV -->
        <nav class="flex-1 flex flex-col gap-0.5 px-2 py-3 overflow-y-auto">

            <p class="cinzel-bold text-xs tracking-[.18em] uppercase text-mt-sublight px-2 pt-2 pb-1">Principal</p>

            <!-- Activo -->
            <a href="#/" class="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-[rgba(201,168,76,0.05)] transition-colors">
                <i data-lucide="layout-panel-left" class="size-4"></i> 
                <span class="cinzel-regular text-[11px] tracking-[.08em]">Inicio</span>
            </a>

            <!-- Inactivo (repetir para cada enlace) -->
            <a href="#/my-characters" class="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-[rgba(201,168,76,0.05)] transition-colors">
                <i data-lucide="sword" class="size-4"></i> 
                <span class="cinzel-regular text-[11px] tracking-[.08em]">Mis Personajes</span>
            </a>

            <a href="#" class="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-[rgba(201,168,76,0.05)] transition-colors">
                <i data-lucide="map" class="size-4"></i> 
                <span class="cinzel-regular text-[11px] tracking-[.08em]">Mis Campañas</span>
            </a>

            <a href="#" class="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-[rgba(201,168,76,0.05)] transition-colors">
                <i data-lucide="calendar" class="size-4"></i> 
                <span class="cinzel-regular text-[11px] tracking-[.08em]">Mis Sesiones</span>
            </a>

            <p class="cinzel-bold text-xs tracking-[.18em] uppercase text-mt-sublight px-2 pt-4 pb-1">Comunidad</p>

            <a href="#" class="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-[rgba(201,168,76,0.05)] transition-colors">
                <i data-lucide="user" class="size-4"></i> 
                <span class="cinzel-regular text-[11px] tracking-[.08em]">Social</span>
            </a>

            <a href="#" class="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-[rgba(201,168,76,0.05)] transition-colors">
                <i data-lucide="book" class="size-4"></i> 
                <span class="cinzel-regular text-[11px] tracking-[.08em]">Manuales</span>
            </a>

            <a href="#" class="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-[rgba(201,168,76,0.05)] transition-colors">
                <i data-lucide="newspaper" class="size-4"></i> 
                <span class="cinzel-regular text-[11px] tracking-[.08em]">Noticias</span>
            </a>
        </nav>

        <!-- USUARIO -->
        <div class="flex items-center gap-2.5 px-2 py-3 border-t border-[rgba(201,168,76,0.1)]">
            <div id="profile-container-sidebar" class="flex-1 min-w-0">
                
            </div>
        </div>
    </aside>`
}

export function updateActiveLink(currentPath) {
    document.querySelectorAll('nav a[href]').forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        const isActive = href === currentPath;

        link.classList.toggle('bg-[rgba(139,26,26,0.25)]', isActive);
        link.classList.toggle('border', isActive);
        link.classList.toggle('border-[rgba(139,26,26,0.4)]', isActive);
        link.classList.toggle('text-mt-light', isActive)
        link.classList.toggle('text-mt-sublight', !isActive)
    });
}

export async function updateHeaderProfile() {
    const menuSidebarBtn = document.getElementById('menu-sidebar-btn');
    const menuSidebar = document.getElementById('menu-sidebar');
    const closeSidebarBtn = document.getElementById('sidebar-close-btn');

    const profileContainer = document.getElementById('profile-container');
    const profileContainerSide = document.getElementById('profile-container-sidebar');
    if(profileContainer) {
        let profile;
        let profileSidebar;

        if(authService.getToken()){
            try{
                const user = await authService.getMe();
                profile = `<div class="hidden sm:flex gap-2 text-lg">
                    <p>${user.username}</p>
                    <button class="logout-btn cursor-pointer hover:text-red-500 transition duration-100"><i data-lucide="log-out"></i></button>
                </div>`

                profileSidebar = `<div class="flex gap-2 text-lg cinzel-regular text-mt-light">
                    <p>${user.username}</p>
                    <button class="logout-btn cursor-pointer hover:text-red-500 transition duration-100"><i data-lucide="log-out"></i></button>
                </div>`
            }catch(error) {
                console.error(error);
            }
        } else {
            profile = `<div class="hidden sm:flex gap-2 flex-col lg:flex-row text-xs tracking-widest">
                <a href="#/sign-in" class="whitespace-nowrap rounded-lg py-2 px-4 border border-gold hover:bg-amber-100/10">Sign up</a>
                <a href="#/log-in" class="whitespace-nowrap rounded-lg py-2 px-4 border border-gold bg-gradient-red hover:saturate-120">Log in</a>
            </div>`

            profileSidebar = `<div class="flex cinzel-regular text-mt-light gap-2 flex-col text-xs tracking-widest">
                <a href="#/sign-in" class="whitespace-nowrap rounded-lg py-2 px-4 border border-gold hover:bg-amber-100/10">Sign up</a>
                <a href="#/log-in" class="whitespace-nowrap rounded-lg py-2 px-4 border border-gold bg-gradient-red hover:saturate-120">Log in</a>
            </div>`
        }

        profileContainer.innerHTML = profile;
        profileContainerSide.innerHTML = profileSidebar;
    }
    if(window.lucide) lucide.createIcons();
}