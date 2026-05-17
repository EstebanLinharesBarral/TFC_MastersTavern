// pages/CharacterForm.js

export function renderCharacterForm() {

    setTimeout(async () => {
        const form = document.querySelector('form');

        
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            for (const [key, value] of formData) {
                console.log(key, value);
            }

            const saveList = document.getElementById('save-list');
            const saveInput = saveList.querySelectorAll('input[type="checkbox"]');
            const saveArr = [];

            saveInput.forEach(i => {
                if(i.checked) saveArr.push(i.name);
            })

            const abilitiesList = document.getElementById('abilities-list');
            const abilitiesInput = abilitiesList.querySelectorAll('input[type="checkbox"]');
            const abilitiesArr = [];

            abilitiesInput.forEach(i => {
                if(i.checked) abilitiesArr.push(i.name);
            })

            const payload = {
                name: formData.name,
                level: formData.level,
                class: formData.class,
                race: formData.race,
                alignment: formData.alignment,
                salvation: saveArr,
                abilities: abilitiesArr,
                background: formData.background,
                feats: formData.feats,
                inventory: formData.inventory
            }
        })

    }, 0)

    return `<div class="px-8 pt-4 pb-8 flex flex-col gap-8">

        <!-- TÍTULO -->
        <div class="mt-8 text-center">
            <h2 class="decorative-bold text-mt-light text-3xl">Hoja de Personaje</h2>
            <p class="garamond-italic text-mt-lighter text-md mt-2">Crea a tu próximo/a aventurero/a</p>
        </div>

        <!-- CONTENIDO -->
        <form class="w-full">
                <div class=" bg-[#130900] rounded-lg border-2 border-brown-light overflow-hidden">

                    <!-- HEADER -->
                    <div class="flex items-start gap-4 border-b border-brown-light p-4">

                        <!-- AVATAR -->
                        <div class="flex flex-col items-center gap-1 flex-shrink-0">
                            <label for="avatar" class="cinzel-regular text-mt-light text-xs">Avatar</label>
                            <div class="rounded-full overflow-hidden border-2 border-gold size-16">
                                <input type="file" id="avatar" name="avatar" class="size-full">
                            </div>
                        </div>

                        <!-- CAMPOS -->
                        <div class="flex flex-col gap-2 flex-1 min-w-0">

                            <!-- FILA 1: Nombre -->
                            <div class="flex flex-col">
                                <label for="name" class="cinzel-regular text-mt-light text-xs">Nombre</label>
                                <input id="name" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg" name="name" type="text" placeholder="Nombre del personaje">
                            </div>

                            <!-- FILA 2: Nivel · Clase · Raza · Alineamiento -->
                            <div class="grid grid-cols-1 md:grid-cols-[40px_1fr_1fr_1fr] gap-2 items-end">
                                <div class="flex flex-col">
                                    <label for="level" class="cinzel-regular text-mt-light text-xs">Nivel</label>
                                    <input id="level" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-gold rounded-full size-10 text-center" name="level" type="number">
                                </div>
                                <div class="flex flex-col">
                                    <label class="cinzel-regular text-mt-light text-xs">Clase</label>
                                    <select name="class" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg">
                                        <option value="">—</option>
                                        <option value="barbarian">Bárbaro</option>
                                        <option value="bard">Bardo</option>
                                        <option value="cleric">Clérigo</option>
                                        <option value="druid">Druida</option>
                                        <option value="fighter">Guerrero</option>
                                        <option value="monk">Monje</option>
                                        <option value="paladin">Paladín</option>
                                        <option value="ranger">Explorador</option>
                                        <option value="rogue">Pícaro</option>
                                        <option value="sorcerer">Hechicero</option>
                                        <option value="warlock">Brujo</option>
                                        <option value="wizard">Mago</option>
                                        <option value="artificer">Artífice</option>
                                    </select>
                                </div>
                                <div class="flex flex-col">
                                    <label class="cinzel-regular text-mt-light text-xs">Raza</label>
                                    <select name="race" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg">
                                        <option value="">—</option>
                                        <option value="dragonborn">Dracónido</option>
                                        <option value="dwarf-hill">Enano de las colinas</option>
                                        <option value="dwarf-mountain">Enano de la montaña</option>
                                        <option value="elf-dark">Elfo oscuro</option>
                                        <option value="elf-high">Elfo alto</option>
                                        <option value="elf-wood">Elfo del bosque</option>
                                        <option value="gnome-forest">Gnomo del bosque</option>
                                        <option value="gnome-rock">Gnomo de las rocas</option>
                                        <option value="half-elf">Semielfo</option>
                                        <option value="half-orc">Semiorco</option>
                                        <option value="halfling-lightfoot">Mediano piesligeros</option>
                                        <option value="halfling-stout">Mediano fornido</option>
                                        <option value="human">Humano</option>
                                        <option value="tiefling">Tiefling</option>
                                    </select>
                                </div>
                                <div class="flex flex-col">
                                    <label class="cinzel-regular text-mt-light text-xs">Alineamiento</label>
                                    <select name="alignment" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg">
                                        <option value="">—</option>
                                        <option value="lg">Legal Bueno</option>
                                        <option value="ng">Neutral Bueno</option>
                                        <option value="cg">Caótico Bueno</option>
                                        <option value="ln">Legal Neutral</option>
                                        <option value="tn">Neutral</option>
                                        <option value="cn">Caótico Neutral</option>
                                        <option value="le">Legal Malvado</option>
                                        <option value="ne">Neutral Malvado</option>
                                        <option value="ce">Caótico Malvado</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ESTADÍSTICAS -->
                    <div class="flex items-center justify-around border-b-2 border-brown-light p-4">
                        <div class="flex flex-col gap-1 items-center cinzel-medium">
                            <input name="PG" type="number" min="-999" max="999" class="text-lg text-mt-lighter text-center rounded-full overflow-hidden border border-gold bg-[#ffffff04] size-10 md:size-14">
                            <p class="text-mt-sublight text-[11px]">PG</p>
                        </div>
                        <div class="flex flex-col gap-1 items-center cinzel-medium">
                            <input name="CA" type="number" min="-999" max="999" class="text-lg text-mt-lighter text-center rounded-full overflow-hidden border border-gold bg-[#ffffff04] size-10 md:size-14">
                            <p class="text-mt-sublight text-[11px]">CA</p>
                        </div>
                        <div class="flex flex-col gap-1 items-center cinzel-medium">
                            <input name="INIT" type="number" min="-999" max="999" class="text-lg text-mt-lighter text-center rounded-full overflow-hidden border border-gold bg-[#ffffff04] size-10 md:size-14">
                            <p class="text-mt-sublight text-[11px]">Init</p>
                        </div>
                        <div class="flex flex-col gap-1 items-center cinzel-medium">
                            <input name="VEL" type="number" min="-999" max="999" class="text-lg text-mt-lighter text-center rounded-full overflow-hidden border border-gold bg-[#ffffff04] size-10 md:size-14">
                            <p class="text-mt-sublight text-[11px]">Vel</p>
                        </div>
                        <div class="flex flex-col gap-1 items-center cinzel-medium">
                            <input name="ATAQ" type="number" min="-999" max="999" class="text-lg text-mt-lighter text-center rounded-full overflow-hidden border border-gold bg-[#ffffff04] size-10 md:size-14">
                            <p class="text-mt-sublight text-[11px]">Atq</p>
                        </div>
                        <div class="flex flex-col gap-1 items-center cinzel-medium">
                            <input name="PROF" type="number" min="-999" max="999" class="text-lg text-mt-lighter text-center rounded-full overflow-hidden border border-gold bg-[#ffffff04] size-10 md:size-14">
                            <p class="text-mt-sublight text-[11px]">Prof</p>
                        </div>
                    </div>

                    <!-- ATRIBUTOS -->
                    <div class="grid grid-cols-3 divide-x divide-[#2f2207c8] back-mt-darker">
                        <div class="divide-y divide-[#2f2207c8]">
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-sm md:text-base">Fuerza</p>
                                <p class="text-mt-lighter text-4xl">8</p>
                                <input name="str" type="number" class="text-mt-sublight text-[14px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8] text-center w-[40px]">
                            </div>
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-sm md:text-base">Destreza</p>
                                <p class="text-mt-lighter text-4xl">8</p>
                                <input name="dex" type="number" class="text-mt-sublight text-[14px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8] text-center w-[40px]">
                            </div>
                        </div>
    
                        <div class="divide-y divide-[#2f2207c8]">
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-sm md:text-base">Constitución</p>
                                <p class="text-mt-lighter text-4xl">8</p>
                                <input name="con" type="number" class="text-mt-sublight text-[14px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8] text-center w-[40px]">
                            </div>
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-sm md:text-base">Inteligencia</p>
                                <p class="text-mt-lighter text-4xl">8</p>
                                <input name="int" type="number" class="text-mt-sublight text-[14px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8] text-center w-[40px]">
                            </div>
                        </div>
    
                        <div class="divide-y divide-[#2f2207c8]">
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-sm md:text-base">Sabiduría</p>
                                <p class="text-mt-lighter text-4xl">8</p>
                                <input name="wis" type="number" class="text-mt-sublight text-[14px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8] text-center w-[40px]">
                            </div>
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-sm md:text-base">Carisma</p>
                                <p class="text-mt-lighter text-4xl">8</p>
                                <input name="cha" type="number" class="text-mt-sublight text-[14px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8] text-center w-[40px]">
                            </div>
                        </div>
                    </div>

                    <!-- SALVACIÓN Y HABILIDADES -->
                    <div class="grid grid-cols-2 gap-4 divide-x divide-[#2f2207c8] back-mt-darker p-4">
                        <div class="flex flex-col gap-6">
                            <div>
                                <p class="cinzel-medium text-mt-sublight text-xs mb-2">
                                    Tiradas de Salvación
                                </p>

                                <ul id="save-list">
                                    <li>
                                        <label class="flex gap-2 items-center cursor-pointer">
                                            <input name="save-str" type="checkbox" class="peer hidden">
                                            <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                            <p class="garamond-regular text-sm md:text-base text-mt-lighter">Fuerza</p>
                                            <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">-1</p>
                                        </label>
                                    </li>

                                    <li>
                                        <label class="flex gap-2 items-center cursor-pointer">
                                            <input name="save-dex" type="checkbox" class="peer hidden">
                                            <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                            <p class="garamond-regular text-sm md:text-base text-mt-lighter">Destreza</p>
                                            <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">-1</p>
                                        </label>
                                    </li>

                                    <li>
                                        <label class="flex gap-2 items-center cursor-pointer">
                                            <input name="save-con" type="checkbox" class="peer hidden">
                                            <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                            <p class="garamond-regular text-sm md:text-base text-mt-lighter">Constitución</p>
                                            <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">-1</p>
                                        </label>
                                    </li>

                                    <li>
                                        <label class="flex gap-2 items-center cursor-pointer">
                                            <input name="save-int" type="checkbox" class="peer hidden">
                                            <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                            <p class="garamond-regular text-sm md:text-base text-mt-lighter">Inteligencia</p>
                                            <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">-1</p>
                                        </label>
                                    </li>

                                    <li>
                                        <label class="flex gap-2 items-center cursor-pointer">
                                            <input name="save-wis" type="checkbox" class="peer hidden">
                                            <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                            <p class="garamond-regular text-sm md:text-base text-mt-lighter">Sabiduría</p>
                                            <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">-1</p>
                                        </label>
                                    </li>

                                    <li>
                                        <label class="flex gap-2 items-center cursor-pointer">
                                            <input name="save-cha" type="checkbox" class="peer hidden">
                                            <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                            <p class="garamond-regular text-sm md:text-base text-mt-lighter">Carisma</p>
                                            <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">-1</p>
                                        </label>
                                    </li>
                                </ul>
                            </div>

                            <div class="flex flex-col gap-4 w-full">
                                <!-- ARMAS -->
                                <div class="mr-4">
                                    <p class="cinzel-medium text-mt-sublight text-xs mb-2">Armas</p>
                                    <ul id="weapon-list" class="flex flex-col gap-1 mb-2"></ul>
                                    <div class="flex flex-col md:flex-row gap-2 flex-wrap w-full">
                                        <input name="weapon-name" type="text" placeholder="Nombre" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg flex-1 w-full">
                                        <input name="weapon-damage" type="text" placeholder="Daño (ej. 1d8)" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg w-full md:w-24">
                                        <input name="weapon-type" type="text" placeholder="Tipo" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg w-full md:w-24">
                                        <button type="button" onclick="addWeapon()" class="cinzel-regular text-mt-light text-xs px-3 py-1 border border-brown-light rounded-md hover:bg-amber-100/10 hover:cursor-pointer whitespace-nowrap">+ Añadir</button>
                                    </div>
                                </div>

                                <!-- ARMADURA -->
                                <div class="mr-4">
                                    <p class="cinzel-medium text-mt-sublight text-xs mb-2">Armadura</p>
                                    <div class="flex flex-col md:flex-row gap-2 flex-wrap w-full">
                                        <input name="armor-name" type="text" placeholder="Nombre" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg flex-1 w-full">
                                        <input name="armor-type" type="text" placeholder="Tipo" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg w-full md:w-24">
                                        <input name="armor-ac" type="number" placeholder="CA" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg w-full md:w-24 text-center">
                                    </div>
                                </div>

                                <!-- HECHIZOS -->
                                <div class="mr-4">
                                    <p class="cinzel-medium text-mt-sublight text-xs mb-2">Hechizos</p>
                                    <ul id="spell-list" class="flex flex-col gap-1 mb-2"></ul>
                                    <div class="flex flex-col md:flex-row gap-2 flex-wrap w-full">
                                        <input id="spell-input" type="text" placeholder="Nombre del hechizo" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg flex-1 w-full">
                                        <button type="button" onclick="addSpell()" class="cinzel-regular text-mt-light text-xs px-3 py-1 border border-brown-light rounded-md hover:bg-amber-100/10 hover:cursor-pointer whitespace-nowrap">+ Añadir</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                        <!-- HABILIDADES -->
                        <div>
                            <p class="cinzel-medium text-mt-sublight text-xs mb-2">Habilidades</p>
                            <ul id="abilities-list" class="space-y-1">

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="acrobatics" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Acrobacias <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Des)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="athletics" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Atletismo <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Fue)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="arcana" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Arcano <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Int)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="deception" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Engaño <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Car)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="history" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Historia <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Int)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="insight" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Interpretación <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Car)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="intimidation" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Intimidación <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Car)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="investigation" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Investigación <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Int)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="sleight-of-hand" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Juego de Manos <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Des)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="medicine" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Medicina <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Sab)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="nature" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Naturaleza <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Int)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="perception" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Percepción <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Sab)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="insight" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Perspicacia <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Sab)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="persuasion" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Persuasión <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Car)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="religion" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Religión <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Int)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="stealth" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Sigilo <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Des)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="survival" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Supervivencia <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Sab)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                                <li>
                                    <label class="flex gap-2 items-center cursor-pointer">
                                        <input name="animal-handling" type="checkbox" class="peer hidden">
                                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">Trato con Animales <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(Sab)</span></p>
                                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">0</p>
                                    </label>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <!-- TRASFONDO -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-brown-light px-4 py-2">
                        <div>
                            <label class="cinzel-medium text-mt-sublight text-base mb-2">Trasfondo</label>
                            <textarea name="background" class="garamond-regular text-mt-lighter w-full border border-brown-light"></textarea>
                        </div>
                        <div >
                            <label class="cinzel-medium text-mt-sublight text-base mb-2">Dotes</label>
                            <textarea name="feats" class="garamond-regular text-mt-lighter w-full border border-brown-light"></textarea>
                        </div>
                        <div >
                            <label class="cinzel-medium text-mt-sublight text-base mb-2">Inventario</label>
                            <textarea name="inventory" class="garamond-regular text-mt-lighter w-full border border-brown-light"></textarea>
                        </div>
                    </div>

                    <!-- BOTONES -->
                    <div class="flex justify-end border-t gap-2 border-brown-light px-4 py-2">
                        <button class="text-center border border-brown-light rounded-md cinzel-regular text-mt-light text-xs px-4 py-2 tracking-wide hover:bg-amber-100/10 hover:cursor-pointer">Cancelar</button>
                        <button type="submit" class="block border border-gold rounded-md text-center text-mt-light cinzel-regular text-xs tracking-wide py-2 px-4 bg-gradient-red hover:saturate-120">Guardar</button>
                    </div>
                </div>

            </form>

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