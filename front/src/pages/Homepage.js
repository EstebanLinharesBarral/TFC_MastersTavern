// pages/Homepage.js

export function renderHomepage() {
    //SI NO HAY UN USUARIO CONECTADO CAMBIAR EL CONTENIDO DE LAS SECTIONS
    return `<div class="">
        <div id="hero-container" class="flex flex-col items-center md:items-start max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-[100rem] mx-auto space-y-6 my-24">
            <h2 class="text-mt-light decorative-bold font-bold text-4xl md:text-5xl">
                <p>Bienvenido a </p>
                <p><span class="text-amber-600 text-glow-torch">Masters</span>Tavern</p>
            </h2>
            <p class="garamond-italic text-mt-lighter text-lg">Gestiona tus partidas y personajes de rol</p>
            <a href="#/character-form" class="flex tracking-widest items-center gap-2 justify-center cinzel-regular w-fit text-mt-light text-sm rounded-lg bg-gradient-red border-2 border-gold py-3 px-8 hover:saturate-120"><i data-lucide="swords"></i>  Crear Nuevo Personaje</a>
            <a href="#/" class="flex tracking-widest items-center gap-2 justify-center cinzel-regular w-fit text-mt-light text-sm rounded-lg bg-gradient-brown border border-gold py-3 px-8 hover:saturate-150"><i data-lucide="map"></i>  Explorar partidas</a>
        </div>

        <div id="info-section" class="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t-2 border-gold bg-[#170C03] min-h-[400px] p-12">

            <!-- SECCIÓN SESIONES -->
            <section class="grid grid-rows-10 border border-gold rounded-lg text-center text-mt-light bg-gradient-lightbrown shadow-2xl">
                <h3 class="cinzel-bold bg-gradient-brown row-span-1 tracking-widest border-b border-gold-light py-3 px-8">Últimas Sesiones</h3>
                <div class="p-6 row-span-8">
                    <div class="bg-[url(src/assets/party_bg.jpg)] rounded-md border border-gold-light min-h-[150px] bg-cover bg-[position:70%_75%] overflow-hidden"></div>
                    <ul id="sessions-list" class="garamond-regular list-inside text-start mt-8 divide-y divide-[#2f2207c8]">
                        <li class="flex justify-between items-center py-4"><span>Sesión de prueba</span><span class="text-mt-sublight text-sm">Hace 2 días</span></li>
                        <li class="flex justify-between items-center py-4"><span>Sesión de prueba</span><span class="text-mt-sublight text-sm">Hace 2 días</span></li>
                    </ul>
                </div>
                <a href="#/" class="row-span-1 cinzel-regular bottom-0 flex items-center gap-2 justify-center border-t-[1px] border-gold-light hover:bg-amber-100/10">Ver más <i data-lucide="move-right"></i></a>
            </section>

            <!-- SECCIÓN SOCIAL -->
            <section class="grid grid-rows-10 border border-gold rounded-lg text-center text-mt-light bg-gradient-lightbrown shadow-2xl">
                <h3 class="cinzel-bold bg-gradient-brown row-span-1 tracking-widest border-b border-gold-light py-3 px-8">Social</h3>
                <div class="p-6 row-span-8">
                    <ul id="social-list" class="garamond-regular list-inside text-start mt-4 space-y-6">
                        <li class="flex items-start">
                            <div class="rounded-full overflow-hidden border-2 border-gold w-14 mr-4 mt-2"><img src="src/assets/Orco icono.png"></div>
                            <div class="space-y-1">
                                <p class="cinzel-regular text-base tracking-wide">Paquito</p>
                                <p class="garamond-regular text-mt-lighter">Subí al nivel 5 por fin.</p>
                                <p class="text-mt-sublight text-sm">Ayer</p>
                            </div>
                        </li>

                        <li class="flex items-start">
                            <div class="rounded-full overflow-hidden border-2 border-gold w-14 mr-4 mt-2"><img src="src/assets/Elfo icono.png"></div>
                            <div class="space-y-1">
                                <p class="cinzel-regular text-base tracking-wide">Rosario</p>
                                <p class="garamond-regular text-mt-lighter">Ayer se murió mi personaje favorito :(</p>
                                <p class="text-mt-sublight text-sm">Hace 5 días</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <a href="#/" class="row-span-1 cinzel-regular bottom-0 flex items-center gap-2 justify-center border-t-[1px] border-gold-light hover:bg-amber-100/10">Ver más <i data-lucide="move-right"></i></a>
            </section>

            <!-- SECCIÓN NOTICIAS -->
            <section class="grid grid-rows-10 border border-gold rounded-lg text-center text-mt-light bg-gradient-lightbrown shadow-2xl">
                <h3 class="cinzel-bold bg-gradient-brown row-span-1 tracking-widest border-b border-gold-light py-3 px-8">Últimas Noticias</h3>
                <div class="p-6 row-span-8">
                    <ul id="news-list" class="garamond-regular list-inside text-start space-y-4">
                        <li class="flex flex-col items-start gap-4">
                            <div class="bg-[url(src/assets/swords_bg.jpg)] h-20 w-full bg-contains rounded-md border border-gold-light"></div>
                            <div class="space-y-1">
                                <p class="cinzel-regular text-base tracking-wide">Nuevo Bestiario Disponible</p>
                                <p class="garamond-regular text-mt-lighter">Descubre las nuevas criaturas para tus partidas</p>
                                <a href="#/" class="flex tracking-widest items-center gap-2 justify-center cinzel-regular w-fit text-mt-light text-sm rounded-lg bg-gradient-red border border-gold py-1 px-4 hover:saturate-120 mt-3">Leer Más</a>
                            </div>
                        </li>

                        <li class="flex flex-col items-start gap-4">
                            <div class="bg-[url(src/assets/swords_bg.jpg)] h-20 w-full bg-contains rounded-md border border-gold-light"></div>
                            <div class="space-y-1">
                                <p class="cinzel-regular text-base tracking-wide">Nuevo Bestiario Disponible</p>
                                <p class="garamond-regular text-mt-lighter">Descubre las nuevas criaturas para tus partidas</p>
                                <a href="#/" class="flex tracking-widest items-center gap-2 justify-center cinzel-regular w-fit text-mt-light text-sm rounded-lg bg-gradient-red border border-gold py-1 px-4 hover:saturate-120 mt-3">Leer Más</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <a href="#/" class="row-span-1 cinzel-regular bottom-0 flex items-center gap-2 justify-center border-t-[1px] border-gold-light hover:bg-amber-100/10">Ver más <i data-lucide="move-right"></i></a>
            </section>
        </div>
    </div>`
}