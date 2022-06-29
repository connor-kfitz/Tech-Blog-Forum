const router = require('express').Router();
const { User } = require('../../models');

console.log('Please work');

// LOGIN
router.post('/login', async (req, res) => {
    
    console.log(req.body.user_name);
    console.log(req.body.password);

    try {
      const dbUserData = await User.findOne({
        where: {
          user_name: req.body.user_name,
        },
      });

      console.log()
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
      
      console.log(dbUserData.user_name);
      console.log(dbUserData.password);

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

        res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// CREATE new user
router.post('/', async (req, res) => {
    console.log(req.body.user_name);
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

module.exports = router;

