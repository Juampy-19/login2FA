const { body } = require('express-validator');

const validationsRegister = [
    body('firstName')
     .notEmpty().withMessage('Ingrese su nombre'),
    body('lastName')
     .notEmpty().withMessage('Ingrese su apellido'),
    body('email')
     .notEmpty().withMessage('Ingrese su email')
     .isEmail().withMessage('Ingrese un email válido'),
    body('password')
     .notEmpty().withMessage('Ingrese su contraseña')
     .isLength({ min: 6 }).withMessage('La contraseña debe tener 6 caracteres minimo'),
    body('repeatPassword')
     .notEmpty().withMessage('Confirme su contraseña')
     .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
     })
]

module.exports = validationsRegister;