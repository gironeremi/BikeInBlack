class MapManager {
    constructor (){
        this.myMap = L.map('myMap').setView([47.2173, -1.5534], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this.myMap);
        this.ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=b8360acc0a23e08878b61f40b6ac79680479d3d1", (reponse) => {
            var stations = JSON.parse(reponse);
            stations.forEach(this.execStation.bind(this)); 
        });
    }
    execStation(station, index) {
        var lat = station.position.lat;
        var lng = station.position.lng;
        //Ici, on "coupe" les numéros disgracieux en début de nom de station.
        var stationName = station.name.split("-")[1];
        var stationInfo = document.getElementById("stationInfo");
        //conditions: si une station est ouverte ET s'il y a plus de 2 vélos disponibles: icône vert.
        var text = "<span>Nom de la station : </span>" + stationName + "<br />" + "<span>Adresse : </span>" + station.address + "<br /><br />" + station.available_bikes + " BiB™ à disposition." + "<br/ >";
        if (station.status === "OPEN" && station.available_bikes > 3) {
            var myIcon = L.icon({ iconUrl: 'icons/icon_green.svg', iconSize: [38, 38], iconAnchor: [19, 19]});
        } else if (station.status === "OPEN" && station.available_bikes >= 0) {
            var myIcon = L.icon({ iconUrl: 'icons/icon_orange.svg', iconSize: [38, 38], iconAnchor: [19, 19]});
            if (station.available_bikes === 1) {
                text += "<span>Il ne reste qu'un seul BiB™. Dépêchez-vous!</span>";
            } else if (station.available_bikes === 0) {
                text += "Désolé, la station " + station.name + " est en rupture de BiB™. Veuillez sélectionner une autre station.";
            }
        } else {
            var myIcon = L.icon({ iconUrl: 'icons/icon_red.svg', iconSize: [38, 38], iconAnchor: [19, 19]});
            text = "Désolé, la station " + station.name + " n'est pas ouverte. Veuillez sélectionner une autre station de BiB™.";
        }
        var marqueur = L.marker([station.position.lat, station.position.lng], {icon: myIcon}).addTo(this.myMap);
        marqueur.addEventListener("click", function() {
            document.getElementById("sidePanel").style.display = "block";
            document.getElementById("form").style.display = "block";
            sessionStorage.setItem("stationName", stationName);
            stationInfo.innerHTML = text;
            if (station.status !== "OPEN" || station.available_bikes === 0) {
                document.getElementById("form").style.display = "none";
            }
        });
    }
    ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.log(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.log("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
    }
}