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

        var movieDiv = $("<div class='movie'>");

        var title = response.Title
        var titleHead = $("<div class='row col s12 titleRow'>").text(title);
        movieDiv.append(titleHead);
        
        var imgURL = response.Poster;
        var image = $("<div class='col s4'>").html($("<img>").attr("src", imgURL));
        movieDiv.append(image);

        var rating = response.Director;
        var info = $("<div class='col s5'>").text("Director: " + rating);
        movieDiv.append(info);

        var rating = response.Actors;
        var info = $("<div class='col s5'>").text("Actors: " + rating);
        movieDiv.append(info);

        var rating = response.Rated;
        var info = $("<div class='col s5'>").text("Rated: " + rating);
        movieDiv.append(info);

        var year = response.Year;
        var info = $("<div class='col s5'>").text("Released: " + year);
        movieDiv.append(info);
        
        var rating = response.BoxOffice;
        var info = $("<div class='col s5'>").text("BoxOffice: " + rating);
        movieDiv.append(info);

        var rating = response.Metascore;
        var info = $("<div class='col s5'>").text("Metascore: " + rating);
        movieDiv.append(info);

        var rating = response.imdbRating;
        var info = $("<div class='col s5'>").text("imdbRating: " + rating);
        movieDiv.append(info);

        var plot = response.Plot;
        var info = $("<div class='col s5'>").text("Plot: " + plot);        
        movieDiv.append(info);

        $("#omdbDisplay").append(movieDiv);

    });

});

s