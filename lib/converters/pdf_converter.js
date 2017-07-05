const pdf2table = require('pdf2table');

module.exports = (file) => {
  return new Promise((resolve, reject) => {
    pdf2table.parse(file, (err, rows) => {
      if (err) return reject (err);
      resolve(rows.map(row => {
        return row.join(' ');
      }));
    });
  });
};