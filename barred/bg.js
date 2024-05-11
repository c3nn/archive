(function(){

if(potatoMode == true){return;}

const can = document.querySelector('.bgCanvas'),
c = can.getContext('2d');
function updateSize(){
	can.width = window.innerWidth;
	can.height = window.innerHeight;
}
window.onresize = updateSize;
updateSize();

const possibleValues = [50.15,50,48,47],
value = possibleValues[Math.floor(Math.random()*possibleValues.length)]

function update(t){
	c.clearRect(0,0,can.width,can.height);
	var x = 0;
	while (x-15 < can.width) {
		function equation(x,t){
			return ((can.height/2)+(Math.sin(x+t/100)*(can.height/6)));
		}
		c.strokeStyle = 'hsl(' + (Math.round(x/5)%360) + ', 50%, 50%)';
		c.lineWidth = 5;
		c.beginPath();
		c.moveTo(x-25,equation(x-25,t));
		c.lineTo(x,equation(x,t));
		c.stroke();
		x += value;
	}
}
var timeFromStart = 0;
var updateInterval = setInterval(() => {
	update(timeFromStart);
	timeFromStart++
}, 10);

})();
