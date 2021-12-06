const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");

require("./db/mongoose.js");
require("dotenv/config");

const checkAuthenticated = require("./config/auth").checkAuthenticated;
const initializePassport = require("./config/passport");
initializePassport(passport);

const shopRoutes = require("./routes/shop");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const apiRoutes = require("./routes/api");
const adminRoutes = require("./routes/admin");

const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("tiny"));
app.use(flash());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/", shopRoutes);
app.use("/products", checkAuthenticated, productRoutes);
app.use("/users", checkAuthenticated, userRoutes);
app.use("/auth", authRoutes);
app.use("/orders", checkAuthenticated, orderRoutes);
app.use("/api", checkAuthenticated, apiRoutes);
app.use("/admin", checkAuthenticated, adminRoutes);

//server;
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on http://localhost:4000");
});
