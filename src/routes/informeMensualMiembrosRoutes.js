const express = require("express");
const multer = require("multer");
const path = require("path");
const controllers = require("../controllers/indexController");

const router = express.Router();

// Configuración de Multer para subir archivos PDF
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombramos el archivo
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
 *   name: Informe Mensual Miembros
 *   description: Gestión de informes mensuales de miembros
 */

/**
 * @swagger
 * /api/informe_mensual_miembros/list:
 *   get:
 *     summary: Obtener todos los informes mensuales de miembros
 *     tags: [Informe Mensual Miembros]
 *     responses:
 *       200:
 *         description: Lista de informes mensuales de miembros
 */
router.get("/list", controllers.informeMensualMiembros.getAll);

/**
 * @swagger
 * /api/informe_mensual_miembros/create:
 *   post:
 *     summary: Crear un nuevo informe mensual de miembros
 *     tags: [Informe Mensual Miembros]
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
 *         description: Informe mensual de miembros creado correctamente
 */
router.post("/create", upload.single("documento_pdf"), controllers.informeMensualMiembros.create);

/**
 * @swagger
 * /api/informe_mensual_miembros/update/{id}:
 *   put:
 *     summary: Actualizar un informe mensual de miembros
 *     tags: [Informe Mensual Miembros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del informe mensual de miembros
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
 *         description: Informe mensual de miembros actualizado correctamente
 */
router.put("/update/:id", upload.single("documento_pdf"), controllers.informeMensualMiembros.update);

/**
 * @swagger
 * /api/informe_mensual_miembros/delete/{id}:
 *   delete:
 *     summary: Eliminar un informe mensual de miembros
 *     tags: [Informe Mensual Miembros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del informe mensual de miembros a eliminar
 *     responses:
 *       200:
 *         description: Informe mensual de miembros eliminado correctamente
 */
router.delete("/delete/:id", controllers.informeMensualMiembros.delete);

module.exports = router;
