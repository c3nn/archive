var potatoMode = (navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)||window.innerWidth/window.innerHeight < 0.75 ? true : false);
var colors = ['#c71b1b', '#d16e1c', '#c9d61b', '#2ea713', '#106193'];

const date = new Date();
if(date.getMonth() == 5){ // pride month
	colors = ['#ffffff', '#ffafc7', '#73d7ee', '#613915', '#000000', '#e50000', '#ff8d00', '#ffee00', '#028121', '#004cff', '#760088'];
}
else if(date.getMonth() == 11){ // christmas
	colors = ['#ffffff', '#e50000', '#ffffff', '#e50000']
}
else if(date.getMonth() == 9 && date.getDate() == 25){ // haloween
	colors = ['#bb4b00','#222','#bb4b00','#222','#bb4b00','#222']
}
else if(date.getMonth() == 0 && date.getDate() == 24){ // opposite day?
	colors = ['#106193', '#2ea713', '#c9d61b', '#d16e1c', '#c71b1b'];
}