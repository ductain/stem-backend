const { getTutorials, getTutorialById } = require("../controllers/tutorial");
const express = require("express");

/**
 * @swagger
 * components:
 *   schemas:
 *     Tutorial:
 *       type: object
 *       properties:
 *         Id:
 *           type: number
 *           description: id of the Tutorial
 *         Title:
 *           type: string
 *           description: title of the Tutorial
 *         Description:
 *           type: string
 *           description: detail of the Tutorial
 *         Image:
 *           type: string
 *           description: url of image
 *         Video:
 *           type: string
 *           description: url of video
 */

/**
 * @swagger
 * tags:
 *   name: Tutorials
 *   description: The Tutorials managing API
 */

/**
 * @swagger
 * /tutorial:
 *   get:
 *     summary: Returns the list of all the Tutorials
 *     tags: [Tutorials]
 *     responses:
 *       200:
 *         description: The list of the Tutorials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tutorial'
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /tutorial/{Id}:
 *   get:
 *     summary: Get the Tutorial by id
 *     tags: [Tutorials]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Tutorial Id
 *     responses:
 *       200:
 *         description: The Tutorial description by id
 *         content:
 *           application/json:
 *             schema:        
 *               $ref: '#/components/schemas/Tutorial'
 *       404:
 *         description: Tutorial not found
 *       500:
 *         description: Internal Server Error 
 */
const router = express.Router();

router.get("/", getTutorials);
router.get("/:Id", getTutorialById);

module.exports = router;