const express = require('express'),
  bodyParser = require('body-parser'),
  fileType = require('file-type'),
  converters = require('./converters'),
  search = require('./search'),
  auth = require('./auth_middleware'),
  app = express();

app.post('/searchFile', auth, (req, res) => {
  if (!req.files.resultsFile) return res.status(400).send('There was no file uploaded');
  let resultsFile = req.files.resultsFile,
    detectedType = fileType(resultsFile.data) || {
      ext: resultsFile.name.split('.')[resultsFile.name.split('.').length - 1]
    },
    converter = converters(detectedType.ext, resultsFile.mimetype);

  if (!converter) return res.status(400).send('There is no converter for filetype ' + detectedType.ext);

  converter(resultsFile.data)
    .then(search)
    .then(matches => { res.status(200).send(matches); })
    .catch(function (e) {
      res.status(500).send(e.stack || e);
    });
});

app.post('/searchText', auth, (req, res) => {
  converters('txt')(req.body.text)
    .then(search)
    .then(matches => { res.status(200).send(matches); })
    .catch(function (e) {
      res.status(500).send(e.stack || e);
    });
});

module.exports = app;