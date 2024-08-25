import {$,$all,css,getCookie,setCookie,hasCookie} from 'https://c3nn.com/lib/c3nnUtil.js';

/*
	project = {
		assets: [
			{
				name: 'imageNameIDK',
				type: 'image',
				id: 123456,
				rawFile: File,
				data: Data:,
			},
			{
				name: 'vidNameIDK',
				type: 'video',
				id: 123456,
				rawFile: File,
				frameArr: getFramesFromVideoTrackAsDataURLArray, (array of dataURLs)
			},
		],
		elements: [
			
		],
		width: 1920,
		height: 1080,
	}
*/

//* UI Setup

if(hasCookie('openWinNum')){
	css('--openWinNum',Number(getCookie('openWinNum')));
}

var project = {
	assets: [],
	elements: [],
	width: 1920,
	height: 1080
};

var previewCanvas = $('#previewCanvas')

css('--projectWidth',project.width);
css('--projectHeight',project.height);
previewCanvas.width = project.width;
previewCanvas.height = project.height;

$all('#titleBar .windowTab').forEach((element) => {
	element.addEventListener('click', () => {
		css('--openWinNum',element.css('--_num'));
		setCookie('openWinNum',element.css('--_num'));
	});
});

$('#assetsWin .addFilesButton').addEventListener('click', async () => {
	let fileCache = await openFileDialog();
	if(fileCache.type.startsWith('video/')){
		importVideoToAssets(fileCache,await getFramesFromVideoTrackAsDataURLArray(await getVideoTrack(await getFileContentsAsDataURL(fileCache))));
	}else{
		await importImageToAssets(fileCache); // if it doesn't know, it'll fallback to img
	}
	console.log(project.assets);
	refreshAllFileExplorers();
});
$('#assetsWin .refreshButton').addEventListener('click', async () => {
	refreshAllFileExplorers();
});

//* END UI Setup

if( typeof Element.prototype.clearChildren === 'undefined' ) {
		Object.defineProperty(Element.prototype, 'clearChildren', {
		configurable: true,
		enumerable: false,
		value: function() {
			while(this.firstChild) this.removeChild(this.lastChild);
		}
    });
}

function refreshAllFileExplorers(){
	$all('.fileExplorer').forEach(cont => {
		cont.clearChildren();
		project.assets.forEach(async asset => {
			let liCont = document.createElement('li');

			let buttonCont = document.createElement('button');
			if(cont.matches('[data-set-preview]')){
				buttonCont.addEventListener('click', () => {
					previewFileInAssetsWin(asset);
				});
			}
			liCont.appendChild(buttonCont);

			let previewImg = document.createElement('img');
			previewImg.src = (asset.type == 'image'?asset.data:asset.frameArr[0]);
			buttonCont.appendChild(previewImg);

			let nameSpan = document.createElement('span');
			nameSpan.textContent = asset.name;
			buttonCont.appendChild(nameSpan);

			let typeSpan = document.createElement('span');
			typeSpan.textContent = asset.type;
			buttonCont.appendChild(typeSpan);

			// let idSpan = document.createElement('span');
			// idSpan.textContent = asset.id;
			// idSpan.title = 'id, not size'
			// buttonCont.appendChild(idSpan);

			let actionsCont = document.createElement('div');
			actionsCont.className = 'actionsCont';
			liCont.appendChild(actionsCont);

			let deleteButton = document.createElement('button');
			deleteButton.textContent = 'delete';
			deleteButton.className = 'symbol';
			deleteButton.addEventListener('click', () => {
				deleteProjectAsset(asset.id);
			});
			actionsCont.appendChild(deleteButton);

			// if file is broken
			if(asset.rawFile.type == ''){
				typeSpan.textContent = "FILE TYPE NOT RECOGNIZED"
				previewImg.src = '/assets/sad.png';
				liCont.css('background','var(--err-red-bg)')
			}

			cont.appendChild(liCont);
		});
	});
}

function deleteProjectAsset(id){
	project.assets.forEach((asset,index) => {
		if(asset.id == id){
			if (index > -1) { // only splice array when item is found
				project.assets.splice(index, 1);
			}
			refreshAllFileExplorers();
		}
	});
}

