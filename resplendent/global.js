import { $, $all, css, deleteCookie, hasCookie, setCookie } from "./lib/c3nnUtil.js";
const prefersContrast = window.matchMedia(`(prefers-contrast: more)`) === true || window.matchMedia(`(prefers-contrast: more)`).matches === true;

//* Setup
window.addEventListener('load', (e) => {
	$('#loadingLinesCont').animate(
		[
			{
				// 0%
				easing: 'cubic-bezier(1,.31,.91,.98)',
			},
			{
				// 70%
				filter: 'brightness(1)',
				offset: 0.7,
			},
			{
				// 100%
				filter: 'brightness(1)',
				top: '130%',
			}
		],
		{
			// timing options
			duration: 1000,
		}
	);
	setTimeout(() => {
		$('#loadingLinesCont').remove();
	}, 950);
});
window.addEventListener('scroll', (e) => {
	css('--ScrollY',window.scrollY);
});

let linesCont = $('#linesCont'),
linesHoverCont = $('#linesCont .hoverCont');
// checks every loop and replicates what the data-anim state of #linesCont
$all('#linesCont .line').forEach(element => { 
	element.addEventListener('animationiteration', (e) => {
		element.dataset.anim = linesCont.dataset.anim;
	});
});
linesHoverCont.addEventListener("mouseenter", (e) => {
	linesCont.dataset.anim = "hover";
});
linesHoverCont.addEventListener("mouseleave", (e) => {
	if(linesCont.dataset.anim != 'closed'){
		linesCont.dataset.anim = "";
	}
});
linesHoverCont.addEventListener('click', (e) => {
	let canRun = true;
	$all('#linesCont .line').forEach(element => {
		if(getComputedStyle(element).width == '0px'){
			canRun = false;
		}
	});
	if(canRun == false){ return; }
	
	linesCont.dataset.anim = "closed";
	$('#linesMenuContCont').className = "Open";
	$all('#linesCont .line').forEach(element => {
		element.animate(
			[
				{
					top: getComputedStyle(element).top,
					easing: 'cubic-bezier(.3,1,1,1)',
				},
				{
					// I dont even know ok
					top: ((getComputedStyle(element).top.replace('px','') * 1) + (getComputedStyle(linesCont).height.replace('px','') * 0.4)) + 'px',
				}
			],
			1800
		);
		if(css("--Mobile") == 'true'){
			element.animate(
				[
					{
						width: getComputedStyle(element).width,
						easing: 'cubic-bezier(1,0,.9,.7)',
					},
					{
						width: '0px',
					}
				],
				1800
			);
		}
		element.addEventListener('animationiteration', (e) => {
			// starts negative so it plays animation before page loads and uses --n2 after menu opens
			element.css('--n','var(--n2)');
		}, {once: true});
	});
});
$('#linesMenuClose').addEventListener('click', () => {
	let canRun = true;
	$all('#linesCont .line').forEach(element => {
		if(getComputedStyle(element).width != '0px'){
			canRun = false;
		}
	});
	if(canRun == false){ return; }

	$all('#linesMenuContCont #linesMenuCont .line .miniLine').forEach(element => {
		element.animate(
			[
				{
					width: getComputedStyle(element).width,
					right: getComputedStyle(element).right,
					easing: 'cubic-bezier(1,0,.76,.75)',
				},
				{
					width: "0px",
					right: "0px",
				}
			],
			1000
		);
	});
	$('#linesMenuContCont').className = "Closed";
	linesCont.dataset.anim = '';
	$all('#linesCont .line').forEach(element => {
		element.dataset.anim = '';
	});
});

window.addEventListener('keypress', (e) => {
	// 1-5 for menu options
	if(Number(e.key).betweenOrIs(0,5) && $('#linesMenuContCont').className == 'Open'){
		let num = Number(e.key)
		if(num == 0){
			num = 1;
		}
		$('#linesMenuCont div:nth-child(' + num +') a').click();
		e.preventDefault();
	}
	// M to open/close the menu
	if(e.key == 'm' || e.key == 'M'){
		if($('#linesMenuContCont').className == 'Open'){
			$('#linesMenuClose').click();
		}else{
			$('#linesCont .hoverCont').click();
		}
	}
	if(e.key == "Enter"){ // might be a problem later but idc lol
		document.activeElement.click();
		e.preventDefault();
	}
});

// 🥚
$('#spinStarEgg').addEventListener('contextmenu',(e) => {
	e.preventDefault();
	$('#spinStarEgg').title = 'weeeee!'
	$('#spinStarEgg').animate(
		[
			{
				rotate: '20deg',
				easing: 'cubic-bezier(.3,1,1,1)',
			},
			{
				rotate: '380deg',
			}
		],
		1000
	);
});

let unslantButtons = $all('.accesCont.Unslant input');
function toggleUnslant(){
	if(css('--ItalicFont') != 'Signika Negative'){
		unslantButtons.forEach(e => { e.value = 'ON'; });
		css('--ItalicFont','Signika Negative');
		setCookie('accesUnslant','true');
	}else{
		unslantButtons.forEach(e => { e.value = 'OFF'; });
		css('--ItalicFont','');
		deleteCookie('accesUnslant');
	}
}
unslantButtons.forEach(element => {
	element.addEventListener('click',toggleUnslant);
});
if(hasCookie('accesUnslant') == true){
	toggleUnslant();
}

let contrastButtons = $all('.accesCont.Contrast input');
function toggleContrast(){
	if($(':root').dataset.contrast != "true"){
		contrastButtons.forEach(e => { e.value = 'ON'; });
		$(':root').dataset.contrast = true;
		if(prefersContrast != true){
			setCookie('accesContrast','true');
		}
	}else{
		contrastButtons.forEach(e => { e.value = 'OFF'; });
		delete $(':root').dataset.contrast;
		deleteCookie('accesContrast');
	}
}
contrastButtons.forEach(element => {
	element.addEventListener('click',toggleContrast);
});
if(hasCookie('accesContrast') == true || prefersContrast == true){
	toggleContrast();
}

// backup for browsers w/out CSS nesting (couldn't test but should work)
if (css('--SupportsCSSNesting') != "true"){
    console.error('CSS Nesting check failed; loading backup css...')
	
    let link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'globalNoNestingBackup.css';
    link.media = 'all';
    $('head').appendChild(link);
}
