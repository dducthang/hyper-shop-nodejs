exports.getIndex = (req, res, next)=>{
    res.render('shop/index',{
        pageTitle:'Hyper shop',
        products:[
            {
                id:'154435',
                sport:'casual',
                name:'Air force 1 Fontanka',
                description:'This is a short excerpt to generally describe what the item is about.',
                price:120,
                image:'images/air-force-1-fontanka.jpg'
            },
            {
                id:'135345',
                sport:'Basketball',
                name:'KD 14',
                description:'This is a short excerpt to generally describe what the item is about.',
                price:110,
                image:'images/kd14.jpg'
            },
            {
                id:'423433',
                sport:'Baskeball',
                name:'Zoom Freak 3',
                description:'This is a short excerpt to generally describe what the item is about.',
                price:120,
                image:'images/zoom-freak-3.jpg'
            },
        ]
    });
}

exports.getShop = (req,res,next)=>{
    res.render('shop/shop', {
        pageTitle:'Hyper shop',
        bannerText: 'Hyper Shop',
        products:[
            {
                id:'154435',
                sport:'casual',
                name:'Air force 1 Fontanka',
                description:'This is a short excerpt to generally describe what the item is about.',
                price:120,
                image:'images/air-force-1-fontanka.jpg'
            },
            {
                id:'135345',
                sport:'Basketball',
                name:'KD 14',
                description:'This is a short excerpt to generally describe what the item is about.',
                price:110,
                image:'images/kd14.jpg'
            },
            {
                id:'423433',
                sport:'Baskeball',
                name:'Zoom Freak 3',
                description:'This is a short excerpt to generally describe what the item is about.',
                price:120,
                image:'images/zoom-freak-3.jpg'
            },
            {
                id:'423433',
                sport:'Baskeball',
                name:'Zoom Freak 3',
                description:'This is a short excerpt to generally describe what the item is about.',
                price:120,
                image:'images/zoom-freak-3.jpg'
            },
            {
                id:'423433',
                sport:'Baskeball',
                name:'Zoom Freak 3',
                description:'This is a short excerpt to generally describe what the item is about.',
                price:120,
                image:'images/zoom-freak-3.jpg'
            },
            {
                id:'423433',
                sport:'Baskeball',
                name:'Zoom Freak 3',
                description:'This is a short excerpt to generally describe what the item is about.',
                price:120,
                image:'images/zoom-freak-3.jpg'
            },
            {
                id:'423433',
                sport:'Baskeball',
                name:'Zoom Freak 3',
                description:'This is a short excerpt to generally describe what the item is about.',
                price:120,
                image:'images/zoom-freak-3.jpg'
            },
            {
                id:'423433',
                sport:'Baskeball',
                name:'Zoom Freak 3',
                description:'This is a short excerpt to generally describe what the item is about.',
                price:120,
                image:'images/zoom-freak-3.jpg'
            },
            {
                id:'423433',
                sport:'Baskeball',
                name:'Zoom Freak 3',
                description:'This is a short excerpt to generally describe what the item is about.',
                price:120,
                image:'images/zoom-freak-3.jpg'
            },
        ]
    });
}

exports.getProductDetail = (req,res,next)=>{
    res.render('shop/productDetail', {
        pageTitle:'Product detail',
        bannerText:'Product',
        product: {
            id:'243243',
            name: 'Air force 1 Fontanka',
            price: 120,
            description:'Your description here. Serenity is a highly-professional & modern website theme crafted with you, the user, in mind. This light-weight theme is generous, built with custom types and enough shortcodes to customize each page according to your project. You will notice some examples of pages in demo, but this theme can do much more.',
            image:'images/air-force-1-fontanka.jpg',
            comments:[
                {
                    owner:'thang dang is the best',
                    content: 'this is the best shoe that i have ever owned',
                    response:'Thank you for your feedback. This is our pleasure'
                },
                {
                    owner:'thang dang is the best',
                    content: 'this is the best shoe that i have ever owned',
                    response:'Thank you for your feedback. This is our pleasure'
                },
                {
                    owner:'thang dang is the best',
                    content: 'this is the best shoe that i have ever owned',
                    response:'Thank you for your feedback. This is our pleasure'
                },
            ]
        }
    });
}

exports.getCart = (req,res,next)=>{
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
        ]
    });
}

exports.getAddproduct = (req,res,next)=>{
    res.render('shop/addProduct', {
        pageTitle:'Add product',
    });
}

exports.getLogin = (req,res,next)=>{
    res.render('auth/login', {
        pageTitle:'Login',
    });
}

exports.getUserList = (req,res,next)=>{
    res.render('shop/userList', {
        pageTitle:'User list',
    });
}

exports.getUserDetail = (req,res,next)=>{
    res.render('shop/userDetail', {
        pageTitle:'User Profile',
    });
}

exports.getUserProfile = (req,res,next)=>{
    res.render('shop/userProfile', {
        pageTitle:'User Profile',
    });
}
