const express = require("express");
const controllers = require("../controllers/indexController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Negociación Electrónica Diaria
 *   description: Gestión de negociación electrónica diaria
 */

/**
 * @swagger
 * /api/negociacion_electronica_diario/list:
 *   get:
 *     summary: Obtener todas las negociaciones electronicas diarias
 *     tags: [Negociación Electrónica Diaria]
 *     responses:
 *       200:
 *         description: Lista de las negociaciones electronicas diarias
 */
router.get("/list", controllers.negociacionElectronicaDiaria.getAll);

/**
 * @swagger
 * /api/negociacion_electronica_diario/create:
 *   post:
 *     summary: Crear una nueva negociación electrónica diaria
 *     tags: [Negociación Electrónica Diaria]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contrato
 *               - nemotecnico
 *               - cantidad_energia_demanda
 *               - mejor_demanda
 *               - mejor_oferta
 *               - cantidad_energia_oferta
 *             properties:
 *               contrato:
 *                 type: string
 *                 format: date
 *               nemotecnico:
 *                 type: string
 *               cantidad_energia_demanda:
 *                 type: number
 *                 format: float
 *               mejor_demanda:
 *                 type: number
 *                 format: float
 *               mejor_oferta:
 *                 type: number
 *                 format: float
 *               cantidad_energia_oferta:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Negociación electrónica diaria creada correctamente
 */
router.post("/create", controllers.negociacionElectronicaDiaria.create);

/**
 * @swagger
 * /api/negociacion_electronica_diario/update/{id}:
 *   put:
 *     summary: Actualizar una negociación electrónica diaria existente
 *     tags: [Negociación Electrónica Diaria]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la negociación electrónica diaria
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contrato
 *               - nemotecnico
 *               - cantidad_energia_demanda
 *               - mejor_demanda
 *               - mejor_oferta
 *               - cantidad_energia_oferta
 *             properties:
 *               contrato:
 *                 type: string
 *                 format: date
 *               nemotecnico:
 *                 type: string
 *               cantidad_energia_demanda:
 *                 type: number
 *                 format: float
 *               mejor_demanda:
 *                 type: number
 *                 format: float
 *               mejor_oferta:
 *                 type: number
 *                 format: float
 *               cantidad_energia_oferta:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Negociación Electrónica Diaria actualizada correctamente
 */
router.put("/update/:id", controllers.negociacionElectronicaDiaria.update);

/**
 * @swagger
 * /api/negociacion_electronica_diario/delete/{id}:
 *   delete:
 *     summary: Eliminar un  negociación electrónica diaria
 *     tags: [Negociación Electrónica Diaria]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la negociación electrónica diaria a eliminar
 *     responses:
 *       200:
 *         description: Negociación Electrónica Diaria eliminada correctamente
 */
router.delete("/delete/:id", controllers.negociacionElectronicaDiaria.delete);

module.exports = router;
