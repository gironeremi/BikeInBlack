var mySlider = new Slider (document.getElementById("slider-picture"), slides = [
    ["media/slide1.png", "Cliquez sur une station de Nantes. Un BiB™ est-il disponible ici?"],
    ["media/slide2.png", "Un nom, un prénom et vous réservez. Une signature, vous validez et c'est fini!"],
    ["media/slide3.png", "Allez chercher votre BiB™ dans les 20 minutes. Sinon, la réservation est annulée."],
]);
var maCarte = new MapManager();
var myCanvas = new Canvas();
var myReservation = new Reservation(document.getElementById("prenom"), document.getElementById("nom"));
//1er clic après avoir saisi nom et prénom.
document.getElementById("reservation").addEventListener("click", function(event) {
    myReservation.validation();
});
//2ème clic après avoir signé.
document.getElementById("validation").addEventListener("click", function(event) {
    if (myCanvas.check !== 1) {
        myCanvas.canvasErreur();
    } else {
        myCanvas.canvasOK();
        myCanvas.clear();
        monTimer.init(20, 0); //lancement du Timer à 20 minutes.
    }
});
var monTimer = new Timer();
//si une réservation existe, alors affichage de la réservation et reprise du compte à rebours
if (sessionStorage.getItem("seconds") !== "") {
    if (sessionStorage.getItem("minutes") > 0 || sessionStorage.getItem("seconds") > 0) {
        monTimer.init(sessionStorage.getItem("minutes"), sessionStorage.getItem("seconds"));
    }
}