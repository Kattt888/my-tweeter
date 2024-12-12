/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log("writing")
  // Function to show the error message
  const showError = function(message) {
    const $errorMessage = $('.error-message');
    $errorMessage.text(message); // Set the error text
    $errorMessage.slideDown().addClass('show'); // Show the error message with animation
  };

  // Function to hide the error message
  const hideError = function() {
    const $errorMessage = $('.error-message');
    $errorMessage.slideUp().removeClass('show'); // Hide the error message with animation
  };

  const renderTweets = function(tweets) {
    $('.tweets-container').empty(); // Clear existing tweets
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').prepend($tweet); // Prepend tweets
    });
  };

  const createTweetElement = function(tweet) {
    const safeText = $('<div>').text(tweet.content.text).html(); // Escape for safety
    return $(`
      <article class="tweet">
        <header>
          <img src="${tweet.user.avatars}" alt="${tweet.user.name}'s avatar">
          <span class="name">${tweet.user.name}</span>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <p>${safeText}</p>
        <footer>
          <span>${timeago.format(tweet.created_at)}</span>
          <div class="icons">
            <i class="fa fa-flag"></i>
            <i class="fa fa-retweet"></i>
            <i class="fa fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
  };

  const loadTweets = function() {
    console.log("Fetching tweets from server...");
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(tweets) {
        console.log("Fetched tweets:", tweets);
        renderTweets(tweets);
      },
      error: function(err) {
        console.error('Error fetching tweets:', err);
      }
    });
  };

  $('form').on('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Hide any existing error message before validating
    hideError();

    const tweetText = $('#tweet-text').val().trim(); // Get the input value

    if (!tweetText) {
      // Show error if the tweet is empty
      showError('Tweet cannot be empty!');
      return;
    }

    if (tweetText.length > 140) {
      // Show error if the tweet exceeds 140 characters
      showError('Tweet exceeds the 140-character limit!');
      return;
    }

    // Serialize form data
    const formData = $(this).serialize();

    // Send AJAX POST request
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
      success: function() {
        $('#tweet-text').val(''); // Clear the textarea
        $('.counter').text(140); // Reset the counter
        loadTweets(); // Reload tweets
      },
      error: function(err) {
        console.error('Error submitting tweet:', err);
        showError('An error occurred while submitting your tweet.');
      }
    });
  });

  loadTweets(); // Initial load
});
