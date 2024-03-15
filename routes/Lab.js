const {
  getLabs,
  getLabById,
  getLabByProgramId,
  createLab,
  updateLab,
  deleteLab,
} = require("../controllers/lab");
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
 *         Image:
 *           type: string
 *           description: image of the lab
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
 * /labs:
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
 * /labs/lab-list/labs-in-program:
 *   get:
 *     summary: Get all Labs by program id
 *     tags: [Labs]
 *     parameters:
 *       - in: query
 *         name: ProgramId
 *         description: Id of the program
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: get all labs by program id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lab'
 *       404:
 *         description: Lab not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /labs/{Id}:
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

/**
 * @swagger
 * /labs:
 *   post:
 *     summary: Create a new lab
 *     tags: [Labs]
 *     parameters:
 *       - in: query
 *         name: ProgramId
 *         description: ID of the program that exist
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *      required: true
 *      description: Input StartDate, EndDate, topic, description and image
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      StartDate:
 *                          type: string
 *                          format: date-time
 *                      EndDate:
 *                          type: string
 *                          format: date-time
 *                      Topic:
 *                          type: string
 *                      Description:
 *                          type: string
 *                      Image:
 *                          type: string
 *     responses:
 *       200:
 *         description: Lab created successfully
 *       404:
 *         description: Lab not found
 *       500:
 *         description: Internal Server Error 
 */

/**
 * @swagger
 * /labs/{Id}:
 *  put:
 *    summary: Update the lab by the id
 *    tags: [Labs]
 *    parameters:
 *      - in: path
 *        name: Id
 *        schema:
 *          type: string
 *        required: true
 *        description: The lab id
 *    requestBody:
 *      required: true
 *      description: Update StartDate, EndDate, topic, description and image
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               StartDate:
 *                  type: string
 *                  format: date-time
 *               EndDate:
 *                  type: string
 *                  format: date-time
 *               Topic:
 *                  type: string
 *               Description:
 *                  type: string
 *               Image:
 *                  type: string
 *    responses:
 *      200:
 *        description: Lab updated successfully
 *      404:
 *        description: Lab not found
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 * /labs/{Id}:
 *  delete:
 *    summary: Delete the lab by the id
 *    tags: [Labs]
 *    parameters:
 *      - in: path
 *        name: Id
 *        schema:
 *          type: string
 *          required: true
 *          description: The lab id
 *    responses:
 *      200:
 *        description: Lab deleted successfully
 *      404:
 *        description: Lab not found
 *      500:
 *        description: Internal Server Error
 */
const router = express.Router();

router.get("/", getLabs);
router.get("/:Id", getLabById);
router.get("/lab-list/labs-in-program", getLabByProgramId);
router.post("/", createLab);
router.put("/:Id", updateLab);
router.delete("/:Id", deleteLab);

module.exports = router;
