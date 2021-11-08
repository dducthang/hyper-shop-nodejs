require('dotenv/config');
require('./db/mongoose.js');
const express = require('express');
const Product = require('./Models/product');
require('./db/mongoose.js');
const app = express();
const port = process.env.PORT || 3000;

//middlewares

//routes

//database

//test
const product = new Product({
  name: 'Nike Air 2',
  brand: 'Nike',
  countInStock: 3,
  rating: 5,
  price: 123,
  description: { color: 'red' },
});
product.save().then(() => {
  console.log('Saved');
});

//server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
