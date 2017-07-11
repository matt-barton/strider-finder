const express = require('express'),
  app = express(),
  jade = require('jade'),
  isAuth = require('../lib/auth_middleware');

app.get('/', isAuth, (req, res, next) => {
  try {
    var html = jade.compileFile('./client/src/templates/homepage.jade')({ title: 'Home', auth: req.isAuthenticated() });
    res.send(html);
  } catch (e) {
    next(e);
  }
});

app.get('/login', (req, res, next) => {
  try {
    var html = jade.compileFile('./client/src/templates/login.jade')({ title: 'Login', auth: req.isAuthenticated() });
    res.send(html);
  } catch (e) {
    next(e);
  }
});

app.get('/about', (req, res, next) => {
  try {
    var html = jade.compileFile('./client/src/templates/about.jade')({ title: 'About', auth: req.isAuthenticated() });
    res.send(html);
  } catch (e) {
    next(e);
  }
});

app.get('/contact', (req, res, next) => {
  try {
    var html = jade.compileFile('./client/src/templates/contact.jade')({ title: 'Contact', auth: req.isAuthenticated() });
    res.send(html);
  } catch (e) {
    next(e);
  }
});

module.exports = app;