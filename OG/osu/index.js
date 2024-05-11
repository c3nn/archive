// bro contact me if you want some docs 

function id(val){ return document.getElementById(val); }
const d = document,
playfield = id('playfield'),
pfc = playfield.getContext('2d');
var winWidth,
winheight,
mouseX,
mouseY,
scene,
songs = [],
currentSongId,
parallax = 10,
optionsOpen = false,
wasInFullscreen;

function openStartMenu()
{
	setClass('#logoButtonContainer','logoButtonContainer');
	setClass('#logoContainer','logoContainerOut centerY');
	setClass('#topMiniMenu', 'miniMenuOut topMiniMenu');
	setClass('#botMiniMenu', 'miniMenuOut botMiniMenu');
}
function closeStartMenu()
{
	setClass('#logoContainer','centerX centerY');
	setClass('#logoButtonContainer', 'logoButtonContainerIn');
	setClass('#topMiniMenu', 'miniMenu topMiniMenu');
	setClass('#botMiniMenu', 'miniMenu botMiniMenu');
}
function setCookie(cname, cvalue, exdays)
{
	var temp = new Date();
	temp.setTime(temp.getTime() + (exdays*24*60*60*1000));
	var temp2 = "expires="+ temp.toUTCString();
	d.cookie = cname + "=" + cvalue + ";" + temp2 + ";path=/";
}
function getCookie(cname) // W3, more like W-ME... cus i stole the code
{
	var temp = cname + "=";
	var temp2 = decodeURIComponent(d.cookie);
	var temp3 = temp2.split(';');
	for(let i = 0; i <temp3.length; i++) {
		var temp4 = temp3[i];
		while (temp4.charAt(0) == ' '){
			temp4 = temp4.substring(1);
		}
		if (temp4.indexOf(temp) == 0){
			return temp4.substring(temp.length, temp4.length);
		}
	}
	return null;
}
function setClass(cname, cvalue)
{
	d.querySelector(cname).className = cvalue;
}
function errMsg(message)
{
	var newElement = d.createElement('p');
	const newContent = d.createTextNode(message);
	newElement.className = 'errMsg';
	newElement.appendChild(newContent);
	d.querySelector('#errMsgBox').appendChild(newElement);
	setTimeout(() => {
		newElement.remove();
	}, 3000);
}
// * options start
{
function openOptions()
{
	optionsOpen = true;
	d.querySelector('#options').style.width = '57vh';
	d.querySelector('#options').style.opacity = '1';
	d.querySelector('#optionsSidebar').style.display = 'block'
	d.querySelector('#optionsSidebar').style.opacity = '1';
}
function closeOptions()
{
	optionsOpen = false;
	d.querySelector('#options').style.width = '0vh';
	d.querySelector('#options').style.opacity = '0';
	d.querySelector('#optionsSidebar').style.opacity = '0';
	setTimeout(() => {
		d.querySelector('#optionsSidebar').style.display = 'none';
	}, 800);
}
id('fileImport').addEventListener('change', (event) => {
	var fileList = event.target.files;
	for(let i = 0; i < fileList.length; i++){
		importSong(fileList[i]);
	}
});
function importSong(efile)
{
	const reader = new FileReader();
	// console.log(fr.readAsText(efile));
	console.log(efile);
}
}// * options end
function resChange()
{
	playfield.width = window.innerWidth * (4/3);
	playfield.height = window.innerHeight;
	if(window.innerHeight == screen.height && window.innerWidth == screen.width){
		errMsg('Display: borderless window');
		wasInFullscreen = true;
	}
	else if(wasInFullscreen){
		errMsg('Display: window');
		wasInFullscreen = false;
	}
}
window.onresize = resChange;
resChange();
function mouseMove(e)
{
	mouseX = e.offsetX;
	mouseY = e.offsetY;
}
d.addEventListener('mousemove', e => { mouseMove(e); });

function updateScene(sceneName)
{
	if(sceneName){
		scene = sceneName;
		setCookie('lastScene', sceneName, 1)
	}
	function hide(e){ d.getElementById(e).style.display = 'none'; }
	hide('play');
	hide('songSelect');
	hide('start');
	d.getElementById(scene).style.display = 'block';
}

function initSongSelect()
{
	var songEl = id('songScrollCont');
	songEl.innerHTML = '';
	for (let i = 0; i < songs.length; i++) {
		songEl.innerHTML += '<div class="songItem">Test</div>';
	}
}

function init() // brov'
{
	closeOptions();
	d.querySelector('#loadingElement').remove();
	if(getCookie('lastScene')){
		scene = getCookie('lastScene');
	}
	else{
		scene = 'start';
		setCookie('lastScene', 'start', 1);
	}
	updateScene();
}
init();