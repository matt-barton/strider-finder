const XLSX = require('xlsx');

module.exports = (file) => {
  return new Promise((resolve, reject) => {
    let workbook = XLSX.read(file);
    resolve(workbook.SheetNames.map(sheetName => {
      return XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]).replace(/,/g, ' ');
    }).join(' ').split('\n'));
  });
};