const AdminService = require("../models/services/adminService");
const ProductService = require("../models/services/productService");
exports.getAdmins = async (req, res, next) => {
  const admins = await AdminService.getAdmins();
  res.status(200).render("shop/adminList", {
    pageTitle: "Admin List",
    admins,
    user: req.user,
  });
};

exports.getProfile = (req, res, next) => {
  res.status(200).render("shop/profile", {
    pageTitle: "Profile",
    user: req.user,
  });
};

exports.postProfile = async (req, res, next) => {
  const { name, phone, address } = req.body; //lấy các thông tin name, email,... từ requestz
  let errors = [];
  if (!name || !phone || !address) {
    errors.push({ msg: "Please enter all fields" });
  }
  var phoneRegerx = /([0][1-9]{9})/;
  if (!phoneRegerx.test(phone)) {
    errors.push({ msg: "Phone number need to be 10-digit format" });
  }
  if (errors.length > 0) {
    return res.status(400).render("shop/profile", {
      pageTitle: "Profile",
      errors: errors,
      categories: await ProductService.getCategoriesQuantity(),
      brands: await ProductService.getBrands(),
      user: req.user,
      profile: req.user,
    });
  } else {
    const newProfile = {
      _id: req.user._id,
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
    };
    await AdminService.updateProfile(newProfile);
    res.status(200).redirect("/admins/profile");
  }
};

//
exports.getAdmin = async (req, res, next) => {
  const profile = await AdminService.getAdmin({ _id: req.params.id });
  if (!profile) return res.status(400).redirect("/"); //status?
  res.status(200).render("shop/adminDetails", {
    pageTitle: "Admin Details",
    profile,
    user: req.user,
  });
};
exports.getAddAdmin = async (req, res, next) => {
  res.status(200).render("shop/addAdmin", {
    pageTitle: "Add Admin",
    user: req.user,
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
    return res.status(400).render("shop/addAdmin", {
      pageTitle: "Add Admin",
      categories: await ProductService.getCategoriesQuantity(),
      user: req.user,
    }); //nếu catch đc bất kỳ lỗi nào thì chuyển về
  }
  return res.status(201).redirect("/admins");
};
