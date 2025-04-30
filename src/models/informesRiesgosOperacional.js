const db = require("../config/database");

const InformesRiesgosOperacional = {
  getAll(page = 1, limit = 10, callback) {
    const offset = (page - 1) * limit;

    // Obtener el total de registros
    db.query("SELECT COUNT(*) AS total FROM informes_riesgos_operacional", (err, countResult) => {
      if (err) {
        console.error("Error al obtener el total de historico de resultados indicadores:", err);
        return callback(err, null);
      }

      const totalItems = countResult[0]?.total || 0;

      // Obtener los datos paginados y ordenados por ID
      db.query(
        "SELECT * FROM informes_riesgos_operacional ORDER BY id ASC LIMIT ? OFFSET ?",
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
      "INSERT INTO informes_riesgos_operacional (fecha, titulo, descripcion, documento_pdf) VALUES (?, ?, ?, ?)",
      [fecha, titulo, descripcion, documento_pdf],
      callback
    );
  },

  update: (id, data, callback) => {
    const { fecha, titulo, descripcion, documento_pdf } = data;
    db.query(
      "UPDATE informes_riesgos_operacional SET fecha = ?, titulo = ?, descripcion = ?, documento_pdf = ? WHERE id = ?",
      [fecha, titulo, descripcion, documento_pdf, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM informes_riesgos_operacional WHERE id = ?", [id], callback);
  },
};

module.exports = InformesRiesgosOperacional;
