var encryption = require('./encryption'),
  readFile = require('fs-readfile-promise');

module.exports = function striders () {
  return decryptNames()
    .catch(err => console.error(err.message));
};

function decryptNames () {
  return readFile('./encrypted_names.txt', { encoding: 'utf8' })
    .then(encryption.decrypt)
    .then(namesToArray);

  function namesToArray (namesText) {
    return new Promise (resolve => {
      resolve(namesText.split('\n').map(name => {
        let components = name.split(', ');
        return components[1] + ' ' + components[0];
      }));
    });
  }
}
