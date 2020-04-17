const menuModel = require('../models/menu');
const MiscHelper = require('../helpers/helpers');
const connection = require('../config/db');
const redis = require('redis');
// const client = redis.createClient(process.env.PORT_REDIS);

module.exports = {
  getMenu: (req, res)=>{
    const search = req.query.search;
    const ascending = req.query.sortasc;
    const descending = req.query.sortdesc;
    const page = req.query.page;

    if (!page) {
      menuModel.getMenu(search, ascending, descending)
        .then((result)=>{
          // client.setex('getallbooks',3600 ,JSON.stringify(result))
          MiscHelper.response(res, result, 200);
        })
        .catch(err=> {
          console.log(err)
          MiscHelper.response(res, err, 400)
        });
    } else {
      connection.query("SELECT COUNT(*) as total FROM `menu` ", (err, result)=> {
        const total = result[0].total;
        if(page > 0 ) {
            menuModel.getPage(page, total)
            .then((result)=> {
                MiscHelper.response(res,result, 200)
            })
            .catch((err)=> {
                MiscHelper.response(res, {}, 400,err)
            })
        }
      })
    }
  },
  menuDetail: (req, res) => {
    const idMenu = req.params.id_menu
    menuModel.menuDetail(idMenu)
      .then((result) => {
        MiscHelper.response(res, result, 200);
      })
      .catch(err => console.log(err));
  },
  insertMenu: (req, res)=>{
    const {title, description,image, status, id_category} = req.body;
    const data = {
      title,
      description,
      image,
      status,
      id_category,
      created_at: new Date()
    }
    menuModel.insertMenu(data)
      .then((result) => {
        res.send(result);
      })
      .catch(err => console.log(err));
  },
  updateMenu: (req, res) => {
    const idMenu = req.params.id_menu
    const { title, description, image, status, id_category } = req.body;
    const data = {
      title,
      description,
      image,
      status,
      id_category,
      update_at: new Date(),
    }
    menuModel.updateMenu(idMenu, data)
      .then((result) => {
        MiscHelper.response(res, result, 200);
      })
      .catch(err => {
        MiscHelper.response(res, {}, 400, 'Error!')
      });
  },
  deleteMenu: (req, res) => {
    const idMenu = req.params.id_menu
    menuModel.deleteMenu(idMenu)
      .then((result) => {
        MiscHelper.response(res, result, 200)
      })
      .catch(err => {
        MiscHelper.response(res, {}, 400, 'Error!')
      });
  },
}