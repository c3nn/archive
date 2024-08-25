(function(){
// Remnants of Attraction by e4494s
// https://e4494s.neocities.org/generative-art-gallery#:~:text=Remnants%20of%20Attraction
//

function css(name, val = null){
	let obj = document.querySelector(':root');
	if(val != null){ // sets property
		obj.style.setProperty(name, val);
	}else{ // gets property if val == null
		return getComputedStyle(obj).getPropertyValue(name);
	}
}

function randSign() {
	return Math.round(Math.random()) == 0 ? 1 : -1;
}
function randBetween(min, max) {
	return (Math.random() * (max - min)) + min;
}

var canvas = document.querySelector('#heroBgCanvas')

var ctx = canvas.getContext("2d");

let friction = 0.2;
let numBlackHoles = 25;
let numPoints = 1000;
let minDist = 5;
let minAcceleration = 0.01;
let blackHolePower = 10;
let brightness = 80;
let lineWidth = 1;
let opacity = 0.25;
let edgeSpawning = true;
let stepsPerFrame = 100000;
let spawningVelocity = 4;

function randCanvasEdgePos() {
  let r = Math.floor(Math.random() * 4);
  if (r === 0) return {x: Math.random() * canvas.width, y: 0};
  else if (r === 1) return {x: canvas.width, y: Math.random() * canvas.height};
  else if (r === 2) return {x: Math.random() * canvas.width, y: canvas.height};
  else return {x: 0, y: Math.random() * canvas.height};
}

function Point() {
  let p = randCanvasEdgePos();
  this.x = edgeSpawning ? p.x : Math.random() * canvas.width;
  this.y = edgeSpawning ? p.y : Math.random() * canvas.height;
  let a = Math.random() * Math.PI * 2;
  this.vx = spawningVelocity * Math.cos(a);
  this.vy = spawningVelocity * Math.sin(a);
  this.stopped = false;
  let hue = 20; //! color
  this.color = `hsl(${hue}deg, 100%, ${brightness}%)`;
}
Point.prototype.render = function() {
  let lastX = this.x;
  let lastY = this.y;
  this.x += this.vx;
  this.y += this.vy;
  this.vx *= 1 - friction;
  this.vy *= 1 - friction;
  for (let i = 0; i < blackHoleArray.length; i++) {
    let dx = blackHoleArray[i].x - this.x;
    let dy = blackHoleArray[i].y - this.y;
    let distSq = (dx * dx) + (dy * dy);
    let dist = Math.sqrt(distSq);
    if (dist <= minDist) {
      this.stopped = true;
      this.x = blackHoleArray[i].x;
      this.y = blackHoleArray[i].y;
    }
    let invDist = 1 / dist;
    let angle = Math.atan2(dy, dx);
    let velocity = blackHoleArray[i].powerRatio * blackHolePower * invDist;
    velocity = Math.max(velocity, minAcceleration);
    this.vx += velocity * Math.cos(angle);
    this.vy += velocity * Math.sin(angle);
  }
  ctx.strokeStyle = this.color;
  ctx.lineWidth = lineWidth;
  ctx.globalAlpha = opacity;
  ctx.lineCap = ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(this.x, this.y);
  ctx.stroke();
};
let pointArray = [];
for (let i = 0; i < numPoints; i++) pointArray.push(new Point());

function BlackHole() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.powerRatio = randBetween(0.5, 1);
}
let blackHoleArray = [];
for (let i = 0; i < numBlackHoles; i++) blackHoleArray.push(new BlackHole());

function frame() {
  for (let j = 0; j < stepsPerFrame; j++) {
    for (let i = 0; i < pointArray.length; i++) {
      pointArray[i].render();
      if (pointArray[i].stopped) {
        pointArray[i] = new Point();
      }
    }
  }
}

function reset() {
  ctx.globalAlpha = 1;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  blackHoleArray = [];
  while (blackHoleArray.length < numBlackHoles) blackHoleArray.push(new BlackHole());
  
  pointArray = [];
  pointArray.push(new Point());
}

function draw() {
  numBlackHoles = Math.round(randBetween(25, 50));
  
  reset();
  frame();
}
function resize(){
	let newHeight = Math.max(getComputedStyle(canvas).height.replace('px',''), (css("--Mobile") == "true"?1920:1080)),
		newWidth = Math.max(getComputedStyle(canvas).width.replace('px',''), (css("--Mobile") == "true"?1080:1920));
	if(newWidth > canvas.width || newHeight > canvas.height){
		canvas.width = newWidth;
		canvas.height = newHeight;
		draw();
	}
}
window.addEventListener('resize', resize);
resize();
draw();

})()
