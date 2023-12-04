$(document).ready(function() {
  let quote;
  let currentIndex = 0;
  let errors = 0;
  let startTime;
  let endTime;

  
  function fetchQuote() {
    $.getJSON('quotes.json', function(data) {
      const randomIndex = Math.floor(Math.random() * data.length);
      quote = data[randomIndex].content;
      $('#quote').text(quote);
    })
    .fail(function(jqxhr, textStatus, error) {
      console.error('Error fetching quote:', textStatus, error);
    });
  }
  

  $('#startButton').on('click', function() {
    currentIndex = 0;
    errors = 0;
    startTime = new Date().getTime();
    $('#result').text('');

    fetchQuote();
    $('#inputText').val('').prop('disabled', false).focus();
  });

  $('#inputText').on('input', function() {
    const inputChar = $('#inputText').val()[currentIndex];
    const quoteChar = quote[currentIndex];

    if (inputChar === quoteChar) {
      $('#inputText').css('border-color', 'green');
    } else {
      $('#inputText').css('border-color', 'red');
      errors++;
    }

    currentIndex++;

    if (currentIndex === quote.length) {
      endTime = new Date().getTime();
      const totalTime = (endTime - startTime) / 1000; // in seconds
      const wordsPerMinute = calculateWPM(totalTime);
      const accuracy = calculateAccuracy(quote.length, errors);

      $('#inputText').prop('disabled', true);
      displayResult(wordsPerMinute, accuracy);
    }
  });

  function calculateWPM(totalTime) {
    const words = quote.split(' ').length;
    const wpm = Math.round(words / (totalTime / 60));
    return wpm;
  }

  function calculateAccuracy(totalChars, errors) {
    const accuracy = ((totalChars - errors) / totalChars) * 100;
    return Math.round(accuracy);
  }

  function displayResult(wpm, accuracy) {
    const resultText = `Words Per Minute (WPM): ${wpm}, Accuracy: ${accuracy}%`;
    $('#result').text(resultText);
  }
});
