// if you're here to copy this, please write your own code, mine is terrible

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
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
    
    ctx.clearRect(0, 0, 100, 100);
    ctx.lineWidth = 5;
    makeArc('#666666',50,50,40,0, 2 * Math.PI);
    makeArc('#FFFFFF',50,50,40, ((scrollPer-0.1)*2)*Math.PI, (scrollPer*2)*Math.PI)
}
function makeArc(color,one,two,three,four,five){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(one,two,three,four,five); // for the original change four to 0, then uncomment line 13 of css
    ctx.stroke();
}

window.onresize = function(){ render() };
window.onscroll = function(){ render() };
render();

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