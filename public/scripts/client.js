/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();

  
    tweets.forEach(tweet => {
      const $tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetElement);
    });
  };

  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user-info">
            <img src="${tweet.user.avatars}" alt="${tweet.user.name}'s avatar">
            <span class="name">${tweet.user.name}</span>
            <span class="handle">${tweet.user.handle}</span>
          </div>
        </header>
        <p class="tweet-text">${tweet.content.text}</p>
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
    return $tweet;
  };

  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(response) {
        renderTweets(response);
      },
      error: function(err) {
        console.error('Error fetching tweets:', err);
      }
    });
  };

  loadTweets();

  $('form').on('submit', function(event) {
    event.preventDefault();

    const formData = $(this).serialize();

    const tweetText = $('#tweet-text').val().trim();
    if (tweetText === '') {
      alert("Tweet cannot be empty!");
      return;
    }
    if (tweetText.length > 140) {
      alert("Tweet exceeds the 140 character limit!");
      return;
    }

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: formData,
      success: function() {
        $('#tweet-text').val('');
        $('.counter').text(140);
        loadTweets();
      },
      error: function(error) {
        console.error("Error submitting tweet:", error);
      }
    });
  });
});
