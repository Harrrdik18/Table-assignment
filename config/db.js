// config/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'kpeg123', // replace with your MySQL password
    database: 'transaction_db',
    port: 3305
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL database");
});

module.exports = db;
