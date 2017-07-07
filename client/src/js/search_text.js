$(document).ready(function () {
  $('input#searchText').click(uploadText);
});

function uploadText () {
  prepareResultsDisplay();
  $.ajax({
    url: '/api/searchText',
    type: 'POST',
    data: { text: $('textarea#resultsText').val() },
    success: displayResults,
    error: errorHandler,
    complete: requestComplete
  });
}
