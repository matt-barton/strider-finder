module.exports = (req, res, next) => {
  if (req.user && req.user.authenticated) return next();
  res.redirect('/login');
};