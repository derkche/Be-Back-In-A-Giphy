$(document).ready(function() {

    var topics = ["gaming", "memes", "nature", "movies", "sports"];

    function generateButtons() {
        $("#button-group").empty();
        for (var i = 0; i < topics.length; i++) {

            var a = $("<button>");
            a.addClass("btn btn-outline-secondary topicButtons");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);

            $("#button-group").append(a);
        }
    }

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
                
                var gifCard = $("<div class='gif-card'>");

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.original_still.url);
                gifImage.attr("data-animate", results[i].images.original.url);
                gifImage.attr("data-still", results[i].images.original_still.url);
                gifImage.attr("data-state", "still");
                gifImage.attr("class", "gif");

                var rating = results[i].rating;
                var gifRating = $("<p>").text("Rating: " + rating)

                gifCard.append(gifImage);
                gifCard.append(gifRating);

                $("#images").prepend(gifCard);
            }
        });

    }

    $("#testButton").on("click", function(){
        event.preventDefault();
        getGifs();
    })

    $("#submitButton").on("click", function()
    {
        event.preventDefault();
        var newTopic = $("#userSearchTerms").val().trim();
        console.log(newTopic);
        topics.push(newTopic);
        console.log(topics);
        generateButtons();
    });

    $(document).on("click", ".gif", function() {
        
        var state = $(this).attr("data-state");
        console.log(state);
  
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } 
        else if (state === "animate"){
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        };
  
    });

    $(document).on("click", ".topicButtons", getGifs);

    generateButtons();

});