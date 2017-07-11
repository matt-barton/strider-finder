const express = require('express'),
  passport = require('passport'),
  facebook = require('fb'),
  FacebookStrategy = require('passport-facebook').Strategy,
  app = express(),
  db = require('./db');


passport.serializeUser((user, done) => {
  if (!user) return done('Not an authorised user.');
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


passport.use(new FacebookStrategy({
  clientID: process.env.NODE_ENV === 'dev' ? process.env.FB_TEST_APP_ID : process.env.FB_APP_ID,
  clientSecret: process.env.NODE_ENV === 'dev' ? process.env.FB_TEST_APP_SECRET : process.env.FB_APP_SECRET,
  callbackURL: process.env.STRIDER_FINDER_URL + "/auth/facebook/callback"
},
(token, refreshToken, profile, done) => {
  facebook.setAccessToken(token);
  facebook.api('/me?fields=email', function (res) {
    if (!res) return done();
    db.getAuthUser(res.email).then(user => {
      if (!user) return done();
      db.updateUserDetails(user._id, profile).then(() => {
        user.authenticated = true;
        done(null, user);
      });
    });
  });
}));

app.get('/facebook', passport.authenticate('facebook', {
  scope: [ 'public_profile', 'email' ]
}));

app.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', (err, user) => {
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

app.get('/logout', (req, res) => {
  req.logout(); 
  res.redirect('/');
});

module.exports = app;