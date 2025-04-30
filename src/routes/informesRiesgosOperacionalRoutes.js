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
 *   name: Informes Riesgos Operacional
 *   description: Gestión de informes de riesgos operacionales
 */

/**
 * @swagger
 * /api/informes_riesgos_operacional/list:
 *   get:
 *     summary: Obtener todos los informes de riesgos operacionales
 *     tags: [Informes Riesgos Operacional]
 *     responses:
 *       200:
 *         description: Lista de informes de riesgos operacionales
 */
router.get("/list", controllers.informesRiesgosOperacional.getAll);

/**
 * @swagger
 * /api/informes_riesgos_operacional/create:
 *   post:
 *     summary: Crear un nuevo informe de riesgos operacionales
 *     tags: [Informes Riesgos Operacional]
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
 *         description: Informe de riesgos operacionales creado correctamente
 */
router.post("/create", upload.single("documento_pdf"), controllers.informesRiesgosOperacional.create);

/**
 * @swagger
 * /api/informes_riesgos_operacional/update/{id}:
 *   put:
 *     summary: Actualizar un informe de riesgos operacionales existente
 *     tags: [Informes Riesgos Operacional]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del informe de riesgos operacionales
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
 *         description: Informe de riesgos operacionales actualizado correctamente
 */
router.put("/update/:id", upload.single("documento_pdf"), controllers.informesRiesgosOperacional.update);

/**
 * @swagger
 * /api/informes_riesgos_operacional/delete/{id}:
 *   delete:
 *     summary: Eliminar un informe de riesgos operacionales
 *     tags: [Informes Riesgos Operacional]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del informe de riesgos operacionales a eliminar
 *     responses:
 *       200:
 *         description: Informe de riesgos operacionales eliminado correctamente
 */
router.delete("/delete/:id", controllers.informesRiesgosOperacional.delete);

module.exports = router;
