function $(selector){ return document.querySelector(selector); }
const mainCanvas = $('#canvas'),
mainContext = mainCanvas.getContext('2d'),
lightTexture = [
	0,0,0,0, 0,0,0,255, 0,0,0,255, 0,0,0,255, 0,0,0,255, 0,0,0,255, 0,0,0,255, 0,0,0,0,
	0,0,0,255, 0,0,0,255, 255,255,255,255, 255,255,255,255, 255,255,255,255, 255,255,255,255, 0,0,0,255, 0,0,0,255,
	0,0,0,255, 255,255,255,255, 0,0,0,255, 0,0,0,255, 0,0,0,255, 0,0,0,255, 255,255,255,255, 0,0,0,255,
	0,0,0,255, 255,255,255,255, 0,0,0,255, 255,255,255,255, 0,0,0,255, 0,0,0,255, 255,255,255,255, 0,0,0,255,
	0,0,0,255, 255,255,255,255, 0,0,0,255, 0,0,0,255, 255,255,255,255, 0,0,0,255, 255,255,255,255, 0,0,0,255,
	0,0,0,255, 255,255,255,255, 0,0,0,255, 255,255,255,255, 0,0,0,255, 0,0,0,255, 255,255,255,255, 0,0,0,255,
	0,0,0,255, 255,255,255,255, 0,0,0,255, 0,0,0,255, 255,255,255,255, 0,0,0,255, 255,255,255,255, 0,0,0,255,
	0,0,0,255, 255,255,255,255, 0,0,0,255, 255,255,255,255, 0,0,0,255, 0,0,0,255, 255,255,255,255, 0,0,0,255,
	0,0,0,255, 255,255,255,255, 0,0,0,255, 0,0,0,255, 255,255,255,255, 0,0,0,255, 255,255,255,255, 0,0,0,255,
	0,0,0,255, 255,255,255,255, 0,0,0,255, 255,255,255,255, 0,0,0,255, 0,0,0,255, 255,255,255,255, 0,0,0,255,
	0,0,0,255, 255,255,255,255, 0,0,0,255, 0,0,0,255, 255,255,255,255, 0,0,0,255, 255,255,255,255, 0,0,0,255,
	0,0,0,255, 255,255,255,255, 0,0,0,255, 255,255,255,255, 0,0,0,255, 0,0,0,255, 255,255,255,255, 0,0,0,255,
	0,0,0,255, 0,0,0,255, 255,255,255,255, 255,255,255,255, 255,255,255,255, 255,255,255,255, 0,0,0,255, 0,0,0,255,
	0,0,0,0, 0,0,0,255, 255,255,255,255, 255,255,255,255, 255,255,255,255, 255,255,255,255, 0,0,0,255, 0,0,0,0,
	0,0,0,0, 0,0,0,255, 255,255,255,255, 255,255,255,255, 255,255,255,255, 255,255,255,255, 0,0,0,255, 0,0,0,0,
	0,0,0,0, 0,0,0,255, 0,0,0,255, 255,255,255,255, 255,255,255,255, 0,0,0,255, 0,0,0,255, 0,0,0,0,
	0,0,0,0, 0,0,0,0, 0,0,0,255, 0,0,0,255, 0,0,0,255, 0,0,0,255, 0,0,0,0, 0,0,0,0,
];
mainContext.imageSmoothingEnabled = false;

