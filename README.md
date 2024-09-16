Proyecto realizado con Node.js, Express.js, JavaScript, EJS, CSS.
Realicé un formulario de registro, donde el usuario ingresa los datos solicitado para registrarse. El formulario cuenta con validaciónes desde el backend, implementadas mediante express-validator, para asegurar que los datos ingresados sean correctos, y también se implementa bycript para hashear la contraseña.
Luego de completar el formulario, los datos son almacenados en un archivo JSON, simulando una base de datos.
Una vez registrado, el usuario puede acceder al login, donde completando sus datos, estos son validados con la base de datos mediante un middleware. Si la validación es satisfactoria, se le envía un código de seguridad al email que tiene registrado, y una vez ingresado el código de seguridad, se compara con el coódigo generado para dar o no acceso a la sesión. Implementando así una verificación de dos pasos (2FA).

Tecnologías utilizadas en este proyecto:
- Node.Js
- Express.js
- JavaScript
- EJS como sistema de plantillas
- CSS
- Dotenv para cargar las variables de entorno guardadas en el archivo .env
- Nodemailer para generar y enviar los códigos de seguridad
- Express-session
- Express-validator
- Bycrypt
