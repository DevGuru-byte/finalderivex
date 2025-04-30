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
 *   name: Regulacion Aplicable
 *   description: Gestión de regulaciones aplicables
 */

/**
 * @swagger
 * /api/regulacion_aplicable/list:
 *   get:
 *     summary: Obtener todas las regulaciones aplicables
 *     tags: [Regulacion Aplicable]
 *     responses:
 *       200:
 *         description: Lista de regulaciones aplicables
 */
router.get("/list", controllers.regulacionAplicable.getAll);

/**
 * @swagger
 * /api/regulacion_aplicable/create:
 *   post:
 *     summary: Crear una nueva regulación aplicable
 *     tags: [Regulacion Aplicable]
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
 *         description: Regulación aplicable creada correctamente
 */
router.post("/create", upload.single("documento_pdf"), controllers.regulacionAplicable.create);

/**
 * @swagger
 * /api/regulacion_aplicable/update/{id}:
 *   put:
 *     summary: Actualizar una regulación aplicable existente
 *     tags: [Regulacion Aplicable]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la regulación aplicable
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
 *         description: Regulación aplicable actualizada correctamente
 */
router.put("/update/:id", upload.single("documento_pdf"), controllers.regulacionAplicable.update);

/**
 * @swagger
 * /api/regulacion_aplicable/delete/{id}:
 *   delete:
 *     summary: Eliminar una regulación aplicable
 *     tags: [Regulacion Aplicable]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la regulación aplicable a eliminar
 *     responses:
 *       200:
 *         description: Regulación aplicable eliminado correctamente
 */
router.delete("/delete/:id", controllers.regulacionAplicable.delete);

module.exports = router;
