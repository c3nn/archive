// scroll-bar
var scrollBar = document.getElementById('scroll'),
    scrolled = 0,
    docHeight = 0,
    windowHeight = 0,
    scrollPer = 0,
    numOfItems = 0,
    scrollPos = 0;

window.onscroll = function(){ render() };
window.onresize = function(){ render() };

function render(){
    scrolled = window.pageYOffset,
    docHeight = Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight,
    document.body.scrollHeight, document.body.offsetHeight),
    windowHeight = window.innerHeight,
    scrollPer = scrolled / (docHeight - windowHeight),
    scrollBar.innerHTML = '',
    numOfItems = Math.round(windowHeight / 26.2),
    scrollPos = scrollPer * numOfItems;
    
    for(let i = 0; i <= numOfItems; i++) {
        if(i > scrollPos - 2 & i < scrollPos + 2){
            scrollBar.innerHTML = scrollBar.innerHTML + '#<br>';
        }else{
            scrollBar.innerHTML = scrollBar.innerHTML + '-<br>';
        }
    }
    return;
}
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