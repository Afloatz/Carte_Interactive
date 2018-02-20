            
//Affichage de la carte Google   
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.757, lng: 4.85},  // coord. de Lyon
        zoom: 13 // niveau de zoom sur la ville
    });
    // Récupération des données des stations via l'APIJcDecaux à Lyon
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=492ae1f6e99a57e6c239f8c21aa777d6db67fb0b", function (reponse) {
        // Transforme la réponse en tableau d'objets JavaScript
        var stations = JSON.parse(reponse);
        var markers = [];
        //Récupération des données pour chq station
        stations.forEach(function (station) {
            //Couleur d'icône différente si station ouverte/fermée et si vélo dispo ou non
            var couleur;
            if (station.status === 'CLOSED') {
                couleur = 'rouge';
            } else if (station.status === 'OPEN') {
                if (station.available_bikes > 0) {
                    couleur = 'vert';
                } else if (station.available_bikes === 0) {
                     couleur = 'orange';
                }
            }
            // Affiche la position de chq station sur la carte avec un marqueur
            var marker = new google.maps.Marker({
                position: {lat: station.position.lat, lng: station.position.lng},
                icon: '../images/' + couleur + '.png',
                map: map
            });
            var divEtape1 = document.getElementById("etape1");    
            var divStation = document.getElementById("station-info");
            var adresseElt = document.getElementById("address");
            var etatElt = document.getElementById("status");
            var placeElt = document.getElementById("place");
            var bikeElt = document.getElementById("bike");
            var bookElt = document.getElementById("book"); // Bouton Réserver
            var divReservation = document.getElementById("reservation");
            var divConfirmation = document.getElementById("confirmation");
            var divAnnuler = document.getElementById("annuler");
            marker.addListener("click", function () {
                divEtape1.style.display = 'none';
                divStation.style.display = 'block';

                //Pour Réouvrir infos de la station quand on a déjà cliqué sur Réserver et que l'on reclique sur un marqueur
                if (divReservation.style.display === 'block') {
                    divReservation.style.display = 'none';
                    divStation.style.display = 'block';
                }
                
                //Si reclique sur un marqueur qd 1 résa est déjà en cours
                if (sessionStorage.length > 1) {
                    divStation.style.display = 'none';
                    divConfirmation.style.display = 'none';
                    divAnnuler.style.display = 'block';
                }

                adresseElt.innerHTML = " " + station.address; // Affiche l'adresse de la station cliquée
                if (station.status === "OPEN") {
                    etatElt.innerHTML = "La station est ouverte";
                } else {
                    etatElt.innerHTML = "La station est fermée";
                }
                placeElt.innerHTML = " " + station.available_bike_stands + " place(s) disponible(s)";
                bikeElt.innerHTML = " " + station.available_bikes + " vélo(s) disponible(s)";
                if (station.available_bikes === 0) {
                    bookElt.style.opacity = "0.6"; // Rend le bouton un peu transparent pour look désactivé
                    bookElt.disabled = true; // Désactive le bouton Réserver
                } else {
                    bookElt.style.opacity = "1";
                    bookElt.disabled = false; // Active le bouton Réserver
                }
                sessionStorage.setItem('Adresse', station.address); // Sauvegarde l'addresse de la station
            })
            bookElt.addEventListener("click", function () {
                divStation.style.display = 'none';
                divReservation.style.display = 'block'; 
            })
            markers.push(marker);
        })
        //Regroupement des marqueurs
        var markerCluster = new MarkerClusterer(map, markers,
                                                {imagePath: '../images/m'});
    });
}

var sign = Object.create(Signature);
sign.init();

var time = Object.create(Compteur);
time.init();
