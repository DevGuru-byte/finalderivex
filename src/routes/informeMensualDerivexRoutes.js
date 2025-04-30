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
 *   name: Informe Mensual Derivex
 *   description: Gestión de informe mensual Derivex
 */

/**
 * @swagger
 * /api/informe_mensual_derivex/list:
 *   get:
 *     summary: Obtener todos los informes mensuales Derivex
 *     tags: [Informe Mensual Derivex]
 *     responses:
 *       200:
 *         description: Lista de informes mensuales Derivex
 */
router.get("/list", controllers.informeMensualDerivex.getAll);

/**
 * @swagger
 * /api/informe_mensual_derivex/create:
 *   post:
 *     summary: Crear un nuevo informe mensual Derivex
 *     tags: [Informe Mensual Derivex]
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
 *         description: Informe mensual Derivex creado correctamente
 */
router.post("/create", upload.single("documento_pdf"), controllers.informeMensualDerivex.create);

/**
 * @swagger
 * /api/informe_mensual_derivex/update/{id}:
 *   put:
 *     summary: Actualizar un informe mensual Derivex existente
 *     tags: [Informe Mensual Derivex]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del informe mensual Derivex
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
 *         description: Informe mensual Derivex actualizado correctamente
 */
router.put("/update/:id", upload.single("documento_pdf"), controllers.informeMensualDerivex.update);

/**
 * @swagger
 * /api/informe_mensual_derivex/delete/{id}:
 *   delete:
 *     summary: Eliminar un boletín informativo
 *     tags: [Informe Mensual Derivex]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del informe mensual Derivex a eliminar
 *     responses:
 *       200:
 *         description: Informe mensual Derivex eliminado correctamente
 */
router.delete("/delete/:id", controllers.informeMensualDerivex.delete);

module.exports = router;
