const express = require("express");
const controllers = require("../controllers/indexController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Negociación Electrónica Promedio
 *   description: Gestión de negociación electrónica promedio
 */

/**
 * @swagger
 * /api/negociacion_electronica_promedio/list:
 *   get:
 *     summary: Obtener todas las negociaciones electronicas promedio
 *     tags: [Negociación Electrónica Promedio]
 *     responses:
 *       200:
 *         description: Lista de las negociaciones electronicas promedio
 */
router.get("/list", controllers.negociacionElectronicaPromedio.getAll);

/**
 * @swagger
 * /api/negociacion_electronica_promedio/create:
 *   post:
 *     summary: Crear una nueva negociación electrónica promedio
 *     tags: [Negociación Electrónica Promedio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - anno
 *               - demanda
 *               - oferta
 *             properties:
 *               anno:
 *                 type: string
 *               demanda:
 *                 type: number
 *                 format: float
 *               oferta:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Negociación electrónica promedio creada correctamente
 */
router.post("/create", controllers.negociacionElectronicaPromedio.create);

/**
 * @swagger
 * /api/negociacion_electronica_promedio/update/{id}:
 *   put:
 *     summary: Actualizar una negociación electrónica promedio existente
 *     tags: [Negociación Electrónica Promedio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la negociación electrónica promedio
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - anno
 *               - demanda
 *               - oferta
 *             properties:
 *               anno:
 *                 type: string
 *               demanda:
 *                 type: number
 *                 format: float
 *               oferta:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Negociación Electrónica Promedio actualizada correctamente
 */
router.put("/update/:id", controllers.negociacionElectronicaPromedio.update);


/**
 * @swagger
 * /api/negociacion_electronica_promedio/delete/{id}:
 *   delete:
 *     summary: Eliminar un  negociación electrónica promedio
 *     tags: [Negociación Electrónica Promedio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la negociación electrónica promedio a eliminar
 *     responses:
 *       200:
 *         description: Negociación Electrónica Promedio eliminada correctamente
 */
router.delete("/delete/:id", controllers.negociacionElectronicaPromedio.delete);

module.exports = router;
