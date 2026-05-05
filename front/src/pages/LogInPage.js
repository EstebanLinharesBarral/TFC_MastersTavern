// pages/LogInPage.js
import { authService } from "../services/AuthService.js";

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
        //EVENTO SUBMIT
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
        
                    const response = await authService.login(form);
                })
    })

    return `<div class="pt-6 p-4">
            <form id="login-form" class="grid md:w-[500px] grid-rows-3 my-4 gap-8 p-8 back-mt-orange justify-self-center border-solid border-2 shadow-surround rounded-xl caudex-bold">

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
                    <button type="submit" class="form-btn whitespace-nowrap">Log in</button>
                </div>

            </form>
    </div>`
}