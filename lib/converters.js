var pdfConverter = require('./converters/pdf_converter'),
  textConverter = require('./converters/text_converter'),
  xlsConverter = require('./converters/xls_converter');

module.exports = (extension, mimeType) => {

  var e = new Error ();
  e.stack = ['Sorry, Word documents are not supported', '\nSave the file as a legacy .doc file or a .pdf and try again.'];

  switch (extension) {
    case 'pdf':
      return pdfConverter;
    break;

    case 'txt':
      return textConverter;
    break;

    case 'zip':
      if (mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return xlsConverter;
      if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') throw e;
    break;

    case 'msi':
      if (mimeType === 'application/vnd.ms-excel') return xlsConverter;
      if (mimeType === 'application/msword') throw e;
    break;

    default:
      return null;
    break;
  }
  return null;

};