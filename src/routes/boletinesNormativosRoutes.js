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
 *   name: Boletines Normativos
 *   description: Gestión de boletines normativos
 */

/**
 * @swagger
 * /api/boletines_normativos/list:
 *   get:
 *     summary: Obtener todos los boletines normativos
 *     tags: [Boletines Normativos]
 *     responses:
 *       200:
 *         description: Lista de boletines
 */
router.get("/list", controllers.boletinesNormativos.getAll);

/**
 * @swagger
 * /api/boletines_normativos/create:
 *   post:
 *     summary: Crear un nuevo boletín normativo
 *     tags: [Boletines Normativos]
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
router.post("/create", upload.single("documento_pdf"), controllers.boletinesNormativos.create);

/**
 * @swagger
 * /api/boletines_normativos/update/{id}:
 *   put:
 *     summary: Actualizar un boletín normativo existente
 *     tags: [Boletines Normativos]
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
router.put("/update/:id", upload.single("documento_pdf"), controllers.boletinesNormativos.update);

/**
 * @swagger
 * /api/boletines_normativos/delete/{id}:
 *   delete:
 *     summary: Eliminar un boletín normativo
 *     tags: [Boletines Normativos]
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
router.delete("/delete/:id", controllers.boletinesNormativos.delete);

module.exports = router;
