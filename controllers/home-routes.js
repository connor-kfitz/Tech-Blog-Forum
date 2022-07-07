const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Posts } = require('../models');

router.get('/', async (req, res) => {
    try{
        const userData = await User.findAll();

        const users = userData.map((user) => 
            user.get({ plain: true})    
        );

        res.render('home-page', {
            users,
            // loggedIn: req.session.loggedIn,
        });

        req.session.save(() => {
            req.session.showNewPost = false;
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    try{

        console.log(req.session.showNewPost);
        const userData = await User.findAll();

        const users = userData.map((user) => 
            user.get({ plain: true })    
        );

        if(req.session.loggedIn) {
            const postData = await Posts.findAll({
                where: {
                    userID: req.session.userID,
                }
            })

            const posts = postData.map((post) =>
                post.get({ plain: true })
        );
        // console.log(posts);
        res.render('dashboard-page', {
            users,
            posts,
            // loggedIn: req.session.loggedIn,
            userData: req.session.userData,
            showNewPost: req.session.showNewPost,
        });
        } else {
        
        // console.log('Second Check')
        // console.log(req.session.showNewPost);

        res.render('dashboard-page', {
            users,
            // loggedIn: req.session.loggedIn,
            userData: req.session.userData,
            showNewPost: req.session.showNewPost,
        });
    };
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    res.render('login-page');
});

// Logout
router.post('/api/users/logout', (req, res) => {
    // When the user logs out, destroy the session
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;