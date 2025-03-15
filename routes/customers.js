const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

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
    res.json(customers);
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