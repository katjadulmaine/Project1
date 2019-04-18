$("#close").on("click", function(){
    console.log("test");
    $("#movieSearch").val("");
    $("#omdbDisplay").empty();
    $("#ko").hide(400);
})

//===============================================================================================

$("nav").submit(function (event) {

    event.preventDefault();

    $("#ko").show(250);

    $("#omdbDisplay").empty();

    var movie = $("#movieSearch").val();

    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $("#omdbDisplay").empty();
        var movieDiv = $("<div class='movie'>");
    
        var title = response.Title
        var titleHead = $("<div class='row col s12 #90a4ae blue-grey lighten-2 white-text z-depth-3 titleRow'>").html(title);
        movieDiv.append(titleHead);
        
        var imgURL = response.Poster;
        var image = $("<div class='col s12 m6 center-align imgDiv'>").html($("<img>").attr("src", imgURL));
        movieDiv.append(image);

        var movieInfo = [
            "<label>Director: </label> " + response.Director + "<br>",
            "<label>Actors: </label> " + response.Actors + "<br>",
            "<label>Rated: </label> " + response.Rated + "<br>",
            "<label>Released: </label> " + response.Year + "<br>",
            "<label>Metascore: </label> " + response.Metascore + "<br>",
            "<label>imdbRating: </label> " + response.imdbRating + "<br>",
            response.Plot
        ]

        var info = $("<div class='col s12 m5'>").html(movieInfo);

        movieDiv.append(info);

        $("#omdbDisplay").append(movieDiv);

    });

});