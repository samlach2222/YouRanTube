var maxBar = 100;
var currentBar = 0;
var progressBar = document.getElementById( "progressBar" );;
var intervalId;

var initialisation = function() {   // fonction d'initialisation de la barre de progression
    progressBar.value = currentBar;
    progressBar.max = maxBar;
}

var displayBar = function() {
    currentBar++;
    if (currentBar > maxBar) {
        clearInterval( intervalId );
    }
    progressBar.value = currentBar;
}

window.onload = function() // au chargement de la page initialise la barre de progression
{
    initialisation();
}

function getVideo() 
{
    progressBar.style.display = "none"; // apparition du chargement
    var d0 = "AEIMQUYcgkosw048";
    var d1 = "ABCDEFGHIJKLMNOP";
    var d2 = d1;
    var d1c = 0;
    var d2c = 0;
    var overflowSuffix = "Q";
    var direction = "AA";
    var d2OverflowCounter = 0;
    var pageSize = 50;
    var Tokens = [];
    var newLength;

    for(i = 0; i < 400; i++) {
       newLength = Tokens.push("C" + d1.charAt((d1c / d0.length) % d1.length) + d0.charAt(i % d0.length) + overflowSuffix + direction);
       if(++d1c % (1 << 8) == 0) d1c = 1 << 7;
       if(++d2c % (1 << 7) == 0) overflowSuffix = d2.charAt(++d2OverflowCounter) + "E";
    };
    console.log("array - TABLEAU");

    Tokens.forEach(function(item, index, array) {
    });

    var randomPageNumber = Math.floor(Math.random()*(Tokens.length + 1))

    PageToken = Tokens[randomPageNumber];
    console.log(Tokens[randomPageNumber]);


    var video = document.getElementById("video");
    var channelID = document.Informations.Channel_ID.value;
    var apiKey = document.Informations.API_KEY.value;
    var videosUrl = "https://www.googleapis.com/youtube/v3/search?key=" + apiKey + "&channelId=" + channelID + "&part=snippet,id&order=date&&maxResults=1&pageToken=" + PageToken;
    var ajax = new XMLHttpRequest(); 

    ajax.open("GET", videosUrl, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            var videos = json.items;
            console.log(videos);

            var videoId = videos[0].id.videoId;
            var videoUrl = "https://www.googleapis.com/youtube/v3/videos?id=" + videoId + "&part=snippet,contentDetails,statistics&key=" + apiKey;

            var ajax = new XMLHttpRequest();
            ajax.open("GET", videoUrl, true);
            ajax.send();

            ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                    progressBar.style.display = "inline"; // apparition du chargement
                    console.log(this.responseText);
                    var json = JSON.parse(this.responseText);
                    console.log(json.items[0].id)
                    var singleVideo = json.items[0].id;
                    var youtubeUrl = "https://www.youtube.com/embed/" + singleVideo;
                    console.log(youtubeUrl);
                    video.src = youtubeUrl;
                }
            };
        }
    };
}