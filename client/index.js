const express = require('express'),
  app = express(),
  jade = require('jade');

app.use(express.static('client/public'));

app.get('/', (req, res, next) => {
  try {
    var html = jade.compileFile('./client/src/templates/homepage.jade')({ title: 'Home' });
    res.send(html);
  } catch (e) {
    next(e);
  }
});

app.get('/about', (req, res, next) => {
  try {
    var html = jade.compileFile('./client/src/templates/about.jade')({ title: 'About' });
    res.send(html);
  } catch (e) {
    next(e);
  }
});

app.get('/contact', (req, res, next) => {
  try {
    var html = jade.compileFile('./client/src/templates/contact.jade')({ title: 'Contact' });
    res.send(html);
  } catch (e) {
    next(e);
  }
});

module.exports = app;