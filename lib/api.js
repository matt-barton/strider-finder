const express = require('express'),
  fileUpload = require('express-fileupload'),
  fileType = require('file-type'),
  converters = require('./converters'),
  getStriders = require('./striders'),
  app = express();

app.use(fileUpload());

app.post('/search', (req, res) => {
  if (!req.files.resultsFile) return res.status(400).send('There was no file uploaded');
  let resultsFile = req.files.resultsFile,
    detectedType = fileType(resultsFile.data),
    converter = converters(detectedType.ext, resultsFile.mimetype);

  if (!converter) return res.status(400).send('There is no converter for filetype ' + detectedType.ext);

  converter(resultsFile.data).then(results => {
    getStriders().then(striders => {
      let matches = [];
      
      // look for exact matches first
      for (let x = 0; x < results.length; x ++) {
        if (!results[x]) continue;
        let result = results[x].toLowerCase();
        for (let strider of striders) {
          let striderComponents = strider.split(' ');
          let firstName = striderComponents[0].toLowerCase(),
            lastName = striderComponents[striderComponents.length - 1].toLowerCase();

          if (!result || (!firstName && !lastName)) break;

          if (result.includes(strider) || 
            result.includes(firstName + ' ' + lastName) || 
            result.includes(lastName + ', ' + firstName)) {
              matches.push(results[x] + ' (matched against strider ' + strider + ')');
              break;
            }
        }
      }

      res.status(200).send(matches);
    });
  });

});

module.exports = app;