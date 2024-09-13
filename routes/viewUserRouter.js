const express = require('express');
const router = express.Router();
const viewUserController = require('../controllers/viewUserController.js');
const checkAuth = require('../middlewares/checkAuth.js');

router.get('/viewUser', viewUserController.viewUser);

router.get('/logout', viewUserController.logout);

module.exports = router;