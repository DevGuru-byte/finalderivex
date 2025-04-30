const db = require("../config/database");
const UltimasTransacciones = {
  getAll(page = 1, limit = 10, callback) {
    const offset = (page - 1) * limit;

    // Obtener el total de registros
    db.query(
      "SELECT COUNT(*) AS total FROM ultimas_transacciones",
      (err, countResult) => {
        if (err) {
          console.error(
            "Error al obtener el total de historico de resultados indicadores:",
            err
          );
          return callback(err, null);
        }

        const totalItems = countResult[0]?.total || 0;

        // Obtener los datos paginados y ordenados por ID
        db.query(
          "SELECT * FROM ultimas_transacciones ORDER BY id ASC LIMIT ? OFFSET ?",
          [Number(limit), Number(offset)],
          (err, dataResult) => {
            if (err) {
              console.error(
                "Error al obtener el historico de resultado indicadores paginadas:",
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
  create(data, callback) {
    db.query("INSERT INTO ultimas_transacciones SET ?", data, callback);
  },
  update(id, data, callback) {
    db.query(
      "UPDATE ultimas_transacciones SET ? WHERE id = ?",
      [data, id],
      callback
    );
  },
  delete(id, callback) {
    db.query("DELETE FROM ultimas_transacciones WHERE id = ?", [id], callback);
  },
};
module.exports = UltimasTransacciones;
