function GetVideo() 
{  
    var video = document.getElementById("video");
    var channelID = document.Informations.Channel_ID.value; // ID de la chaine donnée par le formulaire
    var apiKey = document.Informations.API_KEY.value; // cle API de l'utilisateur donnée par le formulaire
    var maxResults = 50
    var videosUrl = "https://www.googleapis.com/youtube/v3/search?key=" + apiKey + "&channelId=" + channelID + "&part=snippet&order=date&maxResults=" + maxResults; // URL construite donnant le résultat de la page 1 de la recherche
    var ajax = new XMLHttpRequest(); // Récupère les données sans avoir à rafraichir la page
    
    ajax.open("GET", videosUrl, true); // prépare la requète HTTP videoUrl
    ajax.send(); // effectue la requète HTTP videoUrl --> SERVER STATUS 403 QUAND QUOTO EXCEED
    
    ajax.onreadystatechange = function () // quand on recois un résultat de la requète
    {
        // vérifie si la requète est complète
        if (this.readyState == 4 && this.status == 200) // Vérification que la requète s'est bien passée
        {
            /* 
            READYSTATE
            - 0 --> [UNSENT] Le client a été créé. open() n'a pas encore été appelé.
            - 1 --> [OPENED] open()a été appelé.
            - 2 --> [HEADERS_RECEIVED] send() a été appelé, et les en-têtes et le statut sont disponibles.
            - 3 --> [LOADING] Téléchargement; responseText contient des données partielles.
            - 4 --> [DONE] L'opération est terminée.
            *** https://developer.mozilla.org/fr/docs/Web/API/XMLHttpRequest/readyState ***
            
            SIGNIFIE QUE L'OPERATION A MARCHE OU A ECHOUE
            -----------------------------------------------------------------------------------------------
            STATUS
            - 200 --> OK, tout s'est bien passé
            - 404 --> Ressource introuvable
            - 401 --> Accès interdit
            - 500 --> Erreur de traitement du serveur
            *** https://www.toutjavascript.com/reference/ref-xmlhttprequest.status.php ***
            
            SIGNIFIE QUE TOUT S'EST BIEN PASSE
            */
            
            console.log(this.responseText); // affiche sur la console de développement la réponse du serveur (réponse suite à la requete) sous forme de chaine de caractère
            // responseXML retourne la même chose mais sous forme XML
            var json = JSON.parse(this.responseText); // construit du JavaScript à partir de la requète
            var videos = json.items; // on récupère la valeur "items" de la requète --> l'ensemble des vidéos d'une page
            var pageToken = json.nextPageToken; // récupération de la page suivante
            
            // ------------------------ requètes suivantes ------------------------
            while(pageToken != "") // ou "null"
            {
                videosUrl = "https://www.googleapis.com/youtube/v3/search?key=" + apiKey + "&channelId=" + channelID + "&part=snippet&order=date&maxResults=" + maxResults + "&pageToken=" + pageToken;
                ajax.open("GET", videosUrl, true);
                ajax.send();
                ajax.onreadystatechange = function () // quand on recois un résultat de la requète
                {
                    if (this.readyState == 4 && this.status == 200) // Vérification que la requète s'est bien passée
                    {
                        //console.log(this.responseText);
                        json = JSON.parse(this.responseText);
                        videos = videos.concat(json.items) // concaénation de requètes
                        pageToken = json.nextPageToken; // page suivante
                    }
                }
            }
            // ------------------------ requètes suivantes ------------------------
            
            console.log(videos); // affichage dans la console de l'intégralité des vidéos en array[]
            
            var randomNumber = Math.floor(Math.random() * (videos.length + 1)); // nombre aléatoire entre 1 et le nombre de vidéos
            var randomVideo = videos[randomNumber]; // choix de la vidéo aléatoire
            
            console.log(randomVideo); // affichage de la vidéo aléatoire dans la console
            
            var videoID = randomVideo.id.videoId; // récupération de l'id de la vidéo aléatoire
            var videoURL = "https://www.googleapids.com/youtube/v3/videos?id=" + videoID + "&part=snippet,contentDetails,statistic&key =" + apiKey; // lien de la requète vers la vidéo aléatoire
            
            
            ajax = new XMLHttpRequest(); // pour récupérer uniquement la vidéo que l'on cherche (vidéo aléatoire)
            ajax.open("GET", videoURL, true);
            ajax.send();
            
           ajax.onreadystatechange = function ()
            {
                if (this.readyState == 4 && this.status == 200)
                {
                    console.log(this.responseText);
                    json = JSON.parse(this.responseText);
                    var singleVideo = json.items[0] // on récupère le contenu de la requète
                    var youtubeURL = "https://www.youtube.com/watch?v=" + singleVideo; // LIEN VERS LA VIDEO YOUTUBE
                    console.log(youtubeURL); // affichage dans la console de l'url aléatoire
                    
                    video.src = youtubeURL; // envoi au iframe de l'HTML
                }
            };
        }
    };  
}