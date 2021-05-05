const router = require('express').Router();
const { Post } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

//CREATE new post
router.post('/', async (req, res) => {
    try {
      const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        creator_id: req.session.username,
      });
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  module.exports = router;