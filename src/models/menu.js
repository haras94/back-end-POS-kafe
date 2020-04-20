const connection = require('../config/db');


module.exports = {
    getMenu: (search, descending, ascending) => {
        return new Promise((resolve,reject)=> {
            if(search){
                connection.query("SELECT * FROM `menu` WHERE title LIKE? OR description LIKE ? ORDER BY title ASC", [`%${search}%`,`%${search}%`], (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
                })
            } else if (descending) {
                connection.query("SELECT * FROM `menu` ORDER BY " + descending + ' DESC',  (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject (new Error(err))
                }
                })
            } else if (ascending) {
                connection.query("SELECT * FROM `menu` ORDER BY " + ascending+ " ASC", (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject (new Error(err))
                }
                })
            } else {
                connection.query("SELECT * FROM `menu`", (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
                })
            }
        })
    },
    getPage: (page, total)=> {
        const dataPage = 3;
        const totalPage = total / dataPage;
        const firstData = dataPage * page - dataPage;
        return new Promise((resolve,reject)=> {
          connection.query("SELECT * FROM `menu` ORDER BY menu.id ASC LIMIT ?, ?",[firstData, dataPage], (err,result)=> {
            if(!err){
              const allPage = Math.ceil(totalPage);
                if(page <= allPage){
                  resolve([`Total Page: ${allPage}`, `Current Page: ${page}`,result])}
                } else {
                  reject(new Error(err))
                }
            })
        })
    },
    insertMenu: (data) => {
        return new Promise((resolve, reject) => {
          connection.query("INSERT INTO `menu` SET ?", data, (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
    },
    menuDetail: (id) => {
        return new Promise((resolve, reject) => {
          connection.query("SELECT * FROM `menu` WHERE id = ?", id, (err, result)=> {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
    },
    updateMenu: (id_menu, data) => {
        return new Promise((resolve, reject) => {
          connection.query("UPDATE menu SET ? WHERE id = ?", [data, id_menu], (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
    },
    deleteMenu: (id) => {
        return new Promise((resolve, reject) => {
          connection.query("DELETE FROM menu WHERE id = ?", id, (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          })
        })
    },
}