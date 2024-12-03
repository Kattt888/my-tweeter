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
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];
 
const renderTweets = function(tweets) {
  $('#tweets-container').empty(); // No duplicates
  tweets.forEach(tweet => {
    const $tweetElement = createTweetElement(tweet);
    $('#tweets-container').append($tweetElement);
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

// Render the tweets
renderTweets(data);

