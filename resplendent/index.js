import { $, $all, css } from "./lib/c3nnUtil.js";

if(css('--SupportsCSSHasSelector') != "true" || css('--SupportsCSSNesting') != "true"){
	$('#enableJS').innerHTML = '( this site uses CSS Baseline 2023 features, please update your browser for the best experience )';
	setTimeout(() => { $('#enableJS').remove(); }, 20000);
}else{
	$('#enableJS').remove();
}

window.addEventListener('scroll', (e) => {
	css('--HeroScrollPer',Math.min(window.scrollY/(window.innerHeight/2),1));
});

$all('.iframeProjShowcase .iframeCont .zoomCont .minus').forEach(element => {
	element.addEventListener('click', (e) => {
		let iframeCont = element.parentElement.parentElement;
		iframeCont.css('--z', Math.min(iframeCont.css('--z',null,{num:true}) + 0.1, 10));
	});
});
$all('.iframeProjShowcase .iframeCont .zoomCont .plus').forEach(element => {
	element.addEventListener('click', (e) => {
		let iframeCont = element.parentElement.parentElement;
		iframeCont.css('--z', Math.max(iframeCont.css('--z',null,{num:true}) - 0.1, 0.2));
	});
});
