
exports.getUserList = (req,res,next)=>{
    res.render('shop/userList', {
        pageTitle:'User list',
        user: req.user
    });
}

exports.getUserDetail = (req,res,next)=>{
    res.render('shop/userDetail', {
        pageTitle:'User Profile',
        user: req.user
    });
}
