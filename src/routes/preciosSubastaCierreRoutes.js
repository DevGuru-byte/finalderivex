const express = require("express");
const controllers = require("../controllers/indexController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Precios Subasta Cierre
 *   description: Gestión de precios de subasta de cierre
 */

/**
 * @swagger
 * /api/precios_convocatorias_subasta_cierre/list:
 *   get:
 *     summary: Obtener todos los precios de subasta de cierre
 *     tags: [Precios Subasta Cierre]
 *     responses:
 *       200:
 *         description: Lista de precios de subasta de cierre
 */
router.get("/list", controllers.preciosSubastaCierre.getAll);

/**
 * @swagger
 * /api/precios_convocatorias_subasta_cierre/create:
 *   post:
 *     summary: Crear un nuevo precio de subasta de cierre
 *     tags: [Precios Subasta Cierre]
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
 *               - precio_referencia
 *             properties:
 *               fecha_convocatoria:
 *                 type: string
 *                 format: date
 *               nemotecnico:
 *                 type: string
 *               contrato:
 *                 type: string
 *                 format: date
 *               precio_referencia:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Precio de subasta de cierre creado correctamente
 */
router.post("/create", controllers.preciosSubastaCierre.create);

/**
 * @swagger
 * /api/precios_convocatorias_subasta_cierre/update/{id}:
 *   put:
 *     summary: Actualizar un precio de subasta de cierre existente
 *     tags: [Precios Subasta Cierre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del precio de subasta de cierre
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
 *               - precio_referencia
 *             properties:
 *               fecha_convocatoria:
 *                 type: string
 *                 format: date
 *               nemotecnico:
 *                 type: string
 *               contrato:
 *                 type: string
 *                 format: date
 *               precio_referencia:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Precio de subasta de cierre actualizado correctamente
 */
router.put("/update/:id", controllers.preciosSubastaCierre.update);

/**
 * @swagger
 * /api/precios_convocatorias_subasta_cierre/delete/{id}:
 *   delete:
 *     summary: Eliminar un precio de subasta de cierre
 *     tags: [Precios Subasta Cierre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del precio de subasta de cierre a eliminar
 *     responses:
 *       200:
 *         description: Precio de subasta de cierre eliminado correctamente
 */
router.delete("/delete/:id", controllers.preciosSubastaCierre.delete);

module.exports = router;
