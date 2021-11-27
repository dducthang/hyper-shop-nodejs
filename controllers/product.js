const Product = require("../Models/product");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

// const storage = multer.diskStorage({
//   destination: "./public/img",
//   filename: function (req, file, callback) {
//     callback(
//       null,
//       file.originalname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
const storage = multer.memoryStorage();

let upload = multer({
  storage: storage,
}).single("image");

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
    error: null,
    product:{}
  });
};

// exports.postAddProduct = (req, res, next) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(req.file);
//       const product = {
//         name: req.body.productName,
//         brand: req.body.brand,
//         price: req.body.price,
//         color: req.body.color,
//         gender: req.body.gender,
//         height: req.body.height,
//         closure: req.body.closure,
//         material: req.body.material,
//         category: req.body.category,
//         image: "/img/" + req.file.filename,
//       };
//       Product.createProduct(product).then((result) => {
//         console.log("Created product");
//         res.render("shop/addProduct", {
//           pageTitle: "Add product",
//         });
//       });
//     }
//   })
// };

exports.postAddProduct = (req, res, next) => {
  upload(req, res, (err = async () => {
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
      };
      
      const checktype = req.file.mimetype;
      if (!checktype.includes("image")){
        res.render("shop/addProduct", {
          product: product,
          pageTitle: "Add product",
          error: "Type of image file is not appropriate"
        });
        
      }else{
        product.image= "/img/" + req.file.originalname,
        await sharp(req.file.buffer)
          .resize({
            width: 592,
            height: 592,
          })
          .toFile("./public/img/" + req.file.originalname);
  
        Product.createProduct(product).then((result) => {
          console.log("Created product");
          res.render("shop/addProduct", {
            pageTitle: "Add product",
            error: null,
            product: null
          });
        });
      }
    })
  );
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.getProduct(productId).then((product) => {
    res.render("shop/editProduct", {
      product: product,
      pageTitle: "Edit product",
      error: null
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  upload(req, res, (err = async () => {
    console.log()
      const product = {
        id: req.body.productId,
        name: req.body.productName,
        brand: req.body.brand,
        price: req.body.price,
        color: req.body.color,
        gender: req.body.gender,
        height: req.body.height,
        closure: req.body.closure,
        material: req.body.material,
        category: req.body.category,
      };
      
      if (req.file){
        const checktype = req.file.mimetype;
        if(checktype.includes('image')) {
          product.image = "/img/" + req.file.originalname;
  
          await sharp(req.file.buffer)
            .resize({
              width: 592,
              height: 592,
            })
            .toFile("./public/img/" + req.file.originalname);
        }
        if (!checktype.includes("image")){
          res.render(`shop/editProduct`, {
            product: product,
            pageTitle: "Edit product",
            error: "Type of image file is not appropriate"
          });
          return ;
        }
      }
      Product.updateProduct(product)
        .then((result) => {
          console.log("UPDATED PRODUCT");
          res.redirect("/products");
        })
        .catch((error) => console.log(error));
    })
  );
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
