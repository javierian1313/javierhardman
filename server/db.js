require("dotenv").config();

const mysql = require("mysql");
const { DBHOST, USER, PASSWORD, DATABASE } = process.env;

const connection = mysql.createConnection({
    host: DBHOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
});

module.exports = connection