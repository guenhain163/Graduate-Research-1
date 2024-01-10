const DB = require('../database');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await DB.users.findOne(username);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // Check if the password matches (you need to implement password verification logic)
    const passwordMatches = await bcrypt.compare(password, user.password);

    // If passwordMatches is true, consider the user logged in
    // Otherwise, return an appropriate error response
    if (passwordMatches) {
      // Password is correct, consider the user logged in
      return res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
        },
      });
    } else {
      // Password is incorrect, return an error response
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
  login,
};
