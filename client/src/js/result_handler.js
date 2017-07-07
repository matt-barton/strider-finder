function requestComplete () {
  $('img#loading').hide();  
}

function displayResults (data) {
  $('div#uploadResults').prepend('<div id="resultsLength">' + data.length + ' Striders found</div>');
  $('table#resultsTable').append('<thead><tr><th>Result</th><th>Matched with</th></tr></thead>');
  data.forEach(function (result, i) {
    $('table#resultsTable').append('<tbody><tr' + (i%2 ? ' class="alt"' : '') + '><td>' + result.result + '</td><td>' + result.matched + '</td></tr></tbody>');
  });
}

function errorHandler (err) {
  $('div#uploadResults').append('<div class="error">Error: ' + err.responseText + '</div>');
}

function prepareResultsDisplay () {
  $('div#uploadResults').append('<img id="loading" src="/images/loading.gif">');
  $('table#resultsTable').empty();
  $('div#uploadResults div.error').remove();
  $('div#uploadResults div#resultsLength').remove();
}