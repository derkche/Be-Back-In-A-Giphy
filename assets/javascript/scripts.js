$(document).ready(function() {

    var topics = ["anime", "gaming", "memes", "nature", "movies"];

    // 
          // Function for displaying movie data
          function generateButtons() {

            // Deletes the topics prior to adding new topics
            // (this is necessary otherwise you will have repeat buttons)
            $("#button-group").empty();
            // Loops through the array of topics
            for (var i = 0; i < topics.length; i++) {
    
              // Then dynamicaly generates buttons for each movie in the array
              // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
              var a = $("<button>");
              // Adds a class of movie to our button
              a.addClass("btn btn-outline-secondary");
              // Added a data-attribute
              a.attr("data-name", topics[i]);
              // Provided the initial button text
              a.text(topics[i]);
              // Added the button to the buttons-view div
              $("#button-group").append(a);
            }
          }
    // 
    

          //getGifs must be called by a topic button
    function getGifs () {
        event.preventDefault();

        var searchingFor = $(this).attr("data-name");
        console.log(searchingFor);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+searchingFor+"&api_key=joj9EAW4idOiU1fBOhNjjIj9hCxv1L5B&limit=10"
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {  
            var results = response.data;
 
            for (var i = 0; i < results.length; i++) {
                var gifPayload = $("<div class='item'>");
            
                var gifRating = results[i].rating;
                var displayRating = $("<p>").text("Rating: " + gifRating);
            
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height.url);
            
                gifPayload.prepend(displayRating);
                gifPayload.prepend(gifImage);
            
                $("#images").prepend(gifPayload);
            }

        });

    }

    $("#testButton").on("click", function(){
        event.preventDefault();
        getGifs();
    })

    function grabTits() {
    
        // var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=joj9EAW4idOiU1fBOhNjjIj9hCxv1L5B&tag=boobs"
      
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
        
            var imageUrl = response.data.image_original_url;
            var boobImage = $("<img>");
            boobImage.attr("src", imageUrl);
            boobImage.attr("alt", "image");
            boobImage.attr("style", "width:300px; max-height:300px;");

            $("#images").prepend(boobImage);

        });

    };

    $("#tits").on("click", function(){

        grabTits();
        console.log("titgrabbed");

    });

    $("#submitButton").on("click", function()
    {
        event.preventDefault();
        var newTopic = $("#userSearchTerms").val().trim();
        console.log(newTopic);
        topics.push(newTopic);
        console.log(topics);
        generateButtons();
    });

    $(document).on("click", ".btn", getGifs);

    generateButtons();

});
