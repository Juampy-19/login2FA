const { body } = require('express-validator');

const validationsLogin = [
    body('email')
     .notEmpty().withMessage('Ingrese su email')
     .isEmail().withMessage('Ingrese un email válido'),

    body('password')
     .notEmpty().withMessage('Ingrese su contraseña')
     .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

module.exports = validationsLogin;