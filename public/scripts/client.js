/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense, donc je suis"
    },
    "created_at": 1461113959088
  }
];

// Function to render tweets by iterating through the tweets array
const renderTweets = function(tweets) {
  $('#tweets-container').empty(); // Prevent duplicates
  tweets.forEach(tweet => {
    const $tweetElement = createTweetElement(tweet);
    $('#tweets-container').prepend($tweetElement); // Prepend for reverse chronological order
  });
};

// Function to create a new tweet element from the tweet object
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
        <time>${new Date(tweet.created_at).toLocaleString()}</time>
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

// Render the initial set of tweets (testing)
renderTweets(data);

$(document).ready(function() {
  // Event listener for tweet form submission
  $('form').on('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Serialize form data
    const formData = $(this).serialize();

    // Send the AJAX POST request
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: formData,
      success: function() {
        console.log("Tweet submitted successfully!");

        // After submitting the form, clear the textarea and reset the counter
        $('#tweet-text').val('');
        $('.counter').text('140');

        // Load tweets again to display the new tweet
        loadTweets();
      },
      error: function(error) {
        console.error("Error submitting tweet:", error);
      }
    });
  });

  // Function to load tweets from the server using AJAX GET request
  const loadTweets = function() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function(tweets) {
        // Render the tweets after fetching them
        renderTweets(tweets);
      },
      error: function(error) {
        console.error("Error fetching tweets:", error);
      }
    });
  };

  // Load tweets when the page is loaded
  loadTweets();
});
