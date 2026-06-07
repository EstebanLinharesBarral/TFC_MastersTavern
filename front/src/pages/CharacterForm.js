// pages/CharacterForm.js

import { fetchService } from "../services/FetchService.js";
import { skills, savingThrows, classes, races, alignments } from "../components/dicc.js";
import { sheetService } from "../services/SheetService.js";
import { renderErrorModal } from "../components/modal.js";
import { authService } from "../services/AuthService.js";

export function renderCharacterForm(id = 0) {

    if (!authService.getToken()) {
        window.location.hash = '/log-in';
        return '';
    }

    setTimeout(async () => {
        const form = document.querySelector('form');

        const paintDiccOptions = (name, dicc) => {
            const select = form.querySelector(`select[name="${name}"]`);
            Object.entries(dicc).forEach(([key, label]) => {
                select.innerHTML += `<option value="${key}">${label}</option>`
            })
        }

        // PINTAR CLASES
        paintDiccOptions('charClass', classes);
        // PINTAR RAZAS
        paintDiccOptions('race', races);
        // PINTAR ALINEAMIENTOS
        paintDiccOptions('alignment', alignments)

        // PINTAR ARMAS
        const weapons = await fetchService.get('/api/weapons');

        const weaponsList = document.getElementById('weapon-list');
        const weaponsSelect = document.querySelector('select[name="weapon-name"]');
        const damageInput = document.querySelector('input[name="weapon-damage"]');
        const wTypeInput = document.querySelector('input[name="weapon-type"]');
        const weaponBtn = document.getElementById('weapon-btn');

        weaponsSelect.innerHTML += `<option value="">Selecciona un arma...</option>`
        weapons.forEach(w => {
            weaponsSelect.innerHTML += `<option value="${w.id}">${w.name}</option>`;
        })

        weaponsSelect.addEventListener('change', (e) => {
            const weapon = weapons.filter(w =>
                w.id === Number.parseInt(weaponsSelect.value)
            );

            if(weapon.length > 0) {
                damageInput.value = weapon[0].damage;
                wTypeInput.value = weapon[0].type;
            }
        })

        let weaponArr = [];
        weaponBtn.addEventListener('click', (e) => {
            const weapon = weapons.filter(w =>
                w.id === Number.parseInt(weaponsSelect.value)
            );

            if (weapon.length > 0 && !weaponArr.includes(weapon[0].id)) {
                const w = weapon[0];
                const li = document.createElement("li");
                li.className = "flex justify-between ml-4 garamond-regular text-sm text-mt-dark";

                li.innerHTML = `
                    <p>${w.name} - ${w.damage} - ${w.type}</p>
                    <button data-id="${w.id}" data-action="delete" class="cursor-pointer">
                        <i data-lucide="x" class="size-4 hover:text-red-500"></i>
                    </button>`;

                weaponsList.appendChild(li);
                weaponArr.push(Number.parseInt(w.id));
            }

            weaponsList.addEventListener('click', (e) => {
                const btn = e.target.closest('button[data-action="delete"]');
                if (!btn) return;
                const id = btn.dataset.id;
                weaponArr = weaponArr.filter(w => w != id);
                btn.closest('li').remove();
            });

            if(window.lucide) lucide.createIcons();
        })

        // PINTAR ARMADURAS
        const armors = await fetchService.get('/api/armors/');

        const armorsSelect = document.querySelector('select[name="armor-name"]');
        const aTypeInput = document.querySelector('input[name="armor-type"]');
        const caInput = document.querySelector('input[name="armor-ca"]');

        armorsSelect.innerHTML += `<option value="">Selecciona una armadura...</option>`
        armors.forEach(w => {
            armorsSelect.innerHTML += `<option value="${w.id}">${w.name}</option>`;
        })

        armorsSelect.addEventListener('change', (e) => {
            const armor = armors.filter(w =>
                w.id === Number.parseInt(armorsSelect.value)
            );

            if(armor.length > 0) {
                aTypeInput.value = armor[0].type;
                caInput.value = armor[0].armor;
            } else {
                aTypeInput.value = '';
                caInput.value = 0;
            }
        })

        // DINAMISMO DE ATRIBUTOS
        let atributes = {
            STR: '',
            DEX: '',
            CON: '',
            INT: '',
            WIS: '',
            CHA: ''
        };

        const updateAbilities = (dicc, id) => {
            const abilitiesList = document.getElementById(id);
            let abilitiesInputs = abilitiesList.querySelectorAll('input');
            const abilitiesChecked = [];
            abilitiesInputs.forEach(ab => {if(ab.checked) abilitiesChecked.push(ab.name)} );
            
            abilitiesList.innerHTML = '';
            Object.entries(dicc).forEach(([key, value]) => {
                const prof = form.querySelector('input[name="PROF"]');
                const profValue = abilitiesChecked.includes(key) ? prof.value : 0;
                const attribute = form.querySelector(`input[name="${value.attribute}"]`);
                const abValue = sheetService.calculateAttribute(attribute.value, profValue);
    
                abilitiesList.innerHTML += `<li>
                    <label class="flex gap-2 items-center cursor-pointer">
                        <input name="${key}" type="checkbox" ${abilitiesChecked.includes(key) ? 'checked' : ''} class="peer hidden">
                        <span class="size-3 rounded-full border border-brown-light peer-checked:bg-[#F4D891]"></span>
                        <p class="garamond-regular text-sm md:text-base text-mt-lighter">${value.label} <span class="block sm:inline cinzel-medium text-mt-sublight text-xs md:text-sm ml-auto pr-4">(${value.attribute})</span></p>
                        <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">${abValue}</p>
                    </label>
                </li>`
            })

            abilitiesInputs = abilitiesList.querySelectorAll('input');
            abilitiesInputs.forEach(input => {
                input.addEventListener('change', (e) => {
                    updateAbilities(skills, 'abilities-list')
                    updateAbilities(savingThrows, 'save-list');
                })
            })
        }

        const limitValue = (input) => {
            input.value = input.value.slice(0,2);
            if(Number.parseInt(input.value) > 99) {
                input.value = 99;
            }
        }

        const numberInputs = form.querySelectorAll('input[type="number"]');
        const attributesList = document.getElementById('attributes-list');
        const att = attributesList.querySelectorAll('input');
        const prof = form.querySelector('input[name="PROF"]');
        const abilitiesList = document.getElementById('abilities-list');
        const abilitiesInputs = abilitiesList.querySelectorAll('input');

        att.forEach(input => {
            input.addEventListener('input', (e) => {
                limitValue(input);

                atributes[input.name.toUpperCase()] = sheetService.calculateAttribute(input.value);
                updateAbilities(skills, 'abilities-list');
                updateAbilities(savingThrows, 'save-list');

                input.previousElementSibling.textContent = atributes[input.name.toUpperCase()];
            })
        })

        prof.addEventListener('input', (e) => {
            updateAbilities(skills, 'abilities-list');
            updateAbilities(savingThrows, 'save-list');
        })

        numberInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                limitValue(input);
            })
        })

        updateAbilities(savingThrows, 'save-list');
        updateAbilities(skills, 'abilities-list');

        const avatar = form.querySelector('input[name="avatar"]');
        const img = document.getElementById('avatar-img');
        avatar.addEventListener('change', (e) => {
            const file = e.target.files[0];

            if (file) {
                img.src = URL.createObjectURL(file);
            }
        })

        if(id != 0 && id != undefined && id != null) {
            try {
                const response = await fetchService.get(`/api/characters?id=${id}`);
                const char = response[0];

                // ERROR SI NO EXISTE EL PERSONAJE
                if(char.length < 1) {
                    throw new Error("El personaje buscado no existe");
                }
                
                // PINTADO DE DATOS
                const avatarPreview = document.getElementById('avatar-img');
                avatarPreview.src= char.avatar;

                Object.keys(char).forEach(key => {
                    const input = form.querySelector(`[name="${key}"]`);
                    if (input && input.type != 'file') {
                        input.value = char[key] ?? "";
                    }
                });

                const statsList = document.getElementById('stats-list');
                const statsInputs = statsList.querySelectorAll('input');
                statsInputs.forEach((input, i) => {
                    input.value = char.stats[i];
                })

                const abilitiesList = document.getElementById('abilities-list');
                const abilitiesInputs = abilitiesList.querySelectorAll('input');
                abilitiesInputs.forEach(input => {
                    input.checked = char.abilities.includes(input.name);
                });

                const saveList = document.getElementById('save-list');
                const saveInputs = saveList.querySelectorAll('input');
                saveInputs.forEach(input => {
                    input.checked = char.salvation.includes(input.name);
                });

                const attributesList = document.getElementById('attributes-list');
                const att = attributesList.querySelectorAll('input');
                att.forEach(input => {
                    atributes[input.name.toUpperCase()] = sheetService.calculateAttribute(input.value);
                    updateAbilities(skills, 'abilities-list');
                    updateAbilities(savingThrows, 'save-list');

                    input.previousElementSibling.textContent = atributes[input.name.toUpperCase()];
                })

                // ARMADURA
                const armor = armors.filter(a => a.id === char.armor);
                if(armor.length > 0) {
                    armorsSelect.value = armor[0].id;
                    aTypeInput.value = armor[0].type;
                    caInput.value = armor[0].armor;
                }

                // ARMAS
                char.weapons.forEach(weapon => {
                    const w = weapons.filter(w => w.id == weapon)[0];
                    const li = document.createElement("li");
                    li.className = "flex justify-between ml-4 garamond-regular text-sm text-mt-dark";

                    li.innerHTML = `
                        <p>${w.name} - ${w.damage} - ${w.type}</p>
                        <button data-id="${w.id}" data-action="delete" class="cursor-pointer">
                            <i data-lucide="x" class="size-4 hover:text-red-500"></i>
                        </button>`;

                    weaponsList.appendChild(li);
                    weaponArr.push(Number.parseInt(w.id));

                    weaponsList.addEventListener('click', (e) => {
                    const btn = e.target.closest('button[data-action="delete"]');
                    if (!btn) return;
                    const id = btn.dataset.id;
                    weaponArr = weaponArr.filter(w => w != id);
                    btn.closest('li').remove();
                });

                    if(window.lucide) lucide.createIcons();
                })

            } catch(e) {
                console.error(e);
                const modal = renderErrorModal(e);
                document.body.insertAdjacentHTML("afterbegin", modal)
                window.location.hash = "#/my-characters";
            }
        }
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            // ARRAY DE TIRADAS DE SALVACIÓN
            const saveList = document.getElementById('save-list');
            const saveInput = saveList.querySelectorAll('input[type="checkbox"]');
            const saveArr = [];

            saveInput.forEach(i => {
                if(i.checked) saveArr.push(i.name);
            })

            // ARRAY DE HABILIDADES
            const abilitiesList = document.getElementById('abilities-list');
            const abilitiesInput = abilitiesList.querySelectorAll('input[type="checkbox"]');
            const abilitiesArr = [];

            abilitiesInput.forEach(i => {
                if(i.checked) abilitiesArr.push(i.name);
            })

            // ARRAY DE ESTADÍSTICAS
            const statsList = document.getElementById('stats-list');
            const statsInput = statsList.querySelectorAll('input');
            const statsArr = [];

            statsInput.forEach(i => {
                i.value = Number.parseInt(i.value);
                statsArr.push(i.value);
            })

            const payload = new FormData(form);

            // Avatar (File real desde input)
            if(form.querySelector('input[name="avatar"]').files[0]){
                payload.set("avatar", form.querySelector('input[name="avatar"]').files[0]);
            }

            // Campos simples
            payload.set("name", formData.get("name"));
            payload.set("level", Number(formData.get("level")));
            payload.set("charClass", formData.get("charClass"));
            payload.set("race", formData.get("race"));
            payload.set("alignment", formData.get("alignment"));

            // Stats (array → JSON string)
            payload.set("stats", JSON.stringify(statsArr));

            // Salvaciones (array → JSON string)
            payload.set("salvation", JSON.stringify(saveArr));

            // Habilidades (array → JSON string)
            payload.set("abilities", JSON.stringify(abilitiesArr));

            // Stats numéricos
            payload.set("STR", Number(formData.get("STR")));
            payload.set("DEX", Number(formData.get("DEX")));
            payload.set("CON", Number(formData.get("CON")));
            payload.set("INT", Number(formData.get("INT")));
            payload.set("WIS", Number(formData.get("WIS")));
            payload.set("CHA", Number(formData.get("CHA")));

            // Texto libre
            payload.set("background", formData.get("background"));
            payload.set("feats", formData.get("feats"));
            payload.set("inventory", formData.get("inventory"));

            // Relaciones
            if(weaponArr.length > 0) {
                payload.set("weapons", weaponArr);
            }

            if(Number(formData.get('armor-name')) != 0) {
                payload.set("armor", Number(formData.get('armor-name')))
            }

            try{
                if(id != 0 && id != undefined && id != null) {
                    if(avatar.files.length === 0) {
                        payload.delete("avatar");
                        const response = await fetchService.patch(`/api/characters/${id}/`, payload)
                    } else {
                        const response = await fetchService.put(`/api/characters/${id}/`, payload);
                    }
                } else {
                    const response = await fetchService.post('/api/characters/', payload)
                }
            } catch(e){
                const modal = renderErrorModal(e);
                document.body.insertAdjacentHTML("afterbegin", modal)
                console.error(e);
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
                        <div class="flex flex-col items-center gap-2 flex-shrink-0">
                            <div class="rounded-full overflow-hidden border-2 border-gold size-16">
                                <img id="avatar-img" src="" class="size-full object-cover object-center">
                            </div>
                            <label for="avatar" class="border border-gold rounded-md text-center text-mt-light cinzel-regular text-xs tracking-wide py-1 px-3 bg-gradient-red hover:saturate-120">Avatar</label>
                            <input type="file" id="avatar" name="avatar" class="hidden">
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
                                    <select name="charClass" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg">
                                        <option value="">—</option>
                                    </select>
                                </div>
                                <div class="flex flex-col">
                                    <label class="cinzel-regular text-mt-light text-xs">Raza</label>
                                    <select name="race" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg">
                                        <option value="">—</option>
                                    </select>
                                </div>
                                <div class="flex flex-col">
                                    <label class="cinzel-regular text-mt-light text-xs">Alineamiento</label>
                                    <select name="alignment" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg">
                                        <option value="">—</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ESTADÍSTICAS -->
                    <div id="stats-list" class="flex items-center justify-around border-b-2 border-brown-light p-4">
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
                    <div id="attributes-list" class="grid grid-cols-3 divide-x divide-[#2f2207c8] back-mt-darker">
                        <div class="divide-y divide-[#2f2207c8]">
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-sm md:text-base">Fuerza</p>
                                <p class="text-mt-lighter text-4xl">8</p>
                                <input name="STR" type="number" class="text-mt-sublight text-[14px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8] text-center w-[40px]">
                            </div>
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-sm md:text-base">Destreza</p>
                                <p class="text-mt-lighter text-4xl">8</p>
                                <input name="DEX" type="number" class="text-mt-sublight text-[14px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8] text-center w-[40px]">
                            </div>
                        </div>
    
                        <div class="divide-y divide-[#2f2207c8]">
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-sm md:text-base">Constitución</p>
                                <p class="text-mt-lighter text-4xl">8</p>
                                <input name="CON" type="number" class="text-mt-sublight text-[14px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8] text-center w-[40px]">
                            </div>
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-sm md:text-base">Inteligencia</p>
                                <p class="text-mt-lighter text-4xl">8</p>
                                <input name="INT" type="number" class="text-mt-sublight text-[14px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8] text-center w-[40px]">
                            </div>
                        </div>
    
                        <div class="divide-y divide-[#2f2207c8]">
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-sm md:text-base">Sabiduría</p>
                                <p class="text-mt-lighter text-4xl">8</p>
                                <input name="WIS" type="number" class="text-mt-sublight text-[14px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8] text-center w-[40px]">
                            </div>
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-sm md:text-base">Carisma</p>
                                <p class="text-mt-lighter text-4xl">8</p>
                                <input name="CHA" type="number" class="text-mt-sublight text-[14px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8] text-center w-[40px]">
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
                                    
                                    <div id="weapon-inputs" class="flex flex-col md:flex-row gap-2 flex-wrap w-full">
                                        <select name="weapon-name" placeholder="Nombre" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg flex-1 w-full"></select>
                                        <input name="weapon-damage" type="text" readonly placeholder="Daño (ej. 1d8)" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg w-full md:w-24">
                                        <input name="weapon-type" type="text" readonly placeholder="Tipo" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg w-full md:w-24">
                                        <button id="weapon-btn" type="button" class="cinzel-regular text-mt-light text-xs px-3 py-1 border border-brown-light rounded-md hover:bg-amber-100/10 hover:cursor-pointer whitespace-nowrap">+ Añadir</button>
                                    </div>

                                    <ul id="weapon-list" class="flex flex-col gap-1 mt-2 bg-gradient-white rounded-lg border-2 border-brown-light p-4">
                                        <h2 class="cinzel-bold text-mt-dark">Lista de armas</h2>
                                    </ul>
                                    <input name="hidden-weapons" type="hidden">
                                </div>

                                <!-- ARMADURA -->
                                <div class="mr-4">
                                    <p class="cinzel-medium text-mt-sublight text-xs mb-2">Armadura</p>
                                    <div class="flex flex-col md:flex-row gap-2 flex-wrap w-full">
                                        <select name="armor-name" type="text" placeholder="Nombre" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg flex-1 w-full"></select>
                                        <input name="armor-type" type="text" readonly placeholder="Tipo" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg w-full md:w-24">
                                        <input name="armor-ca" type="number" readonly placeholder="CA" class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg w-full md:w-24 text-center">
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
                                        <input name="interpretation" type="checkbox" class="peer hidden">
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
                        <a href="#/my-characters" class="text-center border border-brown-light rounded-md cinzel-regular text-mt-light text-xs px-4 py-2 tracking-wide hover:bg-amber-100/10 hover:cursor-pointer">Cancelar</a>
                        <button type="submit" class="block border border-gold rounded-md text-center text-mt-light cinzel-regular text-xs tracking-wide py-2 px-4 bg-gradient-red hover:saturate-120 hover:cursor-pointer">Guardar</button>
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