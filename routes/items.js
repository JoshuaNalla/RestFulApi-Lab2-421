const express = require('express');
const router = express.Router();
const Item = require('../models/item');

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The item's name
 *         description:
 *           type: string
 *           description: The item's description
 *       example:
 *         name: basketball
 *         description: sports ball
 */
/**
    * @swagger
    * /items:
    *   get:
    *     summary: Retrieve a list of items
    *     responses:
    *       200:
 *         description: List of items created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error occurred"
 *
    * 
    *   post:
    *     summary: Create a new item
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Item'
    *     responses:
    *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Bad request (e.g., missing or invalid fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "There was an issue creating the Item"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error occurred"
    */

// Create a new item
router.post('/', async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// my own snippet
router.get("/status", (request, response) => {
    const status = {
        "Status":"Running"
    };

    response.send(status);
})

// Update an item
router.patch('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;