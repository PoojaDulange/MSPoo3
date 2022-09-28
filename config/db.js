const mysql = require("mysql");
require("dotenv").config();

const connect = mysql.createConnection({
  host: process.env.HOST_NAME,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  ssl: require,
});

module.exports = connect;
