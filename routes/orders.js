const express = require('express');
const router = express.Router();
const Order = require('../models/order');

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         customerId:
 *           type: string
 *           description: The Customer who is buying's id
 *         itemId:
 *           type: string
 *           description: The Item that is being bought's id
 *       example:
 *         customerId: 34kh2345325kj342
 *         itemId: 324kj3bn2432kkj34k2
 */

/**
    * @swagger
    * /orders:
    *   get:
    *     summary: Retrieve a list of orders
    *     responses:
    *       200:
 *         description: List of items created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
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
    *             $ref: '#/components/schemas/Order'
    *     responses:
    *       201:
 *         description: order created successfully
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
 *                   example: "There was an issue creating the Order"
 *       404:
 *         description: Invalid or nonexistent customer or item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "There was an issue creating the Order"
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

// Create a new Order
router.post('/', async (req, res) => {
    try {
      const { idOfCustomer, idOfItem, quantity } = req.body;
  
      // Check if customer exists
      const customer = await Customer.findById(idOfCustomer);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // Check if item exists
      const item = await Item.findById(idOfItem);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      // Create the order
      const newOrder = await Order.create({
        idOfCustomer,
        idOfItem,
        quantity,
      });
      // time delay for order processing. 5 seconds at the moment.
      await new Promise ((resolve) =>setTimeout(resolve, 5000));
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
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

// Update an order
router.patch('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;