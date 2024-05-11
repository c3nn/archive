let url = window.location.href.replace("https://","").replace("http://","").replace("notwikipedia.org/","")
let urlParams = new URLSearchParams(window.location.search) // dev
if((!url.startsWith("wiki/") || url.replace("wiki/","") == "") && !urlParams.has('dev')){ // dev
	window.location.replace("http://notwikipedia.org/404/");
}
url = url.replace("wiki/","")
document.querySelectorAll('.JSPutURL').forEach((element) => {
	element.innerHTML += url;
});
document.querySelectorAll('.JSLinkURL').forEach((element) => {
	element.href = 'https://wikipedia.org/wiki/' + url;
});

console.log(url)
