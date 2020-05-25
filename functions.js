let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let canvasW = canvas.width;
let canvasH = canvas.height;

let background = new Image();
background.src = "fondoJuegoComenzar.gif";
let backgroundX = 0;
let backgroundSpeed = 2;

let Bird_Normal = new Image();
Bird_Normal.src = "Bird_Normal.png";
let Bird_Arriba = new Image();
Bird_Arriba.src = "Bird_Arriba.png";
let Bird_Abajo = new Image();
Bird_Abajo.src = "Bird_Abajo.png";
const Birds = [Bird_Normal, Bird_Arriba, Bird_Abajo];
let BirdAct = 2;
let birdSpeed = 5;
let birdX = (canvasW/2)-(canvasW/5);
let birdY = (canvasH/2) - 50;
let actA = false;
let timeOutBirdMovement = 0;

let paddle1 = new Image();
paddle1.src = "paddle2.png";
let paddle = new Image();
paddle.src = "paddle.png";
let timeOutPaddlesDraw = 0;
let paddlesSpeed = 10;
let allPaddles = {
	X: [],
	Y: []
}

document.addEventListener("keydown", function(evt){let code = evt.keyCode; birdMovement(code)});
document.addEventListener("keydown", function(evt){let code = evt.keyCode; pararTodo(code)});

var intervalos = setInterval(mainFunction, 1000/100);

function mainFunction () {
	ctx.drawImage(background, backgroundX, 0);
	ctx.drawImage(background, backgroundX + 1024, 0);

	backgroundX-= backgroundSpeed;
	if (backgroundX < -1024){
		backgroundX = 0;
	}

	birdMovement();
	timeOutPaddlesDraw++;
	if (timeOutPaddlesDraw === 35) {
		drawPaddles();
		timeOutPaddlesDraw = 0;
	}
	paddlesMovement();
	lose();
}

function pararTodo (code) {
	if (code === 71) {
		clearInterval(intervalos);
	} else if (code === 87) {
		intervalos = setInterval(mainFunction, 1000/33);
	}
}

function birdMovement (code = 10) {
	ctx.drawImage(Birds[BirdAct], birdX, birdY, 100, 100);
	if (code === 87 || code === 32 || code === 38 || actA) {
		BirdAct = 1;
		birdY-=birdSpeed;
		actA = true;
		if (code > 10) {
			timeOutBirdMovement = 0;
		}
		timeOutBirdMovement++;
		if (timeOutBirdMovement >= 15) {
			BirdAct = 0;
			birdY+=birdSpeed;
			if (timeOutBirdMovement === 20) {
				timeOutBirdMovement = 0;
				actA = false;
			}
		}
	} else if (!actA && timeOutBirdMovement === 0) {
		BirdAct = 2;
		birdY+=birdSpeed*2;
	}
}

function lose () {
	for (let i = 0; i < allPaddles.X.length; i++) {
		if (birdX === allPaddles.X[i] - 50 && birdY > allPaddles.Y[i]) {
			console.log("Perdiste");
		}
	}
}

function drawPaddles () {
	let paddleY = randomInt(200, 380);
	let paddleX = 1500;
	const newPaddle = new Paddles(paddleX, paddleY);
	newPaddle.addPaddle();
}

function paddlesMovement () {
	for (let i = 0; i < allPaddles.X.length; i++) {
		ctx.drawImage(paddle, allPaddles.X[i], allPaddles.Y[i], 85, 500);
		ctx.drawImage(paddle1, allPaddles.X[i], allPaddles.Y[i]-675, 85, 500);
		allPaddles.X[i]-=paddlesSpeed;
	}
}

class Paddles {
	constructor (X, Y) {
		this.X = X;
		this.Y = Y;
	}
	addPaddle () {
		allPaddles.X.push(this.X);
		allPaddles.Y.push(this.Y);
	}
}

function randomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}