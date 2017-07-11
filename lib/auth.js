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
    console.log(res);
  });
//  console.log(profile);
  db.getAuthUser(profile.id).then(user => {
    if (!user) return done();
    db.updateUserDisplayName(user._id, profile.displayName).then(() => {
      user.authenticated = true;
      done(null, user);
    });
  });
}));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/facebook', passport.authenticate('facebook', { scope: [ 'public_profile', 'email' ]}));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
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