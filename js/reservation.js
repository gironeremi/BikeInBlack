class Reservation {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.nomValide = 0;
		this.prenomValide = 0;
		this.affichageInfos();
	}
	validation() {
		this.nomValide = this.lastName.value.trim();
    	this.prenomValide = this.firstName.value.trim();
    	if (this.nomValide !== "" && this.prenomValide !== "") {
        	this.affichageCanvas();
        	this.stockageInfos();
    	} else if (this.nomValide == "" || this.prenomValide == "") {
        	this.reservationErreur();
    	}
	}
	affichageInfos() {
		prenom.value = localStorage.getItem("prenom");
		nom.value = localStorage.getItem("nom")
	}
	stockageInfos() {
        window.localStorage.setItem("nom", this.nomValide);
        window.localStorage.setItem("prenom", this.prenomValide);
    }
    reservationErreur(){
        document.getElementById("check").innerHTML = "Veuillez remplir TOUTES les informations!";
	}
	affichageCanvas() {
		document.getElementById("canvas").style.display = "block";
		document.getElementById("form").style.display = "none";
        document.getElementById("check").innerHTML = "";
	}
}
