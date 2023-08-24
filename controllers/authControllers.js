const bcrypt = require('bcrypt'); // Password hashing
const User = require('../models/user');

// User signup
async function signup(req, res) {
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

// User login
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find user email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Setting user object in session
    req.session.user = { id: user.id, username: user.username };
    res.json({ message: 'User login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
}

// User logout
function logout(req, res) {
  // Clear user info from session
  res.session.user = null;
  res.json({ message: 'User logout successful' });
}

module.exports = {
  signup,
  login,
  logout,
};
