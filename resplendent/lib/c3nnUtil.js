/* 
* c3nnUtil.js
* 1/15/2023
* Conmann (c3nn.com)
* https://github.com/c3nn/.com/blob/main/lib/c3nnUtil.js
* Contains super useful functions that I sometimes use
* If you somehow find this helpful, you can use if you want just don't expect it to be the same for the rest of time
*/

// quick selector
export const $ = function(selector, searchElement = document){return searchElement.querySelector(selector);};
export const $all = function(selector, searchElement = document){return searchElement.querySelectorAll(selector);};
Element.prototype.$ = function(selector){return $(selector, this);}
Element.prototype.$all = function(selector){return $all(selector, this);}

export function css(name, val = null, options = {resolveToNum: false, num: false, obj: $(':root')}){
	let obj = options.obj;
	if(val != null){ // sets property
		obj.style.setProperty(name, val);
		return 'set value';
	}else{ // gets property if val == null
		let output = getComputedStyle(obj).getPropertyValue(name);
		return (options.resolveToNum == true || options.num == true?Number(output.replace(/[^\d.-]/g, '')):output);
	}
}
Element.prototype.css = function(name, val = null, options = {resolveToNum: false, num: false}){
	let passedOptions = options;
	passedOptions.obj = this;
	return css(name, val, passedOptions);
};
export function attr(name, val = null, options = {obj: $(':root')}){
	let obj = options.obj;
	if(val != null){ // sets property
		obj.setAttribute(name, val);
		return 'set value';
	}else{ // gets property if val == null
		return obj.getAttribute(name);
	}
}
Element.prototype.attr = function(name, val = null, options = {obj: $(':root')}){
	let passedOptions = options;
	passedOptions.obj = this;
	return css(name, val, passedOptions);
}

// Set, get, has, and delete storage types
export function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
export function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return null;
}
export function hasCookie(cname) {
	return (getCookie(cname)?true:false);
}
export function deleteCookie(cname){
	if(!hasCookie(cname)){console.warn("cookie, " + cname + ", not found"); return;}
	setCookie(cname, '', 0);
}
export function setURLParam(name,value){
	let params = new URLSearchParams(window.location.search);
	params.set(name,value);
	window.location.search = params.toString();
}
export function getURLParam(name){
	const params = new URLSearchParams(window.location.search);
	return params.get(name);
}
export function hasURLParam(name){
	const params = new URLSearchParams(window.location.search);
	return params.has(name);
}
export function deleteURLParam(name){
	const params = new URLSearchParams(window.location.search);
	params.delete(name);
	window.location.search = params.toString();
}
export function setURLHash(value){
	location.hash = value;
}
export function getURLHash(){
	if(location.hash == ''){return null;}
	return location.hash.replace('#','');
}
export function hasURLHash(){
	return (getURLHash() == null?false:true)
}
export function deleteURLHash(){
	setURLHash('')
}

// Math
export function pthag(a,b){
	return Math.sqrt(a*a + b*b);
}
export function toDeg(rad){
	return rad * 180/Math.PI;
}
export function toRad(deg){
	return deg * Math.PI/180;
}
Number.prototype.between = function(a, b) {
	var min = Math.min.apply(Math, [a, b]),
		max = Math.max.apply(Math, [a, b]);
	return this > min && this < max;
};
Number.prototype.betweenOrIs = function(a, b) {
	var min = Math.min.apply(Math, [a, b]),
		max = Math.max.apply(Math, [a, b]);
	return this >= min && this <= max;
};

// Exports
export default [
	Element.prototype.css,
	Element.prototype.attr,
	Element.prototype.$,
	Element.prototype.$all,
	Number.prototype.between,
	Number.prototype.betweenOrIs,
];
