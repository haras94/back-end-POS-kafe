require('dotenv').config();
const { genSaltSync, compareSync, hashSync} = require('bcrypt');
const userModel = require('../models/users');
const MiscHelper = require('../helpers/helpers');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const conn = require('../config/db')

module.exports = {
    userDetail: (req, res) => {
        const idUser = req.params.id_user
        userModel.userDetail(idUser)
            .then((result) => {
                if (!result[0].id) {
                    MiscHelper.response(res, err, 400, 'User Not Found');
                }else {
                    MiscHelper.response(res, result, 200, 'Success')
                }
            })
            .catch((err) => {
                MiscHelper.response(res, err, 400, 'User Not Found');
            });
    },
    userGet: (req, res) => {
        userModel.userGet()
            .then((result) => {
                MiscHelper.response(res, result, 200 );
            })
            .catch(err => {
                console.log(err)
                MiscHelper.response(res, null, 400, err);
            });
    },
    register: (req, res) => {
        const {email, fullname, password} = req.body
        const data = {
            email,
            fullname,
            password,
            photo: 'https://www.classicindiascale.com/wp-content/uploads/2018/06/header-profile-default.png',
            status: 0,
        }
        const salt = genSaltSync(10)
        data.password = hashSync(data.password, salt)
        const emailreq = data.email
        userModel.register(data)
            .then((result) => {
                result.email = emailreq
                const newresult = result
                const token = jwt.sign({id: result.insertId, email: result.email}, process.env.SECRET_KEY)
                const token1 = jwt.verify(token, process.env.SECRET_KEY)
                newresult.token = token
                // console.log(result)
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'harunastrade@gmail.com',
                        pass: '94321290ha',
                    }
                });
                const mailFrom = {
                    from: 'harunastrade@gmail.com',
                    to: token1.email,
                    subject: 'ACTIVATION',
                    html: '<a href="http://localhost:3700/kafe/v1/user/auth?aktif='+token+'">Here</a>'
                };
                transporter.sendMail(mailFrom, (err, info) => {
                    if (err) {
                        console.log(err)
                        res.send('Email Activation Failed!')
                    } else {
                        const result = {
                            token: token,
                            status: 'succes'
                        };
                        MiscHelper.response(res,result,200)
                    }
                })
                MiscHelper.response(res, newresult, 200)
            })
            .catch(err => {
                console.log(err)
                MiscHelper.response(res, {}, 201, err)
            })
    },
    login: (req, res) => {
        const {email, password} = req.body
        const data = {
            email,
            password
        }
        console.log(data.email)
        userModel.login(data.email)
            .then((result) => {
                const token = jwt.sign({id: result[0].id, email: result[0].email}, 'menu');
                const checkPass = compareSync(data.password, result[0].password)
                console.log(checkPass)
                if (checkPass) {
                    // MiscHelper.response(res, result, 200, 'Login Successfully!');
                    return res.json({
                        success: 1,
                        message: 'Login Succes',
                        result: token
                    })
                } else {
                    MiscHelper.response(res, null, 400, 'Invalid Password!');
                }
            })
            .catch(err => {
                MiscHelper.response(res, null, 400, 'Invalid Email');
            })
    },
    updateUser: (req, res) => {
        const idUser = req.params.id_user
        const {fullname, email, password, phone} = req.body
        const data = {
            email,
            fullname,
            password,
            phone
        }
        const salt = genSaltSync(10)
        data.password = hashSync(data.password, salt)
        userModel.updateUser(idUser, data)
            .then((result) => {
                MiscHelper.response(res, result, 200)
            })
            .catch(err => {
                MiscHelper.response(res, result, 400)
            })
    },
    deleteUser: (req, res) => {
        const idUser = req.params.id_user
        userModel.deleteUser(idUser)
            .then((result) => {
                if(result.length <= 0) {
                    MiscHelper.response(res, {}, 400, 'User Not Found')
                } else {
                    userModel.deleteUser(idUser)
                    .then((result) => {
                        MiscHelper.response(res, result, 200, 'Deleteing Success!')
                    })
                }   
            })
            .catch(err => {
                MiscHelper.response(res, result, 400, 'User Not Found');
            })
    },
    aktifasi: (req, res) => {
        const tokenactivate = req.query.aktif;
        const tokenactive = jwt.verify(tokenactivate, process.env.SECRET_KEY);
        console.log(tokenactive)
        const status = {
            status: 1,
        }
        conn.query(`UPDATE users SET status = ${status.status} WHERE id_user = ${tokenactive.id}`, (err, result) => {
            if(err){
                MiscHelper.response(res, null, 400, 'fail')
            }
            else{
                MiscHelper.response(res, result, 200, 'succes!!')
            }
        })
    },
}