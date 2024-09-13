const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

module.exports = {
    register: (req, res) => {
        res.render('register');
    },

    createUser: async (req, res) => {
        const registerValidationResult = validationResult(req);

        if (registerValidationResult.errors.length > 0) {
            return res.render('register', {
                errors: registerValidationResult.mapped(),
                oldData: req.body
            });
        }

        try {
            const usersFilePath = path.join(__dirname, '../db/users.json');

            let users = [];
            try {
                const fileContent = fs.readFileSync(usersFilePath, 'utf-8');
                users = JSON.parse(fileContent);
            }  catch (error) {
                console.log('Error al leer el archivo de usuarios', readError);
                return res.status(500).send('Internal server error');
            }

            if (!Array.isArray(users)) {
                console.log('El archivo de usuarios no contiene un array válido');
                return res.status(500).send('Internal server error');                
            }

            // Verifíco que el email ingresado por el usuario no esteregistrado en el JSON
            const emailExists = users.some(user => user.email === req.body.email);

            if (emailExists) {
                return res.render('register', {
                    errors: {
                        email: {
                            msg: 'El  email ingresado ya está registrado'
                        }
                    },
                    oldData: req.body
                })
            }

            // Asigno un neuvo id al usuario que se va a crear
            const newId  = users.length > 0 ? users[users.length - 1].id + 1 : 1;

            // Hasheo la contraseña ingresada por el usuario para luego guardarla en el JSON
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const userData = {
                id: newId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
                securityCode: null
            };

            // Guardo el usuario en el archivo JSON
            users.push(userData);
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

            console.log('Usuario creado y añadido a la db');
            res.redirect('/login');
        } catch (error) {
            console.log('Error al crear el usuario: ', error);
            res.status(500).send('Internal server error');
        }
    }
};
