const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts & their creators for homepage
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      const posts = postData.map((post) =>
        post.get({ plain: true })
      );
  
      res.render('homepage', {
        posts,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  // GET all posts & their creators for dashboard
  router.get('/dashboard', withAuth, async (req, res) => {
      try {
        const postData = await Post.findAll({
            where:
              {
                creator_id: req.session.username
              },
          });
          const posts = postData.map((post) =>
          post.get({ plain: true })
        );
        res.render('dashboard', { posts,});
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });
    
    router.get('/newpost', withAuth, async (req, res) => {
        try {
          res.render('newpost');
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
    });
    
    router.get('/posts/:id', withAuth, async (req, res) => {
        try {
          const postData = await Post.findByPk(req.params.id, {
            include: [
              {
                model: User,
                attributes: [
                  'username'
                ],
              },
            ],
          });
            const post = postData.get({ plain: true });
          res.render('viewpost', { ...post, loggedIn: req.session.loggedIn});
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  

module.exports = router;