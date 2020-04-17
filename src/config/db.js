// require('dotenv').config();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kafean',
});

connection.connect((err) => {
  if (err) console.log(`error MYSQL : ${err}`)
});

module.exports = connection;