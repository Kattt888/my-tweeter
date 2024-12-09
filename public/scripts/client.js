/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const renderTweets = function(tweets) {
    $('#tweets-container').empty(); // Clear existing tweets
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet); // Prepend tweets
    });
  };

  const createTweetElement = function(tweet) {
    const safeText = $('<div>').text(tweet.content.text).html(); // Escape for safety
    return $(`
      <article class="tweet">
        <header>
          <div class="user-info">
            <img src="${tweet.user.avatars}" alt="${tweet.user.name}'s avatar">
            <span class="name">${tweet.user.name}</span>
            <span class="handle">${tweet.user.handle}</span>
          </div>
        </header>
        <p class="tweet-text">${safeText}</p>
        <footer>
          <time>${timeago.format(tweet.created_at)}</time>
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
    
    //hide error message
    $('.error-message').slideUp();

    const tweetText = $('#tweet-text').val().trim(); // Get value

    if (!tweetText) {
      //error pops up if tweet is empty
      $('.error-message').text('Tweet cannot be empty!').slideDown();
    return;
    }

    if (tweetText.length > 140) {
      //error pops up if tweet exceeds 140 characters
      $('.error-message').text('Tweet exceeds 140 characters!').slideDown();
    return;
    }

    //serialize form data
    const formData = $(this).serialize(); // Serialize form data

    //sending AJAX post request
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
      success: function() {
        $('#tweet-text').val(''); // Clear form
        $('.counter').text(140); // Reset counter
        loadTweets(); // Fetch new tweets
      },
      error: function(err) {
        console.error('Error submitting tweet:', err);
      $('.error-message').text('An error occurred while submitting your tweet.').slideDown();
      }
    });
  });

  loadTweets(); // Initial load
});
