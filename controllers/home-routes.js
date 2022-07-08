const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Posts, Comments } = require('../models');

router.get('/', async (req, res) => {
    try{
        const postData = await Posts.findAll();

        const posts = postData.map((post) => 
            post.get({ plain: true})    
        );



        res.render('home-page', {
            posts,
            status: req.session.status,
            userData: req.session.userData,
            postData: req.session.postData,
            newComment: req.session.newcomment,
            // loggedIn: req.session.loggedIn,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    try{

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

// Route to get one Post And Comments
router.get('/post/:id', async (req, res) => {
    try{ 
        const postData = await Posts.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['user_name']
                }
            ],
        });

        const commentData = await Comments.findAll({
            where: {
                postID: req.params.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['user_name']
                }
            ],
        });
        
        if(!postData) {
            res.status(404).json({message: 'No post with this id!'});
            return;
        }

        const post = postData.get({ plain: true });

        const comments = commentData.map((comment) =>
            comment.get({ plain: true })
        );

        console.log('Right Here');
        console.log(comments);
        console.log(post);

        res.render('single-post', {
            post,
            comments,
        });

      } catch (err) {
          res.status(500).json(err);
      };     
  });


router.get('/login', async (req, res) => {
    res.render('login-page');
});

// Route to get comments for one Post

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