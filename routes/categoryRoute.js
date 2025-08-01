const express = require('express')
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.route('/').post(categoryController.createCategory); // http://localhost:3000/categories
router.route('/:id').delete(categoryController.deleteCategory);

router.get('/:id/edit', categoryController.getEditCategoryPage); // 👈 Gerekli olan route
router.put('/:id', categoryController.updateCategory);      

module.exports = router;
