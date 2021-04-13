const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
          { 
            model: User, 
            attributes: {exclude: 'password'}
          }, 
          { 
            model: Comment,
            include: [
              { 
                model: User, 
                attributes: {exclude: 'password'}
              }
            ]
          }
        ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs);
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
