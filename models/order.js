const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  CustomerId: {type: String, required: true},
  ItemId: {type: String, required: true},
  Quantity: {type: Number, required: true}
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;