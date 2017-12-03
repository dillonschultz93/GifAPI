$(document).ready(function(){

  // == GLOBALS ===============================================================

  // an array of search terms
  var reactionArray = [
    "sad",
    "angry",
    "happy",
    "excited",
    "disgusted",
    "scared",
    "anxious",
    "bored",
    "jealous",
    "surprised"
  ];

  // a variable that holds the giphy API key
  var API_KEY = "UnYFSqq0hqT872jGWLpVhuCsMRXlABaa";

  // == FUNCTIONS =============================================================

  // a function that generates a query url based on the search term picked
  var queryURL = function(reaction) {
    return "https://api.giphy.com/v1/gifs/search?q=" + reaction + "&limit=1&api_key=" + API_KEY;
  };
  // a function that generates buttons based off of the reaction array
  var reactionBtn = function(reaction) {
    // create the button here
    var button = $("<button>");
    // add a class to make the button span the whole container
    button.addClass("u-full-width reaction");
    // add a data-reaction attribute
    button.attr("data-reaction", reaction);
    // apply the text of the array to the button
    button.text(reaction);

    return button;
  };

  // a function that renders the buttons to the #btn-area div
  var renderBtns = function() {
    reactionArray.forEach(function(element){
      $("#btn-area").append(reactionBtn(element));
    });
  };

  // a function that listens to a click event and runs an AJAX call
  $("#btn-area").click(".reaction", function () {
    // empty out the gif area
    $("#gif-area").empty();
    // declare what reaction was picked
    var reaction = $(this).data("reaction");

    var url = queryURL(reaction);

    // AJAX call
    $.ajax({
      url: url,
      method: "GET"
    }).done(function(response){
      console.log(response);
      var gif = $("<img>")
      .attr("src=" + response.data[0].images.fixed_height.url);

      $("#gif-area").append(gif);
    });

  });

  // == LOGIC =================================================================

  renderBtns();
});
