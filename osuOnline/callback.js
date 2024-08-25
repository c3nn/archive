//* Stores functions used often / used for buttons

function SlogoFull(){
	document.querySelector('.SflexCont').style.background = 'none'
	let logoSize = 0.2713,
	logoSizeLoop = setInterval(function(){
		logoSize += 0.1;
		if(logoSize > 0.6){
			clearInterval(logoSizeLoop);
			cssVar('--logoSize', 0.6, '.SlogoCont');
			return;
		}
		cssVar('--logoSize', logoSize, '.SlogoCont');
	}, 20);
	document.querySelectorAll('.SbuttonCont').forEach(function(el){
		el.style.width = '0px';
		el.style.opacity = '0';
	});
}
function SlogoMini(){
	document.querySelector('.SflexCont').style.background = '#323232'
	let logoSize = 0.6,
	logoSizeLoop = setInterval(function(){
		logoSize -= 0.1;
		if(logoSize < 0.2713){
			clearInterval(logoSizeLoop);
			cssVar('--logoSize', 0.2713, '.SlogoCont');
			return;
		}
		cssVar('--logoSize', logoSize, '.SlogoCont');
	}, 20);
	document.querySelectorAll('.SbuttonCont').forEach(function(el){
		el.style.width = 'var(--w)';
		el.style.opacity = '1';	
	});
}

function updateFavicon(color){
	var canvas = document.createElement('canvas');
		canvas.width = 64;canvas.height = 64;
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(32, 32, 30, 0, 2 * Math.PI);
	ctx.fill();
	ctx.strokeStyle = '#ffffff';
	ctx.lineWidth = '2';
	ctx.stroke();
	var link = document.querySelectorAll('#favicon')[0];
        link.href = canvas.toDataURL("image/x-icon");
}

function cssVar(name, val, obj){
	if(val || val == null){
		document.querySelector((obj ? obj : ':root')).style.setProperty(name, val);
	}
	else{
		return getComputedStyle((obj ? obj : ':root')).getPropertyValue(name);
	}
}

function openSettings(){
	let cont = document.querySelector('#settingsCont'),
	sidebar = document.querySelectorAll('.settingsSidebar')[0],
	main = document.querySelectorAll('.settings')[0];
	cont.style.display = 'flex';
	cont.animate({
		opacity: ['0', '1'],
	}, { duration: 400, fill: 'forwards' });
	sidebar.animate({
		left: ['-9.074vh', '0'],
		easing: ['cubic-bezier(.1,0,0,1)']
	}, { duration: 350, fill: 'forwards' });
	main.animate({
		left: ['-52.1296vh', '0'],
		easing: ['cubic-bezier(.1,0,0,1)']
	}, { duration: 500, fill: 'forwards' });
}
function closeSettings(){
	let cont = document.querySelector('#settingsCont'),
	sidebar = document.querySelectorAll('.settingsSidebar')[0],
	main = document.querySelectorAll('.settings')[0];
	cont.animate({
		opacity: ['1', '0']
	}, { duration: 300, fill: 'forwards' });
	sidebar.animate({
		left: ['0', '-9.074vh'],
		easing: ['cubic-bezier(.1,0,0,1)']
	}, { duration: 300, fill: 'forwards' });
	main.animate({
		left: ['0', '-52.1296vh'],
		easing: ['cubic-bezier(.1,0,0,1)']
	}, { duration: 300, fill: 'forwards' });
	setTimeout(function(){ cont.style.display = 'none'; }, 350)
}

function openHeader(){
	document.querySelector('.header').style.height = '5vh';
	let i = 0;
	let loop = setInterval(() => {
		i += 0.1;
		if(i > 5){
			i = 5;
			clearInterval(loop)
		}
		cssVar('--header', i+'vh', null)
	}, 10);
}
function closeHeader(){
	document.querySelector('.header').style.height = '0vh';
	
	let i = 5;
	let loop = setInterval(() => {
		i -= 0.1;
		if(i < 0){
			i = 0;
			clearInterval(loop)
		}
		cssVar('--header', i+'vh', null)
	}, 10);
}

function changeScene(name){
	//!rework
	document.querySelectorAll('#gameWindow > div').forEach(el => {
		el.style.display = 'none';
	})
	let element = document.querySelectorAll('.' + name)[0];
	element.style.display = element.dataset.display;
}