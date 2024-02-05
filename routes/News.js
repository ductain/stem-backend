const { getNews, getNewsById } = require("../controllers/news");
const express = require("express");

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       properties:
 *         Id:
 *           type: number
 *           description: id of the News
 *         Title:
 *           type: string
 *           description: title of the News
 *         Detail:
 *           type: string
 *           description: detail of the News
 *         Image:
 *           type: string
 *           description: url of image
 */

/**
 * @swagger
 * tags:
 *   name: News
 *   description: The News managing API
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Returns the list of all the News
 *     tags: [News]
 *     responses:
 *       200:
 *         description: The list of the News
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /news/{Id}:
 *   get:
 *     summary: Get the News by id
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: The News Id
 *     responses:
 *       200:
 *         description: The News description by id
 *         content:
 *           application/json:
 *             schema:        
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: News not found
 *       500:
 *         description: Internal Server Error 
 */
const router = express.Router();

router.get("/", getNews);
router.get("/:Id", getNewsById);

module.exports = router;