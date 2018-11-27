
// Initial array of gifs
var gifs = ["Family Guy", "The Office", "Dr. Robot", "Parks and Recreation", "Planet Earth", "Game of Thrones", "South Park", "Broad City"];

// displayGif function re-renders the HTML to display the appropriate content (we have a limit of 10 gifs)
function displayGif() {

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);

    // Creating an AJAX call for the specific GIF button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        $("#gifs-view").empty();
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            // Creating a div to hold the gifs
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");

            //pulling rating of gif
            var Rating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(Rating);



            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate", results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);

            // Putting the 10 gifs where the last 10 were (that we are deleting! so don't be fooled by the prepend, bc it will prepend to an empty div)
            $("#gifs-view").prepend(gifDiv);
        }
    });
}

// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("gif-btn");
        // Adding a data-attribute
        a.attr("data-name", gifs[i]);
        // Providing the initial button text
        a.text(gifs[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a movie button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#gif-input").val().trim();

    // Adding movie from the textbox to our array
    gifs.push(topic);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});



// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".gif-btn", displayGif);

// Calling the renderButtons function to display the initial buttons
renderButtons();




$(document).on("click", ".image", function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});

