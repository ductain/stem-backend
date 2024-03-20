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
 * /api/v1/news:
 *   get:
 *     summary: Returns the list of all the News
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: search
 *         description: search by title
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: limit item per page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sortField
 *         description: sort field by id or title 
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         description: asc or desc
 *         schema:
 *           type: string
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
 * /api/v1/news/{Id}:
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

/**
 * @swagger
 * /api/v1/news:
 *   post:
 *     summary: Create a new
 *     tags: [News]
 *     requestBody:
 *      required: true
 *      description: Input name
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      Name:
 *                          type: string
 *     responses:
 *       200:
 *         description: Province created successfully
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /api/v1/news/{Id}:
 *  put:
 *    summary: Update the news by the id
 *    tags: [News]
 *    parameters:
 *      - in: path
 *        name: Id
 *        schema:
 *          type: string
 *          required: true
 *          description: The province id
 *    requestBody:
 *      required: true
 *      description: Update province name
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              Name:
 *                  type: string
 *    responses:
 *      200:
 *        description: Province updated successfully
 *      404:
 *        description: Province not found
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/news/{Id}:
 *  delete:
 *    summary: Delete the news by the id
 *    tags: [News]
 *    parameters:
 *      - in: path
 *        name: Id
 *        schema:
 *          type: string
 *          required: true
 *          description: The province id
 *    responses:
 *      200:
 *        description: Province deleted successfully
 *      404:
 *        description: Province not found
 *      500:
 *        description: Internal Server Error
 */
const router = express.Router();

router.get("/", getNews);
router.get("/:Id", getNewsById);

module.exports = router;