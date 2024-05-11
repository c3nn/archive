// const bahnschrift = new FontFace('bahnschrift', 'url(assets/bahnschrift.ttf)');
const loadingText = document.querySelector('#loadingText');

var isGlobalMouseDown = false;
window.addEventListener("mousedown", () => { isGlobalMouseDown = true; });
window.addEventListener("mouseup", () => { isGlobalMouseDown = false; });

// canvas resizing

window.onresize = function(){
	function resizeCanvas(canvas){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	resizeCanvas(mainCanvas);
};
window.onresize();

// mouse movement camera control

var mouseMoveStartX,
mouseMoveStartY,
mouseMoveCamStartX,
mouseMoveCamStartY,
isCanvasMouseDown = false;
mainCanvas.addEventListener("mousedown", (event) => {
	mouseMoveStartX = event.clientX;
	mouseMoveStartY = event.clientY;
	mouseMoveCamStartX = settings.cameraX;
	mouseMoveCamStartY = settings.cameraY;
	isCanvasMouseDown = true;
});
mainCanvas.addEventListener("mouseup", (event) => {
	isCanvasMouseDown = false;
});
mainCanvas.addEventListener("mousemove", (event) => {
	if(isCanvasMouseDown != true){return;}
	settings.cameraX = mouseMoveCamStartX - (mouseMoveStartX - event.clientX);
	settings.cameraY = mouseMoveCamStartY - (mouseMoveStartY - event.clientY);
})
mainCanvas.addEventListener("wheel", (event) => {
	if(event.deltaY > 100 || event.deltaY < -100 || (settings.cameraZoom == 0.02 && event.deltaY >= 0)){return;}
	settings.cameraZoom -= event.deltaY/250 * Math.abs(0-settings.cameraZoom);
	if(settings.cameraZoom < 0.02){
		settings.cameraZoom = 0.02;
	}
}, { passive: true});

// misc.
// function splitResizing(element, isVertical = true, resizeSiblings = false){
// 	let siblingSpace = 0;
// 	for(var i = 0; i < element.children.length; i++){
// 		let child = element.children[i];
// 		if(i+1 == element.children.length){
// 			if(isVertical == true){child.style.height = `${element.clientHeight - siblingSpace}px`;}
// 			else{child.style.width = `${element.clientWidth - siblingSpace}px`;}
// 		}else{
// 			if(resizeSiblings == true){
// 				if(isVertical == true){child.style.height = `${Math.floor(element.clientHeight / element.children.length)}px`;}
// 				else{child.style.width = `${Math.floor(element.clientWidth / element.children.length)}px`;}
// 			}
// 			siblingSpace += (isVertical == true?child.clientHeight:child.clientWidth+5);
// 			// // ! day 0 3am: why?!?!?
// 			// // ! day 1 10:48pm: IDK WHY ME!?!?!?!?
// 			// // ! day 3 10:58am: ---- --. close enough.
// 		}
// 	}
// }

var uiOpen = true;
function closeUI(){
	cssVar('uiHeight','0%');
	uiOpen = false;
}
function openUI(){
	cssVar('uiHeight',`${settings.mainUiHeight}%`);
	uiOpen = true;
}
mainCanvas.addEventListener("mousemove", (event) => {
	let inOpeningArea = (event.clientY > mainCanvas.height * settings.mainUiOpeningArea);
	if(inOpeningArea == false && uiOpen == true && isGlobalMouseDown == false){
		closeUI();
		return;
	}
	if(inOpeningArea == true && isGlobalMouseDown == false){
		openUI();
	}
});

// graphBezierY([{x:0,y:0},{x:0,y:1},{x:1,y:1}],100,uic,200,"#d1001c");
// graphBezier([{x:0,y:0},{x:1,y:0},{x:1,y:1}],100,uic,200);

function startUi(){ // run after webpage loaded
	loadingText.innerHTML = 'starting UI...';
	
	// get all classes that need extra js
	openUI();
	document.querySelector('.mainContainer').style.transition = 'height 0.6s cubic-bezier(0.075, 0.82, 0.165, 1)';
	
	document.querySelectorAll(':is(.horizontalSplit, .verticalSplit)[data-title]').forEach(element => {
		let isHorizontalSplit = element.className.includes('horizontalSplit'),
		el = document.createElement('span');
		el.className = 'data-title';
		el.innerHTML = element.dataset.title;
		element.addEventListener("scroll", () => {
			if(element.scrollTop == 0){
				el.style.width = '100%';
			}else{
				el.style.width = '0%';
			}
        }, { passive: true });
		let DOMel = element.appendChild(el);
		if(element.matches('*:last-child')){return;} // skips if it's the last child

		DOMel.style.cursor = (isHorizontalSplit?"e-resize":"n-resize");
		DOMel.addEventListener("mousedown", () => {
			let startX = window.event.clientX,
			startY = window.event.clientY,
			startWidth = element.clientWidth,
			startHeight = element.clientHeight;
			let mousemoveFunct = function(){
				let newWidth = startWidth + (window.event.clientX - startX),
				newHeight = startHeight + (window.event.clientY - startY);
				if(isHorizontalSplit == true && newWidth > 10){
					element.style.flex = `0 0 ${newWidth}px`;
				}else if(isHorizontalSplit == false && newHeight > 10){
					element.style.flex = `0 0 ${newHeight}px`;
				}
			};
			window.addEventListener("mousemove", mousemoveFunct);
			window.addEventListener("mouseup", () => {
				window.removeEventListener("mousemove", mousemoveFunct);
			}, {once: true});
		});
	});

	closeUI();

	if(settings.uiRGBMode == true){
		let lolCatTimerGG = 0;
		setInterval(function(){
			cssVar('accent-color', `hsl(${lolCatTimerGG},100%,50%)`)
			lolCatTimerGG += 5;
			if(lolCatTimerGG > 360){
				lolCatTimerGG -= 360;
			}
		}, 50)
	}

	loadingText.innerHTML = '';
	setTimeout(function(){
		document.querySelector('#loadingUi').style.height = '0px';
		document.querySelector('#loadingUi').style.opacity = '0';
		setTimeout(function(){
			document.querySelector('#loadingUi').remove();
		}, 5000)
	}, (hasURLParam('skipIntro') == true?0:2500));
}
