const loginForm = document.getElementById('loginForm');
const securityModal = document.getElementById('securityModal');
const verifyCodeButton = document.getElementById('verifyCodeButton');
const securityCodeInput = document.getElementById('securityCodeInput');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const errorsSecurityCode = document.getElementById('errorsSecurityCode');

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    emailError.innerHTML = '';
    passwordError.innerHTML = '';

    const formData = new FormData(loginForm);
    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            // Mostrar el modal para ingresar el código se seguridad
            securityModal.style.display = 'flex';
        } else {
            // Mostrar los errores del login
            if (result.errors) {
                if (result.errors.email) {
                    emailError.textContent = result.errors.email.msg;
                }
                if (result.errors.password) {
                    passwordError.textContent = result.errors.password.msg;
                }
            } else {
                alert('Error al procesar el login');
            }
        }
    } catch (error) {
        console.log('Error:', error);        
    }
});

verifyCodeButton.addEventListener('click', async function () {
    errorsSecurityCode.innerHTML = '';
    const securityCode = securityCodeInput.value;

    try {
        const verifyResponse = await fetch('/verifyCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ securityCode })
        });

        const verifyResult = await verifyResponse.json();

        if (verifyResult.success) {
            window.location.href =  '/viewUser';
        } else {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = verifyResult.message;
            errorsSecurityCode.appendChild(errorMessage);
        }
    } catch (error) {
        console.log('Error:', error);
        
    }
})