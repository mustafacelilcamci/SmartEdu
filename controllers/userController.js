const User = require('../models/User');
const Category = require('../models/Category');  // kategoriyi ekle

exports.getDashboardPage = async (req, res) => {  // fonksiyon ismini dashboard sayfasına uygun değiştir
  try {
    const users = await User.find();
    const categories = await Category.find();

    res.status(200).render('dashboard', {
      users,
      categories,
      page_name: 'dashboard',  // view için varsa
      flashMessages: req.flash(),  // flash mesajları ekle istersen
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};
