const express = require('express'),
  app = express(),
  template = require('jade').compileFile('./client/src/templates/homepage.jade');

app.use(express.static('client/public'));

app.get('/', (req, res, next) => {
  try {
    var html = template({ title: 'Home' });
    res.send(html);
  } catch (e) {
    next(e);
  }
});

module.exports = app;