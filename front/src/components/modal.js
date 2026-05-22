// components/modal.js

export function renderErrorModal(error) {
    return `<div id="error-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div class="bg-[#130900] border border-brown-light rounded-lg overflow-hidden w-full max-w-sm mx-4">

            <!-- HEADER -->
            <div class="flex items-center gap-2 border-b border-brown-light px-4 py-3">
                <span class="text-red-400 text-sm">✕</span>
                <p class="cinzel-medium text-mt-light text-xs tracking-wide">Error en el envío</p>
            </div>

            <!-- BODY -->
            <div class="px-4 py-4 flex flex-col gap-2">
                <p class="garamond-regular text-mt-lighter text-sm">${error}</p>
                <p id="error-modal-detail" class="garamond-italic text-mt-sublight text-xs"></p>
            </div>

            <!-- FOOTER -->
            <div class="flex justify-end gap-2 border-t border-brown-light px-4 py-3">
                <button onclick="document.getElementById('error-modal').classList.add('hidden')"
                    class="cinzel-regular text-mt-light text-xs px-4 py-2 border border-brown-light rounded-md hover:bg-amber-100/10 hover:cursor-pointer tracking-wide">
                    Cerrar
                </button>
            </div>

        </div>
    </div>`
}