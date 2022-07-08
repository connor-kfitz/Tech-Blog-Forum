const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Posts } = require('../../models');

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

      console.log('Check')
      console.log(dbUserData);
  
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
  // console.log(req.session.userID)
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

// LOAD single post from homepage
router.post('/loadSinglePost', async (req, res) => {

  console.log(req.body.userID);
  try {
    const dbPostData = await Posts.findOne({
      where: {
        id: req.body.ID,
      }
    });

    var userID = dbPostData.userID;

    // console.log(userID)

    const dbUserData = await User.findOne({
      where: {
        id: userID
      }
    });

    console.log(dbUserData);

      // console.log(dbPostData);
    
      req.session.save(() => {
        req.session.postData = dbPostData;
        req.session.userData = dbUserData;
        req.session.status = true;
        res.status(200).json(dbPostData);

        console.log('first becnh')
        console.log(req.session.status);
    });


  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;