import { authService } from "../services/AuthService.js";
import { fetchService } from "../services/FetchService.js";

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
            }catch(error){
                console.error('Error en el login:', error)
            }finally{
                setTimeout(() => {window.location.hash = '#/log-in'}, 1000)
            }
        })
    })
    
    return `<div class="pt-6 p-4">
            <form id="register-form" class="grid grid-rows-7 my-4 col-span-11 gap-8 p-8 back-mt-orange justify-self-center border-solid border-2 shadow-surround rounded-xl caudex-bold">
    
                <div class="grid grid-cols-3 row-span-1 gap-4">
                    <div class="relative col-span-1">
                        <input type="text" required name="first_name" placeholder=" " class="form-input">
                        <label class="absolute label-floating">Nombre</label>
                    </div>
                    <div class="relative col-span-2">
                        <input type="text" name="last_name" placeholder=" " class="form-input">
                        <label class="absolute label-floating">Apellidos</label>
                    </div>
                </div>

                <div class="row-span-1">
                    <div class="relative">
                        <input type="email" required name="email" placeholder=" " class="form-input">
                        <label class="absolute label-floating">Email</label>
                    </div>
                </div>

                <div class="row-span-1">
                    <div class="relative">
                        <input type="text" required name="username" placeholder=" " class="form-input">
                        <label class="absolute label-floating">Nombre de Usuario</label>
                    </div>
                </div>

                <div class="row-span-1">
                    <div class="relative">
                        <input type="password" required name="password1" placeholder=" " class="form-input">
                        <label class="absolute label-floating">Contraseña</label>
                    </div>
                </div>

                <div class="row-span-1">
                    <div class="relative">
                        <input type="password" required name="password2" placeholder=" " class="form-input">
                        <label class="absolute label-floating">Repetir Contraseña</label>
                    </div>
                </div>

                <div class="flex justify-center items-center row-span-2">
                    <button type="submit" class="form-btn">Sign in</button>
                </div>

            </form>
        </div>
    </div>`
}