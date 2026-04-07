// pages/Homepage.js

function creadeDataCard() {
    return ``
}

export function renderHomepage() {
    
    //SI NO HAY UN USUARIO CONECTADO CAMBIAR EL RETURN
    return `<div class="grid grid-rows-10">
        <div class="grid grid-cols-10 row-span-5">
            <section class="col-span-6">
                <div id="next-sessions-container">
                </div>
                <div id="prev-sessions-container">
                </div>
            </section>
            <section class="col-span-4"></section>
        </div>
        <div class="row-span-5"></div>
    </div>`
}