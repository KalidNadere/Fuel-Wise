// Middleware function to check if the user is authenticated
function isAuthenticated(req, res, next) {
      // User is authenticated
  if (req.session && req.session.user) {
    next();
  } else {
    // User is not authenticated
    res.redirect('/login'); // Redirect to the login page
  }
}

module.exports = isAuthenticated;