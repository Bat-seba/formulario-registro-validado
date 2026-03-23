/**
 * @fileoverview Script para la gestión de inscripciones y validación de formularios para cursos online.
 * @author Bat-seba Rodriguez Moreno
 * @version 1.0
 */

// DEFINICIÓN DE EXPRESIONES REGULARES -----------------------------------------------------------------------------------------------------
/** @type {RegExp} Formato para que el email tenga un nombre, una arroba, un dominio y un punto. */
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

/** @type {RegExp} Formato para el teléfono internacional español: +34 seguido de espacio y bloques de 3 dígitos. */
const regexTelefono = /^\+34\s\d{3}-\d{3}-\d{3}$/; 

/** @type {RegExp} Reglas de seguridad: mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial. */
const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 


// CAPTURA DE ELEMENTOS DEL DOM -------------------------------------------------------------------------------------------------------------

// Uso de IF para evitar errores de 'document is not defined' con el entorno de pruebas Node.js
if (typeof document !== 'undefined') {
    const formulario = document.getElementById('registro-form');
    const mensajeServidor = document.getElementById('mensaje-servidor');
    // ... cualquier otra cosa que use document ...


    // GESTIÓN DE EVENTOS DE FOCO CON FOCUS/BLUR ------------------------------------------------------------------------------------------------
    const campos = document.querySelectorAll('input');
    campos.forEach(campo => {
        campo.addEventListener('focus', function() {
            this.style.border = '2px solid blue'; 
        });

        campo.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.border = '2px solid red';
            } else {
                this.style.border = '2px solid green';
            }
        });
    });


    // BOTÓN PARA VER/OCULTAR CONTRASEÑA --------------------------------------------------------------------------------------------------------
    const btnToggle = document.getElementById('togglePassword');
    const inputPass = document.getElementById('password');

    btnToggle.addEventListener('click', function() {
        if (inputPass.type === 'password') {
            inputPass.type = 'text';
            this.textContent = 'Ocultar';
        } else {
            inputPass.type = 'password';
            this.textContent = 'Ver';
        }
    });


    // GESTIÓN DEL EVENTO DE ENVÍO CON SUBMIT ---------------------------------------------------------------------------------------------------
    formulario.addEventListener('submit', function(evento) {
        
        evento.preventDefault();   

        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const password = document.getElementById('password').value;

        let errores = "";

        // VALIDACIONES USANDO LAS REGEX DEFINIDAS ARRIBA
        if (!regexEmail.test(email)) {
            errores += "❌ El email no es válido. \n\n ";
        }
        if (!regexTelefono.test(telefono)) {
            errores += "❌ El teléfono debe tener el formato +34 XXX-XXX-XXX \n\n ";
        }
        if (password.length < 8 || !regexPass.test(password)) {
            errores += "❌ Contraseña insegura (mín. 8 caracteres, mayúscula, número y símbolo). \n\n";
        }

        if (errores !== "") {
            mensajeServidor.textContent = errores;
            mensajeServidor.style.color = 'red';
    } else {
            const nombreUsuario = document.getElementById('nombre').value;
            const urlImagen = "https://thumbs.dreamstime.com/b/educaci%C3%B3n-en-l%C3%ADnea-trabajo-de-aprendizaje-desde-la-escritura-mano-del-hombre-el-hogar-un-port%C3%A1til-mientras-se-utiliza-ordenador-177445400.jpg?w=992";

            document.body.style.backgroundImage = `url('${urlImagen}')`;
            document.body.classList.add('vista-bienvenida');

            const plantilla = document.getElementById('plantilla-bienvenida').content;
            const clon = plantilla.cloneNode(true);
            clon.querySelector('h1').textContent = `¡Bienvenido/a, ${nombreUsuario}!`;

            document.body.innerHTML = ''; 
            document.body.appendChild(clon);
        }
    });
}

// EXPORTACIÓN PARA JEST --------------------------------------------------------------------------------------------------------------------
// Permite que el entorno de pruebas (Node.js) vea las funciones sin romper el navegador.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { regexEmail, regexTelefono, regexPass };   // Exportamos las constantes de las expresiones regulares para probarlas
}
