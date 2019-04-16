// makes the button animate when enter is pressed.
$('.input-field').keypress(function (e) {
    if (e.which == 13) {
        jQuery(this).blur();
        jQuery('#submit').focus().click();
    }
});
//===============================================================================================

$("nav").submit(function (event) {

    event.preventDefault();

    var movie = $("#movieSearch").val();

    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.Title)

        var movieDiv = $("<div class='movie'>");

        var title = response.Title
        var titleHead = $("<div class='row col-12 titleRow'>").text(title);
        movieDiv.append(titleHead);
        
        var imgURL = response.Poster;
        var image = $("<img>").attr("src", imgURL);
        movieDiv.append(image);

        var rating = response.Rated;
        var pOne = $("<p>").text("Rating: " + rating);
        movieDiv.append(pOne);

        var released = response.Released;
        var pTwo = $("<p>").text("Released: " + released);
        movieDiv.append(pTwo);

        var plot = response.Plot;
        var pThree = $("<p>").text("Plot: " + plot);
        movieDiv.append(pThree);


        $("#omdbDisplay").append(movieDiv);

    });

});
