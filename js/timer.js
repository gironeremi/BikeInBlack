class Timer{
	init(minutes, seconds) {
		this.minutes = minutes;
		this.seconds = seconds;
		this.showReservation();
		this.loop();
	}
	loop(){
		this.stop();
		this.interval = setInterval(this.countdown.bind(this), 1000);
	}
	countdown() {
		this.countdownStorage();
		this.countdownShow();
	}
	countdownStorage() {
		if (this.seconds == 0) {
			this.seconds = 60;
			this.minutes--;
		}
		this.seconds--;
		sessionStorage.setItem("minutes", this.minutes);
		sessionStorage.setItem("seconds", this.seconds);
	}
	countdownShow() {
        document.getElementById("validation-text").innerHTML = "Vélo réservé à la station " + sessionStorage.getItem("stationName") + "<br />au nom de " + localStorage.getItem("prenom") +" "+ localStorage.getItem("nom")+ ".<br /> Temps restant: ";
		document.getElementById("display").innerHTML = this.addZero(this.minutes) + " : " + this.addZero(this.seconds);
		if (this.seconds == 0 && this.minutes == 0) {
			document.getElementById("validation-text").innerHTML = "Désolé, le temps est écoulé. Veuillez réserver à nouveau."
			this.stop();
			sessionStorage.clear();
		}
	}
	addZero(time) {
		if (time < "10") {
			time = "0" + time;
		}
		return time;
	}
	stop(){
		clearInterval(this.interval);		
	}
	showReservation()
	{
		document.getElementById("sidePanel").style.display = "none";
        document.getElementById("canvas").style.display = "none";
        document.getElementById("reservation-valide").style.display = "block";
        document.getElementById("display").style.display = "block";
        document.getElementById("validation-text").style.display = "block";
	}
}