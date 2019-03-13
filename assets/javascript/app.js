//Lets make an array of animals we want to display first
var gifs = ["cow", "chicken", "turtle", "otter"];

function displayGifs(){
    $("button").on("click", function(){
        var animal = $(this).attr("data-animal");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + 
        animal + "&apikey=htW8U4hOQmUEzlyM1cQShm83jieYczOO&imit=10";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response){
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div");
                var p = $("<p>");
                p.text("Rating: " + results[i].rating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fxed_height.url);
                gifDiv.append(gifImage);
                $("#gif-view").prepend(gifDiv);
            }
        })
    })
}

//this will render our buttons 
function renderButtons() {
    //Delete any buttons that may already be there
    $("#buttonsView").empty();
    //Go through each animal in our array
    for (var i = 0; i < gifs.length; i++) {
        var b = $("<button>");
        b.addClass("gif-button");
        b.attr("data-animal", gifs[i]);
        b.text(gifs[i]);
        console.log(b)
        $("#buttonsView").append(b);
    }
}
    $("#addGif").on("click",function(){
        event.preventDefault();

        var gif = $("#gif-input").val().trim();

        gifs.push(gif);

        renderButtons();
    })


$(document).on("click", ".gif-button", displayGifs);

renderButtons();