var settings = {};
settings.canvasType = 'base',
settings.cameraX = 10;
settings.cameraY = 10;
settings.cameraZoom = 1;
settings.floorHeight = 1000;
settings.floorColor = {r:4, g:37, b:64};
settings.floorBouncyness = 0.8;
settings.globalLighting = {r:100, g:100, b:100};
settings.background = {r: 30, g: 24, b: 20};
settings.backgroundEnabled = false;
settings.gravity = 1;
settings.mainUiHeight = 40;
settings.mainUiOpeningArea = 0.85;
settings.uiBgColor = '#00000088';
settings.uiAccentColor = '#faebd7';
settings.uiBgOpacity = '0.2';
settings.uiRGBMode = false;
settings.uiTitleSize = '12px';
var framesRendered = 0;
objs = [{
	x: 0,
	y: 0,
	phys: {
		constraints: {
			rotation: 0,
		},
		dynamic: true,
		solid: true,
		xMomentum: 0,
		yMomentum: 0,
		mass: 0,
		gravityScale: 1,
		bouncyness: 1
	},
	vis: {
		visible: true,
		useTexture: true,
		texture: {
			color: [
				0,0,0,0, 		41,94,176,255, 		41,94,176,255, 		0,0,0,0,
				41,94,176,255, 	190,192,199,255, 	12,15,20,255, 		41,94,176,255,
				41,94,176,255, 	12,15,20,255, 		190,192,199,255, 	41,94,176,255,
				0,0,0,0, 		41,94,176,255, 		41,94,176,255, 		0,0,0,0
			],
			normal: [
				0,0,0,0,		87,229,255,255,		152, 231, 255, 255,	0,0,0,0,
				10,142,255,255,	81, 142, 255, 255,	153,128,255,255,	217,141,255,255,
				7,76,255,255,	76,75,255,255,		158,75,255,255,		202,76,255,255,
				0,0,0,0,		70,5,255,255,		125,5,255,255,		0,0,0,0,
			],
			width: 4,
			height: 4,
		},
		mesh: {
			// useBezier: false,
			mesh: [[{x: 1, y: 1},{x: 1, y: 1}]],
			color: {r: 255, g: 255, b: 255},
			borderWidth: 2,
		},
		xOffset: 0, // calculated before scale
		yOffset: 0, // calculated before scale
		scale: 50,
	},
	light: {
		isLight: false,
		color: {r:255, g:100, b:100},
		radialFalloff: 400,
		angularUpperClamp: 45,
		angularLowerClamp: 135,
	},
	func: {
		useFunctions: false,
		renderfunctions: [function(){}], // ran every render tic
		physicsfunctions: [function(){}] // ran every physics tic
	},

	temp:{}
},
{
	x: -500,
	y: -500,
	phys: {
		constraints: {
			rotation: 0,
		},
		dynamic: true,
		solid: true,
		xMomentum: 0,
		yMomentum: 0,
		mass: 0,
		gravityScale: 1,
		bouncyness: 1
	},
	vis: {
		visible: true,
		useTexture: false,
		mesh: {
			// useBezier: false,
			mesh: [[{x: 0, y: 0},{x: 0, y: 3},{x: 3, y: 3}]],
			color: {r: 146, g: 243, b: 76},
			borderWidth: 2,
		},
		xOffset: 0, // calculated before scale
		yOffset: 0, // calculated before scale
		scale: 50,
	},
	light: {
		isLight: false,
	},

	temp:{}
}];

function bezier(points, t) {
	var n = points.length - 1;
	var b = [];
	for (var i = 0; i <= n; i++) {
		b.push({ x: points[i].x, y: points[i].y });
	}
	for (var r = 1; r <= n; r++) {
		for (var i = 0; i <= n - r; i++) {
			b[i].x = (1 - t) * b[i].x + t * b[i+1].x;
			b[i].y = (1 - t) * b[i].y + t * b[i+1].y;
		}
	}
	return { x: b[0].x, y: b[0].y };
}
function graphBezier(points,detail,context,scale = 100){
	for (let i = 0; i < detail; i++) {
		context.beginPath();
		context.strokeStyle = `rgb(255,${(i/detail)*255},${255-(i/detail)*255})`;
		context.moveTo(bezier(points,(i-1)/detail).x*scale,bezier(points,(i-1)/detail).y*scale)
		context.lineTo(bezier(points,i/detail).x*scale,bezier(points,i/detail).y*scale);
		context.stroke();
	}
}
function findBezierY(points, x, precision = 0.0001, searchRangeStart = 0, searchRangeEnd = 0){
	let start = searchRangeStart;
	let end = searchRangeEnd;
	while (end - start > precision) {
		let mid = (start + end) / 2;
		let point = bezier(points,mid);
		if (point.x > x) {
			end = mid;
		} else if (point.x < x) {
			start = mid;
		} else {
			return point.y;
		}
	}
	return bezier(points,start).y;
}
function graphBezierY(points,detail,context,scale = 100, color = "#ffffff"){
	context.strokeStyle = color;
	context.lineWidth = 5;
	context.beginPath();
	for (let i = 0; i < detail; i++) {
		context.lineTo((i/detail)*scale,findBezierY(points,i/detail,0.0001,0,1)*scale);
	}
	context.stroke();
}
function easeIn(percentage){
	return findBezierY(percentage,[{x:0,y:0},{x:1,y:0},{x:1,y:1}]);
}
function easeOut(percentage){
	return findBezierY(percentage,[{x:0,y:0},{x:0,y:1},{x:1,y:1}]);
}
function easeMidStop(percentage){ // works different from other easing functions
	return bezier([{x:0,y:0},{x:0,y:1},{x:1,y:0},{x:1,y:1}],percentage).y;
}
function easeInOut(percentage){
	let curve = bezier([{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}],percentage);
	return curve.y;
}
function drawPixel(x, y, color = '#000000', context, scale = 1){
	context.fillStyle = color;
	context.fillRect(Math.floor(x), Math.floor(y), Math.floor(scale), Math.floor(scale));
}
function getImageDataFromContext(context, width, height, withoutDotData){
	if(withoutDotData == true){ return context.getImageData(0,0,width,height, { willReadFrequently: true }); }
	return context.getImageData(0,0,width,height, { willReadFrequently: true }).data;
}
function getFromImageData(x, y, width, imageData){
	return {
		r: imageData[y * (width * 4) + x * 4],
		g: imageData[(y * (width * 4) + x * 4) + 1],
		b: imageData[(y * (width * 4) + x * 4) + 2],
		a: imageData[(y * (width * 4) + x * 4) + 3]
	};
}
function getFromImageDataI(i, imageData){
	return {
		r: imageData[i*4],
		g: imageData[(i*4)+1],
		b: imageData[(i*4)+2],
		a: imageData[(i*4)+3]
	};
}
function pthag(a,b){
	return Math.sqrt(a*a + b*b);
}
function setURLParam(name,value){
	let params = new URLSearchParams(window.location.search);
	params.set(name,value);
	window.location.search = params.toString();
}
function deleteURLParam(name){
	const params = new URLSearchParams(window.location.search);
	params.delete(name);
	window.location.search = params.toString();
}
function getURLParam(name){
	const params = new URLSearchParams(window.location.search);
	return params.get(name);
}
function hasURLParam(name){
	const params = new URLSearchParams(window.location.search);
	return params.has(name);
}
function setURLHash(value){
	location.hash = value;
}
function getURLHash(){
	if(location.hash == ''){return null;}
	return location.hash.replace('#','');
}
function save(useURLParams){
	if(useURLParams == true){
		setURLParam('settings', JSON.stringify(settings));
		setURLParam('objs', JSON.stringify(objs))
	}else{
		setURLHash(JSON.stringify({settings:settings,objs:objs}));
	}
}
function load(){ //? BUG: Functions not loaded properly; treated as string
	if(getURLHash() != null){
		settings = JSON.parse(decodeURI(getURLHash())).settings;
		objs = JSON.parse(decodeURI(getURLHash())).objs;
	}else if(hasURLParam('settings') == true || hasURLParam('objs') == true){
		settings = JSON.parse(getURLParam('settings'));
		objs = JSON.parse(getURLParam('objs'));
	}
	cssVar('bg-color', settings.uiBgColor);
	cssVar('accent-color', settings.uiAccentColor);
	cssVar('bg-opacity', settings.uiBgOpacity);
}
function clearSave(useURLParams){
	if(useURLParams == true){
		deleteURLParam('settings');
		deleteURLParam('objs');
	}else{
		setURLHash('');
	}
}
function cssVar(name, val = null, obj = ':root'){
	if(val != null){
		document.querySelector(obj).style.setProperty('--' + name, val);
	}
	else{
		return getComputedStyle(obj).getPropertyValue('--' + name);
	}
}

