const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/:id', async (req, res) => {
    const comment = req.body;
    await Comment.create({
        ...comment,
        user_id:  req.session.user_id,
        blog_id: req.params.id
      });

      res.redirect('/');
  });

module.exports = router;