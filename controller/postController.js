const Post = require('../model/postModel');
const {marked} = require('marked');

// console.log('marked type:', typeof marked);
// console.log('marked:', marked);

exports.createPost = async (req, res) => {
  try {
    const { title, content, categories, tags, metaDescription } = req.body;
    const htmlContent = marked(content);
    
    const post = new Post({
      title,
      content,
      htmlContent,
      categories,
      tags,
      metaDescription
    });
    
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('categories', 'name')
      .populate('tags', 'name');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('categories', 'name')
      .populate('tags', 'name');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { content } = req.body;
    if (content) {
      req.body.htmlContent = marked(content);
    }
    
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

