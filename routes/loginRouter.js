const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController.js');
const validationsLogin = require('../middlewares/validationsLogin.js');

router.get('/login', loginController.login);

router.post('/login',validationsLogin, loginController.loginProcess);

router.post('/verifyCode', loginController.verifyCodeProcess);

module.exports = router;
