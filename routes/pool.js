require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306
});

pool.query("SELECT 1",(err, result) => {
  if (err) {
    console.log("❌ DB ERROR:", err);
  } else {
    console.log("✅ DB WORKING");
  }
});

module.exports = pool;