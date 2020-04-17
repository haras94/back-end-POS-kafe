const express = require('express');
const Router = express.Router();
const userController = require('../controller/users');

Router
    .get('/auth', userController.aktifasi)
    .get('/', userController.userGet)
    .get('/:id_user', userController.userDetail)
    .post('/login', userController.login)
    .post('/register', userController.register)
    .patch('/update/:id_user', userController.updateUser)
    .delete('/:id_user', userController.deleteUser)

module.exports = Router