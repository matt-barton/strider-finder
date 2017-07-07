$(document).ready(function () {
  $('input#goUpload').click(uploadFile);
});

function uploadFile () {
  prepareResultsDisplay();
  var file = $('input#resultsFile')[0].files[0]; //Files[0] = 1st file
  var data = new FormData();
  data.append('resultsFile', file);
  $.ajax({
    url: '/api/searchFile',
    type: 'POST',
    contentType: false,
    cache: false,
    processData: false,
    data: data,
    success: displayResults,
    error: errorHandler,
    complete: requestComplete
  });
}

