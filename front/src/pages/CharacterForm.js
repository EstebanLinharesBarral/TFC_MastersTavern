// pages/CharacterForm.js

export function renderCharacterForm() {

    return `<div class="p-6 flex flex-col gap-6 max-w-5xl mx-auto caudex-regular">

    <h1 class="english-regular text-mt-dark text-3xl text-center">Hoja de Personaje</h1>

    <form id="character-form" class="border-2 border-black bg-[#FAF7F2] p-8 rounded-xl flex flex-col gap-5">

    <!-- ===================== CABECERA: PERSONAJE + ATRIBUTOS ===================== -->
    <div class="grid grid-cols-2 gap-4">

        <!-- ================= PERSONAJE ================= -->
        <div class="border-2 border-mt-dark rounded-xl p-5 bg-[#FAF7F2] flex flex-col gap-4">
            <h2 class="english-regular text-xl text-center border-b-2 border-mt-dark pb-1">
                Personaje
            </h2>

            <!-- Nombre + Nivel -->
            <div class="flex flex-col gap-1">
                <label class="text-xs caudex-bold">Nombre</label>

                <div class="relative flex items-center">
                    <input type="text" name="nombre"
                        class="border-2 border-black rounded-lg px-3 py-2 text-sm bg-white w-48 pr-12" />

                    <div class="absolute -bottom-5 right-0 flex items-center gap-1">
                        <span class="text-xs caudex-bold">Nv</span>
                        <div class="border-2 border-black rounded-full w-9 h-9 bg-white flex items-center justify-center">
                            <input type="number" name="nivel" min="1" max="20" value="1"
                                class="w-full h-full text-center text-xs bg-transparent outline-none" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Clase + Raza -->
            <div class="grid grid-cols-2 gap-3">
                <div class="flex flex-col gap-1">
                    <label class="text-xs caudex-bold">Clase</label>
                    <input type="text" name="clase"
                        class="border-2 border-black rounded-lg px-3 py-2 text-sm bg-white" />
                </div>

                <div class="flex flex-col gap-1">
                    <label class="text-xs caudex-bold">Raza</label>
                    <input type="text" name="raza"
                        class="border-2 border-black rounded-lg px-3 py-2 text-sm bg-white" />
                </div>
            </div>

            <!-- DESCRIPCIÓN -->
            <div class="flex flex-col gap-1">
                <label class="text-xs caudex-bold">Descripción</label>
                <textarea name="descripcion" rows="4"
                    class="border-2 border-black rounded-lg px-3 py-2 text-xs bg-white resize-none"
                    placeholder="Describe tu personaje..."></textarea>
            </div>
        </div>

        <!-- ================= ATRIBUTOS ================= -->
        <div class="border-2 border-mt-dark rounded-xl p-5 bg-[#FAF7F2] flex flex-col gap-4">
            <h2 class="english-regular text-xl text-center border-b-2 border-mt-dark pb-1">
                Atributos
            </h2>

            <div class="grid grid-cols-3 gap-4">

                <!-- FUERZA -->
                <div class="flex flex-col items-center gap-1">
                <span class="text-xs caudex-bold">Fuerza</span>
                <div class="w-20 h-20 border-2 border-black rounded-xl bg-white flex flex-col items-center justify-center">
                    <span class="text-4xl">0</span>
                    <input type="number" name="fuerza" value="0" placeholder="0" max="99"
                    class="w-12 text-center text-lg bg-transparent outline-none no-spinner" />
                </div>
                </div>

                <!-- DESTREZA -->
                <div class="flex flex-col items-center gap-1">
                <span class="text-xs caudex-bold">Destreza</span>
                <div class="w-20 h-20 border-2 border-black rounded-xl bg-white flex flex-col items-center justify-center">
                    <span class="text-4xl">0</span>
                    <input type="number" name="destreza" value="0" placeholder="0" max="99"
                    class="w-12 text-center text-lg bg-transparent outline-none no-spinner" />
                </div>
                </div>

                <!-- CONSTITUCIÓN -->
                <div class="flex flex-col items-center gap-1">
                <span class="text-xs caudex-bold">Constitución</span>
                <div class="w-20 h-20 border-2 border-black rounded-xl bg-white flex flex-col items-center justify-center">
                    <span class="text-4xl">0</span>
                    <input type="number" name="constitucion" value="0" placeholder="0" max="99"
                    class="w-12 text-center text-lg bg-transparent outline-none no-spinner" />
                </div>
                </div>

                <!-- INTELIGENCIA -->
                <div class="flex flex-col items-center gap-1">
                <span class="text-xs caudex-bold">Inteligencia</span>
                <div class="w-20 h-20 border-2 border-black rounded-xl bg-white flex flex-col items-center justify-center">
                    <span class="text-4xl">0</span>
                    <input type="number" name="inteligencia" value="0" placeholder="0" max="99"
                    class="w-12 text-center text-lg bg-transparent outline-none no-spinner" />
                </div>
                </div>

                <!-- SABIDURÍA -->
                <div class="flex flex-col items-center gap-1">
                <span class="text-xs caudex-bold">Sabiduría</span>
                <div class="w-20 h-20 border-2 border-black rounded-xl bg-white flex flex-col items-center justify-center">
                    <span class="text-4xl">0</span>
                    <input type="number" name="sabiduria" value="0" placeholder="0" max="99"
                    class="w-12 text-center text-lg bg-transparent outline-none no-spinner" />
                </div>
                </div>

                <!-- CARISMA -->
                <div class="flex flex-col items-center gap-1">
                <span class="text-xs caudex-bold">Carisma</span>
                <div class="w-20 h-20 border-2 border-black rounded-xl bg-white flex flex-col items-center justify-center">
                    <span class="text-4xl">0</span>
                    <input type="number" name="carisma" value="0" placeholder="0" max="99"
                    class="w-12 text-center text-lg bg-transparent outline-none no-spinner" />
                </div>
                </div>

            </div>
        </div>

    </div>

    <!-- ===================== EQUIPO ===================== -->
    <div class="grid grid-cols-2 gap-4">

        <!-- ARMAS -->
        <div class="border-2 border-mt-dark rounded-xl p-5 bg-[#FAF7F2] flex flex-col gap-4">
            <h2 class="english-regular text-xl text-center border-b-2 border-mt-dark pb-1">
                Armas
            </h2>

            <div id="armas-container" class="flex flex-col gap-3">
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" name="arma_nombre" placeholder="Nombre"
                        class="border-2 border-black rounded-lg px-2 py-1 text-xs bg-white" />
                    <input type="text" name="arma_bonificador" placeholder="Bonificador"
                        class="border-2 border-black rounded-lg px-2 py-1 text-xs bg-white" />
                    <input type="text" name="arma_tipo" placeholder="Tipo de daño"
                        class="border-2 border-black rounded-lg px-2 py-1 text-xs bg-white" />
                    <input type="text" name="arma_dado" placeholder="Dado"
                        class="border-2 border-black rounded-lg px-2 py-1 text-xs bg-white" />
                </div>
            </div>

            <button type="button" id="add-arma"
                class="btn border-2 border-black text-white text-xs w-fit px-3 py-1 self-center">
                + Añadir arma
            </button>
        </div>

        <!-- ARMADURA -->
        <div class="border-2 border-mt-dark rounded-xl p-5 bg-[#FAF7F2] flex flex-col gap-4">
            <h2 class="english-regular text-xl text-center border-b-2 border-mt-dark pb-1">
                Armadura
            </h2>

            <div id="armadura-container" class="flex flex-col gap-3">
                <input type="text" name="armadura_nombre" placeholder="Nombre"
                    class="border-2 border-black rounded-lg px-2 py-1 text-xs bg-white" />

                <input type="text" name="armadura_tipo" placeholder="Tipo"
                    class="border-2 border-black rounded-lg px-2 py-1 text-xs bg-white" />

                <div class="flex gap-4 justify-center">
                    <div class="flex flex-col items-center gap-1">
                        <input type="number" name="armadura_ca"
                            class="border-2 border-black rounded-full w-12 h-12 text-center text-sm bg-white" />
                        <label class="text-xs">CA</label>
                    </div>

                    <div class="flex flex-col items-center gap-1">
                        <input type="number" name="armadura_sigilo"
                            class="border-2 border-black rounded-full w-12 h-12 text-center text-sm bg-white" />
                        <label class="text-xs">Sigilo</label>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- ===================== BOTONES ===================== -->
    <div class="flex gap-4 justify-center pt-2">
        <button type="submit" class="btn border-2 border-black text-white px-8 py-2 text-sm">
            Guardar personaje
        </button>
        <button type="button" class="btn border-2 border-black text-white px-8 py-2 text-sm">
            Cancelar
        </button>
    </div>

</form>
</div>

<style>
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }
</style>`
}