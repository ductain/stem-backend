const { getProvinces, getProvinceById, createProvince, updateProvince, deleteProvince } = require("../controllers/province");
const express = require("express");

/**
 * @swagger
 * components:
 *   schemas:
 *     Province:
 *       type: object
 *       properties:
 *         Id:
 *           type: number
 *           description: id of the province
 *         Code:
 *           type: string
 *           description: Code of the province
 *         Name:
 *           type: string
 *           description: name of the province
 */

/**
 * @swagger
 * tags:
 *   name: Provinces
 *   description: The provinces managing API
 */

/**
 * @swagger
 * /province:
 *   get:
 *     summary: Returns the list of all the provinces
 *     tags: [Provinces]
 *     responses:
 *       200:
 *         description: The list of the provinces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Province'
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /province/{Id}:
 *   get:
 *     summary: Get the province by id
 *     tags: [Provinces]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: The province Id
 *     responses:
 *       200:
 *         description: The province description by id
 *         content:
 *           application/json:
 *             schema:        
 *               $ref: '#/components/schemas/Province'
 *       404:
 *         description: Province not found
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /province:
 *   post:
 *     summary: Create a new province
 *     tags: [Provinces]
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
 * /province/{Id}:
 *  put:
 *    summary: Update the province by the id
 *    tags: [Provinces]
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
 * /province/{Id}:
 *  delete:
 *    summary: Delete the province by the id
 *    tags: [Provinces]
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

router.get("/", getProvinces);
router.get("/:Id", getProvinceById);
router.post("/", createProvince)
router.put("/:Id", updateProvince);
router.delete("/:Id", deleteProvince);

module.exports = router;
