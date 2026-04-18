/*require("dotenv").config();
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
*/
require("dotenv").config();
const mysql = require("mysql2");

console.log("DB HOST:", process.env.DB_HOST);
console.log("DB USER:", process.env.DB_USER);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ✅ TEST QUERY
pool.query("SELECT 1", (err, result) => {
  if (err) {
    console.log("❌ DB ERROR:", err);
  } else {
    console.log("✅ DB WORKING (POOL)");
  }
});

module.exports = pool;