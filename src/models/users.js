const connection = require('../config/db');

module.exports = {
    userDetail: (idUser) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM `users` WHERE id = ?", idUser, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },
    userGet: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM users", (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },
    register: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO users SET ?", data, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },
    login: (email) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM users WHERE email = ?",email,  (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },
    updateUser: (idUser, data) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE users SET ? WHERE id = ?", [data, idUser], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },
    deleteUser: (id_user) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM `users` WHERE id = ?", id_user, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    }
}