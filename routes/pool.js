require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
   ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit:0

});

pool.query((err) => {
  if (err) {
    console.log("DB Error:", err.code);
  }
  else
  {
    console.log("DB Connected");
  }
});

module.exports = pool;