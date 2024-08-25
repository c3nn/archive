window.addEventListener('keydown', function(e){
//* shortcuts
if(e.key == 't' && e.altKey == true){
	if(document.querySelector('.header').style.height == '5vh'){
		closeHeader();
	}else{
		openHeader();
	}
}
if(e.key == 'o' && e.altKey == true){
	if(document.querySelector('#settingsCont').style.display == 'flex'){
		closeSettings();
	}else{
		openSettings();
	}
}
if(e.key == 'Home'){
	changeScene('S');
}

console.log(e.key);
}, false);