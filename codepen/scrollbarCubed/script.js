var canvas = document.getElementById('canvas'),
    c = canvas.getContext('2d'),
    windowHeight,
    scrolled,
    docHeight,
    scrollPer;

function render(){
    windowHeight = window.innerHeight;
    scrolled = window.pageYOffset,
    docHeight = Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight,
    document.body.scrollHeight, document.body.offsetHeight),
    scrollPer = scrolled / (docHeight - windowHeight);
    
    canvas.height = windowHeight;
    c.clearRect(0, 0, 10, windowHeight);
    makeScrollBar(0,windowHeight,'#121212',100,'#000000');
    makeScrollBar(scrollPer*windowHeight-scrollPer*100,100,'#e81c1c',50,'#000000');
    makeScrollBar(scrollPer*windowHeight-scrollPer*50,50,'#2de81c',15,'#2d1ce8');
}
window.onresize = function(){ render() };
window.onscroll = function(){ render() };
render();

function makeScrollBar(y,height,bgcolor,thumbHeight,thumbColor){
    // track
    c.beginPath();
    c.fillStyle = bgcolor;
    c.rect(0, y, 10, height);
    c.fill();
    // thumb
    c.beginPath();
    c.fillStyle = thumbColor;
    c.rect(0, y + scrollPer * height - scrollPer * thumbHeight, 10, thumbHeight);
    c.fill();
}

// preview
window.onmousemove = function(){ clearInterval(previewInterval); };
function preview(){
    if(scrollPer == 1){
        clearInterval(previewInterval);
		scrolled = 0;
		setTimeout(() => {
			previewInterval = setInterval(preview, 100)
		}, 1500);
    }
    window.scrollTo({ top: scrolled + 20, behavior: 'smooth' })
}
var previewInterval = setInterval(preview, 100);