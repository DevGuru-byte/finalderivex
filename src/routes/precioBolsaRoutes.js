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
 *   name: Precios Bolsa
 *   description: Gestión de precios de la bolsa
 */

/**
 * @swagger
 * /api/precio_bolsa/list:
 *   get:
 *     summary: Obtener todos los precios de la bolsa
 *     tags: [Precios Bolsa]
 *     responses:
 *       200:
 *         description: Lista de precios de la bolsa
 */
router.get("/list", controllers.precioBolsa.getAll);

/**
 * @swagger
 * /api/precio_bolsa/create:
 *   post:
 *     summary: Crear un nuevo precio de bolsa
 *     tags: [Precios Bolsa]
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
 *         description: Precio de bolsa creado correctamente
 */
router.post("/create", upload.single("documento_pdf"), controllers.precioBolsa.create);

/**
 * @swagger
 * /api/precio_bolsa/update/{id}:
 *   put:
 *     summary: Actualizar un precio de bolsa existente
 *     tags: [Precios Bolsa]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del precio de bolsa
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
 *         description: Precio de bolsa actualizado correctamente
 */
router.put("/update/:id", upload.single("documento_pdf"), controllers.precioBolsa.update);

/**
 * @swagger
 * /api/precio_bolsa/delete/{id}:
 *   delete:
 *     summary: Eliminar un precio de bolsa
 *     tags: [Precios Bolsa]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del precio de bolsa a eliminar
 *     responses:
 *       200:
 *         description: Precio de bolsa eliminado correctamente
 */
router.delete("/delete/:id", controllers.precioBolsa.delete);

module.exports = router;
