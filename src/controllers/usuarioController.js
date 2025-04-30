const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "secreto_super_seguro";

exports.getAll = (req, res) => {
  Usuario.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  Usuario.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(results[0]);
  });
};

exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    Usuario.create({ nombre, email, password: hashedPassword }, (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Usuario registrado correctamente", id: results.insertId });
    });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Correo y contraseña son requeridos" });
  }

  Usuario.findByEmail(email, async (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(401).json({ error: "Credenciales inválidas" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "2h" });
    res.json({ message: "Login exitoso", token });
  });
};

exports.update = (req, res) => {
  Usuario.update(req.params.id, req.body, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.affectedRows === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario actualizado correctamente" });
  });
};

exports.delete = (req, res) => {
  Usuario.delete(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.affectedRows === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  });
};
