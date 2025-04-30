const db = require("../config/database");

const BoletinesInformativos = {
  getAll(page = 1, limit = 10, callback) {
    const offset = (page - 1) * limit;

    // Obtener el total de registros
    db.query("SELECT COUNT(*) AS total FROM boletines_informativos", (err, countResult) => {
      if (err) {
        console.error("Error al obtener el total de historico de resultados indicadores:", err);
        return callback(err, null);
      }

      const totalItems = countResult[0]?.total || 0;

      // Obtener los datos paginados y ordenados por ID
      db.query(
        "SELECT * FROM boletines_informativos ORDER BY id ASC LIMIT ? OFFSET ?",
        [Number(limit), Number(offset)],
        (err, dataResult) => {
          if (err) {
            console.error("Error al obtener el historico de resultado indicadores paginadas:", err);
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
      "INSERT INTO boletines_informativos (fecha, titulo, descripcion, documento_pdf) VALUES (?, ?, ?, ?)",
      [fecha, titulo, descripcion, documento_pdf],
      callback
    );
  },

  update: (id, data, callback) => {
    const { fecha, titulo, descripcion, documento_pdf } = data;
    db.query(
      "UPDATE boletines_informativos SET fecha = ?, titulo = ?, descripcion = ?, documento_pdf = ? WHERE id = ?",
      [fecha, titulo, descripcion, documento_pdf, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM boletines_informativos WHERE id = ?", [id], callback);
  },
};

module.exports = BoletinesInformativos;
