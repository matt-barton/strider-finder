const express = require('express'),
  api = require('./lib/api'),
  app = express(),
  port = process.env.PORT || 3000;

app.use('/api', api);

app.listen(port, () => console.log('Application listening on port ' + port));
