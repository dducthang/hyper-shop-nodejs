const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const morgan = require('morgan');
require('./db/mongoose.js');
require('dotenv/config');


const shopRouter = require('./routes/shop');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/order');

const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use(shopRouter);
app.use(productRouter);
app.use(userRouter);
app.use(authRouter);
app.use(orderRouter);

//server;
app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running on http://localhost:3000');
});
