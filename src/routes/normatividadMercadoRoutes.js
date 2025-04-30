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
 *   name: Normatividad Mercado
 *   description: Gestión de Normatividad de Mercado
 */

/**
 * @swagger
 * /api/normatividad_mercado/list:
 *   get:
 *     summary: Obtener todos las normativas de mercado
 *     tags: [Normatividad Mercado]
 *     responses:
 *       200:
 *         description: Lista de normativas de mercado
 */
router.get("/list", controllers.normatividadMercado.getAll);

/**
 * @swagger
 * /api/normatividad_mercado/create:
 *   post:
 *     summary: Crear una nueva normativa de mercado
 *     tags: [Normatividad Mercado]
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
 *         description: Normativa de mercado creado correctamente
 */
router.post("/create", upload.single("documento_pdf"), controllers.normatividadMercado.create);

/**
 * @swagger
 * /api/normatividad_mercado/update/{id}:
 *   put:
 *     summary: Actualizar una normativa de mercado existente
 *     tags: [Normatividad Mercado]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la normativa de mercado
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
 *         description: Normativa de mercado actualizada correctamente
 */
router.put("/update/:id", upload.single("documento_pdf"), controllers.normatividadMercado.update);

/**
 * @swagger
 * /api/normatividad_mercado/delete/{id}:
 *   delete:
 *     summary: Eliminar una normativa de mercado
 *     tags: [Normatividad Mercado]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la normativa de mercado a eliminar
 *     responses:
 *       200:
 *         description: Normativa de mercado eliminada correctamente
 */
router.delete("/delete/:id", controllers.normatividadMercado.delete);

module.exports = router;
