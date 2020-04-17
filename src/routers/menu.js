const express = require('express');
const Router = express.Router();
const menuController = require('../controller/menu');
const cors = require('cors');
// const redisHelper = require('../helpers/redis');


// multer
// const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: function(req, file, cb){
//     cb(null, './uploads')
//   },
//   filename: function(req, file, cb){
//     cb(null, new Date().toISOString() + file.originalname)
//   },
// })
// const upload = multer({
//   storage
// })

Router
  .get('/', menuController.getMenu)
  .get('/:id_menu', menuController.menuDetail)
  .post('/', menuController.insertMenu)
  .patch('/:id_menu', menuController.updateMenu)
  .delete('/:id_menu', menuController.deleteMenu)

module.exports = Router;