const Product = require('../product');

exports.countProducts = (filters) => {
  return Product.find(filters).countDocuments();
}
exports.getProducts = (filters) => {
  return Product.find(filters);
}
exports.getProduct = (id) => {
  return Product.findById(id);
}

exports.createProduct = (newProduct) => {
  const product = new Product({
    name: newProduct.name,
    brand: newProduct.brand,
    price: newProduct.price,
    color: newProduct.color,
    sex: newProduct.gender,
    shoesHeight: newProduct.height,
    closureType: newProduct.closure,
    material: newProduct.material,
    category: newProduct.category,
    image: newProduct.image,
  });
  return product.save();
}

exports.updateProduct = (newProduct) => {
  return Product.findById(newProduct.id).then(product => {
    product.name = newProduct.name;
    product.brand = newProduct.brand;
    product.price = newProduct.price;
    product.color = newProduct.color;
    product.sex = newProduct.gender;
    product.shoesHeight = newProduct.height;
    product.closureType = newProduct.closure;
    product.material = newProduct.material;
    product.category = newProduct.category;
    if (newProduct.image) product.image = newProduct.image;
    return product.save();
  });
}

 exports.getCategoriesQuantity =  async() =>{
  let res = [];
  let cats = [];
  cats = await Product.distinct('category');
  for (c of cats) {
    const quantity = await Product.count({ category: c });
    res.push({
      name: c,
      quantity,
    });
  }
  return res;
}

exports.deleteProduct = (productId) => {
  return Product.findByIdAndRemove(productId);
}
