$("#close").on("click", function(){
    console.log("test");
    $("#movieSearch").val("");
    $("#omdbDisplay").empty();
    $("#ko").hide(400);
    $("#poprec").show(400);
    $("#youtubeDisplay").empty();
})

//===============================================================================================

$("nav").submit(function (event) {

    event.preventDefault();

    if(!$("#movieSearch").val().trim()) return;

    $("#ko").show(250);

    $("#poprec").hide(400);

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

var config = {
    apiKey: "AIzaSyCFBRAs5z0EtK9v2HV17zAMdaRPVTdkHzM",
    authDomain: "mcdwrgkdproject.firebaseapp.com",
    databaseURL: "https://mcdwrgkdproject.firebaseio.com",
    projectId: "mcdwrgkdproject",
    storageBucket: "mcdwrgkdproject.appspot.com",
    messagingSenderId: "118525190502"
};
firebase.initializeApp(config);


var db = firebase.database();
var searchesRef = db.ref('/searches');
var recentsRef = db.ref('/recents');

$("nav").submit(function (event) {

    event.preventDefault();
    
    $("p").remove();
    var phrase = $("#movieSearch").val().trim();
    var phraseRef = searchesRef.child(phrase);

    recentsRef.push(phrase);

    // Do we already have an entry for this phrase?
    phraseRef.once("value", function (snap) {
        if (!snap.exists()) {
            phraseRef.set(1)
        } else {
            phraseRef.set(snap.val() + 1);
        }
    }); 
});

recentsRef.orderByKey().limitToLast(3).on("value", function (snap){
    var recents = snap.val();
    for (var pushId in recents) {
        var text = $("<p>").text(recents[pushId]);
        var lastSearch = $("<div>").append(text);
        
        console.log(recents[pushId]);
        $("#last3").append(lastSearch);
    }
});
searchesRef.on("value", function (snap) {
    var results = [];
    
    var searches = snap.val();
    for (var search in searches) {
        results.push({ phrase: search, count: searches[search] })
    }

    results.sort(function (a, b) {
        return b.count - a.count;
    });
    var top = $("#top5")
    
        var topSearch = $("<div>").append(
            $("<p>").text(results[0].phrase),
            $("<p>").text(results[1].phrase),
            $("<p>").text(results[2].phrase),
            $("<p>").text(results[3].phrase),
            $("<p>").text(results[4].phrase)
        );

        $(top).append(topSearch);
         
});

$("nav").submit(function (event) {

    event.preventDefault();

    $("#youtubeDisplay").empty();

    var movie = $("#movieSearch").val();

    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + movie + "officialtrailer&h&key=AIzaSyBVB1jCdM8M3mt_5HyEjI4-c42LzjdoM88";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.items[0].id.videoId);

        $("#youtubeDisplay").empty();
        var youtubeDiv = $("<div class='video-container'>");
        $("<div class='video-container'>");
        var video = response.items[1].id.videoId;
        var videoURL = "https://www.youtube.com/embed/" + video;
        console.log(videoURL);

        var videoplay = $("<iframe>").attr("src", videoURL);

        youtubeDiv.append(videoplay);

        $("#youtubeDisplay").append(youtubeDiv);

    });
});