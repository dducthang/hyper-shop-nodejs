const Product = require("../models/product");

exports.getIndex = (req, res, next)=>{
    res.render('shop/index',{
        pageTitle:'Hyper shop',
        products:{}
    });
}



