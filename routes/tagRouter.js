const express = require('express');
const Tag = require('../model/tagModel');
const Post = require('../model/postModel'); 
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const tag = new Tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get posts by tag slug
router.get('/:slug', async (req, res) => {
  try {
    const tag = await Tag.findOne({ slug: req.params.slug });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    const posts = await Post.find({ tags: tag._id })
      .populate('categories', 'name slug')
      .populate('tags', 'name slug')
      .select('title slug content metaDescription createdAt');

    res.json({
      tag,
      posts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router ;