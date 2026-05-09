// pages/Homepage.js
function creadeDataCard() {
    return ``
}

export function renderHomepage() {
    setTimeout(() => {
            const calendarEl = document.getElementById('calendar');

            if(calendarEl){
                const calendar = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'dayGridMonth', // Vista inicial: mes
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }
                });
                calendar.render();
            }

    }, 1000)

    //SI NO HAY UN USUARIO CONECTADO CAMBIAR EL RETURN
    return `<div class="">
        <div id="hero-container" class="flex flex-col items-center md:items-start xl:max-w-7xl 2xl:max-w-[100rem] mx-auto space-y-6 my-24">
            <h2 class="text-mt-light decorative-bold font-bold text-4xl md:text-5xl">
                <p>Bienvenido a </p>
                <p><span class="text-amber-600 text-glow-torch">Masters</span>Tavern</p>
            </h2>
            <p class="garamond-regular text-mt-lighter text-lg">Gestiona tus partidas y personajes de rol</p>
            <a href="#/" class="flex tracking-widest items-center gap-2 justify-center cinzel-regular w-fit text-mt-light text-sm rounded-lg bg-gradient-red border-2 border-gold py-3 px-8 hover:saturate-120"><i data-lucide="swords"></i>  Crear Nuevo Personaje</a>
            <a href="#/" class="flex tracking-widest items-center gap-2 justify-center cinzel-regular w-fit text-mt-light text-sm rounded-lg bg-gradient-brown border border-gold py-3 px-8 hover:saturate-150"><i data-lucide="map"></i>  Explorar partidas</a>
        </div>

        <div id="info-section" class="grid grid-cols-1 md:grid-cols-3 gap-4 border-t-2 border-gold bg-gradient-brown min-h-[600px]">
            <section>
                <h3>Últimas Sesiones</h3>
            </section>
        </div>
    </div>`
}