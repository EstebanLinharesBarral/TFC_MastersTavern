// pages/CharactersPage.js

export function renderCharactersPage() {

    return `<div class="p-8 flex flex-col gap-8">

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
                <button class="btn border-2 border-black caudex-regular text-white h-fit">
                    + Nuevo Personaje
                </button>

            </div>
        </div>

        <!-- CONTENIDO -->
        <div class="grid grid-cols-12 gap-8">
            <!-- LISTADO -->
            <section class="col-span-6 flex flex-col gap-6 back-mt-orange p-8 rounded-xl shadow-surround border-2 border-mt-dark min-h-80">
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

            <!-- ASIDE -->
            <aside class="col-span-6 flex flex-col gap-6">
                <div class="p-8 rounded-xl shadow-surround border-2 border-mt-dark bg-white">
                    <p class="caudex-regular text-sm">
                        Información adicional
                    </p>
                </div>
            </aside>
        </div>
    </div>`
}