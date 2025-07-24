const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    req.flash('success', `${category.name} category created successfully`);
    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', 'Failed to create category');
    res.status(400).redirect('/users/dashboard');
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.id);
    req.flash('success', 'Category deleted successfully');
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', 'Failed to delete category');
    res.status(400).redirect('/users/dashboard');
  }
};
exports.getEditCategoryPage = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.render('edit-category', {
      page_name: 'categories',
      category,
    });
  } catch (err) {
    res.status(500).send('Edit sayfası hatası');
  }
};



exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.render('categories', { categories });
  } catch (err) {
    console.error('Kategori listeleme hatası:', err);
    res.status(500).send('Kategori listeleme hatası');
  }
};

exports.getEditCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.render('edit-category', { category });
  } catch (err) {
    console.error('Kategori düzenleme hatası:', err);
    res.status(500).send('Kategori düzenleme hatası');
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    category.name = req.body.name;
    category.slug = req.body.name.toLowerCase().replace(/ /g, '-');
    await category.save();
    res.redirect('/categories');
  } catch (err) {
    console.error('Kategori güncelleme hatası:', err);
    res.status(500).send('Kategori güncelleme hatası');
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.id);
    res.redirect('/categories');
  } catch (err) {
    console.error('Kategori silme hatası:', err);
    res.status(500).send('Kategori silme hatası');
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    category.name = req.body.name;
    await category.save();

    req.flash('success', 'Kategori güncellendi');
    res.redirect('/users/dashboard'); // 🔁 Dashboard sayfasına yönlendir
  } catch (err) {
    res.status(500).send('Kategori güncellenemedi.');
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    req.flash('success', 'Kategori silindi');
    res.redirect('/users/dashboard'); // ✅ Silme sonrası dashboard'a yönlendirme
  } catch (err) {
    res.status(500).send('Kategori silinemedi.');
  }
};
