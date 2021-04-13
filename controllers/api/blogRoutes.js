const router = require('express').Router();
const { Blog } = require('../../models');

router.post('/', async (req, res) => {
    const blog = req.body;
    await Blog.create({
        ...blog,
        user_id:  req.session.user_id,
      });

      res.redirect('/');
  });

module.exports = router;