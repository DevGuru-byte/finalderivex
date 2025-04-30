const db = require("../config/database");
const bcrypt = require("bcryptjs");

class Usuario {
  static getAll(callback) {
    db.query("SELECT id, nombre, email, created_at FROM usuarios", callback);
  }

  static getById(id, callback) {
    db.query(
      "SELECT id, nombre, email, created_at FROM usuarios WHERE id = ?",
      [id],
      callback
    );
  }

  static async create(data, callback) {
    const newUser = { nombre: data.nombre, email: data.email, password: data.password };
    db.query("INSERT INTO usuarios SET ?", newUser, callback);
  }

  static update(id, data, callback) {
    db.query("UPDATE usuarios SET ? WHERE id = ?", [data, id], callback);
  }

  static delete(id, callback) {
    db.query("DELETE FROM usuarios WHERE id = ?", [id], callback);
  }

  static findByEmail(email, callback) {
    db.query("SELECT * FROM usuarios WHERE email = ?", [email], callback);
  }
}

module.exports = Usuario;
