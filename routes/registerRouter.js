const express = require('express');
const router = express.Router();

const registerController = require('../controllers/registerController.js');
const validationsRegister = require('../middlewares/validationsRegister.js');

router.get('/register', registerController.register);

router.post('/register', validationsRegister, registerController.createUser);

module.exports = router;
