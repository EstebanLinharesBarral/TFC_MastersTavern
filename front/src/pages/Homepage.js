// pages/Homepage.js
function creadeDataCard() {
    return ``
}

export function renderHomepage() {
    setTimeout(() => {
        
            const calendarEl = document.getElementById('calendar');
            
            console.log(calendarEl)

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
    return `<div class="grid grid-rows-10 pt-6 p-4">
        <div class="grid grid-cols-11 row-span-5 gap-4">
            <section class="col-span-5">
                <div id="next-sessions-container" class="border text-center">
                    <p>Próximas sesiones</p>
                    <div class="grid grid-cols-2">

                    </div>
                </div>
                <div id="prev-sessions-container">
                    <div class="bg-red-500 md:bg-green-500 p-4">
  TEST
</div>
                </div>
            </section>
            <section class="col-span-6">
                <div id="calendar"></div>
            </section>
        </div>
        <div class="row-span-5"></div>
    </div>`
}