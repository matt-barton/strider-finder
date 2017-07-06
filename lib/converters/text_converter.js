module.exports = file => {
  return new Promise(resolve => {
    resolve(file.toString().split('\n'));
  });
};