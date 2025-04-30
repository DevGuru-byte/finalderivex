require("dotenv").config();
const mysql = require("mysql2");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
};

const pool = mysql.createPool(dbConfig);

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err.message);
  } else {
    console.log("✅ Base de datos conectada con éxito");
    connection.release();
  }
});

// Ping para mantener conexión viva (usando callback)
setInterval(() => {
  pool.query("SELECT 1", (err) => {
    if (err) {
      console.error("Error al hacer ping a la base de datos:", err);
    } else {
      console.log("Ping a la base de datos exitoso");
    }
  });
}, 5 * 60 * 1000); // Cada 5 minutos

// Manejo de errores de conexión
pool.on("error", (err) => {
  console.error("Error en la base de datos:", err.message);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("Reconectando a la base de datos...");
  } else {
    throw err;
  }
});

module.exports = pool;
