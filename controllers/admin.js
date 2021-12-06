const AdminService = require('../models/services/adminServices');
const Product = require('../models/product');
exports.getAdmins = async (req, res, next) => {
  const admins = await AdminService.getAdmins();
  res.render('shop/adminList', {
    pageTitle: 'Admin List',
    admins,
  });
};

exports.getProfile = (req, res, next) => {
  res.render('shop/profile', {
    pageTitle: 'Profile',
    profile: req.user,
  });
};

exports.getAdmin = async (req, res, next) => {
  const profile = await AdminService.getAdmin({ _id: req.params.id });
  if (!profile) return res.redirect('/');
  res.render('shop/adminDetails', {
    pageTitle: 'Admin Details',
    profile,
  });
};
exports.getAddAdmin = async (req, res, next) => {
  res.render('shop/addAdmin', {
    pageTitle: 'Add Admin',
  });
};
exports.addAdmin = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  try {
    await AdminService.addAdmin({
      name,
      email,
      password,
      phone,
    });
  } catch (e) {
    console.log(e);
    return res.render('shop/addAdmin', {
      pageTitle: 'Add Admin',
      categories: await Product.getCategoriesQuantity(),
    }); //nếu catch đc bất kỳ lỗi nào thì chuyển về
  }
  return res.redirect('/admins');
};
