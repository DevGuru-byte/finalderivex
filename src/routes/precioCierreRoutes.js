const express = require("express");
const controllers = require("../controllers/indexController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Precio Cierre
 *   description: Gestión de precios de cierre
 */

/**
 * @swagger
 * /api/precio_cierre/list:
 *   get:
 *     summary: Obtener todos los precios de cierre
 *     tags: [Precio Cierre]
 *     responses:
 *       200:
 *         description: Lista de precios de cierre
 */
router.get("/list", controllers.precioCierre.getAll);

/**
 * @swagger
 * /api/precio_cierre/create:
 *   post:
 *     summary: Crear un nuevo precio de cierre
 *     tags: [Precio Cierre]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha
 *               - id_categoria_precio_cierre
 *               - categoria_cierre
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               id_categoria_precio_cierre:
 *                 type: integer
 *                 description: ID de la categoría (llave foránea)
 *               categoria_cierre:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Precio de cierre creado correctamente
 */
router.post("/create", controllers.precioCierre.create);

/**
 * @swagger
 * /api/precio_cierre/update/{id}:
 *   put:
 *     summary: Actualizar un precio de cierre existente
 *     tags: [Precio Cierre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del precio de cierre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha
 *               - id_categoria_precio_cierre
 *               - categoria_cierre
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               id_categoria_precio_cierre:
 *                 type: integer
 *                 description: ID de la categoría (llave foránea)
 *               categoria_cierre:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Precio de cierre actualizado correctamente
 */
router.put("/update/:id", controllers.precioCierre.update);

/**
 * @swagger
 * /api/precio_cierre/delete/{id}:
 *   delete:
 *     summary: Eliminar un precio de cierre
 *     tags: [Precio Cierre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del precio de cierre a eliminar
 *     responses:
 *       200:
 *         description: Precio de cierre eliminado correctamente
 */
router.delete("/delete/:id", controllers.precioCierre.delete);

module.exports = router;
