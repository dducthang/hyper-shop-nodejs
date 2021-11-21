const Product = require('../models/product');

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
    key => filters[key] === undefined && delete filters[key]
  );

  const sortBy = req.query.sortBy || 'createdDate';

  Product.countProducts(filters)
    .then(n => {
      productsCount = n;
      if (req.query.productsPerPage === 'all') {
        productsPerPage = n;
      }
      return Product.getProducts(filters)
        .sort(sortBy)
        .skip((page - 1) * productsPerPage)
        .limit(productsPerPage);
    })
    .then(async function (products) {
      res.render('shop/products', {
        pageTitle: 'Products',
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
  res.render('shop/productDetail', {
    pageTitle: 'Product detail',
    bannerText: 'Product',
    product: {
      id: '243243',
      name: 'Air force 1 Fontanka',
      price: 120,
      description:
        'Your description here. Serenity is a highly-professional & modern website theme crafted with you, the user, in mind. This light-weight theme is generous, built with custom types and enough shortcodes to customize each page according to your project. You will notice some examples of pages in demo, but this theme can do much more.',
      image: 'images/air-force-1-fontanka.jpg',
      comments: [
        {
          owner: 'thang dang is the best',
          content: 'this is the best shoe that i have ever owned',
          response: 'Thank you for your feedback. This is our pleasure',
        },
        {
          owner: 'thang dang is the best',
          content: 'this is the best shoe that i have ever owned',
          response: 'Thank you for your feedback. This is our pleasure',
        },
        {
          owner: 'thang dang is the best',
          content: 'this is the best shoe that i have ever owned',
          response: 'Thank you for your feedback. This is our pleasure',
        },
      ],
    },
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render('shop/addProduct', {
    pageTitle: 'Add product',
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
  // const product = new Product({
  //   name: name,
  //   brand: brand,
  //   price: price,
  //   color: color,
  //   sex: gender,
  //   shoesHeight: height,
  //   closureType: closure,
  //   material: material,
  //   category: category,
  //   image: image,
  // });
  // product
  //   .save()
  //   .then(result => console.log('Created product'))
  //   .catch(error => console.log(error));
};

// [
//   {
//     id: "154435",
//     sport: "casual",
//     name: "Air force 1 Fontanka",
//     description:
//       "This is a short excerpt to generally describe what the item is about.",
//     price: 120,
//     image: "images/air-force-1-fontanka.jpg",
//   },
// ]
