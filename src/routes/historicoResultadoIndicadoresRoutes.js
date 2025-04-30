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
 *   name: Historico Resultados Indicadores
 *   description: Gestión de historico de resultados indicadores
 */

/**
 * @swagger
 * /api/historico_resultado_indicadores/list:
 *   get:
 *     summary: Obtener todos los historico de resultados indicadores
 *     tags: [Historico Resultados Indicadores]
 *     responses:
 *       200:
 *         description: Lista de historico de resultados indicadores
 */
router.get("/list", controllers.historicoResultadoIndicadores.getAll);

/**
 * @swagger
 * /api/historico_resultado_indicadores/create:
 *   post:
 *     summary: Crear un nuevo historico de resultados indicadores
 *     tags: [Historico Resultados Indicadores]
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
 *         description: Historico de resultados indicadores creado correctamente
 */
router.post("/create", upload.single("documento_pdf"), controllers.historicoResultadoIndicadores.create);

/**
 * @swagger
 * /api/historico_resultado_indicadores/update/{id}:
 *   put:
 *     summary: Actualizar un historico de resultados indicadores existente
 *     tags: [Historico Resultados Indicadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del historico de resultados indicadores
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
 *         description: Historico de resultados indicadores actualizado correctamente
 */
router.put("/update/:id", upload.single("documento_pdf"), controllers.historicoResultadoIndicadores.update);

/**
 * @swagger
 * /api/historico_resultado_indicadores/delete/{id}:
 *   delete:
 *     summary: Eliminar un historico de resultados indicadores
 *     tags: [Historico Resultados Indicadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del historico de resultados indicadores a eliminar
 *     responses:
 *       200:
 *         description: Historico de resultados indicadores eliminado correctamente
 */
router.delete("/delete/:id", controllers.historicoResultadoIndicadores.delete);

module.exports = router;
