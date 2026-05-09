// pages/CharactersPage.js

export function renderCharactersPage() {

    return `<div class="px-8 pt-4 pb-8 flex flex-col gap-8">

        <!-- HEADER INTERNO -->
        <div class="border-b-2 pt-4 pb-4 flex flex-col gap-6">
            <!-- TÍTULO -->
            <div class="text-center">
                <h1 class="english-regular text-mt-dark text-3xl">
                    Mis Personajes
                </h1>
                <p></p>
            </div>

            <!-- CONTROLES -->
            <div class="flex justify-between items-end caudex-regular">
                <!-- IZQUIERDA -->
                <div class="flex gap-12">
                    <!-- ORDEN -->
                    <div class="flex flex-col gap-1">
                        <p>Ordenar por:</p>
                        <div class="grid grid-cols-4 w-[400px] border-2 border-black bg-[#BE2E12] px-4 py-1 rounded-full text-white">
                            <button class="hover:underline">Nombre</button>
                            <button class="hover:underline">Clase</button>
                            <button class="hover:underline">Nivel</button>
                            <button class="hover:underline">Raza</button>
                        </div>
                    </div>

                    <!-- VISTA -->
                    <div class="flex flex-col gap-1">
                        <p>Vista:</p>
                        <div class="flex gap-2 border-2 border-black bg-[#BE2E12] px-4 py-1 rounded-full text-white">
                            <button class="hover:scale-110 transition">
                                <i data-lucide="list"></i>
                            </button>
                            <button class="hover:scale-110 transition">
                                <i data-lucide="square"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- BOTÓN -->
                <a href="#/new-character" class="btn border-2 border-black caudex-regular text-white h-fit">
                    + Nuevo Personaje
                </a>

            </div>
        </div>

        <!-- CONTENIDO -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- LISTADO -->
            <section class="lg:col-span-6 flex flex-col gap-6 back-mt-orange p-8 rounded-xl shadow-surround border-2 border-mt-dark min-h-80">
                <!-- ITEM EJEMPLO -->
                <article class="flex justify-between items-center p-4 rounded-lg back-mt-light shadow-surround hover:scale-[1.05] duration-150">
                    <div class="flex flex-col">
                        <h2 class="english-regular text-lg">Nombre</h2>
                        <p class="caudex-regular text-sm">
                            Clase · Nivel · Raza
                        </p>
                    </div>
                </article>
            </section>

            <aside class="lg:col-span-6 flex flex-col gap-6">
    <div class="flex flex-col gap-6 p-4 rounded-xl shadow-surround border-2 border-mt-dark bg-[#FAF7F2]">

        <!-- CÍRCULOS -->
        <div class="flex flex-wrap justify-around gap-4">
            <div class="flex flex-col items-center gap-1 caudex-regular">
                <div class="w-14 flex items-center justify-center border-2 border-black rounded-full aspect-square bg-white">
                    <p class="text-lg">0</p>
                </div>
                <p class="text-xs">PG</p>
            </div>
            <div class="flex flex-col items-center gap-1 caudex-regular">
                <div class="w-14 flex items-center justify-center border-2 border-black rounded-full aspect-square bg-white">
                    <p class="text-lg">0</p>
                </div>
                <p class="text-xs">CA</p>
            </div>
            <div class="flex flex-col items-center gap-1 caudex-regular">
                <div class="w-14 flex items-center justify-center border-2 border-black rounded-full aspect-square bg-white">
                    <p class="text-lg">+0</p>
                </div>
                <p class="text-xs">Iniciativa</p>
            </div>
            <div class="flex flex-col items-center gap-1 caudex-regular">
                <div class="w-14 flex items-center justify-center border-2 border-black rounded-full aspect-square bg-white">
                    <p class="text-lg">0</p>
                </div>
                <p class="text-xs">Velocidad</p>
            </div>
            <div class="flex flex-col items-center gap-1 caudex-regular">
                <div class="w-14 flex items-center justify-center border-2 border-black rounded-full aspect-square bg-white">
                    <p class="text-lg">+0</p>
                </div>
                <p class="text-xs">Bono Atq</p>
            </div>
            <div class="flex flex-col items-center gap-1 caudex-regular">
                <div class="w-14 flex items-center justify-center border-2 border-black rounded-full aspect-square bg-white">
                    <p class="text-lg">0</p>
                </div>
                <p class="text-xs">Inspiración</p>
            </div>
            <div class="flex flex-col items-center gap-1 caudex-regular">
                <div class="w-14 flex items-center justify-center border-2 border-black rounded-full aspect-square bg-white">
                    <p class="text-lg">+0</p>
                </div>
                <p class="text-xs">Proficiencia</p>
            </div>
        </div>

        <!-- ESTADÍSTICAS BASE -->
        <div class="grid grid-cols-3 gap-6">
            <div class="relative flex flex-col caudex-regular items-center">
                <div class="border-2 border-black rounded-2xl bg-white flex flex-col items-center w-full">
                    <p class="caudex-bold text-lg py-1 truncate px-1">Fuerza</p>
                    <div class="border-t-2 border-black w-full flex items-center justify-center aspect-square">
                        <p class="text-6xl">0</p>
                    </div>
                </div>
                <div class="absolute bottom-0 translate-y-1/2 border-2 border-black bg-white rounded-full aspect-square w-7 flex-shrink-0 flex items-center justify-center">
                    <p class="text-xs">10</p>
                </div>
            </div>
            <div class="relative flex flex-col caudex-regular items-center">
                <div class="border-2 border-black rounded-2xl bg-white flex flex-col items-center w-full">
                    <p class="caudex-bold text-lg py-1 truncate px-1">Destreza</p>
                    <div class="border-t-2 border-black w-full flex items-center justify-center aspect-square">
                        <p class="text-6xl">0</p>
                    </div>
                </div>
                <div class="absolute bottom-0 translate-y-1/2 border-2 border-black bg-white rounded-full aspect-square w-7 flex-shrink-0 flex items-center justify-center">
                    <p class="text-xs">10</p>
                </div>
            </div>
            <div class="relative flex flex-col caudex-regular items-center">
                <div class="border-2 border-black rounded-2xl bg-white flex flex-col items-center w-full">
                    <p class="caudex-bold text-lg py-1 truncate px-1">Constitución</p>
                    <div class="border-t-2 border-black w-full flex items-center justify-center aspect-square">
                        <p class="text-6xl">0</p>
                    </div>
                </div>
                <div class="absolute bottom-0 translate-y-1/2 border-2 border-black bg-white rounded-full aspect-square w-7 flex-shrink-0 flex items-center justify-center">
                    <p class="text-xs">10</p>
                </div>
            </div>
            <div class="relative flex flex-col caudex-regular items-center">
                <div class="border-2 border-black rounded-2xl bg-white flex flex-col items-center w-full">
                    <p class="caudex-bold text-lg py-1 truncate px-1">Inteligencia</p>
                    <div class="border-t-2 border-black w-full flex items-center justify-center aspect-square">
                        <p class="text-6xl">0</p>
                    </div>
                </div>
                <div class="absolute bottom-0 translate-y-1/2 border-2 border-black bg-white rounded-full aspect-square w-7 flex-shrink-0 flex items-center justify-center">
                    <p class="text-xs">10</p>
                </div>
            </div>
            <div class="relative flex flex-col caudex-regular items-center">
                <div class="border-2 border-black rounded-2xl bg-white flex flex-col items-center w-full">
                    <p class="caudex-bold text-lg py-1 truncate px-1">Sabiduría</p>
                    <div class="border-t-2 border-black w-full flex items-center justify-center aspect-square">
                        <p class="text-6xl">0</p>
                    </div>
                </div>
                <div class="absolute bottom-0 translate-y-1/2 border-2 border-black bg-white rounded-full aspect-square w-7 flex-shrink-0 flex items-center justify-center">
                    <p class="text-xs">10</p>
                </div>
            </div>
            <div class="relative flex flex-col caudex-regular items-center">
                <div class="border-2 border-black rounded-2xl bg-white flex flex-col items-center w-full">
                    <p class="caudex-bold text-lg py-1 truncate px-1">Carisma</p>
                    <div class="border-t-2 border-black w-full flex items-center justify-center aspect-square">
                        <p class="text-6xl">0</p>
                    </div>
                </div>
                <div class="absolute bottom-0 translate-y-1/2 border-2 border-black bg-white rounded-full aspect-square w-7 flex-shrink-0 flex items-center justify-center">
                    <p class="text-xs">10</p>
                </div>
            </div>
        </div>

    </div>
</aside>
        </div>
    </div>`
}