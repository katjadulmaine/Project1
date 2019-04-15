function displayMovieInfo() {

    var movie = $("#movieSearch").val().trim();
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var movieDiv = $("<div class='movie'>");

        var rating = response.Rated;

        var pOne = $("<p>").text("Rating: " + rating);

        movieDiv.append(pOne);

        var released = response.Released;

        var pTwo = $("<p>").text("Released: " + released);

        movieDiv.append(pTwo);

        var plot = response.Plot;

        var pThree = $("<p>").text("Plot: " + plot);

        movieDiv.append(pThree);

        var imgURL = response.Poster;

        var image = $("<img>").attr("src", imgURL);

        movieDiv.append(image);

        $("#ombdDisplay").append(movieDiv);
    });

}

$("#movieSearch").on("keyup", function (event) {

    event.preventDefault();

    var movie = $("#movieSearch").val();

    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var movieDiv = $("<div class='movie'>");

        var rating = response.Rated;

        var pOne = $("<p>").text("Rating: " + rating);

        movieDiv.append(pOne);

        var released = response.Released;

        var pTwo = $("<p>").text("Released: " + released);

        movieDiv.append(pTwo);

        var plot = response.Plot;

        var pThree = $("<p>").text("Plot: " + plot);

        movieDiv.append(pThree);

        var imgURL = response.Poster;

        var image = $("<img>").attr("src", imgURL);

        movieDiv.append(image);

        $("#omdbDisplay").append(movieDiv);

    });


});