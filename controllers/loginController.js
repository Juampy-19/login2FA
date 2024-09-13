const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { text } = require('body-parser');

module.exports = {
    login: (req, res) => {
        res.render('login', {
            oldData: {},
            errors: {}
        });
    },

    loginProcess: async (req, res) => {
        const resultValidation = validationResult(req);

        if (!resultValidation.isEmpty()) {
            // Envío los errores como JSON para que el front los maneje
            return res.status(400).json({ errors: resultValidation.mapped() });
        }

        try {
            const usersFilePath = path.join(__dirname, '../db/users.json');
            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

            // Busco en el JSON el mail ingresado por el usuario
            const userToLogin = users.find(user => user.email === req.body.email);
            
            if (userToLogin) {
                // Comparo la contraseña hasheada
                const isPasswordCorrect = await bcrypt.compare(req.body.password, userToLogin.password);

                if (isPasswordCorrect) {
                    // Genéro y envío el código de seguridad
                    const securityCode = Math.floor(100000 + Math.random() * 900000).toString();

                    let transporter = nodemailer.createTransport({
                        host: process.env.EMAIL_HOST,
                        port: process.env.EMAIL_PORT,
                        secure: false,
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASS
                        }
                    });

                    let mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: userToLogin.email,
                        subject: 'Código de seguridad',
                        text: `Tu código de seguridad es: ${securityCode}`
                    };

                    // Envío el código al email
                    await transporter.sendMail(mailOptions);

                    // Guardo el código en la sesión
                    req.session.securityCode = securityCode;
                    req.session.userToLogin = userToLogin;

                    // Redirijo a la vista para ingresar el código
                    return res.json({ success: true, message: 'Código de  seguridad enviado'});
                } else {
                    // Devuelvo el error de contraseña incorrecta
                    return res.status(400).json({
                        errors: {
                            password: { msg: 'Contraseña incorrecta' }
                        }
                    });
                }
            } else {
                // Devuelvo el error de email no registrado
                return res.status(400).json({
                    errors: {
                        email: { msg: 'El email ingresado no está registrado' }
                    }
                });
            }           
        } catch (error) {
            console.log('Error al procesar el login: ', error);
            res.status(500).send('Internal server error');
        }
    },

    verifyCodeProcess: (req, res) => {
        const { securityCode } = req.body;

        if (securityCode === req.session.securityCode) {
            // Código correcto, lo elimíno de la session
            delete req.session.securityCode;
            return res.json({ success: true });
        } else {
            // Código incorrecto
            return res.json({ success: false, message: 'El código es incorrecto'});
        }
    }
};
