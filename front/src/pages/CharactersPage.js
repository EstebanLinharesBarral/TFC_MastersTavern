// pages/CharactersPage.js

import { fetchService } from "../services/FetchService.js";
import { classes, races, skills, savingThrows } from "../components/dicc.js";
import { sheetService } from "../services/SheetService.js";

export function renderCharactersPage() {

    setTimeout(async () => {
        const count = document.getElementById('char-count');

        try{
            const response = await fetchService.get('/api/characters');
            count.textContent = `${response.length} personajes`;

            const charList = document.getElementById('character-list');
            if(response && charList){
                response.map(char => {
                    charList.innerHTML += `<li data-id=${char.id} class="flex items-center px-4 py-2 hover:bg-[#221407] cursor-pointer">
                            <div class="rounded-full overflow-hidden border-2 border-gold size-12 mr-4"><img src="${char.avatar || ''}" class="size-full object-cover object-center"></div>
                            <div class="space-y-[1px]">
                                <p class="cinzel-medium text-sm text-mt-lighter tracking-wide">${char.name || 'Sin Nombre'}</p>
                                <div class="flex items-center gap-1 garamond-regular text-mt-sublight text-sm"><p>${races[char.race] || 'Sin raza'}</p> <span class="relative back-mt-sublight rounded-full size-[2px] self-center -bottom-[1px]"></span> <p>${classes[char.charClass] || 'Sin clase'}</p></div>
                            </div>
                            <p class="cinzel-regular text-mt-sublight text-[11px] px-3 py-[1px] rounded-sm ml-auto border border-brown-light bg-[#2f2207c8]">Nv ${char.level || '0'}</p>
                        </li>`
                })
            }

            // EVENTO AL CLICAR UN PERSONAJE
            const lis = charList.querySelectorAll('li');
            lis.forEach(li => {
                li.addEventListener('click', (e) => {
                    const id = li.dataset.id;
                    const char = response.filter(r => r.id == id)[0];
                    const preview = document.getElementById('preview-container');
                    preview.classList.replace('hidden', 'block')

                    const atributes = {
                        STR: sheetService.calculateAttribute(char.STR),
                        DEX: sheetService.calculateAttribute(char.DEX),
                        CON: sheetService.calculateAttribute(char.CON),
                        INT: sheetService.calculateAttribute(char.INT),
                        WIS: sheetService.calculateAttribute(char.WIS),
                        CHA: sheetService.calculateAttribute(char.CHA),
                    }

                    // PINTADO DE HABILIDADES CON PROF
                    let skillsEl = char.abilities.map(ab => {
                        return `<li class="flex gap-2 items-center">
                            <span class="size-3 rounded-full border border-brown-light back-mt-light"></span>
                            <p class="garamond-regular text-mt-lighter">${skills[ab].label}</p>
                            <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">${sheetService.calculateAttribute(char[skills[ab].attribute], char.stats[5])}</p>
                        </li>`
                    }).join('');

                    // PINTADO DE TIRADAS DE SALVACIÓN
                    let savesEl = Object.entries(savingThrows).map(([key, save]) => {
                        const isProficient = char.salvation.includes(key);

                        return `<li class="flex gap-2 items-center">
                            <span class="size-3 rounded-full border border-brown-light ${isProficient ? 'back-mt-light' : ''}"></span>
                            <p class="garamond-regular text-mt-lighter">${save.label}</p>
                            <p class="cinzel-medium text-mt-sublight text-sm ml-auto pr-4">${isProficient ? sheetService.calculateAttribute(char[save.attribute], char.stats[5]) : atributes[save.attribute]}</p>
                        </li>`;
                    }).join('');

                    // CLASES PARA ELEMENTO ACTIVO
                    lis.forEach(li => {
                        li.classList.remove('border-l-3', 'border-l-[#851818]', 'bg-[#7f64293a]');
                    })
                    li.classList.add('border-l-3', 'border-l-[#851818]', 'bg-[#7f64293a]');

                    preview.innerHTML = `<!-- HEADER -->
                    <div class="flex items-center border-b border-brown-light p-4">
                        <div class="rounded-full overflow-hidden border-2 border-gold size-16 mr-4"><img src="${char.avatar || ''}" class="size-full object-cover object-center"></div>
                        <div class="space-y-[1px]">
                            <p class="cinzel-medium text-sm text-mt-lighter tracking-wide">${char.name || 'Sin nombre'}</p>
                            <div class="flex items-center gap-1 garamond-regular text-mt-sublight text-base"><p>${races[char.race] || 'Sin raza'}</p> <span class="relative back-mt-sublight rounded-full size-[2px] self-center -bottom-[1px]"></span> <p>${classes[char.charClass] || 'Sin clase'}</p></div>
                            <p class="cinzel-regular w-fit text-mt-sublight text-[11px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8]">Nivel ${char.level || '0'}</p>
                        </div>
                    </div>

                    <!-- ESTADÍSTICAS -->
                    <div class="flex items-center justify-around border-b-2 border-brown-light p-4">
                        <div class="flex flex-col gap-1 items-center cinzel-medium">
                            <div class="flex text-lg text-mt-lighter items-center justify-center rounded-full overflow-hidden border border-gold bg-[#ffffff04] size-10 md:size-14">${char.stats[0]}</div>
                            <p class="text-mt-sublight text-[11px]">PG</p>
                        </div>
                        <div class="flex flex-col gap-1 items-center cinzel-medium">
                            <div class="flex text-lg text-mt-lighter items-center justify-center rounded-full overflow-hidden border border-gold bg-[#ffffff04] size-10 md:size-14">${char.stats[1]}</div>
                            <p class="text-mt-sublight text-[11px]">CA</p>
                        </div>
                        <div class="flex flex-col gap-1 items-center cinzel-medium">
                            <div class="flex text-lg text-mt-lighter items-center justify-center rounded-full overflow-hidden border border-gold bg-[#ffffff04] size-10 md:size-14">${char.stats[2]}</div>
                            <p class="text-mt-sublight text-[11px]">Init</p>
                        </div>
                        <div class="flex flex-col gap-1 items-center cinzel-medium">
                            <div class="flex text-lg text-mt-lighter items-center justify-center rounded-full overflow-hidden border border-gold bg-[#ffffff04] size-10 md:size-14">${char.stats[3]}</div>
                            <p class="text-mt-sublight text-[11px]">Vel</p>
                        </div>
                        <div class="flex flex-col gap-1 items-center cinzel-medium">
                            <div class="flex text-lg text-mt-lighter items-center justify-center rounded-full overflow-hidden border border-gold bg-[#ffffff04] size-10 md:size-14">${char.stats[4]}</div>
                            <p class="text-mt-sublight text-[11px]">Atq</p>
                        </div>
                        <div class="flex flex-col gap-1 items-center cinzel-medium">
                            <div class="flex text-lg text-mt-lighter items-center justify-center rounded-full overflow-hidden border border-gold bg-[#ffffff04] size-10 md:size-14">${char.stats[5]}</div>
                            <p class="text-mt-sublight text-[11px]">Prof</p>
                        </div>
                    </div>

                    <!-- ATRIBUTOS -->
                    <div class="grid grid-cols-3 divide-x divide-[#2f2207c8] back-mt-darker">
                        <div class="divide-y divide-[#2f2207c8]">
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-xs">Fuerza</p>
                                <p class="text-mt-lighter text-4xl">${atributes.STR || '0'}</p>
                                <p class="text-mt-sublight text-[11px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8]">${char.STR || '0'}</p>
                            </div>
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-xs">DESTREZA</p>
                                <p class="text-mt-lighter text-4xl">${atributes.DEX || '0'}</p>
                                <p class="text-mt-sublight text-[11px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8]">${char.DEX || '0'}</p>
                            </div>
                        </div>
    
                        <div class="divide-y divide-[#2f2207c8]">
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-xs">CONSTITUCIÓN</p>
                                <p class="text-mt-lighter text-4xl">${atributes.CON || '0'}</p>
                                <p class="text-mt-sublight text-[11px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8]">${char.CON || '0'}</p>
                            </div>
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-xs">INTELIGENCIA</p>
                                <p class="text-mt-lighter text-4xl">${atributes.INT || '0'}</p>
                                <p class="text-mt-sublight text-[11px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8]">${char.INT || '0'}</p>
                            </div>
                        </div>
    
                        <div class="divide-y divide-[#2f2207c8]">
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-xs">SABIDURÍA</p>
                                <p class="text-mt-lighter text-4xl">${atributes.WIS || '0'}</p>
                                <p class="text-mt-sublight text-[11px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8]">${char.WIS || '0'}</p>
                            </div>
                            <div class="flex flex-col gap-2 items-center cinzel-medium py-4">
                                <p class="text-mt-sublight text-xs">CARISMA</p>
                                <p class="text-mt-lighter text-4xl">${atributes.CHA || '0'}</p>
                                <p class="text-mt-sublight text-[11px] px-3 py-[1px] rounded-sm border border-brown-light bg-[#2f2207c8]">${char.CHA || '0'}</p>
                            </div>
                        </div>
                    </div>

                    <!-- SALVACIÓN Y HABILIDADES -->
                    <div class="grid grid-cols-2 gap-4 divide-x divide-[#2f2207c8] back-mt-darker p-4">
                        <div>
                            <p class="cinzel-medium text-mt-sublight text-xs mb-2">Tiradas de Salvación</p>
                            <ul>
                                ${savesEl}
                            </ul>
                        </div>

                        <div>
                            <p class="cinzel-medium text-mt-sublight text-xs mb-2">Habilidades Destacadas</p>
                            <ul>
                                ${skillsEl}
                            </ul>
                        </div>
                    </div>

                    <!-- TRASFONDO -->
                    <div class="border-t border-brown-light px-4 py-2">
                        <p class="cinzel-medium text-mt-sublight text-xs mb-2">Trasfondo</p>
                        <p class="garamond-regular text-mt-lighter">${char.background}</p>
                    </div>

                    <!-- BOTONES -->
                    <div class="flex justify-end border-t gap-2 border-brown-light px-4 py-2">
                        <button class="text-center border border-brown-light rounded-md cinzel-regular text-mt-light text-xs px-4 py-2 tracking-wide hover:bg-amber-100/10 hover:cursor-pointer">Exportar</button>
                        <a href="#/new-character" class="block border border-gold rounded-md text-center text-mt-light cinzel-regular text-xs tracking-wide py-2 px-4 bg-gradient-red hover:saturate-120">Editar Ficha Completa</a>
                    </div>`
                })
            })

        }catch(e){

        }
    })

return `<div class="px-8 pt-4 pb-8 flex flex-col gap-8">

        <!-- TÍTULO -->
        <div class="mt-8 text-center">
            <h2 class="decorative-bold text-mt-light text-3xl">Mis Personajes</h2>
            <p class="garamond-italic text-mt-lighter text-md mt-2">Gestiona y crea tus personajes</p>
        </div>

        <!-- CONTENIDO -->
        <div class="flex gap-6 flex-col items-center md:items-start md:flex-row border-t-2 border-gold pt-8">

            <!-- PERSONAJES -->
            <aside class="flex flex-col gap-4 w-full max-w-[500px]">
                <!-- FILTROS -->
                <div class="back-mt-darker rounded-lg p-4 border-2 border-brown-light">
                    <h3 class="cinzel-bold text-sm text-mt-light border-b border-brown-light pb-2 mb-4">Filtrar Personajes</h3>
                    <div class="space-y-4">
                        <div class="flex flex-col">
                            <label class="cinzel-regular text-mt-light text-xs">Nombre</label>
                            <input class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg" type="text" placeholder="Buscar por nombre...">
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex flex-col">
                                <label class="cinzel-regular text-mt-light text-xs">Clase</label>
                                <select class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg">
                                    <option value="">Todas</option>
                                </select>
                            </div>
                            <div class="flex flex-col">
                                <label class="cinzel-regular text-mt-light text-xs">Raza</label>
                                <select class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg">
                                    <option value="">Todas</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <label class="cinzel-regular text-mt-light text-xs">Nivel Mínimo</label>
                            <select class="garamond-italic text-mt-light p-1 bg-[#ffffff04] border border-brown-light rounded-lg">
                                <option value="">Cualquiera</option>
                            </select>
                        </div>

                        <button class="text-center border border-brown-light rounded-md p-1 cinzel-regular text-mt-light text-xs w-full hover:bg-amber-100/10 hover:cursor-pointer">Limpiar Filtros</button>
                    </div>
                </div>

                <!-- LISTADO -->
                <div class="flex flex-col justify-between back-mt-darker rounded-lg border-2 border-brown-light min-h-[300px] overflow-hidden">
                    <div class="flex justify-between border-b border-brown-light p-4"><h3 class="cinzel-bold text-sm text-mt-light">Personajes</h3> <p id="char-count" class="cinzel-regular text-[11px] text-mt-light"></p></div>
                    <ul id="character-list" class="garamond-regular flex-1 list-inside text-start divide-y divide-[#2f2207c8]">
                        
                    </ul>
                    <a href="#/new-character" class="block w-full text-center text-mt-light cinzel-regular text-xs tracking-wide py-2 bg-gradient-red hover:saturate-120">+ Nuevo Personaje</a>
                </div>
            </aside>

            <!-- PREVIEW -->
            <section class="w-full">
                <div id="preview-container" class=" hidden bg-[#130900] rounded-lg border-2 border-brown-light overflow-hidden">

                    
                </div>

            </section>
        </div>

    </div>`
}