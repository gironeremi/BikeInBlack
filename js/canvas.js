class Canvas{
	constructor(){
		this.canvas = document.getElementById("myCanvas");
		this.ctx = this.canvas.getContext("2d");
		this.painting = false;
		this.check = 0; //permet de confirmer la présence de la signature
		this.listener();
	}
	startPosition(e) {
		this.painting = true;
		this.check = 1;
		this.draw(e);
	}
	finishedPosition() {
		this.painting = false;
		this.ctx.beginPath();
	}
	draw(e) {
		this.canvas.addEventListener("mouseleave", this.finishedPosition.bind(this));
		if (this.painting === false) {
			return;
		}
		this.ctx.lineWidth = 3;
		this.ctx.lineCap = "round" //embout utilsé pour le "dessin"
		this.ctx.lineTo(e.offsetX, e.offsetY);
		this.ctx.stroke(); //commande qui "trace" le dessin
		this.ctx.beginPath();
		this.ctx.moveTo(e.offsetX, e.offsetY);
	}
	clear()	{
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.painting = false;
		this.check = 0;//réinitialisation des données du canvas.
	}
	listener() {
		this.canvas.addEventListener("mousedown", this.startPosition.bind(this));
		this.canvas.addEventListener("mouseup", this.finishedPosition.bind(this));
		this.canvas.addEventListener("mousemove", this.draw.bind(this));
	}
	canvasErreur(){
		document.getElementById("canvas-check").innerHTML = "Veuillez signer!";
	}
	canvasOK(){
		document.getElementById("canvas-check").innerHTML ="";
	}
}