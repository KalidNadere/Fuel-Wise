const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Password hashing
const User  = require('../../models/user');

// Define authentication routes
router.post('/signup', async function signup(req, res){
  console.log(req.body)
  try {
    const { username, email, password } = req.body;

    // Create a new user record in the 'User' table
    const newUser = await User.create({
      username,
      email,
      password,
    });

  res.status(200).json({ message: 'New user created!'});
  console.log("successfully sign up", newUser)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'You have an error'});
    }
  });

router.post('/login', async function login(req, res) {
    try {
      const userLogin = await User.findOne({ where: { email: req.body.email } });
      
      if (!userLogin) {
        res.status(400).json({ message: 'Invalid password or email, try again' });
        return;
      }
      const validPassword = await userLogin.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: 'Invalid password or email, try again' });
        return;
      }

      res.status(200).json({ message: 'User login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in' });
    }
});

// router.post('/profile', authController.profile);

router.get('/logout', function logout(req, res) {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
