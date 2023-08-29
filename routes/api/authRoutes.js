const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Password hashing
const User  = require('../../models/user');

// Define authentication routes
router.post('/signup', async function signup(req, res) {
    const { username, email, password } = req.body;
  
    try {
      // Checking if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already registered' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user in the database
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
  
      res.json({ message: 'User signup successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error signing up' });
    }
  }

);

router.post('/login', async function login(req, res) {
    const { email, password } = req.body;
  
    try {
      // Find user email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials, try again' });
      }

      const validPassword = await userData.checkPassword(password);
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Invalid credentials, try again' });
        return;
      }
  
      // Setting user object in session
      req.session.user = { id: user.id, username: user.username };
      res.json({ message: 'User login successful' });
      console.log("successful login!")
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in' });
    }
});

// router.post('/profile', authController.profile);

router.get('/logout', function logout(req, res) {
    // Clear user info from session
    req.session.user = null;
    res.json({ message: 'User logout successful' });
});

module.exports = router;
