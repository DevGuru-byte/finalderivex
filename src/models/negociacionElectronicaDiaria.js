const db = require("../config/database");
const NegociacionElectronicaDiaria = {
  getAll: (page = 1, limit = 10, callback) => {
    const offset = (page - 1) * limit;

    // Obtener el total de registros
    db.query(
      "SELECT COUNT(*) AS total FROM negociacion_electronica_diario",
      (err, countResult) => {
        if (err) {
          console.error(
            "Error al obtener los datos de negociacion electronica diaria:",
            err
          );
          return callback(err, null);
        }

        const totalItems = countResult[0]?.total || 0;

        // Obtener los datos paginados y ordenados por ID
        db.query(
          "SELECT * FROM negociacion_electronica_diario ORDER BY id ASC LIMIT ? OFFSET ?",
          [Number(limit), Number(offset)],
          (err, dataResult) => {
            if (err) {
              console.error(
                "Error al obtener los datos de negociacion electronica diaria paginadas:",
                err
              );
              return callback(err, null);
            }

            // Devolvemos los datos y el total de registros
            callback(null, { data: dataResult, totalItems });
          }
        );
      }
    );
  },
  create: (data, callback) => {
    db.query("INSERT INTO negociacion_electronica_diario SET ?", data, callback);
  },
  update: (id, data, callback) => {
    db.query(
      "UPDATE negociacion_electronica_diario SET ? WHERE id = ?",
      [data, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query(
      "DELETE FROM negociacion_electronica_diario WHERE id = ?",
      [id],
      callback
    );
  },
};
module.exports = NegociacionElectronicaDiaria;
