//This will wait until the page is fully loaded
$(document).ready(function(){


    //Lets make an array of animals we want to display first
    var gifs = ["cow", "chicken", "turtle", "otter"];

    //this function is what displays the gifs
    function displayGifs(animal) {
        //placeholder for our url
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&apikey=htW8U4hOQmUEzlyM1cQShm83jieYczOO&limit=10";

        //give ajax our info and ask for a promise
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            //work with our object through response
            console.log(response);
            //use the data in the object with the word results
            var results = response.data;

            //create a for loop to render the images and assign attributes
            for (var i = 0; i < results.length; i++) {
                //make a div for each gif
                var gifDiv = $("<div>");
                //give each gif some text which will be rating
                var p = $("<p>");
                p.text("Rating: " + results[i].rating);
                //each gif will be an image
                var gifImage = $("<img>");
                //for each image assign a still image, the animated
                //gif, and an attribute to define what state its in
                gifImage.attr({"src" : results[i].images.original_still.url, 
                "data-still" : results[i].images.original_still.url, 
                "data-animate" : results[i].images.original.url, 
                "data-state" : "still" });
                //add it to the div we made before
                gifDiv.append(p)
                gifDiv.append(gifImage);
                //add it to the gif view div defined in the html
                $("#gif-view").prepend(gifDiv);
            }
        })
    }

    //this will render our buttons 
    function renderButtons() {
        //Delete any buttons that may already be there
        $("#buttonsView").empty();
        //Go through each animal in our array
        for (var i = 0; i < gifs.length; i++) {
            //make a button and assign it to the variable b
            var b = $("<button>");
            //give each button the class = gif-button
            b.addClass("gif-button");
            //give each button the attr data-animal = the name of the gif
            b.attr("data-animal", gifs[i]);
            b.text(gifs[i]);
            console.log(b)
            //add it to the buttons view designated in our html
            $("#buttonsView").append(b);
        }
    };

    //whenever we click on the add gif button
    $("#addGif").on("click", function () {
        //prevent it from refreshing the page
        event.preventDefault();
        //set the var gif = to whatever the user wants to search for and trim its 
        //whitespace off
        var gif = $("#gif-input").val().trim();
        //add it to our array of gifs located at the top of this file
        gifs.push(gif);
        //render its button through our button function
        renderButtons();
    });

    //whenever a button is clicked on the document
    $(document).on("click", "button", function () {
        //set a var animal = to the button clicked on
        var animal = $(this).attr("data-animal");
        //run the display gifs function to show it on the screen
        displayGifs(animal);
    })
    //whenever a gif is clicked on 
    $(document).on("click", "img", function(){
        //set var state = to the data state of the gif
        var state = $(this).attr("data-state");
        //if the state of the gif is still
        if (state === "still") {
            //change it to still
            var placeHolder = $(this).attr("data-animate");
            $(this).attr("src", placeHolder);
            $(this).attr("data-state", "animate");
        }
        //otherwise its already moving
        else if (state === "animate") {
            //make it still
            var placeHolder = $(this).attr("data-still")
            $(this).attr("src", placeHolder)
            $(this).attr("data-state", "still")
          }
    })
    //render the original buttons in our array before any new buttons 
    //have been added
    renderButtons();

})