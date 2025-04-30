const express = require("express");
const controllers = require("../controllers/indexController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Negociación Electrónica
 *   description: Gestión de negociación electrónica
 */

/**
 * @swagger
 * /api/negociacion_electronica/list:
 *   get:
 *     summary: Obtener todas las negociaciones electronicas
 *     tags: [Negociación Electrónica]
 *     responses:
 *       200:
 *         description: Lista de las negociaciones electronicas
 */
router.get("/list", controllers.negociacionElectronica.getAll);

/**
 * @swagger
 * /api/negociacion_electronica/create:
 *   post:
 *     summary: Crear una nueva negociación electrónica
 *     tags: [Negociación Electrónica]
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
 *         description: Negociación electrónica creada correctamente
 */
router.post("/create", controllers.negociacionElectronica.create);

/**
 * @swagger
 * /api/negociacion_electronica/update/{id}:
 *   put:
 *     summary: Actualizar una negociación electrónica existente
 *     tags: [Negociación Electrónica]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la negociación electrónica
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
 *         description: Negociación Electrónica actualizada correctamente
 */
router.put("/update/:id", controllers.negociacionElectronica.update);

/**
 * @swagger
 * /api/negociacion_electronica/delete/{id}:
 *   delete:
 *     summary: Eliminar un  negociación electrónica
 *     tags: [Negociación Electrónica]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la negociación electrónica a eliminar
 *     responses:
 *       200:
 *         description: Negociación Electrónica eliminada correctamente
 */
router.delete("/delete/:id", controllers.negociacionElectronica.delete);

module.exports = router;
