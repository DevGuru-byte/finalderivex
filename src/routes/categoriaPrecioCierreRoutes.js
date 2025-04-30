const express = require("express");
const controllers = require("../controllers/indexController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categoria Precio Cierre
 *   description: Gestión de categoria de precios de cierre
 */

/**
 * @swagger
 * /api/categoria_precio_cierre/list:
 *   get:
 *     summary: Obtener todos los categoria de precios de cierre
 *     tags: [Categoria Precio Cierre]
 *     responses:
 *       200:
 *         description: Lista de categorias de precio de cierre
 */
router.get("/list", controllers.categoriaPrecioCierre.getAll);

/**
 * @swagger
 * /api/categoria_precio_cierre/create:
 *   post:
 *     summary: Crear una nueva categoria de precios de cierre
 *     tags: [Categoria Precio Cierre]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoria
 *             properties:
 *               categoria:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria de precio de cierre creado correctamente
 */
router.post("/create", controllers.categoriaPrecioCierre.create);

/**
 * @swagger
 * /api/categoria_precio_cierre/update/{id}:
 *   put:
 *     summary: Actualizar una categoria de precios de cierre existente
 *     tags: [Categoria Precio Cierre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoria de precio de cierre
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoria
 *             properties:
 *               categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoria de precio de cierre actualizada correctamente
 */
router.put("/update/:id", controllers.categoriaPrecioCierre.update);

/**
 * @swagger
 * /api/categoria_precio_cierre/delete/{id}:
 *   delete:
 *     summary: Eliminar una categoria de precios de cierre
 *     tags: [Categoria Precio Cierre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoria de precio de cierre a eliminar
 *     responses:
 *       200:
 *         description: Categoria de precio de cierre eliminada correctamente
 */
router.delete("/delete/:id", controllers.categoriaPrecioCierre.delete);

module.exports = router;
