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

  // stores the src URL of the still gif from the AJAX call
  var stillGif;
  // store the src URL of the animated gif form the AJAX call
  var animatedGif;

  // store the image being created in the AJAX call
  var gif;

  // == FUNCTIONS =============================================================

  // a function that generates buttons based off of the reaction array
  var reactionBtn = function(reaction) {
    // create the button here
    var button = $("<button>")
    // add a class to make the button span the whole container
        .addClass("u-full-width reaction")
    // add a data-reaction attribute
        .attr("data-reaction", reaction)
    // apply the text of the array to the button
        .text(reaction);

    return button;
  };

  // a function that renders the buttons to the #btn-area div
  var renderBtns = function() {
    reactionArray.forEach(function(element){
      $("#btn-area").append(reactionBtn(element));
    });
  };
  // a function that listens to a click event and runs an AJAX call
  $("#btn-area").on("click", ".reaction", function() {
    // grabs the data attribute of the button clicked
    var reaction = $(this).data("reaction");
    console.log(reaction); // debugging
    // creates a query URL based on the data of the button
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reaction + "&limit=10&api_key=" + API_KEY;
    console.log(queryURL); // debugging
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
      console.log(response);// debugging
      // empty out the #gif-area div
      $("#gif-area").empty();
      // store the data from the response
      var results = response.data;
      // loop through the response array
      for(var i = 0; i < results.length; i++) {
        // create a div that contains the gif and rating
        var gifContainer = $("<div class='gif-div'>");
        // store the rating data from the response
        var rating = results[i].rating.toUpperCase();
        // create a p tag that contains the rating from the response
        var ratingPara = $("<p class='rating'>").text("Rating: " + rating);
        // create an img tag that contains the gif from the response
        gif = $("<img>");
        gif.addClass("gif-item");
        stillGif = results[i].images.fixed_width_still.url;
        animatedGif = results[i].images.fixed_width.url;
        gif.attr("src", stillGif);
        gif.attr("data-state", "still");
        gif.attr("data-still", stillGif);
        gif.attr("data-animate", animatedGif);

        gifContainer.prepend(ratingPara);
        gifContainer.prepend(gif);

        $("#gif-area").prepend(gifContainer);
      }
    });
  });

  // a function that listens to a hover event on the gifs in the
  // #gif-area div
  $("#gif-area").on("mouseenter mouseleave", ".gif-item", function(){
    // store the state of the gif clicked
    var state = $(this).data("state");
    //
    if(state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).data("state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).data("state", "still");
    }
  });

  // a function that listens to a click event on the submit button and pushes
  // a user's inputs to the original array of strings
  $("#submit-btn").on("click", function(event){
    //used to prevent the form from submitting itself
    event.preventDefault();
    // assign a value to the new button. This value is user generated
    var newBtn = $("#user-input").val().trim();
    // push the user input to the original array
    reactionArray.push(newBtn);
    console.log(reactionArray); // debugging
    // empty the #btn-area div
    $("#btn-area").empty();
    // re-render the buttons from the array
    renderBtns();
    // empty out the user input form
    $("#user-input").val("");
  });

  // == LOGIC =================================================================

  renderBtns();
});
