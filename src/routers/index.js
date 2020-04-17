const express = require('express');
const menu = require('./menu')
const user = require('./users');
const category = require('./category')

const Router = express.Router();
Router
    .use('/menu', menu)
    .use('/user', user)
    .use('/category', category)

module.exports = Router;