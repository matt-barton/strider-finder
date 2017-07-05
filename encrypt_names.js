var encryption = require('./lib/encryption'),
  fs = require('fs');

var names = fs.readFile('./names.txt', { encoding: 'utf8' }, function (err, names) {

  encryption.encrypt(names).then(encrypted => {
    fs.writeFile('encrypted_names.txt', encrypted, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
});