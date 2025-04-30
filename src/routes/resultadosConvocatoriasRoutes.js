const express = require("express");
const controllers = require("../controllers/indexController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Resultados Convocatorias
 *   description: Gestión de resultados de convocatorias
 */

/**
 * @swagger
 * /api/resultados_convocatorias/list:
 *   get:
 *     summary: Obtener todos los resultados de convocatorias
 *     tags: [Resultados Convocatorias]
 *     responses:
 *       200:
 *         description: Lista de resultados de convocatorias
 */
router.get("/list", controllers.resultadosConvocatorias.getAll);

/**
 * @swagger
 * /api/resultados_convocatorias/create:
 *   post:
 *     summary: Crear un nuevo resultado de convocatoria
 *     tags: [Resultados Convocatorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha_convocatoria
 *               - nemotecnico
 *               - contrato
 *               - precio_adjudicado
 *               - cantidad_energia_adjudicada
 *               - cantidad_energia_expuesta_compra
 *               - cantidad_energia_expuesta_venta
 *             properties:
 *               fecha_convocatoria:
 *                 type: string
 *                 format: date
 *               nemotecnico:
 *                 type: string
 *               contrato:
 *                 type: string
 *                 format: date
 *               precio_adjudicado:
 *                 type: number
 *                 format: float
 *               cantidad_energia_adjudicada:
 *                 type: number
 *                 format: float
 *               cantidad_energia_expuesta_compra:
 *                 type: number
 *                 format: float
 *               cantidad_energia_expuesta_venta:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Resultado de convocatoria creado correctamente
 */
router.post("/create", controllers.resultadosConvocatorias.create);

/**
 * @swagger
 * /api/resultados_convocatorias/update/{id}:
 *   put:
 *     summary: Actualizar un resultado de convocatoria existente
 *     tags: [Resultados Convocatorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del resultado de convocatoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha_convocatoria
 *               - nemotecnico
 *               - contrato
 *               - precio_adjudicado
 *               - cantidad_energia_adjudicada
 *               - cantidad_energia_expuesta_compra
 *               - cantidad_energia_expuesta_venta
 *             properties:
 *               fecha_convocatoria:
 *                 type: string
 *                 format: date
 *               nemotecnico:
 *                 type: string
 *               contrato:
 *                 type: string
 *                 format: date
 *               precio_adjudicado:
 *                 type: number
 *                 format: float
 *               cantidad_energia_adjudicada:
 *                 type: number
 *                 format: float
 *               cantidad_energia_expuesta_compra:
 *                 type: number
 *                 format: float
 *               cantidad_energia_expuesta_venta:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Resultado de convocatoria actualizado correctamente
 */
router.put("/update/:id", controllers.resultadosConvocatorias.update);

/**
 * @swagger
 * /api/resultados_convocatorias/delete/{id}:
 *   delete:
 *     summary: Eliminar un resultado de convocatoria
 *     tags: [Resultados Convocatorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del resultado de convocatoria a eliminar
 *     responses:
 *       200:
 *         description: Resultado de convocatoria eliminado correctamente
 */
router.delete("/delete/:id", controllers.resultadosConvocatorias.delete);

module.exports = router;
