import { authService } from "../services/AuthService.js";
import { fetchService } from "../services/FetchService.js";
import { renderErrorModal } from "../components/modal.js";

// pages/SignInPage.js
export function renderSignInPage() {

    setTimeout(async () => {
        const form = document.getElementById('register-form');
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

        // EVENTO SUBMIT
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            try{
                const response = await authService.register(form);

                if(response.ok){
                    window.location.hash = '#/log-in'
                }
            }catch(error){
                const modal = renderErrorModal(error);
                document.body.insertAdjacentHTML("afterbegin", modal)
                console.error('Error en el signin:', error)
            }finally{
                
            }
        })
    })
    
    return `<div class="pt-6 p-4">
            <div class="bg-gradient-white justify-self-center border border-gold shadow-surround rounded-xl overflow-hidden">
                <h3 class="cinzel-bold bg-gradient-brown text-mt-light tracking-widest border-b border-gold py-3 px-8">Sign in</h3>
                <form id="register-form" class="space-y-8 gap-8 p-8 sm:min-w-[600px]">
                    <div class="grid grid-cols-1 md:grid-cols-3 md:gap-4">
                        <div class="relative col-span-1">
                            <input type="text" required name="first_name" placeholder=" " class="form-input">
                            <label class="absolute cinzel-regular label-floating">Nombre</label>
                        </div>
                        <div class="relative col-span-2 mt-8 md:mt-0">
                            <input type="text" name="last_name" placeholder=" " class="form-input">
                            <label class="absolute cinzel-regular label-floating">Apellidos</label>
                        </div>
                    </div>

                    <div class="">
                        <div class="relative">
                            <input type="email" required name="email" placeholder=" " class="form-input">
                            <label class="absolute cinzel-regular label-floating">Email</label>
                        </div>
                    </div>

                    <div class="">
                        <div class="relative">
                            <input type="text" required name="username" placeholder=" " class="form-input">
                            <label class="absolute cinzel-regular label-floating">Nombre de Usuario</label>
                        </div>
                    </div>

                    <div class="">
                        <div class="relative">
                            <input type="password" required name="password1" placeholder=" " class="form-input">
                            <label class="absolute cinzel-regular label-floating">Contraseña</label>
                        </div>
                    </div>

                    <div class="">
                        <div class="relative">
                            <input type="password" required name="password2" placeholder=" " class="form-input">
                            <label class="absolute cinzel-regular label-floating">Repetir Contraseña</label>
                        </div>
                    </div>

                    <div class="flex justify-center items-center row-span-2">
                        <button type="submit" class="bg-gradient-red border border-gold rounded-lg cinzel-regular text-mt-light tracking-widest px-10 py-4 hover:cursor-pointer hover:saturate-120">Sign in</button>
                    </div>

                </form>
            </div>
        </div>
    </div>`
}