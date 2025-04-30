const db = require("../config/database");
const NegociacionMixta = {
  getAll(page = 1, limit = 10, callback) {
    const offset = (page - 1) * limit;

    // Obtener el total de registros
    db.query(
      "SELECT COUNT(*) AS total FROM negociacion_mixta",
      (err, countResult) => {
        if (err) {
          console.error(
            "Error al obtener el total de negociacion mixta:",
            err
          );
          return callback(err, null);
        }

        const totalItems = countResult[0]?.total || 0;

        // Obtener los datos paginados y ordenados por ID
        db.query(
          "SELECT * FROM negociacion_mixta ORDER BY id ASC LIMIT ? OFFSET ?",
          [Number(limit), Number(offset)],
          (err, dataResult) => {
            if (err) {
              console.error(
                "Error al obtener los datos de negociacion mixta paginadas:",
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
    db.query("INSERT INTO negociacion_mixta SET ?", data, callback);
  },
  update: (id, data, callback) => {
    db.query(
      "UPDATE negociacion_mixta SET ? WHERE id = ?",
      [data, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query("DELETE FROM negociacion_mixta WHERE id = ?", [id], callback);
  },
};
module.exports = NegociacionMixta;
