const express = require("express");
const controllers = require("../controllers/indexController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Negociación Mixta Diaria
 *   description: Gestión de negociación mixta diaria
 */

/**
 * @swagger
 * /api/negociacion_mixta_diario/list:
 *   get:
 *     summary: Obtener todas las negociaciones mixtas diarias
 *     tags: [Negociación Mixta Diaria]
 *     responses:
 *       200:
 *         description: Lista de las negociaciones mixtas diarias
 */
router.get("/list", controllers.negociacionMixtaDiaria.getAll);

/**
 * @swagger
 * /api/negociacion_mixta_diario/create:
 *   post:
 *     summary: Crear una nueva negociación mixta diaria
 *     tags: [Negociación Mixta Diaria]
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
 *         description: Negociación Mixta Diaria creada correctamente
 */
router.post("/create", controllers.negociacionMixtaDiaria.create);

/**
 * @swagger
 * /api/negociacion_mixta_diario/update/{id}:
 *   put:
 *     summary: Actualizar una negociación mixta diaria existente
 *     tags: [Negociación Mixta Diaria]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la negociación mixta diaria
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
 *         description: Negociación Mixta Diaria actualizada correctamente
 */
router.put("/update/:id", controllers.negociacionMixtaDiaria.update);

/**
 * @swagger
 * /api/negociacion_mixta_diario/delete/{id}:
 *   delete:
 *     summary: Eliminar un  negociación mixta diaria
 *     tags: [Negociación Mixta Diaria]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la negociación mixta diaria a eliminar
 *     responses:
 *       200:
 *         description: Negociación Mixta Diaria eliminada correctamente
 */
router.delete("/delete/:id", controllers.negociacionMixtaDiaria.delete);

module.exports = router;
