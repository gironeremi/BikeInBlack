class Slider{
	constructor (id, slides) {
		this.id = id;
		this.slides = slides;
		this.currentSlide = 0;
		this.listener();
		this.displaySlide();
		this.play();
	}
	displaySlide () {
		if (this.currentSlide < 0) {
			this.currentSlide = this.slides.length -1;
		}
		if (this.currentSlide >= this.slides.length) {
			this.currentSlide = 0;
		}
		this.id.src = this.slides[this.currentSlide][0];
		document.getElementById("slider-text").innerHTML=this.slides[this.currentSlide][1];
	}
	previousSlide() {
		this.currentSlide--;
		this.displaySlide();
	}
	nextSlide() {
		this.currentSlide++;
		this.displaySlide();
	}
	listener() {
		let leftArrow = document.getElementById("left-arrow");
		let rightArrow = document.getElementById("right-arrow");
		let play = document.getElementById("play");
		let pause = document.getElementById("pause");
		pause.addEventListener("click", this.pause.bind(this));
		play.addEventListener("click", this.play.bind(this));
		leftArrow.addEventListener("click", this.previousSlide.bind(this));
		rightArrow.addEventListener("click", this.nextSlide.bind(this));
		document.addEventListener("keydown", function(e) {
			let pressedKey = e.keyCode;
			if (pressedKey === 37) {
				this.previousSlide();
			}
			if (pressedKey === 39) {
				this.nextSlide();
			}
		}.bind(this));
	}
	pause() {
		clearInterval(this.interval);
		//modifier le style pour afficher soit le play, soit le pause
		pause.style.display = "none";
		play.style.display = "block";
	}
	play() {
		this.interval = setInterval (this.nextSlide.bind(this), 5000);
		//et inversement
		play.style.display = "none";
		pause.style.display = "block";
	}
}