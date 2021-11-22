const Product = require("../Models/product");

exports.getProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let productsPerPage = +req.query.productsPerPage || 3;
  let productsCount;
  const filters = {
    category: req.query.category,
    brand: req.query.brand,
    color: req.query.color,
    sex: req.query.sex,
    shoesHeight: req.query.shoesHeight,
    closureType: req.query.closureType,
    material: req.query.material,
  };
  Object.keys(filters).forEach(
    (key) => filters[key] === undefined && delete filters[key]
  );

  const sortBy = req.query.sortBy || "createdDate";

  Product.countProducts(filters)
    .then((n) => {
      productsCount = n;
      if (req.query.productsPerPage === "all") {
        productsPerPage = n;
      }
      return Product.getProducts(filters)
        .sort(sortBy)
        .skip((page - 1) * productsPerPage)
        .limit(productsPerPage);
    })
    .then(async function (products) {
      res.render("shop/products", {
        pageTitle: "Products",
        products,
        productsPerPage,
        productsCount,
        currentPage: page,
        lastPage: Math.ceil(productsCount / productsPerPage),
        categories: await Product.getCategoriesQuantity(),
      });
    });
};

exports.getProductDetail = (req, res, next) => {
  const productId = req.params.productId;
  Product.getProduct(productId).then((product) => {
    res.render("shop/productDetail", {
      pageTitle: "Product detail",
      bannerText: "Product",
      product: product,
      comments: [
        {
          owner: "thang dang is the best",
          content: "this is the best shoe that i have ever owned",
          response: "Thank you for your feedback. This is our pleasure",
        },
        {
          owner: "thang dang is the best",
          content: "this is the best shoe that i have ever owned",
          response: "Thank you for your feedback. This is our pleasure",
        },
        {
          owner: "thang dang is the best",
          content: "this is the best shoe that i have ever owned",
          response: "Thank you for your feedback. This is our pleasure",
        },
      ],
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("shop/addProduct", {
    pageTitle: "Add product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = {
    name: req.body.productName,
    brand: req.body.brand,
    price: req.body.price,
    color: req.body.color,
    gender: req.body.gender,
    height: req.body.height,
    closure: req.body.closure,
    material: req.body.material,
    category: req.body.category,
    image: req.body.image,
  };
  Product.createProduct(product).then((result) => {
    console.log("Created product");
    res.render("shop/addProduct", {
      pageTitle: "Add product",
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.getProduct(productId).then((product) => {
    res.render("shop/editProduct", {
      product: product,
      pageTitle: "Edit product",
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const product = {
    id: productId,
    name: req.body.productName,
    brand: req.body.brand,
    price: req.body.price,
    color: req.body.color,
    gender: req.body.gender,
    height: req.body.height,
    closure: req.body.closure,
    material: req.body.material,
    category: req.body.category,
    image: req.body.image,
  };
  Product.updateProduct(product)
    .then((result) => {
      console.log("UPDATED PRODUCT");
      res.redirect("/products");
    })
    .catch((error) => console.log(error));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteProduct(productId)
    .then(() => {
      console.log("DELETED PRODUCT");
      res.redirect("/products");
    })
    .catch((err) => console.log(err));
};
