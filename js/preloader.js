
(function(oG){
	var myLoadQueue=null;
	var tryTimes=10;

	function initLoc(){
		createjs.Sound.alternateExtensions=["mp3"];
		load();
	}

	function load(){
		var myManifest=[];
		myManifest.push({src:oG.model.mainSpriteSrc,id:'mainSprite'});

		myLoadQueue=new createjs.LoadQueue(false);
		myLoadQueue.installPlugin(createjs.Sound);
		myLoadQueue.addEventListener('complete',setupSpriteSheet);
		myLoadQueue.addEventListener('error',gotError);

		myLoadQueue.loadManifest(myManifest,true,oG.model.resFolder);
	}

	function gotError(){
		console.log('Load Error - retrying');
		myLoadQueue.removeEventListener('complete',setupSpriteSheet);
		myLoadQueue.removeEventListener('error',gotError);
		myLoadQueue.destroy();
		myLoadQueue=null;
		tryTimes--;
		if(tryTimes>0){
			load();
		}else{
			oG.view.preloadView.preloadError();
		}
	}

	function setupSpriteSheet(event){
		var mainSheet=new createjs.SpriteSheet({
			images:[myLoadQueue.getResult('mainSprite')],
			frames:[
    [1, 1, 800, 550, 0, 0, 0],
    [803, 1, 99, 21, 0, -13, -7],
    [904, 1, 70, 20, 0, -28, -7],
    [976, 1, 33, 18, 0, -34, -72],
    [976, 21, 30, 30, 0, 0, 0],
    [904, 23, 69, 19, 0, -16, -71],
    [803, 24, 67, 67, 0, 0, 0],
    [872, 24, 20, 21, 0, -21, -7],
    [894, 44, 67, 20, 0, -29, -8],
    [872, 47, 19, 18, 0, -41, -72],
    [963, 53, 44, 20, 0, -41, -8],
    [893, 66, 60, 21, 0, -33, -7],
    [955, 75, 54, 54, 0, 0, 0],
    [872, 67, 18, 19, 0, -42, -71],
    [872, 88, 18, 19, 0, -42, -71],
    [892, 89, 54, 54, 0, 0, 0],
    [948, 131, 53, 19, 0, -24, -71],
    [803, 93, 53, 19, 0, -36, -8],
    [858, 109, 18, 19, 0, -42, -71],
    [803, 114, 52, 19, 0, -25, -71],
    [857, 130, 18, 19, 0, -42, -71],
    [803, 135, 52, 19, 0, -25, -71],
    [877, 145, 51, 20, 0, -37, -8],
    [857, 151, 18, 19, 0, -42, -71],
    [930, 145, 15, 19, 0, -44, -71],
    [803, 156, 50, 25, 0, -5, -5],
    [947, 152, 36, 19, 0, -33, -71],
    [985, 152, 18, 19, 0, -42, -71],
    [877, 167, 36, 19, 0, -33, -71],
    [855, 172, 18, 19, 0, -42, -71],
    [915, 167, 18, 19, 0, -42, -71],
    [803, 183, 36, 19, 0, -33, -71],
    [935, 173, 36, 19, 0, -33, -71],
    [973, 173, 36, 19, 0, -33, -71],
    [875, 188, 36, 19, 0, -33, -71],
    [913, 188, 18, 18, 0, -42, -72],
    [841, 193, 18, 18, 0, -42, -72],
    [803, 204, 35, 19, 0, -33, -71],
    [933, 194, 35, 19, 0, -33, -71],
    [913, 208, 18, 18, 0, -42, -72],
    [970, 194, 35, 19, 0, -33, -71],
    [861, 209, 35, 19, 0, -33, -71],
    [840, 213, 18, 18, 0, -42, -72],
    [803, 225, 35, 19, 0, -33, -71],
    [933, 215, 35, 19, 0, -33, -71],
    [970, 215, 35, 19, 0, -33, -71],
    [898, 228, 18, 18, 0, -42, -72],
    [860, 230, 35, 19, 0, -33, -71],
    [840, 233, 18, 18, 0, -42, -72],
    [803, 246, 35, 19, 0, -33, -71],
    [918, 236, 35, 19, 0, -33, -71],
    [897, 248, 18, 18, 0, -42, -72],
    [860, 251, 35, 19, 0, -33, -71],
    [840, 253, 18, 18, 0, -42, -72],
    [803, 267, 35, 19, 0, -33, -71],
    [955, 236, 35, 19, 0, -33, -71],
    [917, 257, 35, 19, 0, -33, -71],
    [860, 272, 35, 19, 0, -33, -71],
    [803, 288, 35, 19, 0, -33, -71],
    [954, 257, 35, 19, 0, -33, -71],
    [897, 278, 35, 19, 0, -33, -71],
    [840, 293, 35, 19, 0, -33, -71],
    [803, 309, 35, 19, 0, -33, -71],
    [934, 278, 35, 19, 0, -33, -71],
    [971, 278, 35, 19, 0, -33, -71],
    [877, 299, 35, 19, 0, -33, -71],
    [840, 314, 35, 19, 0, -33, -71],
    [803, 330, 35, 19, 0, -33, -71],
    [914, 299, 35, 19, 0, -33, -71],
    [951, 299, 35, 19, 0, -33, -71],
    [877, 320, 35, 19, 0, -33, -71],
    [840, 335, 35, 19, 0, -33, -71],
    [803, 351, 35, 19, 0, -33, -71],
    [914, 320, 35, 19, 0, -33, -71],
    [951, 320, 35, 19, 0, -33, -71],
    [877, 341, 35, 19, 0, -33, -71],
    [840, 356, 35, 19, 0, -33, -71],
    [803, 372, 35, 19, 0, -33, -71],
    [914, 341, 35, 19, 0, -33, -71],
    [951, 341, 35, 19, 0, -33, -71],
    [877, 362, 35, 18, 0, -33, -72],
    [840, 377, 35, 18, 0, -33, -72],
    [803, 393, 35, 18, 0, -33, -72],
    [914, 362, 35, 18, 0, -33, -72],
    [951, 362, 35, 18, 0, -33, -72],
    [877, 382, 35, 18, 0, -33, -72],
    [840, 397, 35, 18, 0, -33, -72],
    [803, 413, 35, 17, 0, -33, -72],
    [914, 382, 35, 16, 0, -33, -73],
    [951, 382, 34, 19, 0, -35, -71],
    [914, 400, 34, 19, 0, -34, -71],
    [877, 402, 34, 19, 0, -33, -71],
    [840, 417, 34, 19, 0, -34, -71],
    [803, 432, 34, 19, 0, -33, -71],
    [950, 403, 34, 18, 0, -33, -72],
    [913, 421, 34, 18, 0, -33, -72],
    [876, 423, 34, 18, 0, -34, -72],
    [839, 438, 34, 18, 0, -33, -72],
    [803, 453, 34, 18, 0, -33, -72],
    [1, 553, 346, 134, 0, -7, -3],
    [1, 689, 248, 106, 0, -1, -2],
    [1, 797, 500, 27, 0, -4, -4],
    [503, 553, 506, 35, 0, -1, 0],
    [251, 689, 286, 102, 0, -6, -11],
    [349, 590, 238, 96, 0, -6, -7],
    [539, 688, 454, 76, 0, -15, -13],
    [539, 766, 372, 42, 0, -14, -10],
    [589, 590, 338, 67, 0, -19, -17]
],
			animations: {
    "back": { "frames": [0] },
    "textChars": { "frames": [1] },
    "textOptions": { "frames": [2] },
    "contentBit58": { "frames": [3] },
    "miniTick": { "frames": [4] },
    "contentBit85": { "frames": [5] },
    "audBut": { "frames": [6] },
    "charMio": { "frames": [7] },
    "textEnglish": { "frames": [8] },
    "contentBit44": { "frames": [9] },
    "textBack": { "frames": [10] },
    "textReview": { "frames": [11] },
    "backBut": { "frames": [12] },
    "contentBit3": { "frames": [13] },
    "contentBit11": { "frames": [14] },
    "settingsBut": { "frames": [15] },
    "contentBit40": { "frames": [16] },
    "textAudio": { "frames": [17] },
    "contentBit20": { "frames": [18] },
    "contentBit15": { "frames": [19] },
    "contentBit22": { "frames": [20] },
    "contentBit84": { "frames": [21] },
    "textAgain": { "frames": [22] },
    "contentBit23": { "frames": [23] },
    "contentBit7": { "frames": [24] },
    "charHan": { "frames": [25] },
    "contentBit35": { "frames": [26] },
    "contentBit24": { "frames": [27] },
    "contentBit49": { "frames": [28] },
    "contentBit43": { "frames": [29] },
    "contentBit45": { "frames": [30] },
    "contentBit69": { "frames": [31] },
    "contentBit70": { "frames": [32] },
    "contentBit71": { "frames": [33] },
    "contentBit79": { "frames": [34] },
    "contentBit1": { "frames": [35] },
    "contentBit2": { "frames": [36] },
    "contentBit5": { "frames": [37] },
    "contentBit9": { "frames": [38] },
    "contentBit6": { "frames": [39] },
    "contentBit10": { "frames": [40] },
    "contentBit12": { "frames": [41] },
    "contentBit16": { "frames": [42] },
    "contentBit13": { "frames": [43] },
    "contentBit14": { "frames": [44] },
    "contentBit19": { "frames": [45] },
    "contentBit21": { "frames": [46] },
    "contentBit25": { "frames": [47] },
    "contentBit41": { "frames": [48] },
    "contentBit26": { "frames": [49] },
    "contentBit27": { "frames": [50] },
    "contentBit42": { "frames": [51] },
    "contentBit30": { "frames": [52] },
    "contentBit46": { "frames": [53] },
    "contentBit31": { "frames": [54] },
    "contentBit33": { "frames": [55] },
    "contentBit36": { "frames": [56] },
    "contentBit37": { "frames": [57] },
    "contentBit38": { "frames": [58] },
    "contentBit39": { "frames": [59] },
    "contentBit47": { "frames": [60] },
    "contentBit52": { "frames": [61] },
    "contentBit53": { "frames": [62] },
    "contentBit54": { "frames": [63] },
    "contentBit55": { "frames": [64] },
    "contentBit56": { "frames": [65] },
    "contentBit61": { "frames": [66] },
    "contentBit62": { "frames": [67] },
    "contentBit63": { "frames": [68] },
    "contentBit65": { "frames": [69] },
    "contentBit67": { "frames": [70] },
    "contentBit68": { "frames": [71] },
    "contentBit72": { "frames": [72] },
    "contentBit73": { "frames": [73] },
    "contentBit74": { "frames": [74] },
    "contentBit75": { "frames": [75] },
    "contentBit76": { "frames": [76] },
    "contentBit77": { "frames": [77] },
    "contentBit80": { "frames": [78] },
    "contentBit82": { "frames": [79] },
    "contentBit17": { "frames": [80] },
    "contentBit18": { "frames": [81] },
    "contentBit32": { "frames": [82] },
    "contentBit34": { "frames": [83] },
    "contentBit59": { "frames": [84] },
    "contentBit64": { "frames": [85] },
    "contentBit78": { "frames": [86] },
    "contentBit57": { "frames": [87] },
    "contentBit51": { "frames": [88] },
    "contentBit4": { "frames": [89] },
    "contentBit8": { "frames": [90] },
    "contentBit29": { "frames": [91] },
    "contentBit50": { "frames": [92] },
    "contentBit83": { "frames": [93] },
    "contentBit28": { "frames": [94] },
    "contentBit48": { "frames": [95] },
    "contentBit60": { "frames": [96] },
    "contentBit66": { "frames": [97] },
    "contentBit81": { "frames": [98] },
    "tarBack": { "frames": [99] },
    "itemBack": { "frames": [100] },
    "countdownFront": { "frames": [101] },
    "countdownBack": { "frames": [102] },
    "title": { "frames": [103] },
    "itemFront": { "frames": [104] },
    "gameOverText": { "frames": [105] },
    "suddenDeath": { "frames": [106] },
    "youWinText": { "frames": [107] }
}
		});

		oG.model.mainSprite=mainSheet;

		myLoadQueue.removeEventListener('complete',setupSpriteSheet);
		myLoadQueue.removeEventListener('error',gotError);
		myLoadQueue.destroy();
		myLoadQueue=null;

		oG.controller.preloadComplete();
	}

	function deitLoc(){
	}

	oG.preloader={init:initLoc,deit:deitLoc};
}(opdGame));
