
exports.getUserList = (req,res,next)=>{
    res.status(200).render('shop/userList', {
        pageTitle:'User list',
        user: req.user
    });
}

exports.getUserDetail = (req,res,next)=>{
    res.status(200).render('shop/userDetail', {
        pageTitle:'User Profile',
        user: req.user
    });
}
