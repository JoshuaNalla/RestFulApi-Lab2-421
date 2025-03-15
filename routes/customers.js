const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

/**
    * @swagger
    * components:
    *   schemas:
    *     Customer:
    *       type: object
    *       properties:
    *         name:
    *           type: string
    *           description: The customer's name
    *         age:
    *           type: integer
    *           description: The customer's age
    */
/**
    * @swagger
    * /customers:
    *   get:
    *     summary: Retrieve a list of customers
    *     responses:
    *       201:
 *         description: List of customers created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
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
    *     summary: Create a new user
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Customer'
    *     responses:
    *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Bad request (e.g., missing or invalid fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "There was an issue creating the customer"
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

// Create a new customer
router.post('/', async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all the customers and it uses the delay feature (setTimeout)
router.get('/', async (req, res) => {
  try {
    await new Promise ((resolve) =>setTimeout(resolve, 5000));
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// my own snippet
router.get("/status", (request, response) => {
    const status = {
        "Status":"Running"
    };

    response.send(status);
})

// Update a customer
router.patch('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a customer
router.delete('/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;