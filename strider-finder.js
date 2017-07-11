const dotenv = require('dotenv');
dotenv.load();

const express = require('express'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  fileUpload = require('express-fileupload'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  passport = require('passport'),
  auth = require('./lib/auth'),
  api = require('./lib/api'),
  client = require('./client'),
  app = express(),
  port = process.env.PORT || 3000;

app.use(cookieParser('a9wnggbsw64byjksyus5ntalf923g32hs'));
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('./client/public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({ url: process.env.MONGODB_URI }),
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth/', auth);
app.use('/api', api);
app.use('/', client);

app.listen(port, () => console.log('Application listening on port ' + port));
