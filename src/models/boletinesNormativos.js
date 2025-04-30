const db = require("../config/database");

const BoletinesNormativos = {
  getAll(page = 1, limit = 10, callback) {
    const offset = (page - 1) * limit;

    // Obtener el total de registros
    db.query("SELECT COUNT(*) AS total FROM boletines_normativos", (err, countResult) => {
      if (err) {
        console.error("Error al obtener el total de boletines normativos:", err);
        return callback(err, null);
      }

      const totalItems = countResult[0]?.total || 0;

      // Obtener los datos paginados y ordenados por ID
      db.query(
        "SELECT * FROM boletines_normativos ORDER BY id ASC LIMIT ? OFFSET ?",
        [Number(limit), Number(offset)],
        (err, dataResult) => {
          if (err) {
            console.error("Error al obtener los boletines normativos paginadas:", err);
            return callback(err, null);
          }

          // Devolvemos los datos y el total de registros
          callback(null, { data: dataResult, totalItems });
        }
      );
    });
  },

  create: (data, callback) => {
    const { fecha, titulo, descripcion, documento_pdf } = data;
    db.query(
      "INSERT INTO boletines_normativos (fecha, titulo, descripcion, documento_pdf) VALUES (?, ?, ?, ?)",
      [fecha, titulo, descripcion, documento_pdf],
      callback
    );
  },

  update: (id, data, callback) => {
    const { fecha, titulo, descripcion, documento_pdf } = data;
    db.query(
      "UPDATE boletines_normativos SET fecha = ?, titulo = ?, descripcion = ?, documento_pdf = ? WHERE id = ?",
      [fecha, titulo, descripcion, documento_pdf, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM boletines_normativos WHERE id = ?", [id], callback);
  },
};

module.exports = BoletinesNormativos;
