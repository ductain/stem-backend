const { getLabs, getLabById } = require("../controllers/lab");
const express = require("express");

/**
 * @swagger
 * components:
 *   schemas:
 *     Lab:
 *       type: object
 *       properties:
 *         Id:
 *           type: number
 *           description: id of the Lab
 *         Code:
 *           type: string
 *           description: Code of the Lab
 *         Topic:
 *           type: string
 *           description: topic of the lab
 *         Description:
 *           type: string
 *           description: detail of the lab
 *         CreatedDate:
 *           type: string
 *           format: date-time
 *           description: create date of lab
 *         EndDate:
 *           type: string
 *           format: date-time
 *           description: end date of lab
 *         StartDate:
 *           type: string
 *           format: date-time
 *           description: start date of lab
 *         UpdatedDate:
 *           type: string
 *           format: date-time
 *           description: update date of lab
 *         ProgramId:
 *           type: number
 *           description: id of the program
 *         ProgramName:
 *           type: string
 *           description: name of the program
 */

/**
 * @swagger
 * tags:
 *   name: Labs
 *   description: The Labs managing API
 */

/**
 * @swagger
 * /lab:
 *   get:
 *     summary: Returns the list of all the Labs
 *     tags: [Labs]
 *     responses:
 *       200:
 *         description: The list of the Labs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lab'
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /lab/{Id}:
 *   get:
 *     summary: Get the Lab by id
 *     tags: [Labs]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Lab Id
 *     responses:
 *       200:
 *         description: The Lab description by id
 *         content:
 *           application/json:
 *             schema:        
 *               $ref: '#/components/schemas/Lab'
 *       404:
 *         description: Lab not found
 *       500:
 *         description: Internal Server Error 
 */
const router = express.Router();

router.get("/", getLabs);
router.get("/:Id", getLabById);

module.exports = router;