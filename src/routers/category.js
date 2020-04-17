const express = require('express');
const Route = express.Router();
const categoryController = require('../controller/category');

Route
    .get('/', categoryController.getCategory)
    .get('/:id', categoryController.categoryDetail)
    .post('/', categoryController.insertCategory)
    .delete('/:id', categoryController.deleteCategory)
    .patch('/:id', categoryController.updateCategory)

module.exports = Route;