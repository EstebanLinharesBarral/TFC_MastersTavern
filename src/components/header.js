// components/header.js
export function Header() {
    return `<header class="grid grid-cols-3 items-center p-3">
        <button><i data-lucide="Menu"></i></button>
            <div class="justify-self-center"><img src="src/assets/LogoMastersTavernSinFondo.png" alt="logo"></div>
            <div class="flex justify-self-end"><p><a href="#">Sign up</a><span>/</span><a href="#">Log in</a><p></div>
    </header>
    <nav>
        <ul class="grid grid-cols-5 list-none justify-items-center mt-3">
            <li><a href="#" class="block py-3 px-6 rounded-md">Contacto</a></li>
            <li><a href="#" class="block py-3 px-6 rounded-md">Manuales</a></li>
            <li><a href="#" class="block py-3 px-6 rounded-md">Wiki</a></li>
            <li><a href="#" class="block py-3 px-6 rounded-md">Noticias</a></li>
            <li><a href="#" class="block py-3 px-6 rounded-md">Social</a></li>
        </ul>
    </nav>`
}
