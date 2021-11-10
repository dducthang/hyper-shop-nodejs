const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  // rating: {
  //   type: Number,
  //   min: 0,
  //   max: 5,
  // },
  description: {
    type: {
      color: String,
      sex: String,
      shoesHeight: String,
      closureType: String,
      material: String,
    },
  },
  category: {
    type: String,
    required: true,
  },

  viewCount: {
    type: Number,
    default: 0,
  },
  image: String,
  images: [
    {
      type: String,
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
  },
  sizes: [
    {
      type: Number,
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
