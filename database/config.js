const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ACisdude5',
  database: 'recaster',
});

db.connect();

module.exports = db;
