const express = require('express');
const postController = require('../controller/postController');
const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:slug', postController.getPostBySlug);
router.put('/:slug', postController.updatePost);
router.delete('/:slug', postController.deletePost);

module.exports = router;



