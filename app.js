require('dotenv/config');
const mongoose = require('./db/mongoose.js');
const express = require('express');
const Product = require('./Models/product.js');
const User = require('./Models/user.js');
const Comment = require('./Models/comment.js');
const Cart = require('./Models/cart.js');
const Order = require('./Models/order.js');
const OrderItems = require('./Models/orderItem.js');

const app = express();
const port = process.env.PORT || 3000;

//middlewares

//routes

//database

//insert db
// const doc = new Cart({
//   user: '6189f44e806c3f4aae64da89',
//   orderItems: ['618a538d641982874a53e0ec'],
// });

// doc.save().then(() => {
//   console.log('saved');
// });

//test
// Comment.find({}, (e, c) => {
//   console.log(c);
// })
//   .populate('user')
//   .exec((e, u) => {
//     if (e) console.log(e);
//     else console.log(u);
//   });

Cart.find({}, (e, c) => {
  console.log(c);
});
//server;
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
