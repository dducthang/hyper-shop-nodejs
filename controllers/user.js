
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