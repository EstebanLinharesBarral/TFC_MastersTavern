// components/footer.js

export function Footer() {
    return `
    <footer class="bottom-0 z-50 w-full border-t-2 border-gold bg-gradient-brown text-mt-sublight cinzel-regular shadow-lg">
        <div class="flex flex-col md:flex-row items-center justify-between px-4 py-3">

            <!-- LOGO -->
            <a href="#/" class="flex items-center gap-3 text-base decorative-bold">
                MastersTavern
            </a>

            <!-- NAV (desktop) -->
            <nav class="flex flex-col md:flex-row items-center gap-2 md:gap-6 px-6 text-sm">
                <a href="#" class="flex items-center p-2 rounded-xl hover:text-[#f4d891]">
                    Acerca de
                </a>

                <a href="#" class="flex items-center p-2 rounded-xl hover:text-[#f4d891]">
                    Contacto
                </a>

                <a href="#" class="flex items-center p-2 rounded-xl hover:text-[#f4d891]">
                    Privacidad
                </a>

                <a href="#" class="flex items-center p-2 rounded-xl hover:text-[#f4d891]">
                    Términos
                </a>
            </nav>

            <!-- USER -->
            <div class="flex items-center gap-3 garamond-regular text-sm">
                <p>© 2025 MastersTavern. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>`
}