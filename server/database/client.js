const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'gr1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const query = async (text, values) => {
  try {
    const [rows] = await pool.promise().query(text, values);
    return rows;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  query,
  pool,
};
