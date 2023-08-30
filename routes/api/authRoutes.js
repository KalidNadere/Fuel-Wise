const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Password hashing
const User  = require('../../models/user');

// Define authentication routes
router.post('/signup', async function signup(req, res){
  try {
    const { username, email, password } = req.body;

    // Create a new user record in the 'User' table
    const newUser = await User.create({
      username,
      email,
      password,
    });

  res.status(200).json({ message: 'New user created!'});
  console.log("successfully sign up")
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'You have an error'});
    }
  });

// router.post('/login', async function login(req, res) {
//     const { email, password } = req.body;
  
//     try {
//       // Find user email
//       const user = await User.findOne({ where: { email } });
//       if (!user) {
//         return res.status(401).json({ message: 'Invalid credentials, try again' });
//       }

//       const validPassword = await userData.checkPassword(password);
//       if (!validPassword) {
//         res
//           .status(400)
//           .json({ message: 'Invalid credentials, try again' });
//         return;
//       }
  
//       // Setting user object in session
//       req.session.user = { id: user.id, username: user.username };
//       res.json({ message: 'User login successful' });
//       console.log("successful login!")
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error logging in' });
//     }
// });

// // router.post('/profile', authController.profile);

// router.get('/logout', function logout(req, res) {
//     // Clear user info from session
//     req.session.user = null;
//     res.json({ message: 'User logout successful' });
// });

module.exports = router;
