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
      sex: Boolean,
      shoesHeight: String,
      closureType: String,
      material: String,
    },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  viewCount: Number,
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
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
