// pages/LogInPage.js
import { authService } from "../services/AuthService.js";
import { renderErrorModal } from "../components/modal.js";

export function renderLogInPage() {
    setTimeout(async () => {
        const form = document.getElementById('login-form');
        const inputs = form.querySelectorAll('input');
        
        //EVENTO DE LOS INPUTS Y LABELS
        inputs.forEach(i => {
            i.addEventListener('change', () => {
                if(i.value.length > 0) {
                    i.nextElementSibling.classList.replace('label-floating', 'label-focus');
                } else {
                    i.nextElementSibling.classList.replace('label-focus', 'label-floating');
                }
            })
        })

        //EVENTO SUBMIT
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try{
                const response = await authService.login(form);

                if(response.access){
                    sessionStorage.setItem('auth_token', response.access);
                    sessionStorage.setItem('refresh_token', response.refresh);
                    setTimeout(() => {window.location.hash = '#/'}, 1000)
                }
            }catch(error){
                const modal = renderErrorModal(error);
                document.body.insertAdjacentHTML("afterbegin", modal)

                console.error('Error en el login:', error)
            }
        })

    })

    return `<div class="pt-6 p-4">
            <div class="bg-gradient-white justify-self-center border border-gold shadow-surround rounded-xl overflow-hidden">
                <h3 class="cinzel-bold bg-gradient-brown text-mt-light tracking-widest border-b border-gold py-3 px-8">Log in</h3>
                <form id="login-form" class="space-y-8 gap-8 p-8 sm:min-w-[600px]">

                    <div class="row-span-1">
                        <div class="relative">
                            <input type="text" required name="username" placeholder=" " class="form-input">
                            <label class="absolute label-floating">Nombre de Usuario</label>
                        </div>
                    </div>

                    <div class="row-span-1">
                        <div class="relative">
                            <input type="password" required name="password" placeholder=" " class="form-input">
                            <label class="absolute label-floating">Contraseña</label>
                        </div>
                    </div>

                    <div class="flex justify-center items-center row-span-1">
                        <button type="submit" class="bg-gradient-red border border-gold rounded-lg cinzel-regular text-mt-light tracking-widest px-10 py-4 hover:cursor-pointer hover:saturate-120">Log in</button>
                    </div>

                </form>
            </div>
    </div>`
}