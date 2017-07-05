const dotenv = require('dotenv'),
  express = require('express'),
  api = require('./lib/api'),
  client = require('./client'),
  app = express();

dotenv.load();

const port = process.env.PORT || 3000;

app.use('/api', api);
app.use('/', client);

app.listen(port, () => console.log('Application listening on port ' + port));
