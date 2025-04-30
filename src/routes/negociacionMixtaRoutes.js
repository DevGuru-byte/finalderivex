const express = require("express");
const controllers = require("../controllers/indexController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Negociación Mixta
 *   description: Gestión de negociación mixta
 */

/**
 * @swagger
 * /api/negociacion_mixta/list:
 *   get:
 *     summary: Obtener todas las negociaciones mixtas
 *     tags: [Negociación Mixta]
 *     responses:
 *       200:
 *         description: Lista de las negociaciones mixtas
 */
router.get("/list", controllers.negociacionMixta.getAll);

/**
 * @swagger
 * /api/negociacion_mixta/create:
 *   post:
 *     summary: Crear una nueva negociación mixta
 *     tags: [Negociación Mixta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha
 *               - nemotecnico
 *               - mejor_precio_compra
 *               - cantidad_contratos_precio_compra
 *               - mejor_precio_venta
 *               - cantidad_contratos_precio_venta
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               nemotecnico:
 *                 type: string
 *               mejor_precio_compra:
 *                 type: number
 *                 format: float
 *               cantidad_contratos_precio_compra:
 *                 type: number
 *                 format: float
 *               mejor_precio_venta:
 *                 type: number
 *                 format: float
 *               cantidad_contratos_precio_venta:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Negociación Mixta creada correctamente
 */
router.post("/create", controllers.negociacionMixta.create);

/**
 * @swagger
 * /api/negociacion_mixta/update/{id}:
 *   put:
 *     summary: Actualizar una negociación mixta existente
 *     tags: [Negociación Mixta]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la negociación mixta
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha
 *               - nemotecnico
 *               - mejor_precio_compra
 *               - cantidad_contratos_precio_compra
 *               - mejor_precio_venta
 *               - cantidad_contratos_precio_venta
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               nemotecnico:
 *                 type: string
 *               mejor_precio_compra:
 *                 type: number
 *                 format: float
 *               cantidad_contratos_precio_compra:
 *                 type: number
 *                 format: float
 *               mejor_precio_venta:
 *                 type: number
 *                 format: float
 *               cantidad_contratos_precio_venta:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Negociación Mixta actualizada correctamente
 */
router.put("/update/:id", controllers.negociacionMixta.update);

/**
 * @swagger
 * /api/negociacion_mixta/delete/{id}:
 *   delete:
 *     summary: Eliminar un  negociación mixta
 *     tags: [Negociación Mixta]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la negociación mixta a eliminar
 *     responses:
 *       200:
 *         description: Negociación Mixta eliminada correctamente
 */
router.delete("/delete/:id", controllers.negociacionMixta.delete);

module.exports = router;
