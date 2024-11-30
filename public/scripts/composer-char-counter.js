$(document).ready(function() {
  console.log("Document is ready!"); 

  $(".new-tweet textarea").on("input", function () {
    const tweetLength = $(this).val().length;
    const counter = $(this).closest("form").find(".counter");
    const remainingChars = 140 - tweetLength;

    // Updating the counter text
    counter.text(remainingChars);

    // Add/remove the 'invalid' class based on character count
    if (remainingChars < 0) {
      counter.addClass("invalid");
    } else {
      counter.removeClass("invalid");
    }
  });
});