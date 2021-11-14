require('dotenv/config');

const path = require('path');

const express = require('express');

const shopRoutes = require('./routes/shop');

const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use(shopRoutes);

//server;
app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running on http://localhost:3000');
});
