const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItem',
      required: true,
    },
  ],
  address:{
    type: String,
    defalt: ""
  },
  status: {
    type: String,
    default: 'Pending',
  },
  orderedDate: {
    type: Date,
    default: Date.now,
  },
  deliveredDate: String,
  totalPrice: Number,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
