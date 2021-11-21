const Product = require("../models/product");
const express = require("express");
const request = require('request');

exports.getProducts = (req, res, next) => {
  Product.find().then((products) => {
    res.render("shop/shop", {
      pageTitle: "Hyper shop",
      bannerText: "Hyper Shop",
      products: products,
    });
  });
};

exports.getProductDetail = (req, res, next) => {
  res.render("shop/productDetail", {
    pageTitle: "Product detail",
    bannerText: "Product",
    product: {
      id: "243243",
      name: "Air force 1 Fontanka",
      price: 120,
      description:
        "Your description here. Serenity is a highly-professional & modern website theme crafted with you, the user, in mind. This light-weight theme is generous, built with custom types and enough shortcodes to customize each page according to your project. You will notice some examples of pages in demo, but this theme can do much more.",
      image: "images/air-force-1-fontanka.jpg",
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
    },
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("shop/addProduct", {
    pageTitle: "Add product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.productName;
  const brand = req.body.brand;
  const price = req.body.price;
  const color = req.body.color;
  const gender = req.body.gender;
  const height = req.body.height;
  const closure = req.body.closure;
  const material = req.body.material;
  const category = req.body.category;
  const image = req.body.image;
  const product = new Product({
    name: name,
    brand: brand,
    price: price,
    color: color,
    sex: gender,
    shoesHeight: height,
    closureType: closure,
    material: material,
    category: category,
    image: image,
  });
  // console.log(request.post);

  // request.post(
  //     'https://hyper-shop-db-default-rtdb.asia-southeast1.firebasedatabase.app/hyper-shop-db.json',
  //     { json: { key: 'value' } },
  //     function (error, response, body) {
  //        console.log(response.statusCode);
  //        console.log(error);
  //     }
  // );

};

exports.testCallFetch = (req, res, next) => {
  console.log(req);
  debugger;
  // fetch(
  //   "https://hyper-shop-db-default-rtdb.asia-southeast1.firebasedatabase.app/",
  //   {
  //     method: "POST",
  //     body: JSON.stringify(product),
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   }
  // )
  //   .then((response) => {
  //     if (response.status >= 200 && response.status < 300) {
  //       return response.json();
  //     } else {
  //       rsponse.json().then((error) => console.log(error));
  //     }
  //   })
  //   .catch((error) => console.log(error));

  // product
  //   .save()
  //   .then((result) => console.log("Created product"))
  //   .catch((error) => console.log(error));
  // };
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.render("shop/editProduct", {
        product: product,
        pageTitle: "Edit product",
      });
    })
    .catch((error) => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then((product) => {
      (product.name = req.body.productName),
        (product.brand = req.body.brand),
        (product.price = req.body.price),
        (product.color = req.body.color),
        (product.sex = req.body.gender),
        (product.shoesHeight = req.body.height),
        (product.closureType = req.body.closure),
        (product.material = req.body.material),
        (product.category = req.body.category),
        (product.image = req.body.image);
      return product.save();
    })
    .then((result) => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/products");
    })
    .catch((error) => console.log(error));
};