function renderObj(context, obj, camX, camY, camZoom, useNormals = false)
{
	if(obj.vis.useTexture == true){
		let objX = camX + Math.round(obj.x * camZoom),
		objY = camY + Math.random(obj.y * camZoom),
		objZoom = Math.round(obj.vis.scale * camZoom);
		for (let i = 0; i < obj.vis.texture.width*obj.vis.texture.height; i++) {
			let tPix = getFromImageDataI(i,(useNormals == true?obj.vis.texture.normal:obj.vis.texture.color));
			drawPixel(objX + (i%obj.vis.texture.width) * objZoom , objY + Math.floor(i/obj.vis.texture.width) * objZoom, `rgba(${tPix.r}, ${tPix.g}, ${tPix.b}, ${tPix.a})`, context, objZoom);
		}
	}else{
		let objX = camX + obj.x * camZoom,
		objY = camY + obj.y * camZoom,
		objZoom = obj.vis.scale * camZoom;
		obj.vis.mesh.mesh.forEach(face => {
			context.fillStyle = `rgb(${obj.vis.mesh.color.r},${obj.vis.mesh.color.g},${obj.vis.mesh.color.b})`;
			context.beginPath();
			face.forEach(vertex => {
				context.lineTo(objX + vertex.x * objZoom, objY + vertex.y * objZoom);
			});
			context.fill();
		});
	}
}

function renderTic()
{
	mainContext.clearRect(0,0,mainCanvas.width,mainCanvas.height);
	if(settings.backgroundEnabled == true){
		mainContext.fillStyle = `rgb(${settings.background.r},${settings.background.g},${settings.background.b})`;
		mainContext.fillRect(0,0,mainCanvas.width,mainCanvas.height);
	}
	objs.forEach(obj => {
		renderObj(mainContext, obj, settings.cameraX, settings.cameraY, settings.cameraZoom);
	});
}

function startMain(){
	loadingText.innerHTML = 'starting MAIN...';

	if(hasURLParam('dev') == true){
		alert('dev mode detected x3');
		document.querySelector('#devmenu').style.display = 'block';
	}
	if(getURLHash() != null){
		loadingText.innerHTML = 'restoring old session...';
		load();
	}
	
	loadingText.innerHTML = 'starting renderTic...';
	var renderTicInterval = setInterval(() => {
		renderTic();
	}, 10);
}
