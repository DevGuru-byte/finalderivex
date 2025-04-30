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
 *   name: Regulación Mercado Anonimo
 *   description: Gestión de regulaciones de mercado anonimo
 */

/**
 * @swagger
 * /api/regulacion_mercado_anonimo/list:
 *   get:
 *     summary: Obtener todas las regulaciones de mercado anonimo
 *     tags: [Regulación Mercado Anonimo]
 *     responses:
 *       200:
 *         description: Lista de regulaciones de mercado anonimo
 */
router.get("/list", controllers.regulacionMercadoAnonimo.getAll);

/**
 * @swagger
 * /api/regulacion_mercado_anonimo/create:
 *   post:
 *     summary: Crear una nueva regulación de mercado anonimo
 *     tags: [Regulación Mercado Anonimo]
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
 *         description: Regulación de mercado anonimo creada correctamente
 */
router.post("/create", upload.single("documento_pdf"), controllers.regulacionMercadoAnonimo.create);

/**
 * @swagger
 * /api/regulacion_mercado_anonimo/update/{id}:
 *   put:
 *     summary: Actualizar una regulación de mercado anonimo existente
 *     tags: [Regulación Mercado Anonimo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la regulación de mercado anonimo
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
 *         description: Regulación de mercado anonimo actualizada correctamente
 */
router.put("/update/:id", upload.single("documento_pdf"), controllers.regulacionMercadoAnonimo.update);

/**
 * @swagger
 * /api/regulacion_mercado_anonimo/delete/{id}:
 *   delete:
 *     summary: Eliminar una regulación de mercado anonimo
 *     tags: [Regulación Mercado Anonimo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la regulación de mercado anonima a eliminar
 *     responses:
 *       200:
 *         description: Regulación de mercado anonimo eliminada correctamente
 */
router.delete("/delete/:id", controllers.regulacionMercadoAnonimo.delete);

module.exports = router;
