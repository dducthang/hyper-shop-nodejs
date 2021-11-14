require('dotenv/config');

const path = require('path');

const mongoose = require('./db/mongoose.js');
const express = require('express');
const Product = require('./models/product.js');
const User = require('./models/user.js');
const Comment = require('./models/comment.js');
const Cart = require('./models/cart.js');
const Order = require('./models/order.js');
const OrderItems = require('./models/orderItem.js');

const shopRoutes = require('./routes/shop');

const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(shopRoutes);

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
app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running on http://localhost:3000');
});
