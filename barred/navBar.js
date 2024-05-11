(function(){

const height = 0.25,
can = document.querySelector('.navBarCanvas'),
c = can.getContext('2d'),
links = document.querySelector('.links, .links *');
links.style.display = 'none'
var isHoveringLinks = false;
document.querySelector('body, body *').onclick = function(){if(isHoveringLinks == true){isHoveringLinks = false;}else{isHoveringLinks = true;}}
function updateSize(){
	can.width = window.innerWidth;
	can.height = Math.ceil(window.innerHeight * height);
}
window.onresize = updateSize;
updateSize();

function render(aphase, height, onTop){
	const phase = (aphase%(can.width));
	c.clearRect(0,0,can.width,can.height);
	for (let i = colors.length*-1; i < colors.length; i++){
		const element = colors[(i+colors.length)%colors.length];
		c.fillStyle = element;
		c.fillRect(((can.width/colors.length)*i)+phase, (onTop == true?0:can.height-can.height*height), can.width/colors.length, can.height*height);
	}
	c.fill();
}

var phaseNum = 0,
addMomentum = 0,
addHeight = 0,
wasOnTop = false,
updateInterval = setInterval(() => {
	if(wasOnTop == false){
		if(addMomentum > 30){
			addHeight += (addHeight > 0.02?addHeight:0.02) * 0.2;
			if(addHeight > 0.97){
				wasOnTop = true;
				links.style.display = 'block';
			}
		}else{
			addHeight = addHeight * 0.85;
		}
	}
	else{
		if(isHoveringLinks == true){
			addHeight = addHeight * 0.85;
		}else{
			addHeight += (addHeight > 0.02?addHeight:0.02) * 0.2;
			if(addHeight > 0.97){
				wasOnTop = false;
				links.style.display = 'none';
			}
		}
	}
	if(addMomentum > 30){ addMomentum = 30;}
	if(isHoveringLinks == true){
		addMomentum += 5;
	}else{
		addMomentum = addMomentum * 0.97;
	}
	phaseNum += (8+addMomentum)*(can.width/2560);
	render(phaseNum,0.03+addHeight,wasOnTop);
}, 10);
if(potatoMode == false){
	function mouseMoveHandle(event){
		event = event || window.event;
		if (event.pageX == null && event.clientX != null) {
			const eventDoc = (event.target && event.target.ownerDocument) || document,
			doc = eventDoc.documentElement,
			body = eventDoc.body;

			event.pageX = event.clientX +
				(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
				(doc && doc.clientLeft || body && body.clientLeft || 0);
			event.pageY = event.clientY +
				(doc && doc.scrollTop  || body && body.scrollTop  || 0) -
				(doc && doc.clientTop  || body && body.clientTop  || 0 );
		}

		if(event.pageY > window.innerHeight * 0.75){
			isHoveringLinks = true;
		}else{
			isHoveringLinks = false;
		}

	}
	window.onmousemove = mouseMoveHandle;
}

})();
