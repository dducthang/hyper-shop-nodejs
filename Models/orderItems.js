const mongoose = require('mongoose');

const orderItemsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: Number,
});

const OrderItems = mongoose.model('OrderItems', orderItemsSchema);

module.exports = OrderItems;
