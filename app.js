const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('./db/mongoose.js');
require('dotenv/config');

const shopRoutes = require('./routes/shop');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));

//routes
app.use(shopRoutes);
app.use(productRoutes);
app.use(userRoutes);
app.use(authRoutes);
app.use(orderRoutes);
app.use(apiRoutes);

//server;
app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running on http://localhost:4000');
});
