exports.getOrders = (req,res,next)=>{
    res.render('shop/cart', {
        pageTitle:'Cart',
        bannerText:'Cart',
        products:[
            {
                name: 'KD 14',
                price: 110,
                image: 'images/kd14.jpg',
                quantity: 1
            }
        ],
    });
}
