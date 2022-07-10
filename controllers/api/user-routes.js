const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Posts, Comments } = require('../../models');

// LOGIN
router.post('/login', async (req, res) => {

    try {
      const dbUserData = await User.findOne({
        where: {
          user_name: req.body.user_name,
        },
      });
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        dbUserData.password
      );
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }

  
      // Once the user successfully logs in, set up the sessions variable 'loggedIn'
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userData = dbUserData;
        req.session.userID = dbUserData.id;

        res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create({
        user_name: req.body.user_name,
        password: await bcrypt.hash(req.body.password, 10),
      });

        req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userData = dbUserData;
        req.session.userID = dbUserData.id;

        res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Logout
router.post('/logout', (req, res) => {
    // When the user logs out, destroy the session
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

// Render New Post
router.post('/renderNewPost', async (req, res) => {
  try {
      req.session.save(() => {
        req.session.showNewPost = true;
        res.status(200).json();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE A New Post
router.post('/create', async (req, res) => {
  console.log(req.session.userID)
  try {
    const dbUserData = await Posts.create({
      title: req.body.title,
      comment: req.body.comment,
      userID: req.session.userID,
    });

      req.session.save(() => {
        req.session.showNewPost = false;
        res.status(200).json(dbUserData);

    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // LOAD single post from homepage
// router.post('/loadSinglePost', async (req, res) => {

//   try {
//     const dbPostData = await Posts.findOne({
//       where: {
//         id: req.body.ID,
//       }
//     });

//     var userID = dbPostData.userID;

//     const dbUserData = await User.findOne({
//       where: {
//         id: userID
//       }
//     });

//     const dbCommentData = await Comments.findAll({
//       where: {
//         postID: req.body.ID
//       },
//     });

//     const comments = dbCommentData.map((comment) =>
//     comment.get({ plain: true })
//     );
//       req.session.save(() => {
//         req.session.postData = dbPostData;
//         req.session.userData = dbUserData;
//         req.session.status = true;
//         res.status(200).json(dbPostData);

//         console.log('first becnh')
//         console.log(req.session.status);
//     });


//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// CREATE A New Comment
router.post('/newComment', async (req, res) => {
  try {
    const dbCommentData = await Comments.create({
      postComment: req.body.comment,
      userID: req.session.userID,
      postID: req.body.postID,
    });

    console.log(dbCommentData);

      req.session.save(() => {
        req.session.newComment = dbCommentData;
        res.status(200).json(dbCommentData);

    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE Post
router.delete('/delete/:id', (req, res) => {
  Posts.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deletedPost) => {
    res.json(deletedPost);
  })
  .catch((err) => res.json(err));
});

// UPDATE Post
router.put('/update/:id', (req, res) => {
  Posts.update(
    {
      comment: req.body.updatedPost,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch((err) => {
      res.json(err);
    })
});
module.exports = router;