function previewFileInAssetsWin(asset){
	let previewCont = $('#assetsWin #previewCont');
	previewCont.clearChildren();
	if(asset.type == 'image'){
		let img = document.createElement('img');
		img.src = asset.data;
		previewCont.appendChild(img);
	}else if(asset.type == 'video'){
		let vid = document.createElement('video');
		vid.src = asset.rawFile;
		previewCont.appendChild(vid);
	}
	$('#assetsWin #propertiesCont').innerHTML = JSON.stringify(asset, null, "<br>");
}

function importVideoToAssets(file,frameArr){
	project.assets.push(
		{
			name: file.name,
			type: 'video',
			id: Math.round(Math.random()*100000),
			rawFile: file,
			frameArr: frameArr
		}
	);
}
async function importImageToAssets(file){
	let dataCache = await getFileContentsAsDataURL(file);

	project.assets.push(
		{
			name: file.name,
			type: 'image',
			id: Math.round(Math.random()*100000),
			rawFile: file,
			data: dataCache,
		}
	);
}

function openFileDialog(){
	let input = document.createElement('input');
	input.type = 'file';
	let promise = new Promise((resolve, reject) => {
		input.onchange = e => {
			let file = e.target.files[0];
			resolve(file);
		}
		input.click();
	});
	return promise;
}

function getFileContentsAsText(file,format = "UTF-8"){
	let reader = new FileReader();
	reader.readAsText(file, format);
	let promise = new Promise((resolve, reject) => {
		reader.onload = (e) => {
			resolve(e.target.result);
		};
		reader.onerror = () => {
			reject("error reading file");
		};
	});
	return promise;
}
function getFileContentsAsDataURL(file){
	let reader = new FileReader();
	reader.readAsDataURL(file);
	let promise = new Promise((resolve, reject) => {
		reader.onload = (e) => {
			resolve(e.target.result);
		};
		reader.onerror = () => {
			reject("error reading file");
		};
	});
	return promise;
}

function createStatusProgressBar(startingPercent = 0){
	let progressBar = document.createElement('div');
	progressBar.className = 'progressBar';
	progressBar.css(`--_progress: ${startingPercent}`);
	let fill = document.createElement('div');
	fill.className = 'fill';
	progressBar.appendChild(fill);
	$('#statusBar #progressBarCont').appendChild(progressBar);
	progressBar.update = (value) => { // use .update() to update it
		this.css(`--_progress: ${value}`);
	};
	return progressBar;
}

$('#testB').onclick = async () => {
	//* tests are separated by spaces

	// let asdf = await openFileDialog();
	// const reader = new FileReader();
	// reader.onload = (e) => {
	// 	console.log(e.target);
	// };
	// reader.readAsDataURL(asdf);

	// let asdf = await openFileDialog();
	// await importImageToAssets(asdf);
	// refreshAllFileExplorers()

	// project.assets.pop();

}

function convertImageToDataURL(img) {
    // Create an empty canvas element
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    let dataURL = canvas.toDataURL("image/png");
	console.log(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""))
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


// toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0')
//   .then(dataUrl => {
//     console.log('RESULT:', dataUrl)
//   })

async function getVideoTrack(src){
	// open as video element
	let videoElement = document.createElement("video");
	videoElement.crossOrigin = "anonymous";
	// videoElement.muted = true;
	videoElement.src = src;
	await videoElement.play();
	let [track] = videoElement.captureStream().getVideoTracks();
	//    /\/\/\ syntax for getting [0] in array btw
	videoElement.onended = () => track.stop();
	return track;
}

function getFramesFromVideoTrackAsDataURLArray(src){
	let promise = new Promise((resolve, reject) => {
		if(window.MediaStreamTrackProcessor){
			var frames = [];
			var track = src;
			var processor = new MediaStreamTrackProcessor(track);
			var reader = processor.readable.getReader();

			readChunk();

			function readChunk() {
				reader.read().then(async ({ done, value }) => {
					if(value){
						frames.push(convertImageToDataURL(await createImageBitmap(value)));
						value.close();
					}
					if (!done) {
						readChunk();
					}else{
						resolve(frames);
					}
				});
			}
		}else{
			let err = "your browser doesn't support this API yet";
			console.error(err);
			reject(err)
		}
	});
	return promise;
}
