const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: String,
  orderedDate: {
    type: Date,
    default: Date.now,
  },
  deliveredDate: String,
  totalPrice: Number,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
