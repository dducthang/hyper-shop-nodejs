const AdminService = require('../models/services/adminService');
const ProductService = require('../models/services/productService');
exports.getAdmins = async (req, res, next) => {
  const admins = await AdminService.getAdmins();
  res.status(200).render('shop/adminList', {
    pageTitle: 'Admin List',
    admins,
    user: req.user
  });
};

exports.getProfile = (req, res, next) => {
  res.status(200).render('shop/profile', {
    pageTitle: 'Profile',
    user: req.user,
  });
};

//
exports.getAdmin = async (req, res, next) => {
  const profile = await AdminService.getAdmin({ _id: req.params.id });
  if (!profile) return res.status(400).redirect('/');//status?
  res.status(200).render('shop/adminDetails', {
    pageTitle: 'Admin Details',
    profile,
    user:req.user
  });
};
exports.getAddAdmin = async (req, res, next) => {
  res.status(200).render('shop/addAdmin', {
    pageTitle: 'Add Admin',
    user: req.user
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
    return res.status(400).render('shop/addAdmin', {
      pageTitle: 'Add Admin',
      categories: await ProductService.getCategoriesQuantity(),
      user:req.user
    }); //nếu catch đc bất kỳ lỗi nào thì chuyển về
  }
  return res.status(201).redirect('/admins');
};
