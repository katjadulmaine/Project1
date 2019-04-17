$("#close").on("click", function(){
    console.log("test");
    $("#movieSearch").val("");
    $("#omdbDisplay").empty();
})

//===============================================================================================

$("nav").submit(function (event) {

    event.preventDefault();

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
        var titleHead = $("<div class='row col s12 #ff8a65 deep-orange lighten-2 white-text hoverable titleRow'>").html(title);
        movieDiv.append(titleHead);
        
        var imgURL = response.Poster;
        var image = $("<div class='col s12 m6 center-align imgDiv'>").html($("<img>").attr("src", imgURL));
        movieDiv.append(image);

        var rating = response.Director;
        var info = $("<div class='col s12 m5'>").html("<label>Director: </label> " + rating);
        movieDiv.append(info);

        var actor = response.Actors;
        var actorInfo = $("<div class='col s12 m5'>").html("<label>Actors: </label> " + actor);
        movieDiv.append(actorInfo);

        var rated = response.Rated;
        var ratedInfo = $("<div class='col s12 m5'>").html("<label>Rated: </label> " + rated);
        movieDiv.append(ratedInfo);

        var year = response.Year;
        var yearInfo = $("<div class='col s12 m5'>").html("<label>Released: </label> " + year);
        movieDiv.append(yearInfo);
        
        var box = response.BoxOffice;
        var boxInfo = $("<div class='col s12 m5'>").html("<label>BoxOffice: </label> " + box);
        movieDiv.append(boxInfo);

        var meta = response.Metascore;
        var metaInfo = $("<div class='col s12 m5'>").html("<label>Metascore: </label> " + meta);
        movieDiv.append(metaInfo);

        var imdb = response.imdbRating;
        var imdbInfo = $("<div class='col s12 m5'>").html("<label>imdbRating: </label> " + imdb);
        movieDiv.append(imdbInfo);

        var plot = response.Plot;
        var plotInfo = $("<div class='col s12 m5'>").text(plot);        
        movieDiv.append(plotInfo);

        $("#omdbDisplay").append(movieDiv);

    });

});