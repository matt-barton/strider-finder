var pdfConverter = require('./converters/pdf_converter'),
  textConverter = require('./converters/text_converter'),
  xlsConverter = require('./converters/xls_converter');

module.exports = (extension, mimeType) => {
  switch (extension) {
    case 'pdf':
      return pdfConverter;
    break;

    case 'txt':
      return textConverter;
    break;

    case 'zip':
      if (mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return xlsConverter;
    break;

    default:
      return null;
    break;
  }
  return null;

};