const express = require('express');
const Category = require('../model/categoryModel');
const Post = require('../model/postModel');
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get posts by category slug
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const posts = await Post.find({ categories: category._id })
      .populate('categories', 'name slug')
      .populate('tags', 'name slug')
      .select('title slug content metaDescription createdAt');

    res.json({
      category,
      posts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

