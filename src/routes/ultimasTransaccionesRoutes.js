const express = require("express");
const controllers = require("../controllers/indexController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Últimas Transacciones
 *   description: Gestión de las últimas transacciones registradas
 */

/**
 * @swagger
 * /api/ultimas_transacciones/list:
 *   get:
 *     summary: Obtener todas las últimas transacciones
 *     tags: [Últimas Transacciones]
 *     responses:
 *       200:
 *         description: Lista de transacciones
 */
router.get("/list", controllers.ultimasTransacciones.getAll);

/**
 * @swagger
 * /api/ultimas_transacciones/create:
 *   post:
 *     summary: Crear una nueva transacción
 *     tags: [Últimas Transacciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha
 *               - instrumento
 *               - contrato
 *               - mes_contrato
 *               - precio
 *               - cantidad
 *               - monto
 *               - carga_total
 *               - sesion_negociacion
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               instrumento:
 *                 type: string
 *               contrato:
 *                 type: string
 *               mes_contrato:
 *                 type: string
 *                 format: date
 *               precio:
 *                 type: number
 *                 format: float
 *               cantidad:
 *                 type: number
 *                 format: float
 *               monto:
 *                 type: number
 *                 format: float
 *               carga_total:
 *                 type: number
 *                 format: float
 *               sesion_negociacion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transacción creada correctamente
 */
router.post("/create", controllers.ultimasTransacciones.create);

/**
 * @swagger
 * /api/ultimas_transacciones/update/{id}:
 *   put:
 *     summary: Actualizar una transacción existente
 *     tags: [Últimas Transacciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la transacción a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha
 *               - instrumento
 *               - contrato
 *               - mes_contrato
 *               - precio
 *               - cantidad
 *               - monto
 *               - carga_total
 *               - sesion_negociacion
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               instrumento:
 *                 type: string
 *               contrato:
 *                 type: string
 *               mes_contrato:
 *                 type: string
 *                 format: date
 *               precio:
 *                 type: number
 *                 format: float
 *               cantidad:
 *                 type: number
 *                 format: float
 *               monto:
 *                 type: number
 *                 format: float
 *               carga_total:
 *                 type: number
 *                 format: float
 *               sesion_negociacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transacción actualizada correctamente
 */
router.put("/update/:id", controllers.ultimasTransacciones.update);

/**
 * @swagger
 * /api/ultimas_transacciones/delete/{id}:
 *   delete:
 *     summary: Eliminar una transacción
 *     tags: [Últimas Transacciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la transacción a eliminar
 *     responses:
 *       200:
 *         description: Transacción eliminada correctamente
 */
router.delete("/delete/:id", controllers.ultimasTransacciones.delete);

module.exports = router;
