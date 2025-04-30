const express = require("express");
const multer = require("multer");
const path = require("path");
const controllers = require("../controllers/indexController");

const router = express.Router();

// Configuración de Multer para subir archivos PDF
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos PDF"));
    }
  },
});

/**
 * @swagger
 * tags:
 *   name: Boletines Informativos
 *   description: Gestión de boletines informativos
 */

/**
 * @swagger
 * /api/boletines_informativos/list:
 *   get:
 *     summary: Obtener todos los boletines informativos
 *     tags: [Boletines Informativos]
 *     responses:
 *       200:
 *         description: Lista de boletines
 */
router.get("/list", controllers.boletinesInformativos.getAll);

/**
 * @swagger
 * /api/boletines_informativos/create:
 *   post:
 *     summary: Crear un nuevo boletín informativo
 *     tags: [Boletines Informativos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - fecha
 *               - titulo
 *               - descripcion
 *               - documento_pdf
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               documento_pdf:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Boletín creado correctamente
 */
router.post("/create", upload.single("documento_pdf"), controllers.boletinesInformativos.create);

/**
 * @swagger
 * /api/boletines_informativos/update/{id}:
 *   put:
 *     summary: Actualizar un boletín informativo existente
 *     tags: [Boletines Informativos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del boletín
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - fecha
 *               - titulo
 *               - descripcion
 *               - documento_pdf
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               documento_pdf:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Boletín actualizado correctamente
 */
router.put("/update/:id", upload.single("documento_pdf"), controllers.boletinesInformativos.update);

/**
 * @swagger
 * /api/boletines_informativos/delete/{id}:
 *   delete:
 *     summary: Eliminar un boletín informativo
 *     tags: [Boletines Informativos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del boletín a eliminar
 *     responses:
 *       200:
 *         description: Boletín eliminado correctamente
 */
router.delete("/delete/:id", controllers.boletinesInformativos.delete);

module.exports = router;
