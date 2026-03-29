// components/header.js
export function Header() {
    return `
    <div class="absolute grid grid-rows-12 hidden grid-cols-1 justify-center block w-80 h-full z-20 back-mt-light shadow-xl">
        <a class="justify-self-center row-span-3"><img src="src/assets/LogoMastersTavernSinFondo.png"></a>
        <div class="text-xl row-span-6">
            <a href="#" class="block p-4 m-2 border-b">Mis personajes</a>
            <a href="#" class="block p-4 m-2 border-b">Mis campañas</a>
            <a href="#" class="block p-4 m-2 border-b">Mis sesiones</a>
            <a href="#" class="block p-4 m-2 border-b">Social</a>
            <a href="#" class="block p-4 m-2 border-b">Mi perfil</a>
        </div>
        <div class="text-xl row-span-3">
            <a class="block p-4 m-2 border">Cerrar Sesión</a>
            <a class="block p-4 m-2 border">Cerrar Sesión</a>
            <a class="block p-4 m-2 border">Cerrar Sesión</a>
        </div>
    </div>
    
    <header class="absolutegroup grid grid-cols-2 border-b border-[#301B0F] back-mt-light text-mt-dark items-center p-3">
        <div class="flex">
            <button class="border"><i data-lucide="Menu"></i></button>
            <img src="src/assets/LogoEstiradoSinFondo.png" alt="logo">
        </div>
        <div class="flex justify-self-end gap-6">
            <a href="#">Wiki</a>
            <a href="#">Documentación</a>
            <a href="#">Noticias</a>
            <p><a href="#">Sign up</a><span> / </span><a href="#">Log in</a><p>
        </div>
    </header>`
}
