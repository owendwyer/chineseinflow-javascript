
var opdLib={
	capitalize:function(){
    		return this.charAt(0).toUpperCase()+this.slice(1);
	},
	
	capitalizeFirst:function(inText){
    		return inText.charAt(0).toUpperCase()+inText.slice(1);
	},

	spacedCapitalize:function(inText){
		 return inText.replace(/(?:^|\s)\S/g,function(a){return a.toUpperCase();});
	},

	removeRightClick:function(){
		//$('body').attr('oncontextmenu','return false');
		document.oncontextmenu=function(){return false;};
	},

	getRandomInteger:function(lim){
		return Math.floor(Math.random()*lim);
	},

	shuffleArray:function(array){
		for(i=array.length-1;i>0;i--){
        		j=Math.floor(Math.random()*(i+1));
        		var temp=array[i];
        		array[i]=array[j];
        		array[j]=temp;
    		}
    		return array;
	},

	invertArray:function(array){
		var invArr=[];
		for(i=0;i<array.length;i++){
			invArr[array[i]]=i;
		}
    		return invArr;
	},

	fadeIn:function($item,$time,$delay){
		$item.alpha=0;
		createjs.Tween.get($item,{override:true}).wait($delay).to({alpha:1},$time);
	},

	fadeOut:function($item,$time,$delay){
		createjs.Tween.get($item,{override:true}).wait($delay).to({alpha:0},$time);
	},

	fadeInOut:function($item,$time1,$delay,$time2){
		$item.alpha=0;
		createjs.Tween.removeTweens($item);
		createjs.Tween.get($item,{override:true}).to({alpha:1},$time1).wait($delay).to({alpha:0},$time2);
	},

	fadeInOutDelayed:function($item,$delay1,$time1,$delay2,$time2){
		$item.alpha=0;
		createjs.Tween.removeTweens($item);
		createjs.Tween.get($item,{override:true}).wait($delay1).to({alpha:1},$time1).wait($delay2).to({alpha:0},$time2);
	},

	arraySameCheck:function(array1,array2){
		var out=true;
		if(array1.length!=array2.length)out=false;
		for(var i=0;i<array1.length;i++){
			if(array1[i]!=array2[i])out=false;
		}
		return out;
	},

	shuffleArrayDifferent:function(array){
		var newArr=[];
		for(var i=0;i<array.length;i++)newArr[i]=array[i];
		do{
			newArr=opdLib.shuffleArray(newArr);
		}while(opdLib.arraySameCheck(newArr,array));
    		return newArr;
	},

	shuffleArrayForceInitial:function(array,initial){
	    	for(var i=array.length-1;i>0;i--){
			var j=Math.floor(Math.random() * (i + 1));
			var temp=array[i];
			array[i]=array[j];
			array[j]=temp;
	    	}
		var pos=0;
		for(i=0;i<array.length;i++){
			if(array[i]===initial){pos=i;}
		}
		var tmp=array[0];
		array[0]=array[pos];
		array[pos]=tmp;
	    	return array;
	},

	shuffleArrayKeepInitial:function(array,initial){
		initial--;
	    	for(var i=array.length-1;i>initial;i--){
			var j=Math.ceil(Math.random()*(i-initial))+initial;
			var temp=array[i];
			array[i]=array[j];
			array[j]=temp;
	    	}
	    	return array;
	},

	shuffleArrayForceFinal:function(array,final){
		var pos=0;
		var i=0;
	    	for(i=array.length-1;i>0;i--){
			var j=Math.floor(Math.random()*(i+1));
			var temp=array[i];
			array[i]=array[j];
			array[j]=temp;
	    	}
		for(i=0;i<array.length;i++){
			if(array[i]===final){pos=i;}
		}
		var tmp=array[array.length-1];
		array[array.length-1]=array[pos];
		array[pos]=tmp;
	    	return array;
	},

	doesArrayContain:function(item,array){
		for(var i=0;i<array.length;i++){
			if(item==array[i])return true;
		}
		return false;
	},

	drawArrow:function(size,color){
		var outShape=new createjs.Shape();
		outShape.graphics.beginFill(color);
		outShape.graphics.arc(0,0,size*0.56,-1,1);
		outShape.graphics.arc(-size,size,size*0.40,1,Math.PI);
		outShape.graphics.arc(-size,-size,size*0.40,Math.PI,-1);
		outShape.graphics.closePath();
		return outShape;
	},

	scaleImage:function(im,maxLen){
		var myRatio=0;
		if(im.image.width>im.image.height){
			myRatio=maxLen/im.image.width;
		}else{
			myRatio=maxLen/im.image.height;
		}
		im.scaleX=myRatio;
		im.scaleY=myRatio;
		im.x=(maxLen-(im.image.width*myRatio))/2;
		im.y=(maxLen-(im.image.height*myRatio))/2;
	},

	dispItem:function($item,$tar,$x,$y){
		$tar.addChild($item);
		$item.x=$x;
		$item.y=$y;
	},

	posItem:function($item,$x,$y){
		$item.x=$x;
		$item.y=$y;
	},

	centerText:function($txt){
		$txt.textBaseline='center';
		$txt.textAlign='center';
	},

	centerItemFromWidth:function($item,$width){
		$item.x=$width/2-$item.image.width/2;
	},

	makeRectangle:function($wid,$hei,$rnd,$col){
		var shape=new createjs.Shape();
		shape.graphics.beginFill($col);
		shape.graphics.drawRoundRect(-$wid/2,-$hei/2,$wid,$hei,$rnd);
		return shape;
	},

	getArrayPosition:function(gArr,gPos){
		var pos=0;
		for(var i=0;i<gArr.length;i++){
			if(gArr[i]===gPos)pos=i;
		}
		return pos;
	}
};

(function(oL){
	oL.timer=function($callback){
		var timeout, started, remaining, callback=$callback, running=false;

		this.start=function($delay){	
			if(running){
				clearTimeout(timeout);
			}
			running=true;
			remaining=$delay;
			timeout=setTimeout(localFunction,remaining);
			started=new Date();
		};

		this.pause=function(){
			if(running){
				clearTimeout(timeout);
				remaining-=new Date()-started;
			}
		};

		this.unpause=function(){
			if(running){
				timeout=setTimeout(localFunction,remaining);
				started=new Date();
			}
		};

		this.clear=function(){		
			if(running){
				clearTimeout(timeout);
				running=false;
			}
		};

		function localFunction(){
			running=false;
			$callback();
		}
	};
}(opdLib));



opdWrapper=(function(){
	var locked=false;
	var orientation=0;
	var aspectRatio=0;
	var canvasRatio=1;
	var orientationChangeCallback=function(){};
	var resizeCallback=function(){};
	var winHei=0;
	var winWid=0;
	var waiting=false;
	var scrollWaiting=false;
	var fullScreen=false;

	var doc=null;
	var docEl=null;
	var cancelFullScreen=null;
	var requestFullScreen=null;

	var waitingTimeout=null;
	var scrollTimeout=null;

	var myCanvas=null;
	var myContainer=null;

	var dimension1=800;
	var dimension2=550;

	var fixedLand=false;

	function makeStageLoc(){
		var stage=new createjs.Stage(myCanvas);
		createjs.Sound.initializeDefaultPlugins();
		stage.enableMouseOver(10);
		stage.snapToPixelEnabled=true;
		stage.mouseMoveOutside=true;
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick",stage);
		return stage;
	}

	function fixOrientationLoc(orien){
		if(orien=='land')fixedLand=true;
	}

	function setupLoc(myCan,myCont){
		myCanvas=myCan;
		myContainer=myCont;
		doc=window.document;
		docEl=document.getElementById(myCanvas);
		cancelFullScreen=doc.exitFullscreen||doc.mozCancelFullScreen||doc.webkitExitFullscreen||doc.msExitFullscreen;
		requestFullScreen=docEl.requestFullscreen||docEl.mozRequestFullScreen||docEl.webkitRequestFullScreen||docEl.msRequestFullscreen;

		setWinDimensions();
		setCanvasOrientation();
		stretchCanvas();
		window.addEventListener('resize',windowResize);

		document.addEventListener('webkitfullscreenchange',changeHandler,false);
		document.addEventListener('mozfullscreenchange',changeHandler,false);
		document.addEventListener('fullscreenchange',changeHandler,false);
		document.addEventListener('MSFullscreenChange',changeHandler,false);

		//setTimeout(function winScroll(){window.scrollTo(0,document.getElementById("myCanvas").offsetTop);},100);
	}

	function alterDimensionsLoc(dim1,dim2){
		dimension1=dim1;
		dimension2=dim2;
		setWinDimensions();
		setCanvasOrientation();
		stretchCanvas();
	}

	function windowScroll(){
		if(!scrollWaiting){
			scrollWaiting=true;
			scrollTimeout=setTimeout(winScroll,700);
		}
	}

	function winScroll(){
		var pageY=window.pageYOffset;
		var rect=document.getElementById(myCanvas).getBoundingClientRect();
		var canY=rect.top+pageY;
		var canMinY=canY-40;
		var canMaxY=canY+40;
		if(pageY<canMaxY&&pageY>canMinY)window.scrollTo(0,canY);
		scrollWaiting=false;
	}

	function setWinDimensions(){
		winHei=window.innerHeight;
		winWid=document.getElementById(myContainer).clientWidth;
		orientation=winWid>winHei?0:1;
		if(fixedLand)orientation=0;
	}

	function setCanvasOrientation(){
		var leCan=document.getElementById(myCanvas);
		if(orientation===0){
			leCan.width=dimension1;
			leCan.height=dimension2;
			aspectRatio=dimension1/dimension2;
		}else{
			leCan.width=dimension2;
			leCan.height=dimension1;
			aspectRatio=dimension2/dimension1;
		}
	}

	function stretchCanvas(){
		var wid,hei=0;
		if(winWid/winHei>aspectRatio){
			hei=winHei;
			wid=hei*aspectRatio;
			window.addEventListener('scroll',windowScroll);
			windowScroll();
		}else{
			wid=winWid;
			hei=wid/aspectRatio;
			window.removeEventListener('scroll',windowScroll);
		}
		if(orientation===0){
			canvasRatio=wid/dimension1;
		}else{
			canvasRatio=wid/dimension2;
		}
		if(!fullScreen){
			document.getElementById(myCanvas).style.width=wid+'px';
			document.getElementById(myCanvas).style.height=hei+'px';
		}else{
//only do this if dimens are near enough - maybe
			document.getElementById(myCanvas).style.width=winWid+'px';
			document.getElementById(myCanvas).style.height=winHei+'px';
		}
	}

	function windowResize(){
		if(!waiting){
			waiting=true;
			waitingTimeout=setTimeout(winResize,500);
		}
	}

	function winResize(){
		if(!locked){
			var ori=orientation;
			setWinDimensions();
			if(orientation!==ori){
				setCanvasOrientation();
				stretchCanvas();
				orientationChangeCallback();
			}else{
				stretchCanvas();
			}
		}
		resizeCallback();
		waiting=false;
	}

	function lockLoc(){
		locked=true;
	}

	function unlockLoc(){
		locked=false;
		setTimeout(windowResize,150);
	}

	function toggleFullLoc(){
		if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
			requestFullScreen.call(docEl);
		}else{
			cancelFullScreen.call(doc);
		}
	}

	function changeHandler(){
		if (doc.fullscreenElement||document.webkitIsFullScreen||document.mozFullScreen||document.msFullscreenElement){
			fullScreen=true;
		}else{
			fullScreen=false;
		}
		scrollWaiting=false;
		clearTimeout(scrollTimeout);
		waiting=true;
		clearTimeout(waitingTimeout);
		waitingTimeout=setTimeout(winResize,300);
	}

	function setOrientationCallbackLoc($callBack){orientationChangeCallback=$callBack;}

	function setResizeCallbackLoc($callBack){resizeCallback=$callBack;}

	function getCanvasRatioLoc(){return canvasRatio;}

	function getOrientationLoc(){return orientation;}

	return{
		setup:setupLoc,
		getCanvasRatio:getCanvasRatioLoc,
		getOrientation:getOrientationLoc,
		setOrientationCallback:setOrientationCallbackLoc,
		setResizeCallback:setResizeCallbackLoc,
		lock:lockLoc,
		unlock:unlockLoc,
		toggleFull:toggleFullLoc,
		makeStage:makeStageLoc,
		alterDimensions:alterDimensionsLoc,
		fixOrientation:fixOrientationLoc
	};
}());



var opdGame={};
opdGame.active=false;
opdGame.Views={};
opdGame.Modules={};

opdGame.init=function(){
	//sometimes the 'DOMContentLoaded' event fires twice on the same page
	if(!opdGame.active){
		opdGame.active=true;
		console.log(opdGame.model.version);

		opdWrapper.setup('myCanvas','containerDiv');
		opdGame.model.orientation=opdWrapper.getOrientation();
		opdGame.model.canvasRatio=opdWrapper.getCanvasRatio();
		opdGame.stage=opdWrapper.makeStage();
		opdGame.view=new opdGame.View();
		opdGame.stage.addChild(opdGame.view);
		opdWrapper.setOrientationCallback(opdGame.view.orientationChange);
		opdWrapper.setResizeCallback(opdGame.view.updateResize);

		if(createjs.BrowserDetect.isIOS)opdGame.model.touchMode=true;
		if(createjs.BrowserDetect.isAndroid)opdGame.model.touchMode=true;

		//if this is set to true, then view will only init when
		//browser url matches model.siteUrl - see controller.init()
		opdGame.model.siteLock=false;

		opdGame.controller.init();
	}
};


(function(oG){//checked
oG.model={
	version:'v4.7',
	orientation:0,
	canvasRatio:1,

	preloadComplete:false,
	mainSprite:null,

	loadTarget:'',
	contentSpriteSheet:null,
	textArray:[],
	pinArray:[],
	contentLim:0,
	contentCode:0,
	contentTitle:'title here',
	audioLoaded:false,

	routineInd:0,
	gameTime:0,
	gameScore:0,
	gameSpeed:1,

	missBool:false,
	misses:0,
	sdMode:false,
	sdStart:false,
	sdCount:0,
	tarView:-1,
	optView:-1,
	selView:-1,

	optPlayAudio:false,
	optShowTimer:true,

	mainSpriteSrc:'mainSprite.png',

	//comment out these and then set values below to match host
	preLoaderImageSrc:'./res/loadingTitle.png',
	resFolder:'./res/',
	imsFolder:'./content/ims/',
	audFolder:'./content/aud/',

	/*preLoaderImageSrc:'https://www.chineseinflow.com/res/loadingTitle.png',
	resFolder:'https://www.chineseinflow.com/res/',
	imsFolder:'https://www.chineseinflow.com/content/ims/',
	audFolder:'https://www.chineseinflow.com/content/aud/',*/

	siteUrlFull:'https://www.chineseinflow.com',
	scoresUrl:'https://www.chineseinflow.com/php/scores_all.php',
	siteUrl:'www.chineseinflow.com',
	scoresTable:'chinese_scores',
	gameType:1,

	siteLock:false,
	touchMode:false
};
}(opdGame));


//this gets the highscore stuff using model.scoresUrl and model.scoresTable
(function(oG){
	var myReq=new XMLHttpRequest();
	var callback=function(jsonArr){};

	function getScoresLoc(getType,playerName,playerLocation){
		myReq=new XMLHttpRequest();
		myReq.addEventListener('readystatechange',gotScores);
		myReq.open('POST',oG.model.scoresUrl,true);
		myReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		var dMoves=0;

		var myVars='name='+playerName;
		myVars+='&local='+playerLocation;
		myVars+='&score='+oG.model.gameScore;
		myVars+='&date='+new Date().getTime();
		myVars+='&time='+oG.model.gameTime;
		myVars+='&moves='+dMoves;
		myVars+='&content='+oG.model.contentCode;
		myVars+='&table='+oG.model.scoresTable;
		myVars+='&inBool='+getType;
		myVars+='&gameType='+oG.model.gameType;

		myReq.send(myVars);
	}

	function gotScores(){
		if(myReq.readyState==4&&myReq.status==200){
			var jsonArr=JSON.parse(myReq.responseText);
			callback(jsonArr);
			myReq.removeEventListener('readystatechange',gotScores);
		}
	}

	function setCallbackLoc(myFun){callback=myFun;}

	oG.scoresModel={
		getScores:getScoresLoc,
		setCallback:setCallbackLoc
	};

}(opdGame));


(function(oG){
	var audFrames=[];

	function getAudFramesLoc($var){
		return audFrames[$var];
	}

//todo
//reduce all these to just have duration
//in contentLoader.js startTime can be worked out from duration
//and id can be made from make on the fly too

	audFrames[0]=[
		{id:"s_0", startTime:0,duration:630},
		{id:"s_1", startTime:630,duration:580},
		{id:"s_2", startTime:1210,duration:600},
		{id:"s_3", startTime:1810,duration:650},
		{id:"s_4", startTime:2460,duration:710},
		{id:"s_5", startTime:3170,duration:680},
		{id:"s_6", startTime:3850,duration:700},
		{id:"s_7", startTime:4550,duration:840},
		{id:"s_8", startTime:5390,duration:990},
		{id:"s_9", startTime:6380,duration:630},
		{id:"s_10", startTime:7010,duration:840},
		{id:"s_11", startTime:7850,duration:940},
		{id:"s_12", startTime:8790,duration:730},
		{id:"s_13", startTime:9520,duration:680},
		{id:"s_14", startTime:10200,duration:970},
		{id:"s_15", startTime:11170,duration:910},
		{id:"s_16", startTime:12080,duration:840},
		{id:"s_17", startTime:12920,duration:780},
		{id:"s_18", startTime:13700,duration:970},
		{id:"s_19", startTime:14670,duration:990},
		{id:"s_20", startTime:15660,duration:760},
		{id:"s_21", startTime:16420,duration:810},
		{id:"s_22", startTime:17230,duration:1020},
		{id:"s_23", startTime:18250,duration:730},
		{id:"s_24", startTime:18980,duration:940},
		{id:"s_25", startTime:19920,duration:760},
		{id:"s_26", startTime:20680,duration:600},
		{id:"s_27", startTime:21280,duration:810},
		{id:"s_28", startTime:22090,duration:780},
		{id:"s_29", startTime:22870,duration:970}
	];

	audFrames[1]=[
		{id:"s_0", startTime:0,duration:550},
		{id:"s_1", startTime:550,duration:580},
		{id:"s_2", startTime:1130,duration:650},
		{id:"s_3", startTime:1780,duration:550},
		{id:"s_4", startTime:2330,duration:810},
		{id:"s_5", startTime:3140,duration:760},
		{id:"s_6", startTime:3900,duration:680},
		{id:"s_7", startTime:4580,duration:630},
		{id:"s_8", startTime:5210,duration:860},
		{id:"s_9", startTime:6070,duration:520},
		{id:"s_10", startTime:6590,duration:650},
		{id:"s_11", startTime:7240,duration:920},
		{id:"s_12", startTime:8160,duration:760},
		{id:"s_13", startTime:8920,duration:650},
		{id:"s_14", startTime:9570,duration:990},
		{id:"s_15", startTime:10560,duration:860},
		{id:"s_16", startTime:11420,duration:860},
		{id:"s_17", startTime:12280,duration:860},
		{id:"s_18", startTime:13140,duration:680},
		{id:"s_19", startTime:13820,duration:630},
		{id:"s_20", startTime:14450,duration:650},
		{id:"s_21", startTime:15100,duration:680},
		{id:"s_22", startTime:15780,duration:890},
		{id:"s_23", startTime:16670,duration:600},
		{id:"s_24", startTime:17270,duration:630},
		{id:"s_25", startTime:17900,duration:940},
		{id:"s_26", startTime:18840,duration:940},
		{id:"s_27", startTime:19780,duration:810},
		{id:"s_28", startTime:20590,duration:920},
		{id:"s_29", startTime:21510,duration:920}
	];

	audFrames[2]=[
		{id:"s_0",startTime:0,duration:990},
		{id:"s_1",startTime:990,duration:550},
		{id:"s_2",startTime:1540,duration:1020},
		{id:"s_3",startTime:2560,duration:1020},
		{id:"s_4",startTime:3580,duration:730},
		{id:"s_5",startTime:4310,duration:630},
		{id:"s_6",startTime:4940,duration:1150},
		{id:"s_7",startTime:6090,duration:650},
		{id:"s_8",startTime:6740,duration:600},
		{id:"s_9",startTime:7340,duration:580},
		{id:"s_10",startTime:7920,duration:780},
		{id:"s_11",startTime:8700,duration:890},
		{id:"s_12",startTime:9590,duration:1120},
		{id:"s_13",startTime:10710,duration:810},
		{id:"s_14",startTime:11520,duration:990},
		{id:"s_15",startTime:12510,duration:1020},
		{id:"s_16",startTime:13530,duration:1050},
		{id:"s_17",startTime:14580,duration:1100},
		{id:"s_18",startTime:15680,duration:890},
		{id:"s_19",startTime:16570,duration:1050},
		{id:"s_20",startTime:17620,duration:730},
		{id:"s_21",startTime:18350,duration:990},
		{id:"s_22",startTime:19340,duration:910},
		{id:"s_23",startTime:20250,duration:920},
		{id:"s_24",startTime:21170,duration:990},
		{id:"s_25",startTime:22160,duration:1360},
		{id:"s_26",startTime:23520,duration:1120},
		{id:"s_27",startTime:24640,duration:1120},
		{id:"s_28",startTime:25760,duration:970},
		{id:"s_29",startTime:26730,duration:1200}
	];

	audFrames[3]=[
		{id:"s_0",startTime:0,duration:1100},
		{id:"s_1",startTime:1100,duration:840},
		{id:"s_2",startTime:1940,duration:890},
		{id:"s_3",startTime:2830,duration:920},
		{id:"s_4",startTime:3750,duration:890},
		{id:"s_5",startTime:4640,duration:1020},
		{id:"s_6",startTime:5660,duration:990},
		{id:"s_7",startTime:6650,duration:970},
		{id:"s_8",startTime:7620,duration:920},
		{id:"s_9",startTime:8540,duration:1200},
		{id:"s_10",startTime:9740,duration:1230},
		{id:"s_11",startTime:10970,duration:940},
		{id:"s_12",startTime:11910,duration:1150},
		{id:"s_13",startTime:13060,duration:1230},
		{id:"s_14",startTime:14290,duration:920},
		{id:"s_15",startTime:15210,duration:1200},
		{id:"s_16",startTime:16410,duration:650},
		{id:"s_17",startTime:17060,duration:890},
		{id:"s_18",startTime:17950,duration:1360},
		{id:"s_19",startTime:19310,duration:1100},
		{id:"s_20",startTime:20410,duration:1020},
		{id:"s_21",startTime:21430,duration:990},
		{id:"s_22",startTime:22420,duration:890},
		{id:"s_23",startTime:23310,duration:1120},
		{id:"s_24",startTime:24430,duration:920},
		{id:"s_25",startTime:25350,duration:680},
		{id:"s_26",startTime:26030,duration:1200},
		{id:"s_27",startTime:27230,duration:1100},
		{id:"s_28",startTime:28330,duration:1230},
		{id:"s_29",startTime:29560,duration:890}
	];

	audFrames[4]=[
		{id:"s_0",startTime:0,duration:810},
		{id:"s_1",startTime:810,duration:1230},
		{id:"s_2",startTime:2040,duration:1100},
		{id:"s_3",startTime:3140,duration:1200},
		{id:"s_4",startTime:4340,duration:1200},
		{id:"s_5",startTime:5540,duration:760},
		{id:"s_6",startTime:6300,duration:1020},
		{id:"s_7",startTime:7320,duration:1020},
		{id:"s_8",startTime:8340,duration:890},
		{id:"s_9",startTime:9230,duration:1230},
		{id:"s_10",startTime:10460,duration:710},
		{id:"s_11",startTime:11170,duration:1100},
		{id:"s_12",startTime:12270,duration:1100},
		{id:"s_13",startTime:13370,duration:1250},
		{id:"s_14",startTime:14620,duration:1310},
		{id:"s_15",startTime:15930,duration:1120},
		{id:"s_16",startTime:17050,duration:810},
		{id:"s_17",startTime:17860,duration:1230},
		{id:"s_18",startTime:19090,duration:680},
		{id:"s_19",startTime:19770,duration:1100},
		{id:"s_20",startTime:20870,duration:1100},
		{id:"s_21",startTime:21970,duration:1100},
		{id:"s_22",startTime:23070,duration:970},
		{id:"s_23",startTime:24040,duration:1100},
		{id:"s_24",startTime:25140,duration:1050},
		{id:"s_25",startTime:26190,duration:1330},
		{id:"s_26",startTime:27520,duration:1360},
		{id:"s_27",startTime:28880,duration:1020},
		{id:"s_28",startTime:29900,duration:1150},
		{id:"s_29",startTime:31050,duration:860}
	];

	audFrames[5]=[
		{id:"s_0",startTime:0,duration:500},
		{id:"s_1",startTime:500,duration:840},
		{id:"s_2",startTime:1340,duration:680},
		{id:"s_3",startTime:2020,duration:840},
		{id:"s_4",startTime:2860,duration:1050},
		{id:"s_5",startTime:3910,duration:940},
		{id:"s_6",startTime:4850,duration:940},
		{id:"s_7",startTime:5790,duration:500},
		{id:"s_8",startTime:6290,duration:780},
		{id:"s_9",startTime:7070,duration:780},
		{id:"s_10",startTime:7850,duration:600},
		{id:"s_11",startTime:8450,duration:710},
		{id:"s_12",startTime:9160,duration:940},
		{id:"s_13",startTime:10100,duration:810},
		{id:"s_14",startTime:10910,duration:580},
		{id:"s_15",startTime:11490,duration:520},
		{id:"s_16",startTime:12010,duration:580},
		{id:"s_17",startTime:12590,duration:920},
		{id:"s_18",startTime:13510,duration:940},
		{id:"s_19",startTime:14450,duration:860},
		{id:"s_20",startTime:15310,duration:860},
		{id:"s_21",startTime:16170,duration:970},
		{id:"s_22",startTime:17140,duration:1100},
		{id:"s_23",startTime:18240,duration:810},
		{id:"s_24",startTime:19050,duration:710},
		{id:"s_25",startTime:19760,duration:920},
		{id:"s_26",startTime:20680,duration:1100},
		{id:"s_27",startTime:21780,duration:840},
		{id:"s_28",startTime:22620,duration:1250},
		{id:"s_29",startTime:23870,duration:940}
	];

	audFrames[6]=[
		{id:"s_0",startTime:0,duration:760},
		{id:"s_1",startTime:760,duration:860},
		{id:"s_2",startTime:1620,duration:840},
		{id:"s_3",startTime:2460,duration:1100},
		{id:"s_4",startTime:3560,duration:630},
		{id:"s_5",startTime:4190,duration:990},
		{id:"s_6",startTime:5180,duration:970},
		{id:"s_7",startTime:6150,duration:1050},
		{id:"s_8",startTime:7200,duration:940},
		{id:"s_9",startTime:8140,duration:550},
		{id:"s_10",startTime:8690,duration:810},
		{id:"s_11",startTime:9500,duration:680},
		{id:"s_12",startTime:10180,duration:550},
		{id:"s_13",startTime:10730,duration:920},
		{id:"s_14",startTime:11650,duration:780},
		{id:"s_15",startTime:12430,duration:840},
		{id:"s_16",startTime:13270,duration:1200},
		{id:"s_17",startTime:14470,duration:1020},
		{id:"s_18",startTime:15490,duration:1180},
		{id:"s_19",startTime:16670,duration:500},
		{id:"s_20",startTime:17170,duration:600},
		{id:"s_21",startTime:17770,duration:990},
		{id:"s_22",startTime:18760,duration:600},
		{id:"s_23",startTime:19360,duration:920},
		{id:"s_24",startTime:20280,duration:730},
		{id:"s_25",startTime:21010,duration:990},
		{id:"s_26",startTime:22000,duration:550},
		{id:"s_27",startTime:22550,duration:680},
		{id:"s_28",startTime:23230,duration:730},
		{id:"s_29",startTime:23960,duration:1200}
	];

	audFrames[7]=[
		{id:"s_0",startTime:0,duration:780},
		{id:"s_1",startTime:780,duration:580},
		{id:"s_2",startTime:1360,duration:730},
		{id:"s_3",startTime:2090,duration:860},
		{id:"s_4",startTime:2950,duration:630},
		{id:"s_5",startTime:3580,duration:990},
		{id:"s_6",startTime:4570,duration:1120},
		{id:"s_7",startTime:5690,duration:500},
		{id:"s_8",startTime:6190,duration:520},
		{id:"s_9",startTime:6710,duration:890},
		{id:"s_10",startTime:7600,duration:920},
		{id:"s_11",startTime:8520,duration:810},
		{id:"s_12",startTime:9330,duration:520},
		{id:"s_13",startTime:9850,duration:550},
		{id:"s_14",startTime:10400,duration:550},
		{id:"s_15",startTime:10950,duration:840},
		{id:"s_16",startTime:11790,duration:580},
		{id:"s_17",startTime:12370,duration:630},
		{id:"s_18",startTime:13000,duration:710},
		{id:"s_19",startTime:13710,duration:650},
		{id:"s_20",startTime:14360,duration:780},
		{id:"s_21",startTime:15140,duration:920},
		{id:"s_22",startTime:16060,duration:680},
		{id:"s_23",startTime:16740,duration:1180},
		{id:"s_24",startTime:17920,duration:710},
		{id:"s_25",startTime:18630,duration:680},
		{id:"s_26",startTime:19310,duration:780},
		{id:"s_27",startTime:20090,duration:940},
		{id:"s_28",startTime:21030,duration:710},
		{id:"s_29",startTime:21740,duration:890}
	];

	audFrames[8]=[
		{id:"s_0",startTime:0,duration:890},
		{id:"s_1",startTime:890,duration:550},
		{id:"s_2",startTime:1440,duration:1490},
		{id:"s_3",startTime:2930,duration:600},
		{id:"s_4",startTime:3530,duration:920},
		{id:"s_5",startTime:4450,duration:1020},
		{id:"s_6",startTime:5470,duration:940},
		{id:"s_7",startTime:6410,duration:1020},
		{id:"s_8",startTime:7430,duration:580},
		{id:"s_9",startTime:8010,duration:680},
		{id:"s_10",startTime:8690,duration:680},
		{id:"s_11",startTime:9370,duration:550},
		{id:"s_12",startTime:9920,duration:760},
		{id:"s_13",startTime:10680,duration:550},
		{id:"s_14",startTime:11230,duration:1050},
		{id:"s_15",startTime:12280,duration:1180},
		{id:"s_16",startTime:13460,duration:1300},
		{id:"s_17",startTime:14760,duration:1150},
		{id:"s_18",startTime:15910,duration:780},
		{id:"s_19",startTime:16690,duration:890},
		{id:"s_20",startTime:17580,duration:600},
		{id:"s_21",startTime:18180,duration:1230},
		{id:"s_22",startTime:19410,duration:760},
		{id:"s_23",startTime:20170,duration:1020},
		{id:"s_24",startTime:21190,duration:990},
		{id:"s_25",startTime:22180,duration:1050},
		{id:"s_26",startTime:23230,duration:810},
		{id:"s_27",startTime:24040,duration:990},
		{id:"s_28",startTime:25030,duration:760},
		{id:"s_29",startTime:25790,duration:580}
	];

	audFrames[9]=[
		{id:"s_0",startTime:0,duration:890},
		{id:"s_1",startTime:890,duration:550},
		{id:"s_2",startTime:1440,duration:1020},
		{id:"s_3",startTime:2460,duration:920},
		{id:"s_4",startTime:3380,duration:550},
		{id:"s_5",startTime:3930,duration:840},
		{id:"s_6",startTime:4770,duration:1120},
		{id:"s_7",startTime:5890,duration:1120},
		{id:"s_8",startTime:7010,duration:730},
		{id:"s_9",startTime:7740,duration:840},
		{id:"s_10",startTime:8580,duration:710},
		{id:"s_11",startTime:9290,duration:520},
		{id:"s_12",startTime:9810,duration:810},
		{id:"s_13",startTime:10620,duration:550},
		{id:"s_14",startTime:11170,duration:580},
		{id:"s_15",startTime:11750,duration:730},
		{id:"s_16",startTime:12480,duration:710},
		{id:"s_17",startTime:13190,duration:760},
		{id:"s_18",startTime:13950,duration:810},
		{id:"s_19",startTime:14760,duration:840},
		{id:"s_20",startTime:15600,duration:1310},
		{id:"s_21",startTime:16910,duration:760},
		{id:"s_22",startTime:17670,duration:990},
		{id:"s_23",startTime:18660,duration:1050},
		{id:"s_24",startTime:19710,duration:710},
		{id:"s_25",startTime:20420,duration:1180},
		{id:"s_26",startTime:21600,duration:920},
		{id:"s_27",startTime:22520,duration:890},
		{id:"s_28",startTime:23410,duration:780},
		{id:"s_29",startTime:24190,duration:920}
	];

	audFrames[10]=[
		{id:"s_0",startTime:0,duration:1020},
		{id:"s_1",startTime:1020,duration:890},
		{id:"s_2",startTime:1910,duration:840},
		{id:"s_3",startTime:2750,duration:1070},
		{id:"s_4",startTime:3820,duration:920},
		{id:"s_5",startTime:4740,duration:920},
		{id:"s_6",startTime:5660,duration:710},
		{id:"s_7",startTime:6370,duration:810},
		{id:"s_8",startTime:7180,duration:1200},
		{id:"s_9",startTime:8380,duration:1230},
		{id:"s_10",startTime:9610,duration:1150},
		{id:"s_11",startTime:10760,duration:840},
		{id:"s_12",startTime:11600,duration:1020},
		{id:"s_13",startTime:12620,duration:710},
		{id:"s_14",startTime:13330,duration:1050},
		{id:"s_15",startTime:14380,duration:1020},
		{id:"s_16",startTime:15400,duration:840},
		{id:"s_17",startTime:16240,duration:970},
		{id:"s_18",startTime:17210,duration:1440},
		{id:"s_19",startTime:18650,duration:630},
		{id:"s_20",startTime:19280,duration:1020},
		{id:"s_21",startTime:20300,duration:760},
		{id:"s_22",startTime:21060,duration:780},
		{id:"s_23",startTime:21840,duration:840},
		{id:"s_24",startTime:22680,duration:1100},
		{id:"s_25",startTime:23780,duration:840},
		{id:"s_26",startTime:24620,duration:1050},
		{id:"s_27",startTime:25670,duration:630},
		{id:"s_28",startTime:26300,duration:990},
		{id:"s_29",startTime:27290,duration:940}
	];

	audFrames[11]=[
		{id:"s_0",startTime:0,duration:840},
		{id:"s_1",startTime:840,duration:710},
		{id:"s_2",startTime:1550,duration:600},
		{id:"s_3",startTime:2150,duration:990},
		{id:"s_4",startTime:3140,duration:920},
		{id:"s_5",startTime:4060,duration:890},
		{id:"s_6",startTime:4950,duration:840},
		{id:"s_7",startTime:5790,duration:1100},
		{id:"s_8",startTime:6890,duration:1100},
		{id:"s_9",startTime:7990,duration:1020},
		{id:"s_10",startTime:9010,duration:760},
		{id:"s_11",startTime:9770,duration:1230},
		{id:"s_12",startTime:11000,duration:1020},
		{id:"s_13",startTime:12020,duration:890},
		{id:"s_14",startTime:12910,duration:890},
		{id:"s_15",startTime:13800,duration:970},
		{id:"s_16",startTime:14770,duration:1120},
		{id:"s_17",startTime:15890,duration:1050},
		{id:"s_18",startTime:16940,duration:1200},
		{id:"s_19",startTime:18140,duration:1070},
		{id:"s_20",startTime:19210,duration:970},
		{id:"s_21",startTime:20180,duration:1050},
		{id:"s_22",startTime:21230,duration:600},
		{id:"s_23",startTime:21830,duration:1150},
		{id:"s_24",startTime:22980,duration:920},
		{id:"s_25",startTime:23900,duration:1100},
		{id:"s_26",startTime:25000,duration:1100},
		{id:"s_27",startTime:26100,duration:920},
		{id:"s_28",startTime:27020,duration:1070},
		{id:"s_29",startTime:28090,duration:1050}
	];

	audFrames[12]=[
		{id:"s_0",startTime:0,duration:970},
		{id:"s_1",startTime:970,duration:1100},
		{id:"s_2",startTime:2070,duration:940},
		{id:"s_3",startTime:3010,duration:1070},
		{id:"s_4",startTime:4080,duration:970},
		{id:"s_5",startTime:5050,duration:710},
		{id:"s_6",startTime:5760,duration:1050},
		{id:"s_7",startTime:6810,duration:1200},
		{id:"s_8",startTime:8010,duration:1200},
		{id:"s_9",startTime:9210,duration:650},
		{id:"s_10",startTime:9860,duration:1250},
		{id:"s_11",startTime:11110,duration:1230},
		{id:"s_12",startTime:12340,duration:1100},
		{id:"s_13",startTime:13440,duration:840},
		{id:"s_14",startTime:14280,duration:1200},
		{id:"s_15",startTime:15480,duration:780},
		{id:"s_16",startTime:16260,duration:1020},
		{id:"s_17",startTime:17280,duration:1390},
		{id:"s_18",startTime:18670,duration:1280},
		{id:"s_19",startTime:19950,duration:1050},
		{id:"s_20",startTime:21000,duration:1120},
		{id:"s_21",startTime:22120,duration:1070},
		{id:"s_22",startTime:23190,duration:810},
		{id:"s_23",startTime:24000,duration:1100},
		{id:"s_24",startTime:25100,duration:860},
		{id:"s_25",startTime:25960,duration:1120},
		{id:"s_26",startTime:27080,duration:780},
		{id:"s_27",startTime:27860,duration:940},
		{id:"s_28",startTime:28800,duration:1180},
		{id:"s_29",startTime:29980,duration:970}
	];

	audFrames[13]=[
		{id:"s_0",startTime:0,duration:780},
		{id:"s_1",startTime:780,duration:1180},
		{id:"s_2",startTime:1960,duration:1390},
		{id:"s_3",startTime:3350,duration:1230},
		{id:"s_4",startTime:4580,duration:1120},
		{id:"s_5",startTime:5700,duration:1150},
		{id:"s_6",startTime:6850,duration:1390},
		{id:"s_7",startTime:8240,duration:920},
		{id:"s_8",startTime:9160,duration:1050},
		{id:"s_9",startTime:10210,duration:1050},
		{id:"s_10",startTime:11260,duration:680},
		{id:"s_11",startTime:11940,duration:680},
		{id:"s_12",startTime:12620,duration:1120},
		{id:"s_13",startTime:13740,duration:1070},
		{id:"s_14",startTime:14810,duration:1120},
		{id:"s_15",startTime:15930,duration:1070},
		{id:"s_16",startTime:17000,duration:1280},
		{id:"s_17",startTime:18280,duration:1150},
		{id:"s_18",startTime:19430,duration:1250},
		{id:"s_19",startTime:20680,duration:940},
		{id:"s_20",startTime:21620,duration:1150},
		{id:"s_21",startTime:22770,duration:1570},
		{id:"s_22",startTime:24340,duration:840},
		{id:"s_23",startTime:25180,duration:1150},
		{id:"s_24",startTime:26330,duration:990},
		{id:"s_25",startTime:27320,duration:940},
		{id:"s_26",startTime:28260,duration:1020},
		{id:"s_27",startTime:29280,duration:1460},
		{id:"s_28",startTime:30740,duration:1230},
		{id:"s_29",startTime:31970,duration:1230}
	];

	audFrames[14]=[
		{id:"s_0", startTime:0,duration:760},
		{id:"s_1", startTime:760,duration:1020},
		{id:"s_2", startTime:1780,duration:1100},
		{id:"s_3", startTime:2880,duration:760},
		{id:"s_4", startTime:3640,duration:680},
		{id:"s_5", startTime:4320,duration:580},
		{id:"s_6", startTime:4900,duration:1280},
		{id:"s_7", startTime:6180,duration:990},
		{id:"s_8", startTime:7170,duration:1230},
		{id:"s_9", startTime:8400,duration:1020},
		{id:"s_10", startTime:9420,duration:1070},
		{id:"s_11", startTime:10490,duration:1100},
		{id:"s_12", startTime:11590,duration:990},
		{id:"s_13", startTime:12580,duration:1120},
		{id:"s_14", startTime:13700,duration:1150},
		{id:"s_15", startTime:14850,duration:1100},
		{id:"s_16", startTime:15950,duration:1200},
		{id:"s_17", startTime:17150,duration:760},
		{id:"s_18", startTime:17910,duration:1050},
		{id:"s_19", startTime:18960,duration:1100},
		{id:"s_20", startTime:20060,duration:1100},
		{id:"s_21", startTime:21160,duration:760},
		{id:"s_22", startTime:21920,duration:1050},
		{id:"s_23", startTime:22970,duration:890},
		{id:"s_24", startTime:23860,duration:940},
		{id:"s_25", startTime:24800,duration:1150},
		{id:"s_26", startTime:25950,duration:1250},
		{id:"s_27", startTime:27200,duration:940},
		{id:"s_28", startTime:28140,duration:1150},
		{id:"s_29", startTime:29290,duration:1050}
	];

	audFrames[15]=[
		{id:"s_0",startTime:0,duration:810},
		{id:"s_1",startTime:810,duration:860},
		{id:"s_2",startTime:1670,duration:860},
		{id:"s_3",startTime:2530,duration:1120},
		{id:"s_4",startTime:3650,duration:760},
		{id:"s_5",startTime:4410,duration:1230},
		{id:"s_6",startTime:5640,duration:1330},
		{id:"s_7",startTime:6970,duration:1360},
		{id:"s_8",startTime:8330,duration:780},
		{id:"s_9",startTime:9110,duration:710},
		{id:"s_10",startTime:9820,duration:1180},
		{id:"s_11",startTime:11000,duration:780},
		{id:"s_12",startTime:11780,duration:780},
		{id:"s_13",startTime:12560,duration:860},
		{id:"s_14",startTime:13420,duration:1330},
		{id:"s_15",startTime:14750,duration:760},
		{id:"s_16",startTime:15510,duration:1020},
		{id:"s_17",startTime:16530,duration:1050},
		{id:"s_18",startTime:17580,duration:1120},
		{id:"s_19",startTime:18700,duration:1020},
		{id:"s_20",startTime:19720,duration:990},
		{id:"s_21",startTime:20710,duration:710},
		{id:"s_22",startTime:21420,duration:1050},
		{id:"s_23",startTime:22470,duration:1020},
		{id:"s_24",startTime:23490,duration:1180},
		{id:"s_25",startTime:24670,duration:890},
		{id:"s_26",startTime:25560,duration:1050},
		{id:"s_27",startTime:26610,duration:650},
		{id:"s_28",startTime:27260,duration:1020},
		{id:"s_29",startTime:28280,duration:1120}
	];

	audFrames[16]=[
		{id:"s_0",startTime:0,duration:1050},
		{id:"s_1",startTime:1050,duration:1050},
		{id:"s_2",startTime:2100,duration:970},
		{id:"s_3",startTime:3070,duration:1100},
		{id:"s_4",startTime:4170,duration:1180},
		{id:"s_5",startTime:5350,duration:1050},
		{id:"s_6",startTime:6400,duration:1390},
		{id:"s_7",startTime:7790,duration:1280},
		{id:"s_8",startTime:9070,duration:1280},
		{id:"s_9",startTime:10350,duration:1330},
		{id:"s_10",startTime:11680,duration:1070},
		{id:"s_11",startTime:12750,duration:970},
		{id:"s_12",startTime:13720,duration:780},
		{id:"s_13",startTime:14500,duration:1150},
		{id:"s_14",startTime:15650,duration:650},
		{id:"s_15",startTime:16300,duration:860},
		{id:"s_16",startTime:17160,duration:1230},
		{id:"s_17",startTime:18390,duration:1100},
		{id:"s_18",startTime:19490,duration:1100},
		{id:"s_19",startTime:20590,duration:970},
		{id:"s_20",startTime:21560,duration:1230},
		{id:"s_21",startTime:22790,duration:1250},
		{id:"s_22",startTime:24040,duration:1230},
		{id:"s_23",startTime:25270,duration:1250},
		{id:"s_24",startTime:26520,duration:890},
		{id:"s_25",startTime:27410,duration:1050},
		{id:"s_26",startTime:28460,duration:1200},
		{id:"s_27",startTime:29660,duration:1180},
		{id:"s_28",startTime:30840,duration:1120},
		{id:"s_29",startTime:31960,duration:920}
	];

	audFrames[17]=[
		{id:"s_0",startTime:0,duration:1120},
		{id:"s_1",startTime:1120,duration:1050},
		{id:"s_2",startTime:2170,duration:810},
		{id:"s_3",startTime:2980,duration:1020},
		{id:"s_4",startTime:4000,duration:1280},
		{id:"s_5",startTime:5280,duration:1280},
		{id:"s_6",startTime:6560,duration:1230},
		{id:"s_7",startTime:7790,duration:990},
		{id:"s_8",startTime:8780,duration:1280},
		{id:"s_9",startTime:10060,duration:1100},
		{id:"s_10",startTime:11160,duration:1100},
		{id:"s_11",startTime:12260,duration:1180},
		{id:"s_12",startTime:13440,duration:1230},
		{id:"s_13",startTime:14670,duration:990},
		{id:"s_14",startTime:15660,duration:970},
		{id:"s_15",startTime:16630,duration:940},
		{id:"s_16",startTime:17570,duration:1150},
		{id:"s_17",startTime:18720,duration:970},
		{id:"s_18",startTime:19690,duration:1150},
		{id:"s_19",startTime:20840,duration:1330},
		{id:"s_20",startTime:22170,duration:1150},
		{id:"s_21",startTime:23320,duration:1120},
		{id:"s_22",startTime:24440,duration:1200},
		{id:"s_23",startTime:25640,duration:1180},
		{id:"s_24",startTime:26820,duration:810},
		{id:"s_25",startTime:27630,duration:1250},
		{id:"s_26",startTime:28880,duration:1200},
		{id:"s_27",startTime:30080,duration:1180},
		{id:"s_28",startTime:31260,duration:1200},
		{id:"s_29",startTime:32460,duration:1280}
	];

	audFrames[18]=[
		{id:"s_0",startTime:0,duration:810},
		{id:"s_1",startTime:810,duration:1180},
		{id:"s_2",startTime:1990,duration:1180},
		{id:"s_3",startTime:3170,duration:1200},
		{id:"s_4",startTime:4370,duration:1050},
		{id:"s_5",startTime:5420,duration:940},
		{id:"s_6",startTime:6360,duration:1250},
		{id:"s_7",startTime:7610,duration:1250},
		{id:"s_8",startTime:8860,duration:780},
		{id:"s_9",startTime:9640,duration:760},
		{id:"s_10",startTime:10400,duration:1100},
		{id:"s_11",startTime:11500,duration:1150},
		{id:"s_12",startTime:12650,duration:990},
		{id:"s_13",startTime:13640,duration:1310},
		{id:"s_14",startTime:14950,duration:650},
		{id:"s_15",startTime:15600,duration:1200},
		{id:"s_16",startTime:16800,duration:1020},
		{id:"s_17",startTime:17820,duration:990},
		{id:"s_18",startTime:18810,duration:1020},
		{id:"s_19",startTime:19830,duration:970},
		{id:"s_20",startTime:20800,duration:1020},
		{id:"s_21",startTime:21820,duration:890},
		{id:"s_22",startTime:22710,duration:1070},
		{id:"s_23",startTime:23780,duration:1100},
		{id:"s_24",startTime:24880,duration:970},
		{id:"s_25",startTime:25850,duration:990},
		{id:"s_26",startTime:26840,duration:780},
		{id:"s_27",startTime:27620,duration:1390},
		{id:"s_28",startTime:29010,duration:1200},
		{id:"s_29",startTime:30210,duration:1120}
	];

	audFrames[19]=[
		{id:"s_0",startTime:0,duration:1250},
		{id:"s_1",startTime:1250,duration:1100},
		{id:"s_2",startTime:2350,duration:1020},
		{id:"s_3",startTime:3370,duration:1250},
		{id:"s_4",startTime:4620,duration:1200},
		{id:"s_5",startTime:5820,duration:990},
		{id:"s_6",startTime:6810,duration:1410},
		{id:"s_7",startTime:8220,duration:1120},
		{id:"s_8",startTime:9340,duration:1230},
		{id:"s_9",startTime:10570,duration:890},
		{id:"s_10",startTime:11460,duration:890},
		{id:"s_11",startTime:12350,duration:1200},
		{id:"s_12",startTime:13550,duration:1180},
		{id:"s_13",startTime:14730,duration:970},
		{id:"s_14",startTime:15700,duration:1150},
		{id:"s_15",startTime:16850,duration:1050},
		{id:"s_16",startTime:17900,duration:1150},
		{id:"s_17",startTime:19050,duration:1050},
		{id:"s_18",startTime:20100,duration:1120},
		{id:"s_19",startTime:21220,duration:1200},
		{id:"s_20",startTime:22420,duration:1200},
		{id:"s_21",startTime:23620,duration:890},
		{id:"s_22",startTime:24510,duration:1280},
		{id:"s_23",startTime:25790,duration:1100},
		{id:"s_24",startTime:26890,duration:1180},
		{id:"s_25",startTime:28070,duration:1100},
		{id:"s_26",startTime:29170,duration:1120},
		{id:"s_27",startTime:30290,duration:990},
		{id:"s_28",startTime:31280,duration:1250},
		{id:"s_29",startTime:32530,duration:1100}
	];

	oG.audioVars={getAudFrames:getAudFramesLoc};
}(opdGame));



(function(oG){//checked
	function contentLoader(){
		this.EventDispatcher_constructor();
		this.imagesLoadedFun=this.imagesLoaded.bind(this);
		this.imagesLoadErrorFun=this.imagesLoadError.bind(this);
		this.audioLoadedFun=this.audioLoaded.bind(this);
		this.audioLoadErrorFun=this.audioLoadError.bind(this);
		this.setup();
	}
	var p=createjs.extend(contentLoader,createjs.EventDispatcher);

	p.setup=function(){
		this.myContentLoader=null;
		this.needToCheckContext=true;
		createjs.Sound.alternateExtensions=["mp3"];
	};

	p.loadContentSet=function(gVar){
		this.gVar=gVar;
		this.retriedOnce=false;
		this.retriedOnceAudio=false;
		
		if(this.needToCheckContext)this.checkContext();

		createjs.Sound.removeSound('soundId');
		oG.model.audioLoaded=false;

		if(this.myContentLoader!==null){this.clearupContentLoader();}

		this.loadImages();
	};

	//this is a fix for changes to chrome that require user gesture before audio can play
	p.checkContext=function(){
		this.needToCheckContext=false;
		try {
			if(createjs.WebAudioPlugin.context.state==="suspended"){
				createjs.WebAudioPlugin.context.resume();
			}
		}catch(e){
			// SoundJS context or web audio plugin may not exist
			console.error("There was an error while trying to resume the SoundJS Web Audio context...");
			console.error(e);
		}
	};

	p.loadImages=function(){
		this.myManifest=[{src:oG.model.imsFolder+'bc_'+this.gVar+'.png',id:'mySprite'}];
		this.myContentLoader=new createjs.LoadQueue(false);
		this.myContentLoader.addEventListener('error',this.imagesLoadErrorFun);
		this.myContentLoader.addEventListener('complete',this.imagesLoadedFun);
		this.myContentLoader.loadManifest(this.myManifest,true);
	};

	p.imagesLoadError=function(){
		this.clearupContentLoader();
		if(!this.retriedOnce){
			console.log('Load Error - retrying one time');
			this.retriedOnce=true;
			this.loadImages();
		}else{
			console.log('Load Error - giving up');
			oG.view.changeView('title');
		}
	};

	p.imagesLoaded=function(){
		var frms=oG.imageVars.getImFrames(this.gVar);
		oG.model.contentSpriteSheet=new createjs.SpriteSheet({
			images:[this.myContentLoader.getResult('mySprite')],
			frames:frms
		});
		this.myContentLoader.removeEventListener('complete',this.imagesLoadedFun);
		this.myContentLoader.removeEventListener('error',this.imagesLoadErrorFun);
		this.myContentLoader.destroy();
		this.myContentLoader=null;
		this.dispatchEvent('loadComplete');

		if(this.gVar<20){
			this.loadAudio();
		}
	};

	p.loadAudio=function(){
		var myAuSpri=oG.audioVars.getAudFrames(this.gVar);
		this.audManifest=[{src:oG.model.audFolder+'a_'+this.gVar+'.ogg',id:'soundId',data:{audioSprite:myAuSpri}}];
		this.myContentLoader=new createjs.LoadQueue(false);
		this.myContentLoader.installPlugin(createjs.Sound);
		this.myContentLoader.addEventListener('complete',this.audioLoadedFun);
		this.myContentLoader.addEventListener('error',this.audioLoadErrorFun);
		this.myContentLoader.loadManifest(this.audManifest,true);
	};

	p.audioLoadError=function(){
		this.clearupContentLoader();
		oG.model.audioLoaded=false;
		if(!this.retriedOnceAudio){
			console.log('Audio load failure - retrying once');
			this.retriedOnceAudio=true;
			this.loadAudio();
		}else{
			console.log('Audio load failure - giving up');
		}
	};

	p.audioLoaded=function(){
		oG.model.audioLoaded=true;
		this.clearupContentLoader();
		this.dispatchEvent('audComplete');
	};

	p.clearupContentLoader=function(){
		this.myContentLoader.removeEventListener('complete',this.audioLoadedFun);
		this.myContentLoader.removeEventListener('error',this.audioLoadErrorFun);
		this.myContentLoader.removeEventListener('complete',this.contentLoadedFun);
		this.myContentLoader.removeEventListener('error',this.imageLoadErrorFun);
		this.myContentLoader.destroy();
		this.myContentLoader=null;
	};

	oG.Modules.ContentLoader=createjs.promote(contentLoader,'EventDispatcher');
}(opdGame));


(function(oG){
	function ContentView(){
		this.Container_constructor();
		this.clickerFun=this.clicker.bind(this);
		this.overerFun=this.overer.bind(this);
		this.outerFun=this.outer.bind(this);
		this.tockerFun=this.tocker.bind(this);
		this.lClickFun=this.lClick.bind(this);
		this.rClickFun=this.rClick.bind(this);
		this.setup();
	}
	var p=createjs.extend(ContentView,createjs.Container);

	var stringDefault='Choose a set of characters';

	var setTitles=["HSK 1+2","HSK 3","HSK 4a","HSK 4b","HSK 5a","HSK 5b","HSK 5c","HSK 5d","HSK 5e"];

	p.setup=function(){
		this.cItems=[];
		this.lOut=null;
		this.back=new createjs.Shape();
		this.back.alpha=0.5;
		this.topPane=new createjs.Shape();

		this.loadingText=new createjs.Text('loading','bold 34px Cabin','#333');
		opdLib.centerText(this.loadingText);
		this.loadingText.textAlign='left';

		this.addChild(this.back,this.topPane,this.loadingText);

		this.itemsContainer=new createjs.Container();
		for(var i=0;i<10;i++){
			this.cItems[i]=new oG.Modules.ContentItem();
			this.itemsContainer.addChild(this.cItems[i]);
		}

		this.titleText=new createjs.Text(stringDefault,'bold 20px Cabin','#333');
		this.titleOver=new createjs.Text('','bold 32px Cabin','#333');
		opdLib.centerText(this.titleText);
		opdLib.centerText(this.titleOver);

		this.h1Text=new createjs.Text('','bold 44px Cabin','#333');
		opdLib.centerText(this.h1Text);

		this.lArr=new opdLib.drawArrow(20,'#ffc');
		this.lArr.rotation=180;
		this.rArr=new opdLib.drawArrow(20,'#ffc');

		this.addChild(this.itemsContainer,this.titleText,this.titleOver,this.h1Text,this.lArr,this.rArr);

		this.contentInd=0;

		this.setupDisplay();

		this.setDisplay();
	};

	p.setupDisplay=function(){
		var i=0;
		this.back.graphics.clear();
		this.topPane.graphics.clear();
		if(oG.model.orientation===0){
			this.back.graphics.setStrokeStyle(8).beginStroke('#333').beginFill('#fff').drawRoundRect(80,60,640,460,60);
			this.topPane.graphics.setStrokeStyle(3).beginStroke('#777').beginFill('#fff').drawRoundRect(200,35,400,80,30);
			opdLib.posItem(this.loadingText,320,315);
			opdLib.posItem(this.titleText,400,81);
			opdLib.posItem(this.titleOver,400,85);
			opdLib.posItem(this.h1Text,400,195);
			opdLib.posItem(this.lArr,260,178);
			opdLib.posItem(this.rArr,540,178);

			for(i=0;i<10;i++){
				if(i<5){
					this.cItems[i].setColor('#ffc');
					opdLib.dispItem(this.cItems[i],this.itemsContainer,130+i*110,250);
				}
				if(i>=5){
					this.cItems[i].setColor('#ff5');
					opdLib.dispItem(this.cItems[i],this.itemsContainer,130+(i-5)*110,360);
				}
			}
		}else{
			this.back.graphics.setStrokeStyle(8).beginStroke('#333').beginFill('#fff').drawRoundRect(60,100,430,640,60);
			this.topPane.graphics.setStrokeStyle(3).beginStroke('#777').beginFill('#fff').drawRoundRect(125,60,300,80,30);
			opdLib.posItem(this.loadingText,195,340);
			opdLib.posItem(this.titleText,275,106);
			opdLib.posItem(this.titleOver,275,110);
			opdLib.posItem(this.h1Text,275,220);
			opdLib.posItem(this.lArr,135,203);
			opdLib.posItem(this.rArr,415,203);

			for(i=0;i<2;i++){
					this.cItems[i].setColor('#ffc');
					opdLib.dispItem(this.cItems[i],this.itemsContainer,170+i*110,270);
			}
			for(i=2;i<5;i++){
					this.cItems[i].setColor('#ffa');
					opdLib.dispItem(this.cItems[i],this.itemsContainer,-105+i*110,380);
			}
			for(i=5;i<7;i++){
					this.cItems[i].setColor('#ff7');
					opdLib.dispItem(this.cItems[i],this.itemsContainer,-380+i*110,490);
			}
			for(i=7;i<10;i++){
					this.cItems[i].setColor('#ff5');
					opdLib.dispItem(this.cItems[i],this.itemsContainer,-655+i*110,600);
			}
		}
	};

	p.orientationChange=function(){
		this.setupDisplay();
	};

	p.setDisplay=function(){
		this.h1Text.text=setTitles[this.contentInd];
		var bs=this.contentInd*10;
		var i=0;
		if(this.contentInd<8){
			for(i=0;i<10;i++){
				this.cItems[i].setInd(i+bs);
				this.cItems[i].visible=true;
			}
		}else{
			for(i=0;i<5;i++){
				this.cItems[i].setInd(i+bs);
				this.cItems[i+5].visible=false;
			}
		}
		opdLib.fadeIn(this.itemsContainer,200,50);
	};

	p.lClick=function(){
		this.contentInd--;
		if(this.contentInd<0)this.contentInd=8;
		this.setDisplay();
	};

	p.rClick=function(){
		this.contentInd++;
		if(this.contentInd>8)this.contentInd=0;
		this.setDisplay();
	};

	p.clicker=function(e){
		e.target.front.visible=false;
		oG.controller.loadContent(e.target.ind);
		this.removeLists();
		this.itemsContainer.visible=false;
		this.loadingText.visible=true;
		this.loadProgressVar=0;
		this.h1Text.visible=false;
		this.lArr.visible=false;
		this.rArr.visible=false;
		opdLib.fadeIn(this.loadingText,200,300);
		createjs.Ticker.addEventListener('tick',this.tockerFun);
	};

	p.tocker=function(event){
		var pText='loading';
		this.loadProgressVar++;
		if(this.loadProgressVar>30)this.loadProgressVar=0;
		for(i=0;i<this.loadProgressVar;i+=3)pText+='.';
		this.loadingText.text=pText;
	};

	p.overer=function(e){
		e.target.front.visible=true;
		this.titleOver.visible=true;
		this.titleOver.text=this.getTitleString(e.target.ind);
		this.titleText.visible=false;
	};

	p.getTitleString=function(ind){
		var ini=0;
		if(ind<5){
			ini=ind+1;
			return "HSK1 - part "+ini;
		}
		if(ind<10){
			ini=ind-4;
			return "HSK2 - part "+ini;
		}
		if(ind<20){
			ini=ind-9;
			return "HSK3 - part "+ini;
		}
		if(ind<40){
			ini=ind-19;
			return "HSK4 - part "+ini;
		}
		ini=ind-39;
		return "HSK5 - part "+ini;
	};

	p.outer=function(e){
		e.target.front.visible=false;
		this.titleOver.visible=false;
		this.titleText.visible=true;
	};

	p.addLists=function(){
		this.itemsContainer.addEventListener('click',this.clickerFun);
		if(!oG.model.touchMode){
			this.itemsContainer.addEventListener('mouseover',this.overerFun);
			this.itemsContainer.addEventListener('mouseout',this.outerFun);
			this.itemsContainer.cursor='pointer';
		}
		this.lArr.addEventListener('click',this.lClickFun);
		this.rArr.addEventListener('click',this.rClickFun);
		this.lArr.cursor='pointer';
		this.rArr.cursor='pointer';
	};

	p.removeLists=function(){
		this.itemsContainer.removeEventListener('click',this.clickerFun);
		if(!oG.model.touchMode){
			this.itemsContainer.removeEventListener('mouseover',this.overerFun);
			this.itemsContainer.removeEventListener('mouseout',this.outerFun);
			this.itemsContainer.cursor='default';
		}
		this.lArr.removeEventListener('click',this.lClickFun);
		this.rArr.removeEventListener('click',this.rClickFun);
		this.lArr.cursor='default';
		this.rArr.cursor='default';
	};

	p.init=function(){
		this.itemsContainer.visible=true;
		this.loadingText.visible=false;
		this.titleOver.visible=false;
		this.titleText.visible=true;
		this.h1Text.visible=true;
		this.lArr.visible=true;
		this.rArr.visible=true;
		this.addLists();
	};

	p.deit=function(){
		clearTimeout(this.lOut);
		this.removeLists();
		createjs.Ticker.removeEventListener('tick',this.tockerFun);
		createjs.Tween.removeTweens(this.loadingText);
	};

	oG.Views.ContentView=createjs.promote(ContentView,'Container');
}(opdGame));

(function(oG){//checked
	function ContentItem(){
		this.Container_constructor();
		this.ind=0;
		this.setup();
	}
	var p=createjs.extend(ContentItem,createjs.Container);

	p.setup=function(){
		this.mouseChildren=false;
		var back=new createjs.Shape();
		back.graphics.setStrokeStyle(2);
		back.graphics.beginStroke('#666').beginFill('#ccccff').drawRoundRect(0,0,100,100,16);
		back.alpha=0.5;
		this.addChild(back);

		this.front=new createjs.Shape();
		this.addChild(this.front);
		this.front.visible=false;

		this.topText=new createjs.Text('100','bold 20px Cabin','#555');
		this.botText=new createjs.Text('to 300','bold 20px Cabin','#555');
		opdLib.centerText(this.topText);
		opdLib.centerText(this.botText);
		opdLib.dispItem(this.topText,this,50,34);
		opdLib.dispItem(this.botText,this,50,60);

		this.txt=new createjs.Sprite(oG.model.mainSprite);
		opdLib.dispItem(this.txt,this,0,0);
	};

	p.setColor=function(gCol){
		this.front.graphics.beginStroke('#aaa').beginFill(gCol).drawRoundRect(0,0,100,100,16);
	};

	p.setInd=function(tar){
		this.ind=tar;
		var bInd=tar+1;
		var leTar='contentBit'+bInd;
		this.txt.gotoAndStop(leTar);
		var bs=tar*30;
		var t1=bs+1;
		var t2=bs+30;
		this.topText.text=t1;
		this.botText.text="to "+t2;
	};

	oG.Modules.ContentItem=createjs.promote(ContentItem,'Container');
}(opdGame));


(function(oG){//checked
	var contentLoader=null;

	function initLoc(){
		contentLoader=new oG.Modules.ContentLoader();
		contentLoader.addEventListener('loadComplete',loadComplete);
		contentLoader.addEventListener('audComplete',audComplete);
		oG.model.preloadComplete=false;
		if(window.location.host===oG.model.siteUrl){
			oG.view.init();
		}else{
			if(oG.model.siteLock===false){
				oG.view.init();
			}
		}
	}

	function preloadCompleteLoc(){
		oG.model.preloadComplete=true;
		oG.view.preloadComplete();
		oG.view.changeView('title');
		//oG.view.changeView('end');
	}

	function setContentLoadedTargetLoc($tar){
		oG.model.loadTarget=$tar;
	}

	function loadContentLoc(gVar){
		loadSetContentVars(gVar);
		oG.view.gameView.audButDisplay('off');
		oG.view.reviewView.audButDisplay('off');
		contentLoader.loadContentSet(gVar);
	}

	function loadSetContentVars(gVar){
		oG.model.contentCode=gVar;
		oG.model.textArray=oG.textContent.getText(gVar);
		oG.model.pinArray=oG.textContent.getPin(gVar);
		oG.model.contentTitle=oG.textContent.getSection(gVar);
	}

	function loadComplete(){
		oG.view.changeView(oG.model.loadTarget);
	}

	function audComplete(){
		oG.view.gameView.audButDisplay('show');
		oG.view.reviewView.audButDisplay('show');
	}

	var out={
		init:initLoc,
		preloadComplete:preloadCompleteLoc,
		setContentLoadedTarget:setContentLoadedTargetLoc,
		loadContent:loadContentLoc
	};

	oG.controller=out;

}(opdGame));



(function(oG){//checked
	var CountdownTimer=function(){
		this.Container_constructor();
		this.countdownFun=this.countdown.bind(this);
		this.setup();
	};
	var p=createjs.extend(CountdownTimer,createjs.Container);

	var BACK_WID=510;
	var BACK_HEI=50;
	var MASK_WID=516;
	var MASK_HEI=56;

	p.setup=function(){
		this.countdownVar=0;
		this.countdownAddVar=0;

		// var countdownBack=new createjs.Sprite(oG.model.mainSprite);
		// countdownBack.gotoAndStop('countdownBack');
		// var countdownFront=new createjs.Sprite(oG.model.mainSprite);
		// countdownFront.gotoAndStop('countdownFront');
		var countdownBack=new createjs.Shape();
		countdownBack.graphics.setStrokeStyle(2);
		countdownBack.graphics.beginStroke('#666666').beginFill('#cccccc').drawRoundRect(-BACK_WID/2,-BACK_HEI/2,BACK_WID,BACK_HEI,20);
		var countdownFront=new createjs.Shape();
		countdownFront.graphics.setStrokeStyle(2);
		countdownFront.graphics.beginStroke('#666666').beginFill('#013D76').drawRoundRect(-BACK_WID/2,-BACK_HEI/2,BACK_WID,BACK_HEI,20);
		
		this.myMask=new createjs.Shape();
		this.myMask.graphics.beginFill('#ccc').drawRect(-MASK_WID/2,-MASK_HEI/2,MASK_WID,MASK_HEI);

		opdLib.dispItem(countdownBack,this,0,0);
		opdLib.dispItem(countdownFront,this,0,0);

		countdownFront.mask=this.myMask;
	};

	p.resetHintVar=function(gVar){
		this.hintCount=gVar;
	};

	p.countdown=function(e){
		this.gameCount++;
		if(!this.paused){
			if(oG.model.optShowTimer)this.hintCount+=Math.round(this.speedAlt/6);
			if(this.hintCount>=240){
				this.hintCount=160;
				if(!oG.model.sdMode)oG.view.gameView.removePair();
			}
			if(this.countdownAddVar>0){
				this.countdownAddVar-=100;
				this.countdownVar+=100;
				if(this.countdownVar>=5000)this.limOver();
			}
			var adjVar=Math.round(e.delta)*25;
			var adjVar2=Math.floor(this.speedAlt*adjVar)/1000;
			if(oG.model.optShowTimer)this.countdownVar-=adjVar2;
			if(this.countdownVar<=0){
				this.countdownVar=0;
				oG.view.gameView.timeout();
			}
			var bWidth=Math.round(this.countdownVar/10);
			// console.log(bWidth)
			if(bWidth>4){
				this.myMask.x=-MASK_WID+bWidth;
			}else{
				bWidth=0;
				this.myMask.x=-MASK_WID;
			}
		}
	};

	p.limOver=function(){
		this.countdownVar=5200;
		this.countdownAddVar=0;
	};

	p.addTime=function($missVar){
		this.countdownAddVar+=2000;
		if(this.countdownVar<2000&&this.speedAlt<14)this.countdownAddVar+=500;
		if(this.countdownVar<1500&&this.speedAlt<10)this.countdownAddVar+=500;
		this.updateSpeed();
	};

	p.updateSpeed=function(){
		if(oG.model.sdMode){
			var sAlt=20+oG.model.sdCount;
			//if(oG.model.touchMode)sAlt-=10;
			if(sAlt<20)sAlt=20;
			if(sAlt>45)sAlt=45;
			this.speedAlt=sAlt;
			oG.model.gameSpeed=0;
		}else{
			if(this.countdownVar>3000&&oG.model.missBool===false){
				this.speedAlt++;
			}
			if(this.countdownVar<2500){
				this.speedAlt--;
			}
			if(this.speedAlt<6)this.speedAlt=6;
			if(this.speedAlt>30)this.speedAlt=30;

			var tmp=1-(this.speedAlt-6)/12;
			tmp=Math.floor((tmp*10))/10;
			if(tmp<0)tmp=0;
			oG.model.gameSpeed=tmp;
		}
	};

	p.startSdMode=function(){
		this.speedAlt=20;
		this.countdownVar=5000;
		this.pauser();
	};

	p.startCountdown=function(){
		this.hintCount=0;
		this.paused=false;
	};

	p.endTimer=function(){
		createjs.Ticker.removeEventListener("tick", this.countdownFun);
	};

	p.pauser=function(){
		this.paused=true;
	};

	p.unpauser=function(){
		this.paused=false;
	};

	p.init=function(){
		this.gameCount=0;
		this.speedAlt=6;
		this.updateSpeed();
		this.countdownVar=5200;
		this.countdownAddVar=0;
		this.myMask.x=0;
		this.paused=true;
		createjs.Ticker.addEventListener("tick",this.countdownFun);
	};

	p.deit=function(){
		var gTime=Math.floor(this.gameCount/30);
		oG.model.gameTime=gTime;
		createjs.Ticker.removeEventListener("tick", this.countdownFun);
	};

	oG.Modules.CountdownTimer=createjs.promote(CountdownTimer,'Container');
}(opdGame));


(function(oG){//checked
	function EndView(){
		this.Container_constructor();
		this.gotScores=this.gotScoresFun.bind(this);
		this.sendNewHighScoreFun=this.sendNewHighScore.bind(this);
		this.setup();
	}
	var p=createjs.extend(EndView,createjs.Container);

	p.setup=function(){
		this.showInput=false;
		this.scoresSent=false;

		this.againBut=new oG.Modules.Button('textAgain','game');
		this.backBut=new oG.Modules.Button('textBack','title');

		this.scorePane=new oG.Modules.ScorePane();
		this.scorePane.fontOne='bold 16px Amaranth';
		this.scorePane.fontOneColor='#333';
		this.scorePane.fontTwo='bold 18px Amaranth';
		this.scorePane.fontTwoColor='#444';
		this.scorePane.paneLength='long';
		this.scorePane.scoreLabelText1='Round';
		this.scorePane.scoreLabelText2='Time';
		this.scorePane.initialSetup();

		this.myScoresTable=new oG.Modules.HighScoresTable();
		this.myScoresTable.titleFont='bold 32px Alegreya Sans';
		this.myScoresTable.titleFontColor='#000';
		this.myScoresTable.titlesFont='bold 22px Amaranth';
		this.myScoresTable.titlesFontColor='#222';
		this.myScoresTable.fieldsFont='bold 20px Amaranth';
		this.myScoresTable.fieldsFontColor='#333';
		this.myScoresTable.backPaneColor='#eee';
		this.myScoresTable.backPaneBorderColor='#444';
		this.myScoresTable.backPaneBorderWidth=5;
		this.myScoresTable.tableType='timeRound';
		this.scorePane.paneBorderColor='#ccc';
		this.myScoresTable.initialSetup();

		this.scorePane.setCallback(this.sendNewHighScoreFun);
		oG.scoresModel.setCallback(this.gotScores);

		this.addChild(this.myScoresTable,this.againBut,this.backBut,this.scorePane);

		this.setupDisplay();
	};

	p.setupDisplay=function(){
		if(oG.model.orientation===0){
			opdLib.posItem(this.againBut,315,500);
			opdLib.posItem(this.backBut,525,500);
			this.myScoresTable.y=10;
		}else{
			opdLib.posItem(this.againBut,170,750);
			opdLib.posItem(this.backBut,380,750);
			this.myScoresTable.y=20;
		}
	};

	p.orientationChange=function(){
		this.setupDisplay();
		this.myScoresTable.setupDisplay();
		this.scorePane.setupDisplay();
	};

	p.sendNewHighScore=function(nom,local){
		this.scoresSent=true;
		this.showInput=false;
		oG.scoresModel.getScores(1,nom,local);
		this.scorePane.setInputVisibility(false);
	};

	p.gotScoresFun=function(jsonArr){
		var len=jsonArr.scores.length;
		this.showInput=true;
		if(len>25){
			var minScore=jsonArr.scores[len-1].Score;
			var minTime=jsonArr.scores[len-1].Tome;
			if(oG.model.gameScore>minScore||oG.model.gameScore==minScore&&oG.model.gameTime<=minTime){
				this.showInput=true;
			}else{
				this.showInput=false;
			}
		}
		if(this.scoresSent)this.showInput=false;
		if(this.showInput){
			this.scorePane.setInputVisibility(true);
		}
		this.myScoresTable.showScores(jsonArr);
	};

	p.init=function(){
		this.showInput=false;
		this.scoresSent=false;
		this.againBut.init();
		this.backBut.init();
		opdLib.fadeIn(this,500,200);
		opdLib.fadeIn(this.backBut,500,700);
		opdLib.fadeIn(this.againBut,500,700);
		opdLib.fadeIn(this.scorePane,500,1600);

		this.scorePane.init();
		this.scorePane.scoreDisp1.text=oG.model.gameScore;
		this.scorePane.scoreDisp2.text=oG.model.gameTime;

		this.myScoresTable.init();

		oG.scoresModel.getScores(0,'','');

		opdWrapper.lock();
	};

	p.deit=function(){
		this.againBut.deit();
		this.backBut.deit();
		opdWrapper.unlock();
		this.myScoresTable.deit();
		this.scorePane.deit();
	};

	oG.Views.EndView=createjs.promote(EndView,'Container');
}(opdGame));


(function(oG){//checked
	function GameView(){
		this.Container_constructor();
		this.startGameFun=this.startGame.bind(this);
		this.turnOverFun=this.turnOver.bind(this);
		this.backClickFun=this.backClick.bind(this);
		this.settingsClickFun=this.settingsClick.bind(this);
		this.audioClickFun=this.audioClick.bind(this);
		this.endScreenFun=this.endScreen.bind(this);
		this.offSdFun=this.offSd.bind(this);
		this.beginSdFun=this.beginSd.bind(this);
		this.loseSeqFun=this.loseSeq.bind(this);
		this.setup();
	}
	var p=createjs.extend(GameView,createjs.Container);

	p.setup=function(){
		this.rOut=null;
		this.backBut=new createjs.Sprite(oG.model.mainSprite);
		this.settingsBut=new createjs.Sprite(oG.model.mainSprite);
		this.audioBut=new createjs.Sprite(oG.model.mainSprite);
		this.backBut.gotoAndStop('backBut');
		this.settingsBut.gotoAndStop('settingsBut');
		this.audioBut.gotoAndStop('audBut');

		this.settingsPane=new oG.Modules.SettingsPane();

		this.suddenDeathText=new createjs.Sprite(oG.model.mainSprite);
		this.youWinText=new createjs.Sprite(oG.model.mainSprite);
		this.gameOverText=new createjs.Sprite(oG.model.mainSprite);
		this.suddenDeathText.gotoAndStop('suddenDeath');
		this.youWinText.gotoAndStop('youWinText');
		this.gameOverText.gotoAndStop('gameOverText');

		this.suddenDeathDown=new createjs.Text('30','bold 76px Arial','#222');

		this.targetSet=new oG.Modules.TargetSet();
		this.optionsSet=new oG.Modules.OptionsSet();
		this.countdownTimer=new oG.Modules.CountdownTimer();
		this.addChild(this.targetSet,this.countdownTimer,this.optionsSet,this.backBut,this.settingsBut,this.audioBut);
		this.addChild(this.gameOverText,this.youWinText,this.suddenDeathText,this.suddenDeathDown,this.settingsPane);

		this.setupDisplay();
	};

	p.setupDisplay=function(){
		if(oG.model.orientation===0){
			opdLib.posItem(this.targetSet,400,80);
			opdLib.posItem(this.countdownTimer,400,176);
			opdLib.posItem(this.backBut,5,5);
			opdLib.posItem(this.settingsBut,58,5);
			opdLib.posItem(this.audioBut,580,45);
			opdLib.posItem(this.gameOverText,160,225);
			opdLib.posItem(this.youWinText,210,225);
			opdLib.posItem(this.suddenDeathText,200,245);
			opdLib.posItem(this.suddenDeathDown,640,35);
		}else{
			opdLib.posItem(this.targetSet,275,100);
			opdLib.posItem(this.countdownTimer,275,198);
			opdLib.posItem(this.backBut,5,5);
			opdLib.posItem(this.settingsBut,5,58);
			opdLib.posItem(this.audioBut,450,65);

			opdLib.posItem(this.gameOverText,35,350);
			opdLib.posItem(this.youWinText,85,350);
			opdLib.posItem(this.suddenDeathText,75,370);
			opdLib.posItem(this.suddenDeathDown,451,55);
		}
	};

	p.orientationChange=function(){
		this.setupDisplay();
		this.optionsSet.orientationChange();
		this.settingsPane.orientationChange();
		this.updateDispFromSettings();
	};

	p.startGame=function(){
		this.targetSet.startUnClear();
		opdLib.fadeIn(this.optionsSet,800,0);
		oG.model.routineInd=0;
		oG.model.gameTime=0;
		oG.model.gameSpeed=1;
		oG.model.misses=0;
		oG.model.sdMode=false;
		oG.model.sdStart=false;
		this.countdownTimer.startCountdown();
		this.turnOver();
	};

	p.turnOver=function(){
		if(!oG.model.sdStart){
			var leArr=oG.metrics.getRound();
			if(leArr[0]!=-1){
				this.routine(leArr);
			}else{
				this.winSeq();
			}
		}else{
			this.goSd();
		}
	};

	p.routine=function(leArr){
		this.rVar=leArr[0];
		this.optionsSet.showSet(leArr);
		this.targetSet.showTarget(this.rVar);
		this.optionsSet.addLists();
		this.countdownTimer.resetHintVar(0);
		if(oG.model.optPlayAudio)this.playAudio();
		oG.model.routineInd++;
		oG.model.missBool=false;
		this.removeCount=0;

		var tVar=Math.round(600*oG.model.gameSpeed);
		if(tVar>0)opdLib.fadeIn(this.optionsSet,tVar,0);
	};

	p.playAudio=function(){
		createjs.Sound.stop();
		if(oG.model.audioLoaded)createjs.Sound.play('s_'+this.rVar);
	};

	p.correctHit=function(){
		this.countdownTimer.addTime();
		oG.metrics.hit();
		if(oG.model.sdMode)this.suddenDeathDown.text=30-oG.model.sdCount;
		var tVar=Math.round(1000*oG.model.gameSpeed);
		//if(tVar<350&&oG.model.touchMode)tVar=350;
		this.rOut=setTimeout(this.turnOverFun,tVar);
	};

	p.missHit=function(){
		if(oG.model.sdMode){
			this.countdownTimer.endTimer();
			this.rOut=setTimeout(this.loseSeqFun,1000);
		}else{
			this.optionsSet.removeAnother();
			this.countdownTimer.resetHintVar(120);
			oG.model.misses++;
			oG.model.missBool=true;
			this.optionsSet.addLists();
		}
	};

	p.backClick=function(){
		oG.view.changeView('title');
	};

	p.settingsClick=function(event){
		this.settingsPane.init();
		this.countdownTimer.pauser();
	};

	p.closeSettingsPane=function(){
		this.settingsPane.deit();
		this.countdownTimer.unpauser();
	};

	p.audioClick=function(){
		this.playAudio();
	};

	p.goSd=function(){
		this.removeGameLists();
		oG.model.sdMode=true;
		oG.model.sdStart=false;

		this.countdownTimer.startSdMode();

		opdLib.fadeOut(this.targetSet,300,0);
		opdLib.fadeOut(this.optionsSet,300,0);
		opdLib.fadeOut(this.countdownTimer,300,0);
		opdLib.fadeOut(this.backBut,300,0);
		opdLib.fadeOut(this.audioBut,300,0);
		opdLib.fadeOut(this.settingsBut,300,0);

		this.suddenDeathText.visible=true;

		opdLib.fadeIn(this.suddenDeathText,300,600);

		this.rOut=setTimeout(this.offSdFun,2000);
	};

	p.offSd=function(){
		this.audioBut.visible=false;
		this.suddenDeathDown.visible=true;
		this.suddenDeathDown.text=30;

		opdLib.fadeOut(this.suddenDeathText,300,0);

		opdLib.fadeIn(this.suddenDeathDown,300,600);
		opdLib.fadeIn(this.targetSet,300,600);
		opdLib.fadeIn(this.optionsSet,300,600);
		opdLib.fadeIn(this.countdownTimer,300,600);
		opdLib.fadeIn(this.backBut,300,600);
		opdLib.fadeIn(this.audioBut,300,600);
		opdLib.fadeIn(this.settingsBut,300,600);

		this.rOut=setTimeout(this.beginSdFun,600);
	};

	p.beginSd=function(){
		this.addGameLists();
		this.suddenDeathText.visible=false;
		this.countdownTimer.unpauser();
		this.turnOver();
	};

	p.removePair=function(){
		this.removeCount++;
		if(this.removeCount==3){
			oG.model.missBool=true;
			oG.model.misses++;
		}
		this.optionsSet.removeAnother();
		this.optionsSet.removeAnother();
	};

	p.timeout=function(){
		this.endSeq();
		this.gameOverText.visible=true;
		opdLib.fadeIn(this.gameOverText,300,800);

		this.rOut=setTimeout(this.endScreenFun,3000);
	};

	p.winSeq=function(){
		this.endSeq();
		this.youWinText.visible=true;
		opdLib.fadeIn(this.youWinText,300,1600);

		this.rOut=setTimeout(this.endScreenFun,5000);
	};

	p.loseSeq=function(){
		this.endSeq();
		this.gameOverText.visible=true;
		opdLib.fadeIn(this.gameOverText,300,800);

		this.rOut=setTimeout(this.endScreenFun,3000);
	};

	p.endSeq=function(){
		this.countdownTimer.endTimer();
		this.optionsSet.removeLists();
		this.removeGameLists();

		opdLib.fadeOut(this.suddenDeathDown,300,0);
		opdLib.fadeOut(this.targetSet,300,0);
		opdLib.fadeOut(this.optionsSet,300,0);
		opdLib.fadeOut(this.countdownTimer,300,0);
		opdLib.fadeOut(this.backBut,300,0);
		opdLib.fadeOut(this.audioBut,300,0);
		opdLib.fadeOut(this.settingsBut,300,0);
	};

	p.endScreen=function(){
		oG.view.changeView('end');
	};

	//0 - char
	//1 - eng
	//2 - pin
	//3 - char pin
	//4 - char eng
	//5 - char eng pin
	//6 - eng pin
	//7 - none

	p.addOption=function(opt){
		var oView=oG.model.optView;
		if(opt=='char'){
			if(oView===1)oG.model.optView=4;
			if(oView==2)oG.model.optView=3;
			if(oView==6)oG.model.optView=5;
			if(oView==7)oG.model.optView=0;
		}
		if(opt=='pin'){
			if(oView===0)oG.model.optView=3;
			if(oView===1)oG.model.optView=6;
			if(oView==4)oG.model.optView=5;
			if(oView==7)oG.model.optView=2;
		}
		if(opt=='eng'){
			if(oView===0)oG.model.optView=4;
			if(oView==2)oG.model.optView=6;
			if(oView==3)oG.model.optView=5;
			if(oView==7)oG.model.optView=1;
		}
	};

	p.removeOption=function(opt){
		var oView=oG.model.optView;
		if(opt=='char'){
			if(oView==4)oG.model.optView=1;
			if(oView==3)oG.model.optView=2;
			if(oView==5)oG.model.optView=6;
			if(oView===0)oG.model.optView=7;
		}
		if(opt=='pin'){
			if(oView==3)oG.model.optView=0;
			if(oView==6)oG.model.optView=1;
			if(oView==5)oG.model.optView=4;
			if(oView==2)oG.model.optView=7;
		}
		if(opt=='eng'){
			if(oView==4)oG.model.optView=0;
			if(oView==6)oG.model.optView=2;
			if(oView==5)oG.model.optView=3;
			if(oView===1)oG.model.optView=7;
		}
	};

	p.addTarget=function(tar){
		var tView=oG.model.tarView;
		if(tar=='char'){
			if(tView===1)oG.model.tarView=4;
			if(tView==2)oG.model.tarView=3;
			if(tView==6)oG.model.tarView=5;
			if(tView==7)oG.model.tarView=0;
		}
		if(tar=='pin'){
			if(tView===0)oG.model.tarView=3;
			if(tView===1)oG.model.tarView=6;
			if(tView==4)oG.model.tarView=5;
			if(tView==7)oG.model.tarView=2;
		}
		if(tar=='eng'){
			if(tView===0)oG.model.tarView=4;
			if(tView==2)oG.model.tarView=6;
			if(tView==3)oG.model.tarView=5;
			if(tView==7)oG.model.tarView=1;
		}
	};

	p.removeTarget=function(tar){
		var tView=oG.model.tarView;
		if(tar=='char'){
			if(tView==4)oG.model.tarView=1;
			if(tView==3)oG.model.tarView=2;
			if(tView==5)oG.model.tarView=6;
			if(tView===0)oG.model.tarView=7;
		}
		if(tar=='pin'){
			if(tView==3)oG.model.tarView=0;
			if(tView==6)oG.model.tarView=1;
			if(tView==5)oG.model.tarView=4;
			if(tView==2)oG.model.tarView=7;
		}
		if(tar=='eng'){
			if(tView==4)oG.model.tarView=0;
			if(tView==6)oG.model.tarView=2;
			if(tView==5)oG.model.tarView=3;
			if(tView===1)oG.model.tarView=7;
		}
	};

	p.setTarget=function(view){
		if(view!==oG.model.selView){
			switch(view){
				case 0:
				oG.model.tarView=0;
				oG.model.optView=6;
				break;
				case 1:
				oG.model.tarView=1;
				oG.model.optView=3;
				break;
				case 2:
				oG.model.tarView=7;
				oG.model.optView=4;
				break;
			}
		}
		oG.model.selView=view;
	};

	p.updateDispFromSettings=function(){
		if(oG.model.optShowTimer){
			this.countdownTimer.visible=true;
			if(oG.model.orientation===0){
				this.targetSet.y=80;
				this.audioBut.y=45;
			}else{
				this.targetSet.y=100;
				this.audioBut.y=65;
			}
		}else{
			this.countdownTimer.visible=false;
			if(oG.model.orientation===0){
				this.targetSet.y=105;
				this.audioBut.y=70;
			}else{
				this.targetSet.y=125;
				this.audioBut.y=90;
			}
		}
		if(oG.model.tarView==7){
			if(oG.model.orientation===0){
				this.audioBut.x=367;
			}else{
				this.audioBut.x=237;
			}
		}else{
			if(oG.model.orientation===0){
				this.audioBut.x=580;
			}else{
				this.audioBut.x=450;
			}
		}
	};

	p.audButDisplay=function(disp){
		if(disp=='show'){
			if(!oG.model.sdMode)this.audioBut.visible=true;
		}else{
			this.audioBut.visible=false;
		}
	};

	p.addGameLists=function(){
		this.backBut.addEventListener('click',this.backClickFun);
		this.backBut.cursor='pointer';
		this.settingsBut.addEventListener('click',this.settingsClickFun);
		this.settingsBut.cursor='pointer';
		this.audioBut.addEventListener('click',this.audioClickFun);
		this.audioBut.cursor='pointer';
	};

	p.removeGameLists=function(){
		this.backBut.removeEventListener('click',this.backClickFun);
		this.backBut.cursor='default';
		this.settingsBut.removeEventListener('click',this.settingsClickFun);
		this.settingsBut.cursor='default';
		this.audioBut.removeEventListener('click',this.audioClickFun);
		this.audioBut.cursor='default';
	};

	p.init=function(){
		this.rVar=0;
		oG.metrics.init();
		this.targetSet.init();
		this.optionsSet.init();
		this.countdownTimer.init();

		opdLib.fadeIn(this.targetSet,300,100);
		opdLib.fadeIn(this.countdownTimer,300,100);
		opdLib.fadeIn(this.backBut,300,100);
		opdLib.fadeIn(this.audioBut,300,100);
		opdLib.fadeIn(this.settingsBut,300,100);

		this.targetSet.startClear();
		this.optionsSet.alpha=0;

		this.addGameLists();

		this.suddenDeathText.visible=false;
		this.gameOverText.visible=false;
		this.youWinText.visible=false;
		this.suddenDeathDown.visible=false;

		this.updateDispFromSettings();

		this.rOut=setTimeout(this.startGameFun,600);
	};

	p.deit=function(){
		oG.metrics.deit();
		this.targetSet.deit();
		this.optionsSet.deit();
		this.countdownTimer.deit();

		this.removeGameLists();

		clearTimeout(this.rOut);

		oG.model.sdMode=false;
		oG.model.sdStart=false;
	};

	oG.Views.GameView=createjs.promote(GameView,'Container');
}(opdGame));


(function(oG){//checked
	var monthText=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var LINE_HEIGHT=38;

	function HighScoresTable(){
		this.Container_constructor();
		this.startUpFun=this.startUp.bind(this);
		this.stopUpFun=this.stopUp.bind(this);
		this.startDownFun=this.startDown.bind(this);
		this.stopDownFun=this.stopDown.bind(this);
		this.scrollUpFun=this.scrollUp.bind(this);
		this.scrollDownFun=this.scrollDown.bind(this);
		this.setup();
	}
	var p=createjs.extend(HighScoresTable,createjs.Container);

	p.setup=function(){
		this.addScoresFunction=function(){};
		this.rowsCount=0;
		this.fieldsMade=false;
		this.rows=8;
		this.tableType='scores';
		this.titleFont='bold 32px Arial';
		this.titleFontColor='#000';
		this.titlesFont='bold 22px Arial';
		this.titlesFontColor='#222';
		this.fieldsFont='bold 20px Arial';
		this.fieldsFontColor='#333';
		this.backPaneColor='#fff';
		this.backPaneAlpha=0.3;
		this.backPaneBorderColor='#000';
		this.backPaneBorderWidth=0;
	};

	p.initialSetup=function(){
		this.backPane=new createjs.Shape();

		this.titleText=new createjs.Text('',this.titleFont,this.titleFontColor);
		opdLib.centerText(this.titleText);

		this.titlesContainer=new createjs.Container();
		this.fieldsContainer=new createjs.Container();

		this.fieldsMask=new createjs.Shape();
		this.fieldsContainer.mask=this.fieldsMask;

		this.backPane.alpha=this.backPaneAlpha;

		this.myUpBut=opdLib.drawArrow(28,'#ff8');
		this.myDownBut=opdLib.drawArrow(28,'#ff8');
		this.myUpBut.rotation=-90;
		this.myDownBut.rotation=90;
		this.myUpBut.cursor='pointer';
		this.myDownBut.cursor='pointer';

		switch(this.tableType){
			case 'time':
			this.titleLabels=['Name','Time','Date','Location'];
			this.xInd=[94,214,305,415];
			this.addScoresFunction=this.addScoresFunTime;
			break;
			case 'timeRound':
			this.titleLabels=['Name','Time','Round','Date','Location'];
			this.xInd=[72,170,240,320,420];
			this.addScoresFunction=this.addScoresFunTimeRound;
			break;
			case 'movesTime':
			this.titleLabels=['Name','Moves','Time','Date','Location'];
			this.xInd=[77,175,245,320,420];
			this.addScoresFunction=this.addScoresFunMovesTime;
			break;
			case 'scoreMoves':
			this.titleLabels=['Name','Score','Moves','Date','Location'];
			this.xInd=[77,175,245,320,420];
			this.addScoresFunction=this.addScoresFunScoreMoves;
			break;
			case 'scoreTime':
			this.titleLabels=['Name','Score','Time','Date','Location'];
			this.xInd=[77,175,245,320,420];
			this.addScoresFunction=this.addScoresFunScoreTime;
			break;
			default:
			//'scores'
			this.titleLabels=['Name','Score','Date','Location'];
			this.xInd=[94,214,305,415];
			this.addScoresFunction=this.addScoresFunScores;
			break;
		}

		this.columns=this.titleLabels.length;

		this.tFields=[];
		this.titles=[];
		for(var i=0;i<this.columns;i++){
			this.titles[i]=new createjs.Text(this.titleLabels[i],this.titlesFont,this.titlesFontColor);
			this.titlesContainer.addChild(this.titles[i]);
			this.titles[i].x=this.xInd[i];
			opdLib.centerText(this.titles[i]);

			this.tFields[i]=new createjs.Text('',this.fieldsFont,this.fieldsFontColor);
			this.fieldsContainer.addChild(this.tFields[i]);
			this.tFields[i].maxWidth=150;
			this.tFields[i].lineHeight=LINE_HEIGHT;
			this.tFields[i].x=this.xInd[i];
			opdLib.centerText(this.tFields[i]);
		}

		this.addChild(this.backPane,this.titlesContainer,this.fieldsContainer,this.titleText);
		this.addChild(this.myUpBut,this.myDownBut);

		this.setupDisplay();
	};

	p.setupDisplay=function(){
		if(oG.model.orientation===0){
			this.fieldsMask.graphics.clear().beginFill('#000').drawRect(160,130,600,296);
			opdLib.posItem(this.titleText,415,64);
			opdLib.posItem(this.titlesContainer,168,109);
			this.baseY=151;
			this.fieldsX=168;
			opdLib.posItem(this.myUpBut,730,200);
			opdLib.posItem(this.myDownBut,730,310);
		}else{
			this.fieldsMask.graphics.clear().beginFill('#000').drawRect(35,260,600,296);
			opdLib.posItem(this.titleText,278,194);
			opdLib.posItem(this.titlesContainer,31,239);
			this.baseY=281;
			this.fieldsX=31;
			opdLib.posItem(this.myUpBut,275,32);
			opdLib.posItem(this.myDownBut,275,118);
		}
		opdLib.posItem(this.fieldsContainer,this.fieldsX,this.baseY);
		this.drawBackPane();
		this.setMinY();
	};

	p.drawBackPane=function(){
		this.backPane.graphics.clear().beginFill(this.backPaneColor);
		if(this.backPaneBorderWidth>0){
			this.backPane.graphics.setStrokeStyle(this.backPaneBorderWidth).beginStroke(this.backPaneBorderColor);
		}
		if(oG.model.orientation===0){
			this.backPane.graphics.drawRoundRect(170,20,500,426,24);
		}else{
			this.backPane.graphics.drawRoundRect(25,150,500,426,24);
		}
		this.backPane.alpha=this.backPaneAlpha;
	};

	p.setMinY=function(){
		if(this.rowsCount<=this.rows){
			this.minY=this.baseY;
		}else{
			this.minY=this.baseY-((this.rowsCount-8)*LINE_HEIGHT);
		}
	};

	p.showScores=function(jsonArr){
		this.jsonArr=jsonArr;
		this.addScoresFunction();
		this.setMinY();
	};

	p.startUp=function(event){
		this.delta=0;
		createjs.Ticker.addEventListener('tick',this.scrollUpFun);
		this.myUpBut.addEventListener('mouseout',this.stopUpFun);
	};

	p.stopUp=function(event){
		if(!oG.model.touchMode){
			createjs.Ticker.removeEventListener('tick',this.scrollUpFun);
			this.myUpBut.removeEventListener('mouseout',this.stopUpFun);
		}
		if(this.delta===0){
			for(var i=0;i<this.rows;i++){this.scrollUp();}
		}
		this.delta=0;
	};

	p.startDown=function(event){
		this.delta=0;
		createjs.Ticker.addEventListener('tick',this.scrollDownFun);
		this.myDownBut.addEventListener('mouseout',this.stopDownFun);
	};

	p.stopDown=function(event){
		if(!oG.model.touchMode){
			createjs.Ticker.removeEventListener('tick',this.scrollDownFun);
			this.myDownBut.removeEventListener('mouseout',this.stopDownFun);
		}
		if(this.delta===0){
			for(var i=0;i<this.rows;i++){this.scrollDown();}
		}
		this.delta=0;
	};

	p.scrollUp=function(){
		this.delta++;
		this.fieldsContainer.y+=LINE_HEIGHT;
		if(this.fieldsContainer.y>=this.baseY){
			this.fieldsContainer.y=this.baseY;
			createjs.Ticker.removeEventListener('tick',this.scrollUpFun);
			this.myUpBut.removeEventListener('mouseout',this.stopUpFun);
		}
	};

	p.scrollDown=function(){
		this.delta++;
		this.fieldsContainer.y-=LINE_HEIGHT;
		if(this.fieldsContainer.y<=this.minY){
			this.fieldsContainer.y=this.minY;
			createjs.Ticker.removeEventListener('tick',this.scrollDownFun);
			this.myDownBut.removeEventListener('mouseout',this.stopDownFun);
		}
	};

	p.addLists=function(){
		if(!oG.model.touchMode){
			this.myUpBut.addEventListener('mousedown',this.startUpFun);
			this.myDownBut.addEventListener('mousedown',this.startDownFun);
		}
		this.myUpBut.addEventListener('click',this.stopUpFun);
		this.myDownBut.addEventListener('click',this.stopDownFun);
	};

	p.removeLists=function(){
		if(!oG.model.touchMode){
			this.myUpBut.removeEventListener('mousedown',this.startUpFun);
			this.myDownBut.removeEventListener('mousedown',this.startDownFun);
		}
		this.myUpBut.removeEventListener('click',this.stopUpFun);
		this.myDownBut.removeEventListener('click',this.stopDownFun);
	};

	p.init=function(){
		this.delta=0;
		this.rowsCount=0;
		opdLib.posItem(this.fieldsContainer,this.fieldsX,this.baseY);
		this.titleText.text='Content : '+oG.model.contentTitle;
		this.addLists();
	};

	p.deit=function(){
		this.rowsCount=0;
		this.removeLists();
	};

	p.addScoresFunMovesTime=function(){
		var i=0;
		for(i=0;i<this.tFields.length;i++)this.tFields[i].text='';
		var myDate=new Date();
		this.rowsCount=this.jsonArr.scores.length;
		for(i=0;i<this.rowsCount;i++){
			myDate.setTime(this.jsonArr.scores[i].Dote);
			var myMon=monthText[myDate.getMonth()];
			var myDay=myDate.getDate();
			this.tFields[0].text+=this.jsonArr.scores[i].Nom+'\r\n';
			this.tFields[1].text+=this.jsonArr.scores[i].Muves+'\r\n';
			this.tFields[2].text+=this.jsonArr.scores[i].Tome+'s\r\n';
			this.tFields[3].text+=myDay+'-'+myMon+'\r\n';
			this.tFields[4].text+=this.jsonArr.scores[i].Local+'\r\n';
		}
	};

	p.addScoresFunScoreMoves=function(){
		var i=0;
		for(i=0;i<this.tFields.length;i++)this.tFields[i].text='';
		var myDate=new Date();
		this.rowsCount=this.jsonArr.scores.length;
		for(i=0;i<this.rowsCount;i++){
			myDate.setTime(this.jsonArr.scores[i].Dote);
			var myMon=monthText[myDate.getMonth()];
			var myDay=myDate.getDate();
			this.tFields[0].text+=this.jsonArr.scores[i].Nom+'\r\n';
			this.tFields[1].text+=this.jsonArr.scores[i].Score+'\r\n';
			this.tFields[2].text+=this.jsonArr.scores[i].Muves+'\r\n';
			this.tFields[3].text+=myDay+'-'+myMon+'\r\n';
			this.tFields[4].text+=this.jsonArr.scores[i].Local+'\r\n';
		}
	};

	p.addScoresFunScoreTime=function(){
		var i=0;
		for(i=0;i<this.tFields.length;i++)this.tFields[i].text='';
		var myDate=new Date();
		this.rowsCount=this.jsonArr.scores.length;
		for(i=0;i<this.rowsCount;i++){
			myDate.setTime(this.jsonArr.scores[i].Dote);
			var myMon=monthText[myDate.getMonth()];
			var myDay=myDate.getDate();
			this.tFields[0].text+=this.jsonArr.scores[i].Nom+'\r\n';
			this.tFields[1].text+=this.jsonArr.scores[i].Score+'\r\n';
			this.tFields[2].text+=this.jsonArr.scores[i].Tome+'\r\n';
			this.tFields[3].text+=myDay+'-'+myMon+'\r\n';
			this.tFields[4].text+=this.jsonArr.scores[i].Local+'\r\n';
		}
	};

	p.addScoresFunTimeRound=function(){
		var i=0;
		for(i=0;i<this.tFields.length;i++)this.tFields[i].text='';
		var myDate=new Date();
		this.rowsCount=this.jsonArr.scores.length;
		for(i=0;i<this.rowsCount;i++){
			myDate.setTime(this.jsonArr.scores[i].Dote);
			var myMon=monthText[myDate.getMonth()];
			var myDay=myDate.getDate();
			this.tFields[0].text+=this.jsonArr.scores[i].Nom+'\r\n';
			this.tFields[1].text+=this.jsonArr.scores[i].Tome+'s\r\n';
			this.tFields[2].text+=this.jsonArr.scores[i].Score+'\r\n';
			this.tFields[3].text+=myDay+'-'+myMon+'\r\n';
			this.tFields[4].text+=this.jsonArr.scores[i].Local+'\r\n';
		}
	};

	p.addScoresFunScores=function(){
		var i=0;
		for(i=0;i<this.tFields.length;i++)this.tFields[i].text='';
		var myDate=new Date();
		this.rowsCount=this.jsonArr.scores.length;
		for(i=0;i<this.rowsCount;i++){
			myDate.setTime(this.jsonArr.scores[i].Dote);
			var myMon=monthText[myDate.getMonth()];
			var myDay=myDate.getDate();
			this.tFields[0].text+=this.jsonArr.scores[i].Nom+'\r\n';
			this.tFields[1].text+=this.jsonArr.scores[i].Score+'\r\n';
			this.tFields[2].text+=myDay+'-'+myMon+'\r\n';
			this.tFields[3].text+=this.jsonArr.scores[i].Local+'\r\n';
		}
	};

	p.addScoresFunTime=function(){
		var i=0;
		for(i=0;i<this.tFields.length;i++)this.tFields[i].text='';
		var myDate=new Date();
		this.rowsCount=this.jsonArr.scores.length;
		for(i=0;i<this.rowsCount;i++){
			myDate.setTime(this.jsonArr.scores[i].Dote);
			var myMon=monthText[myDate.getMonth()];
			var myDay=myDate.getDate();
			this.tFields[0].text+=this.jsonArr.scores[i].Nom+'\r\n';
			this.tFields[1].text+=this.jsonArr.scores[i].Tome+'\r\n';
			this.tFields[2].text+=myDay+'-'+myMon+'\r\n';
			this.tFields[3].text+=this.jsonArr.scores[i].Local+'\r\n';
		}
	};

	oG.Modules.HighScoresTable=createjs.promote(HighScoresTable,'Container');
}(opdGame));


(function(oG){//checked
	var imsFrames=[];

	function getImFramesLoc($var){
		return imsFrames[$var];
	}

imsFrames[0]=[
	[1381,1,66,61,0,33,29],
	[1449,1,63,61,0,31,27],
	[991,1,62,64,0,30,31],
	[1816,1,60,41,0,29,19],
	[1188,1,63,62,0,33,28],
	[666,1,62,65,0,30,31],
	[1055,1,64,63,0,31,30],
	[1754,1,60,50,0,29,23],
	[395,1,67,65,0,33,31],
	[1754,53,57,9,0,27,4],
	[1318,1,61,62,0,29,31],
	[198,1,65,66,0,32,31],
	[265,1,65,66,0,32,32],
	[332,1,61,66,0,30,32],
	[793,1,66,64,0,32,30],
	[130,1,66,66,0,33,31],
	[1640,1,55,58,0,27,26],
	[464,1,66,65,0,32,31],
	[861,1,63,64,0,30,31],
	[1,1,66,67,0,32,32],
	[532,1,66,65,0,33,31],
	[1577,1,61,59,0,29,30],
	[69,1,59,67,0,29,32],
	[1121,1,65,62,0,31,28],
	[730,1,61,65,0,32,30],
	[1697,1,55,57,0,27,25],
	[926,1,63,64,0,30,31],
	[600,1,64,65,0,32,31],
	[1514,1,61,61,0,30,27],
	[1253,1,63,62,0,31,30]
];

imsFrames[1]=[
	[552,1,65,65,0,32,31],
	[70,1,68,66,0,33,32],
	[350,1,65,66,0,32,32],
	[140,1,68,66,0,34,31],
	[868,65,63,66,0,32,32],
	[808,1,60,62,0,29,29],
	[343,69,62,64,0,31,30],
	[1,1,67,67,0,34,32],
	[738,68,65,60,0,32,29],
	[276,69,65,62,0,32,30],
	[870,1,59,62,0,29,28],
	[210,1,68,66,0,35,31],
	[805,68,61,61,0,31,31],
	[280,1,68,66,0,34,32],
	[70,69,67,64,0,33,31],
	[931,1,61,53,0,30,25],
	[473,69,63,62,0,31,31],
	[417,1,65,66,0,33,32],
	[673,68,63,65,0,32,31],
	[139,69,66,63,0,33,30],
	[748,1,58,65,0,29,32],
	[484,1,66,65,0,32,31],
	[207,69,67,61,0,33,27],
	[933,56,57,64,0,30,30],
	[686,1,60,65,0,28,31],
	[606,68,65,65,0,32,31],
	[407,69,64,62,0,33,28],
	[538,68,66,65,0,34,31],
	[1,70,67,63,0,33,29],
	[619,1,65,65,0,31,32]
];

imsFrames[2]=[
	[340,404,61,66,0,30,32],
	[418,1,41,57,0,19,25],
	[343,338,65,64,0,32,30],
	[274,404,64,66,0,32,31],
	[404,269,61,67,0,29,33],
	[138,403,66,66,0,33,32],
	[199,338,64,62,0,31,28],
	[413,134,52,63,0,30,28],
	[1,403,66,67,0,33,32],
	[206,402,66,66,0,32,31],
	[279,1,137,63,0,68,32],
	[274,337,67,65,0,33,31],
	[1,335,129,66,0,61,32],
	[1,203,134,64,0,67,30],
	[136,271,130,65,0,64,31],
	[403,404,61,65,0,32,30],
	[1,1,137,66,0,69,31],
	[1,136,134,65,0,68,31],
	[137,136,134,65,0,68,31],
	[279,66,136,66,0,67,31],
	[132,338,65,63,0,32,28],
	[140,68,135,66,0,70,31],
	[69,403,67,66,0,33,31],
	[273,202,134,65,0,66,31],
	[1,69,135,65,0,68,31],
	[140,1,137,65,0,68,31],
	[272,269,130,66,0,63,31],
	[137,203,133,66,0,65,32],
	[277,134,134,66,0,67,32],
	[1,269,133,64,0,66,31]
];

imsFrames[3]=[
	[209,1,136,65,0,68,31],
	[1843,1,68,65,0,33,31],
	[819,69,128,66,0,61,31],
	[621,1,133,66,0,65,32],
	[1303,1,134,65,0,68,30],
	[1,68,136,67,0,68,32],
	[684,69,133,66,0,64,32],
	[1439,1,134,65,0,67,31],
	[139,68,134,67,0,66,32],
	[1083,68,130,65,0,64,31],
	[412,69,134,66,0,66,32],
	[1575,1,132,65,0,67,31],
	[1029,1,135,65,0,69,31],
	[1480,68,125,65,0,66,31],
	[1166,1,135,65,0,69,30],
	[1607,68,125,65,0,62,31],
	[1803,68,63,62,0,31,30],
	[485,1,134,66,0,68,32],
	[1,1,206,65,0,102,31],
	[1215,68,130,65,0,61,31],
	[347,1,136,66,0,66,31],
	[949,68,132,64,0,66,30],
	[1734,68,67,64,0,33,30],
	[1347,68,131,62,0,63,28],
	[1709,1,132,65,0,63,30],
	[1868,68,61,63,0,29,28],
	[891,1,136,65,0,67,31],
	[275,69,135,66,0,67,32],
	[756,1,133,66,0,64,32],
	[548,69,134,66,0,69,32]
];

imsFrames[4]=[
	[1034,1,133,65,0,68,32],
	[1155,68,131,65,0,65,31],
	[683,137,132,66,0,65,32],
	[951,137,129,66,0,64,31],
	[546,137,135,66,0,66,31],
	[545,69,136,66,0,68,31],
	[1169,1,131,65,0,64,31],
	[1280,135,132,62,0,66,28],
	[275,139,134,64,0,67,32],
	[1288,68,128,65,0,62,31],
	[1217,135,61,65,0,29,31],
	[819,69,131,66,0,63,32],
	[1,70,205,67,0,101,33],
	[208,70,200,67,0,96,32],
	[1,1,207,67,0,104,32],
	[1,139,135,64,0,68,29],
	[348,1,135,67,0,68,32],
	[952,68,201,65,0,100,31],
	[1368,1,49,59,0,24,27],
	[826,1,206,65,0,103,31],
	[683,69,134,66,0,65,31],
	[410,70,133,67,0,66,32],
	[1302,1,64,65,0,32,31],
	[817,137,132,66,0,65,32],
	[210,1,136,67,0,67,33],
	[411,139,133,62,0,65,28],
	[138,139,135,64,0,66,30],
	[691,1,133,66,0,64,31],
	[485,1,204,66,0,102,32],
	[1082,135,133,65,0,67,31]
];

imsFrames[5]=[
	[395,409,61,59,0,29,28],
	[273,138,134,65,0,65,31],
	[1,139,134,65,0,66,31],
	[139,70,132,67,0,62,32],
	[266,339,132,63,0,64,29],
	[139,206,131,66,0,65,31],
	[278,69,134,67,0,67,32],
	[331,404,62,62,0,28,28],
	[1,272,131,65,0,64,31],
	[272,272,133,65,0,69,31],
	[414,69,60,66,0,31,31],
	[199,404,63,66,0,31,32],
	[1,339,131,63,0,67,29],
	[1,206,136,64,0,67,30],
	[409,205,64,66,0,31,32],
	[264,404,65,62,0,31,28],
	[400,341,68,66,0,34,33],
	[1,71,133,66,0,66,32],
	[134,340,129,62,0,61,30],
	[1,404,64,65,0,31,31],
	[407,273,67,66,0,33,32],
	[134,274,130,64,0,68,30],
	[137,139,134,65,0,67,31],
	[278,1,137,66,0,69,31],
	[67,404,64,65,0,32,31],
	[133,404,64,65,0,31,32],
	[1,1,136,68,0,68,33],
	[409,138,65,65,0,32,31],
	[139,1,137,67,0,67,32],
	[273,205,134,65,0,67,31]
];

imsFrames[6]=[
	[204,409,46,66,0,22,32],
	[1,140,138,67,0,69,32],
	[139,277,133,62,0,66,28],
	[1,278,132,66,0,67,31],
	[1,414,66,65,0,32,31],
	[338,70,133,64,0,65,31],
	[268,345,124,63,0,67,31],
	[134,1,202,65,0,100,31],
	[141,140,130,68,0,66,33],
	[252,410,65,62,0,31,28],
	[408,136,66,64,0,32,31],
	[274,277,131,66,0,66,32],
	[69,414,63,65,0,33,31],
	[1,1,131,68,0,67,33],
	[384,412,63,62,0,32,28],
	[199,68,137,66,0,69,32],
	[1,209,136,67,0,68,32],
	[394,345,66,65,0,32,31],
	[338,1,130,67,0,62,32],
	[1,346,65,66,0,33,32],
	[408,202,66,64,0,32,30],
	[273,136,133,66,0,67,32],
	[319,410,63,63,0,31,29],
	[275,204,131,65,0,64,31],
	[68,346,64,66,0,31,32],
	[135,341,131,66,0,65,32],
	[134,409,68,65,0,33,31],
	[407,271,66,65,0,32,31],
	[139,210,134,65,0,66,31],
	[1,71,196,67,0,92,33]
];

imsFrames[7]=[
	[874,65,60,62,0,29,28],
	[744,1,61,65,0,31,31],
	[209,70,65,67,0,32,33],
	[276,69,138,66,0,69,31],
	[199,1,66,67,0,32,32],
	[542,137,134,65,0,66,31],
	[678,68,126,65,0,64,31],
	[738,135,55,63,0,28,29],
	[679,1,63,65,0,32,31],
	[1,140,132,64,0,65,30],
	[339,137,132,66,0,63,32],
	[544,69,132,65,0,67,31],
	[135,140,65,64,0,33,31],
	[795,135,66,62,0,34,30],
	[416,69,69,66,0,34,32],
	[66,1,131,67,0,65,32],
	[678,135,58,63,0,28,31],
	[487,69,55,66,0,27,31],
	[202,139,135,65,0,68,32],
	[1,1,63,68,0,31,32],
	[138,70,69,67,0,35,32],
	[546,1,131,65,0,66,31],
	[807,1,63,62,0,30,28],
	[408,1,136,66,0,68,31],
	[267,1,139,66,0,69,31],
	[863,132,63,61,0,31,30],
	[806,68,66,62,0,32,28],
	[1,71,135,67,0,67,32],
	[874,1,62,62,0,30,31],
	[473,137,67,66,0,33,31]
];

imsFrames[8]=[
	[336,206,134,66,0,67,32],
	[334,403,64,63,0,32,30],
	[1,1,213,52,0,106,25],
	[1,325,66,66,0,33,32],
	[199,138,135,67,0,67,32],
	[1,191,135,66,0,68,32],
	[336,138,135,66,0,67,32],
	[273,274,131,63,0,63,29],
	[334,339,64,62,0,32,28],
	[406,338,65,63,0,32,29],
	[425,1,54,66,0,26,32],
	[69,325,65,65,0,34,31],
	[406,274,66,62,0,34,30],
	[203,274,68,64,0,34,31],
	[203,69,137,67,0,69,32],
	[342,69,137,67,0,68,32],
	[216,1,207,66,0,103,31],
	[198,207,133,65,0,66,31],
	[139,188,57,62,0,28,28],
	[68,393,130,65,0,64,31],
	[136,274,65,65,0,32,31],
	[1,55,200,66,0,102,31],
	[266,407,63,60,0,31,31],
	[1,123,136,66,0,68,32],
	[1,259,133,64,0,65,30],
	[200,341,132,64,0,64,30],
	[1,393,65,66,0,32,32],
	[139,123,58,63,0,29,29],
	[200,407,64,61,0,31,27],
	[400,403,64,63,0,32,28]
];

imsFrames[9]=[
	[274,409,66,62,0,32,30],
	[272,341,65,66,0,32,31],
	[138,341,132,66,0,67,31],
	[141,137,134,65,0,69,31],
	[406,337,65,64,0,32,30],
	[1,204,137,66,0,68,31],
	[141,68,134,67,0,65,32],
	[209,1,135,65,0,66,31],
	[339,338,61,61,0,29,31],
	[140,204,133,67,0,65,32],
	[273,273,64,66,0,32,32],
	[347,203,65,65,0,34,31],
	[277,68,133,65,0,67,31],
	[406,270,65,65,0,32,31],
	[277,203,68,65,0,33,31],
	[412,68,58,65,0,28,31],
	[342,403,67,62,0,34,28],
	[339,270,65,66,0,31,32],
	[346,1,122,65,0,62,31],
	[1,272,135,67,0,66,32],
	[1,1,206,65,0,102,31],
	[409,135,60,65,0,29,31],
	[1,68,138,66,0,69,32],
	[138,273,133,66,0,64,32],
	[138,409,66,63,0,32,32],
	[1,341,135,67,0,66,33],
	[277,135,130,66,0,63,31],
	[1,136,138,66,0,69,32],
	[206,409,66,63,0,33,30],
	[1,410,135,62,0,67,31]
];

imsFrames[10]=[
	[1,138,134,66,0,64,32],
	[192,409,65,65,0,32,31],
	[1,272,133,66,0,67,31],
	[339,337,131,65,0,62,31],
	[380,404,65,64,0,34,30],
	[207,137,134,66,0,68,31],
	[137,267,65,66,0,33,32],
	[137,204,67,61,0,33,27],
	[208,69,136,66,0,68,32],
	[206,205,133,68,0,68,34],
	[208,1,201,66,0,101,32],
	[1,406,123,67,0,63,33],
	[346,136,135,66,0,67,31],
	[447,404,63,63,0,31,29],
	[1,206,134,64,0,67,31],
	[1,340,132,64,0,65,30],
	[138,70,67,67,0,33,32],
	[341,269,133,66,0,68,32],
	[1,1,205,67,0,102,32],
	[259,409,62,65,0,31,31],
	[343,204,134,63,0,67,29],
	[136,335,65,66,0,32,30],
	[137,139,67,63,0,33,28],
	[411,1,68,66,0,33,31],
	[346,69,136,65,0,68,31],
	[126,406,64,66,0,31,31],
	[1,70,135,66,0,68,32],
	[323,409,55,65,0,30,31],
	[203,342,131,65,0,62,31],
	[204,275,133,65,0,66,31]
];

imsFrames[11]=[
	[273,273,66,66,0,33,32],
	[206,341,65,63,0,33,32],
	[272,205,67,66,0,33,31],
	[341,205,135,65,0,68,31],
	[204,1,137,67,0,68,32],
	[400,406,67,65,0,34,31],
	[1,137,136,65,0,68,31],
	[343,1,133,66,0,63,31],
	[139,138,136,65,0,68,31],
	[1,273,134,67,0,67,32],
	[274,473,67,64,0,33,32],
	[1,411,134,66,0,67,31],
	[1,69,137,66,0,68,32],
	[273,341,66,62,0,34,30],
	[343,473,64,64,0,30,31],
	[189,70,137,66,0,68,32],
	[137,273,134,66,0,67,32],
	[341,272,135,65,0,67,31],
	[1,204,135,67,0,68,32],
	[328,137,136,66,0,68,32],
	[1,342,134,67,0,67,32],
	[137,406,134,65,0,67,31],
	[137,341,67,63,0,33,28],
	[343,69,133,66,0,67,32],
	[140,69,47,51,0,23,22],
	[341,339,135,65,0,68,31],
	[137,473,135,64,0,66,29],
	[273,406,125,65,0,65,31],
	[1,1,201,66,0,97,31],
	[138,205,132,66,0,65,32]
];

imsFrames[12]=[
	[616,1,134,66,0,66,32],
	[202,1,138,66,0,69,32],
	[684,69,132,66,0,65,32],
	[549,137,131,67,0,65,33],
	[953,134,123,65,0,67,31],
	[951,65,65,65,0,33,31],
	[1078,134,65,65,0,32,31],
	[342,1,135,66,0,66,32],
	[888,1,135,62,0,66,30],
	[1150,130,60,58,0,29,26],
	[548,69,134,66,0,67,31],
	[1025,1,131,65,0,67,31],
	[415,137,132,67,0,63,32],
	[884,137,67,66,0,34,31],
	[1,70,138,67,0,70,32],
	[1158,1,56,65,0,28,31],
	[276,69,133,68,0,66,32],
	[1,1,199,67,0,98,32],
	[1,139,137,65,0,69,31],
	[818,69,131,66,0,66,31],
	[752,1,134,66,0,66,31],
	[1018,68,130,64,0,67,30],
	[278,139,135,65,0,67,31],
	[479,1,135,66,0,68,32],
	[411,69,135,66,0,69,32],
	[141,70,133,67,0,65,32],
	[682,137,68,67,0,34,33],
	[1150,68,63,60,0,31,27],
	[752,137,130,66,0,62,31],
	[140,139,136,65,0,67,32]
];

imsFrames[13]=[
	[671,136,68,66,0,33,32],
	[276,69,135,66,0,68,32],
	[1,208,132,61,0,65,27],
	[413,69,134,66,0,65,31],
	[535,137,134,66,0,66,32],
	[277,1,135,66,0,68,31],
	[681,69,133,65,0,66,31],
	[816,68,67,65,0,33,31],
	[686,1,65,66,0,32,32],
	[614,205,137,65,0,68,32],
	[741,136,67,66,0,33,32],
	[819,201,62,65,0,31,31],
	[549,68,130,66,0,64,32],
	[138,1,137,66,0,67,31],
	[138,69,136,66,0,67,32],
	[1,1,135,67,0,66,32],
	[549,1,135,65,0,66,30],
	[1,70,135,67,0,67,32],
	[398,137,135,66,0,67,32],
	[135,208,64,59,0,32,27],
	[260,137,136,66,0,68,32],
	[201,208,210,53,0,102,25],
	[753,204,64,65,0,33,31],
	[810,136,136,63,0,69,28],
	[1,139,133,67,0,67,32],
	[885,68,59,65,0,30,32],
	[753,1,136,65,0,67,31],
	[413,205,199,65,0,102,31],
	[414,1,133,66,0,66,32],
	[136,139,122,67,0,57,33]
];

imsFrames[14]=[
	[806,138,62,65,0,31,31],
	[541,137,128,66,0,61,32],
	[278,1,135,66,0,68,31],
	[740,138,64,65,0,32,31],
	[617,69,67,66,0,33,32],
	[870,134,67,64,0,34,30],
	[963,1,134,65,0,68,31],
	[547,69,68,66,0,33,31],
	[415,1,135,66,0,67,32],
	[139,136,133,67,0,65,32],
	[1,138,135,65,0,67,31],
	[1,1,136,67,0,66,32],
	[689,68,131,65,0,68,31],
	[689,1,135,65,0,68,31],
	[274,136,132,66,0,64,31],
	[952,68,122,65,0,63,31],
	[822,68,128,64,0,64,30],
	[1073,138,65,60,0,31,25],
	[408,137,131,66,0,62,31],
	[413,69,132,66,0,67,31],
	[552,1,135,66,0,68,32],
	[1076,68,65,68,0,31,33],
	[139,1,137,65,0,68,31],
	[671,138,67,65,0,34,31],
	[1007,135,64,63,0,33,31],
	[277,69,134,65,0,67,31],
	[826,1,135,65,0,68,31],
	[939,135,66,64,0,32,30],
	[1,70,136,66,0,68,32],
	[139,68,136,66,0,67,31]
];

imsFrames[15]=[
	[410,339,61,62,0,29,28],
	[343,338,65,62,0,34,28],
	[343,271,65,65,0,32,30],
	[139,69,137,65,0,68,31],
	[275,268,66,66,0,33,31],
	[1,1,137,66,0,68,32],
	[139,200,133,66,0,65,32],
	[139,268,134,65,0,67,31],
	[411,68,67,66,0,33,32],
	[418,1,59,63,0,32,28],
	[139,335,134,65,0,67,31],
	[343,204,67,65,0,33,31],
	[411,136,67,66,0,33,32],
	[276,137,68,61,0,33,28],
	[139,136,135,62,0,67,30],
	[346,137,63,65,0,32,31],
	[1,342,134,66,0,68,31],
	[137,402,131,66,0,63,31],
	[279,1,137,65,0,68,32],
	[275,336,66,64,0,32,31],
	[1,275,136,65,0,68,31],
	[274,200,67,66,0,33,32],
	[1,138,135,67,0,67,32],
	[1,207,136,66,0,67,31],
	[279,68,130,67,0,65,31],
	[410,272,65,65,0,33,31],
	[1,69,136,67,0,67,33],
	[412,204,66,66,0,33,31],
	[270,402,129,66,0,62,31],
	[140,1,137,66,0,68,32]
];

imsFrames[16]=[
	[137,274,136,65,0,67,31],
	[330,407,136,65,0,69,31],
	[138,70,136,66,0,68,31],
	[135,408,138,64,0,69,30],
	[1,70,135,67,0,66,32],
	[346,137,127,65,0,68,31],
	[1,1,205,67,0,102,32],
	[1,139,134,66,0,68,31],
	[345,204,132,66,0,68,31],
	[346,69,128,66,0,68,32],
	[275,206,66,63,0,33,31],
	[1,343,132,66,0,69,32],
	[275,335,63,61,0,31,27],
	[340,340,137,65,0,68,31],
	[275,398,53,61,0,26,28],
	[346,1,130,66,0,64,31],
	[138,138,136,66,0,68,32],
	[137,206,136,66,0,67,32],
	[1,411,132,63,0,65,28],
	[272,474,135,62,0,66,28],
	[208,1,136,67,0,67,32],
	[341,272,136,66,0,67,31],
	[1,476,132,63,0,67,29],
	[136,341,137,65,0,69,31],
	[275,271,64,62,0,31,27],
	[1,207,134,66,0,66,32],
	[276,70,68,67,0,32,32],
	[135,474,135,65,0,67,31],
	[1,275,133,66,0,66,32],
	[276,139,67,65,0,33,31]
];

imsFrames[17]=[
	[1073,68,66,65,0,33,32],
	[277,137,134,66,0,67,31],
	[1141,70,66,65,0,33,31],
	[1147,137,66,63,0,32,29],
	[1,69,137,66,0,67,32],
	[886,1,127,65,0,59,31],
	[1,137,137,66,0,67,32],
	[815,68,128,65,0,65,31],
	[140,69,137,66,0,68,31],
	[485,1,133,65,0,68,31],
	[348,1,135,65,0,68,31],
	[414,68,134,67,0,67,32],
	[817,135,126,65,0,67,31],
	[1082,137,63,66,0,31,31],
	[620,1,132,65,0,66,32],
	[945,135,65,65,0,32,31],
	[945,68,126,65,0,66,31],
	[1012,135,68,62,0,34,28],
	[279,69,133,66,0,64,31],
	[1,1,206,66,0,101,31],
	[550,68,133,67,0,67,32],
	[685,68,128,67,0,61,32],
	[682,137,133,65,0,65,31],
	[209,1,137,66,0,68,31],
	[1143,1,67,67,0,34,32],
	[413,137,133,66,0,65,32],
	[140,137,135,66,0,65,31],
	[754,1,130,65,0,63,31],
	[1015,1,126,65,0,66,31],
	[548,137,132,66,0,64,31]
];

imsFrames[18]=[
	[403,337,65,63,0,32,30],
	[137,407,133,65,0,68,31],
	[278,68,136,63,0,67,28],
	[278,1,137,65,0,69,31],
	[140,273,124,65,0,67,31],
	[266,273,67,65,0,35,32],
	[1,70,135,66,0,66,32],
	[138,137,131,66,0,67,31],
	[269,340,67,65,0,34,31],
	[342,201,67,66,0,33,31],
	[1,1,136,67,0,67,32],
	[139,1,137,66,0,68,32],
	[272,407,67,65,0,33,31],
	[139,69,133,66,0,66,32],
	[341,403,62,65,0,32,31],
	[1,138,135,66,0,66,31],
	[139,205,131,66,0,68,32],
	[404,133,67,66,0,33,32],
	[1,407,134,65,0,66,31],
	[403,269,64,66,0,33,31],
	[411,201,62,66,0,31,32],
	[272,201,68,66,0,33,32],
	[1,206,136,65,0,68,31],
	[338,336,63,65,0,32,31],
	[405,402,64,62,0,32,31],
	[274,133,128,66,0,66,31],
	[335,269,66,65,0,34,30],
	[1,273,137,65,0,67,31],
	[138,340,129,65,0,62,31],
	[1,340,135,65,0,66,31]
];

imsFrames[19]=[
	[684,1,134,65,0,66,32],
	[198,137,137,63,0,69,29],
	[549,69,135,65,0,68,31],
	[743,136,132,65,0,67,31],
	[414,69,133,66,0,67,32],
	[1143,69,59,62,0,30,28],
	[139,70,137,65,0,68,31],
	[277,1,134,66,0,68,31],
	[820,1,130,65,0,67,31],
	[133,139,63,59,0,31,26],
	[278,69,134,66,0,68,32],
	[686,68,131,66,0,62,32],
	[819,68,131,66,0,65,32],
	[549,1,133,66,0,65,31],
	[1080,135,63,63,0,32,29],
	[877,136,132,65,0,66,30],
	[1011,136,67,65,0,34,30],
	[337,137,135,63,0,67,31],
	[1,139,130,62,0,62,31],
	[952,69,124,65,0,62,31],
	[1,1,136,67,0,70,32],
	[1078,69,63,64,0,32,30],
	[608,136,133,65,0,68,31],
	[1145,133,58,66,0,31,32],
	[952,1,131,66,0,66,32],
	[474,137,132,64,0,66,31],
	[1,70,136,67,0,68,32],
	[1085,1,62,66,0,30,32],
	[139,1,136,67,0,68,32],
	[413,1,134,66,0,68,32]
];

imsFrames[20]=[
    [453,1,64,63,0,32,31],
    [651,1,64,65,0,31,31],
    [123,68,64,66,0,31,32],
    [717,1,66,65,0,33,31],
    [853,1,65,65,0,34,31],
    [729,68,67,66,0,33,31],
    [58,68,63,65,0,31,31],
    [920,1,54,65,0,27,31],
    [935,68,59,67,0,29,34],
    [128,1,57,62,0,28,28],
    [519,1,64,64,0,34,30],
    [798,68,65,66,0,35,32],
    [1,68,55,65,0,27,31],
    [391,68,65,66,0,32,31],
    [458,68,67,66,0,34,32],
    [527,68,66,66,0,33,32],
    [785,1,66,65,0,33,32],
    [660,68,67,66,0,33,31],
    [385,1,66,63,0,33,29],
    [64,1,62,62,0,32,28],
    [585,1,64,65,0,33,31],
    [595,68,63,66,0,32,32],
    [187,1,64,62,0,32,29],
    [315,1,68,62,0,33,28],
    [1,1,61,61,0,30,27],
    [189,68,65,66,0,32,31],
    [256,68,65,66,0,32,32],
    [323,68,66,66,0,33,32],
    [865,68,68,67,0,33,32],
    [253,1,60,62,0,30,27]
];

imsFrames[21]=[
    [269,1,61,63,0,31,30],
    [271,68,66,66,0,33,32],
    [607,1,65,64,0,32,30],
    [469,1,67,63,0,33,28],
    [408,68,66,66,0,32,32],
    [204,68,65,66,0,33,31],
    [937,1,61,65,0,31,31],
    [202,1,65,62,0,33,28],
    [1,68,62,65,0,31,31],
    [616,68,66,66,0,32,32],
    [65,68,67,65,0,34,31],
    [136,1,64,62,0,31,28],
    [134,68,68,66,0,33,31],
    [1,1,66,60,0,32,26],
    [332,1,67,63,0,33,29],
    [547,68,67,66,0,33,32],
    [954,68,67,67,0,33,32],
    [806,1,61,65,0,31,31],
    [817,68,64,67,0,32,32],
    [674,1,65,64,0,34,30],
    [750,68,65,66,0,33,32],
    [684,68,64,66,0,31,32],
    [476,68,69,66,0,34,32],
    [401,1,66,63,0,33,30],
    [69,1,65,61,0,31,29],
    [538,1,67,64,0,33,30],
    [741,1,63,65,0,31,31],
    [339,68,67,66,0,32,31],
    [883,68,69,67,0,34,32],
    [869,1,66,65,0,33,31]
];

imsFrames[22]=[
    [203,68,57,65,0,27,32],
    [262,68,65,65,0,32,31],
    [329,68,63,66,0,29,31],
    [912,1,63,65,0,30,31],
    [69,68,63,65,0,30,31],
    [134,68,67,65,0,33,31],
    [847,68,66,66,0,33,31],
    [1,68,66,65,0,32,31],
    [915,68,66,67,0,32,32],
    [728,68,53,66,0,26,31],
    [528,68,65,66,0,32,31],
    [463,68,63,66,0,31,32],
    [660,68,66,66,0,33,32],
    [782,1,61,65,0,30,31],
    [60,1,66,59,0,32,29],
    [845,1,65,65,0,32,31],
    [595,68,63,66,0,32,31],
    [516,1,67,65,0,32,32],
    [385,1,65,64,0,32,31],
    [315,1,68,63,0,34,30],
    [783,68,62,66,0,29,32],
    [585,1,66,65,0,32,31],
    [653,1,64,65,0,31,31],
    [185,1,64,62,0,31,29],
    [1,1,57,58,0,30,26],
    [394,68,67,66,0,33,32],
    [719,1,61,65,0,32,31],
    [251,1,62,62,0,29,28],
    [128,1,55,61,0,28,27],
    [452,1,62,65,0,30,31]
];

imsFrames[23]=[
    [1,1,58,66,0,28,32],
    [248,1,61,65,0,32,31],
    [61,1,59,62,0,29,28],
    [1,69,64,65,0,33,31],
    [334,69,65,65,0,33,31],
    [68,138,65,65,0,33,31],
    [339,138,67,67,0,33,32],
    [401,69,65,65,0,32,31],
    [67,69,64,65,0,32,31],
    [440,1,64,66,0,31,31],
    [311,1,62,66,0,29,32],
    [271,138,66,62,0,32,28],
    [408,138,67,65,0,33,32],
    [1,138,65,65,0,32,31],
    [122,1,61,64,0,30,30],
    [185,1,61,64,0,31,30],
    [1,207,68,65,0,34,30],
    [375,1,63,66,0,33,31],
    [141,207,68,66,0,33,32],
    [71,207,68,66,0,34,32],
    [135,138,66,66,0,33,32],
    [133,69,65,67,0,32,32],
    [200,69,65,64,0,33,31],
    [203,138,66,64,0,32,30],
    [267,69,65,65,0,33,31],
    [271,275,137,65,0,68,30],
    [133,275,136,65,0,67,30],
    [211,207,127,64,0,62,29],
    [1,275,130,65,0,62,31],
    [340,207,128,65,0,65,31]
];

imsFrames[24]=[
    [1,539,132,66,0,67,32],
    [272,335,138,66,0,69,31],
    [1,471,136,66,0,68,31],
    [139,200,135,65,0,68,31],
    [1,1,124,59,0,65,27],
    [1,608,134,67,0,67,32],
    [1,403,136,66,0,68,31],
    [137,608,135,67,0,67,32],
    [274,608,136,67,0,68,32],
    [139,403,129,66,0,61,32],
    [270,403,126,66,0,62,31],
    [139,66,130,65,0,68,31],
    [1,133,135,65,0,67,31],
    [139,471,133,66,0,67,31],
    [135,539,136,66,0,68,31],
    [1,66,136,64,0,67,30],
    [274,471,133,66,0,64,32],
    [261,1,131,63,0,66,29],
    [1,335,134,66,0,64,32],
    [271,267,134,66,0,65,32],
    [138,133,128,65,0,63,31],
    [268,133,129,65,0,62,30],
    [1,200,136,65,0,67,31],
    [271,66,136,65,0,67,31],
    [137,335,133,66,0,65,31],
    [134,267,135,65,0,69,31],
    [276,200,132,65,0,66,31],
    [1,267,131,65,0,66,31],
    [273,539,135,67,0,67,32],
    [127,1,132,62,0,64,28]
];

imsFrames[25]=[
    [139,611,133,67,0,66,33],
    [1,406,132,66,0,64,32],
    [274,135,132,65,0,63,31],
    [271,338,136,66,0,68,32],
    [135,406,135,66,0,66,32],
    [134,202,136,65,0,68,31],
    [1,542,137,67,0,70,32],
    [274,611,138,67,0,69,32],
    [1,135,134,65,0,68,31],
    [138,1,136,65,0,67,31],
    [1,68,134,65,0,67,31],
    [140,542,137,67,0,67,32],
    [275,68,134,65,0,67,31],
    [275,474,133,66,0,68,31],
    [1,474,137,66,0,68,31],
    [136,338,133,66,0,65,32],
    [140,474,133,66,0,66,31],
    [1,202,131,65,0,64,31],
    [137,68,136,65,0,67,31],
    [1,1,135,63,0,67,32],
    [1,270,134,66,0,67,31],
    [1,611,136,67,0,67,32],
    [1,338,133,66,0,66,31],
    [276,1,136,65,0,70,31],
    [279,542,135,67,0,69,32],
    [137,270,136,66,0,67,32],
    [137,135,135,65,0,67,31],
    [272,202,134,66,0,68,31],
    [275,270,131,66,0,68,32],
    [272,406,133,66,0,67,32]
];

imsFrames[26]=[
    [674,69,137,66,0,68,32],
    [1491,69,135,67,0,67,32],
    [1222,1,130,65,0,64,31],
    [813,69,135,66,0,69,31],
    [538,69,134,66,0,68,31],
    [273,1,137,64,0,68,31],
    [950,69,135,66,0,67,31],
    [410,69,126,66,0,61,31],
    [1354,69,135,66,0,67,31],
    [549,1,120,65,0,56,32],
    [1,1,132,63,0,68,29],
    [671,1,137,65,0,68,31],
    [1087,69,131,66,0,68,31],
    [1628,69,134,67,0,65,33],
    [135,1,136,63,0,68,32],
    [138,69,133,66,0,65,32],
    [273,69,135,66,0,67,31],
    [944,1,136,65,0,67,31],
    [412,1,135,65,0,67,31],
    [1,69,135,66,0,66,32],
    [1901,69,135,67,0,67,32],
    [810,1,132,65,0,63,31],
    [1760,1,135,66,0,68,32],
    [1354,1,132,65,0,66,31],
    [1488,1,137,66,0,69,31],
    [1764,69,135,67,0,67,32],
    [1082,1,138,65,0,69,31],
    [1627,1,131,66,0,66,32],
    [1897,1,133,66,0,66,31],
    [1220,69,132,66,0,65,32]
];

imsFrames[27]=[
    [276,1,130,63,0,67,29],
    [1,200,135,66,0,67,31],
    [1,336,135,66,0,68,32],
    [1,133,136,65,0,67,31],
    [141,541,135,67,0,68,32],
    [138,336,137,66,0,69,32],
    [1,404,136,66,0,68,31],
    [273,610,137,68,0,68,33],
    [278,541,135,67,0,69,32],
    [139,133,134,65,0,67,31],
    [277,336,134,66,0,68,31],
    [1,472,132,66,0,64,32],
    [139,404,129,66,0,63,32],
    [135,610,136,68,0,67,33],
    [270,404,137,66,0,69,31],
    [137,1,137,63,0,69,29],
    [276,268,137,66,0,68,32],
    [136,66,134,65,0,68,31],
    [1,610,132,67,0,67,32],
    [139,268,135,66,0,68,31],
    [138,200,133,66,0,66,32],
    [1,66,133,65,0,66,31],
    [272,66,138,65,0,68,31],
    [1,1,134,62,0,65,28],
    [275,133,130,65,0,67,31],
    [1,268,136,66,0,67,32],
    [1,541,138,67,0,70,32],
    [276,472,137,67,0,68,32],
    [135,472,139,67,0,69,32],
    [273,200,136,66,0,68,32]
];

imsFrames[28]=[
    [1,402,129,66,0,67,32],
    [132,402,137,66,0,69,31],
    [268,334,132,66,0,65,32],
    [134,539,133,67,0,67,32],
    [1,1,135,62,0,67,29],
    [1,199,136,65,0,68,31],
    [138,334,128,66,0,61,32],
    [136,132,135,65,0,67,31],
    [1,132,133,65,0,66,31],
    [271,402,135,66,0,67,31],
    [1,470,137,66,0,68,31],
    [1,539,131,67,0,64,32],
    [276,470,131,67,0,67,32],
    [140,470,134,66,0,68,32],
    [269,539,134,67,0,67,32],
    [1,334,135,66,0,66,32],
    [135,266,136,66,0,67,31],
    [271,65,131,65,0,66,31],
    [270,1,134,62,0,67,28],
    [134,608,133,67,0,64,32],
    [138,65,131,65,0,65,32],
    [269,608,138,68,0,68,33],
    [1,608,131,67,0,63,32],
    [1,266,132,66,0,68,31],
    [271,199,135,65,0,67,31],
    [139,199,130,65,0,63,31],
    [138,1,130,62,0,62,28],
    [1,65,135,63,0,67,30],
    [273,132,133,65,0,68,31],
    [273,266,134,66,0,68,32]
];

imsFrames[29]=[
    [133,338,131,66,0,67,32],
    [274,406,134,66,0,65,31],
    [1,474,134,66,0,66,31],
    [279,135,137,65,0,69,31],
    [136,406,136,66,0,69,31],
    [266,338,136,66,0,68,32],
    [137,474,132,66,0,64,32],
    [1,406,133,66,0,64,32],
    [1,135,137,65,0,67,31],
    [271,474,136,66,0,68,31],
    [278,542,129,67,0,61,32],
    [274,68,129,65,0,62,31],
    [1,68,135,65,0,68,31],
    [138,68,134,65,0,68,31],
    [140,542,136,67,0,67,32],
    [140,135,137,65,0,67,31],
    [275,611,133,67,0,67,33],
    [1,270,134,66,0,68,32],
    [278,202,136,66,0,68,32],
    [137,270,136,66,0,67,31],
    [1,611,135,67,0,68,32],
    [274,1,136,65,0,67,31],
    [139,1,133,65,0,69,31],
    [1,202,135,65,0,67,31],
    [138,611,135,67,0,66,32],
    [138,202,138,65,0,69,31],
    [1,1,136,64,0,68,30],
    [275,270,136,66,0,67,32],
    [1,338,130,66,0,67,31],
    [1,542,137,66,0,68,32]
];

imsFrames[30]=[
    [1,337,136,66,0,68,32],
    [135,405,135,66,0,68,31],
    [276,473,129,67,0,64,33],
    [275,1,133,64,0,67,30],
    [1,201,126,65,0,65,31],
    [277,134,135,65,0,66,31],
    [1,405,132,66,0,68,31],
    [139,337,134,66,0,68,31],
    [270,67,133,65,0,67,31],
    [275,337,136,66,0,68,32],
    [1,134,136,65,0,68,31],
    [1,611,131,67,0,68,32],
    [137,67,131,65,0,68,31],
    [272,405,132,66,0,67,32],
    [139,473,135,66,0,67,31],
    [129,201,136,65,0,68,31],
    [134,611,137,68,0,67,33],
    [267,542,134,67,0,66,32],
    [139,134,136,65,0,68,31],
    [267,201,134,66,0,66,32],
    [1,1,135,63,0,67,29],
    [1,67,134,65,0,67,31],
    [268,269,135,66,0,67,32],
    [129,542,136,67,0,67,32],
    [131,269,135,66,0,67,31],
    [138,1,135,64,0,69,29],
    [1,269,128,66,0,66,32],
    [273,611,138,68,0,69,33],
    [1,542,126,67,0,57,33],
    [1,473,136,66,0,68,32]
];

imsFrames[31]=[
    [1,269,130,65,0,67,32],
    [273,202,128,65,0,68,31],
    [1,542,137,67,0,67,32],
    [135,337,135,66,0,69,32],
    [141,473,136,66,0,67,31],
    [138,202,133,65,0,67,30],
    [1,405,136,66,0,67,31],
    [278,405,135,66,0,69,31],
    [140,542,136,67,0,68,32],
    [1,1,136,65,0,69,31],
    [139,405,137,66,0,69,32],
    [275,1,135,65,0,69,31],
    [1,68,135,65,0,68,31],
    [139,1,134,65,0,66,31],
    [272,337,134,66,0,66,31],
    [1,202,135,65,0,69,31],
    [1,473,138,66,0,69,32],
    [1,337,132,66,0,64,31],
    [278,542,134,67,0,67,32],
    [278,611,135,68,0,68,33],
    [278,68,133,65,0,66,31],
    [132,135,129,65,0,66,31],
    [263,135,134,65,0,65,32],
    [1,611,137,67,0,70,32],
    [1,135,129,65,0,65,31],
    [270,269,131,66,0,66,31],
    [133,269,135,66,0,66,31],
    [279,473,136,67,0,67,32],
    [140,611,136,68,0,69,32],
    [138,68,138,65,0,69,31]
];

imsFrames[32]=[
    [1774,69,135,67,0,68,33],
    [1076,1,138,65,0,69,31],
    [274,69,136,66,0,68,31],
    [1216,1,136,65,0,68,31],
    [1354,1,135,65,0,66,31],
    [1228,69,132,67,0,67,33],
    [412,69,135,66,0,66,32],
    [1497,69,135,67,0,66,33],
    [822,69,136,66,0,67,32],
    [683,69,137,66,0,68,32],
    [960,69,129,66,0,61,32],
    [1,1,130,63,0,67,29],
    [677,1,135,65,0,68,31],
    [1091,69,135,66,0,65,31],
    [1362,69,133,67,0,66,32],
    [135,69,137,66,0,68,32],
    [949,1,125,65,0,64,31],
    [1628,1,135,66,0,67,32],
    [540,1,135,65,0,67,31],
    [405,1,133,65,0,65,32],
    [1634,69,138,67,0,69,33],
    [133,1,134,64,0,67,30],
    [1911,69,135,67,0,68,32],
    [814,1,133,65,0,66,30],
    [1765,1,134,66,0,67,32],
    [269,1,134,65,0,66,31],
    [1,69,132,66,0,65,32],
    [1491,1,135,65,0,67,31],
    [1901,1,134,66,0,66,32],
    [549,69,132,66,0,64,31]
];

imsFrames[33]=[
    [1216,69,134,66,0,64,32],
    [809,69,133,66,0,66,31],
    [275,69,133,66,0,65,32],
    [1222,1,133,65,0,67,31],
    [1091,1,129,65,0,62,31],
    [547,69,131,66,0,67,31],
    [944,69,133,66,0,66,32],
    [410,69,135,66,0,68,32],
    [680,69,127,66,0,67,31],
    [411,1,131,65,0,67,31],
    [274,1,135,65,0,68,31],
    [1,1,133,65,0,67,31],
    [1903,69,133,67,0,67,32],
    [1079,69,135,66,0,66,31],
    [1630,69,136,67,0,68,32],
    [139,69,134,66,0,69,32],
    [1768,69,133,67,0,66,32],
    [683,1,135,65,0,68,31],
    [954,1,135,65,0,67,31],
    [1488,1,132,66,0,66,31],
    [1357,1,129,66,0,65,31],
    [1622,1,137,66,0,68,32],
    [136,1,136,65,0,68,31],
    [544,1,137,65,0,68,31],
    [1491,69,137,67,0,68,32],
    [1761,1,137,66,0,68,32],
    [1900,1,130,66,0,64,32],
    [820,1,132,65,0,64,31],
    [1,69,136,66,0,67,32],
    [1352,69,137,67,0,68,33]
];

imsFrames[34]=[
    [139,471,135,66,0,67,32],
    [1,403,136,66,0,68,31],
    [264,539,136,67,0,68,32],
    [1,335,137,65,0,67,31],
    [139,403,134,66,0,66,32],
    [271,1,133,64,0,67,31],
    [137,608,132,67,0,68,32],
    [268,268,138,65,0,69,31],
    [1,268,136,65,0,68,31],
    [139,268,127,65,0,60,31],
    [1,471,136,66,0,68,31],
    [1,608,134,67,0,67,33],
    [275,403,135,66,0,68,32],
    [137,134,135,65,0,68,31],
    [271,608,137,68,0,68,33],
    [275,201,137,65,0,68,31],
    [1,1,133,64,0,67,30],
    [1,67,129,65,0,63,31],
    [276,471,134,66,0,68,32],
    [132,67,136,65,0,67,31],
    [270,67,136,65,0,68,31],
    [1,201,136,65,0,67,31],
    [136,1,133,64,0,65,30],
    [139,201,134,65,0,66,31],
    [274,134,131,65,0,68,30],
    [131,539,131,67,0,67,32],
    [278,335,138,66,0,70,31],
    [1,134,134,65,0,67,31],
    [1,539,128,67,0,66,32],
    [140,335,136,65,0,67,31]
];

imsFrames[35]=[
    [271,135,135,65,0,67,31],
    [133,542,135,67,0,68,33],
    [1,338,137,66,0,69,32],
    [1,474,133,66,0,66,31],
    [136,474,138,66,0,68,31],
    [140,406,135,66,0,67,32],
    [138,135,131,65,0,64,31],
    [134,202,132,66,0,64,31],
    [277,338,137,66,0,68,32],
    [1,406,137,66,0,68,32],
    [277,406,135,66,0,69,31],
    [129,1,137,65,0,68,31],
    [1,1,126,62,0,67,28],
    [276,474,132,66,0,64,32],
    [1,611,135,67,0,68,32],
    [1,135,135,65,0,68,31],
    [268,1,132,65,0,66,31],
    [271,68,136,65,0,68,31],
    [140,338,135,66,0,69,31],
    [1,202,131,66,0,66,32],
    [268,202,129,66,0,65,32],
    [1,270,134,66,0,67,31],
    [1,68,131,65,0,64,31],
    [134,68,135,65,0,66,31],
    [137,270,136,66,0,68,32],
    [273,611,138,67,0,69,32],
    [270,542,136,67,0,68,32],
    [275,270,135,66,0,68,32],
    [1,542,130,67,0,68,32],
    [138,611,133,67,0,68,32]
];

imsFrames[36]=[
    [804,69,131,66,0,68,32],
    [951,1,134,65,0,68,31],
    [409,69,130,66,0,66,31],
    [1484,1,133,65,0,66,31],
    [1354,1,128,65,0,66,31],
    [1206,69,137,67,0,69,32],
    [541,69,131,66,0,62,32],
    [401,1,136,65,0,67,30],
    [676,1,134,65,0,67,31],
    [1345,69,135,67,0,66,32],
    [1761,69,136,67,0,68,32],
    [674,69,128,66,0,61,32],
    [937,69,133,66,0,65,32],
    [1072,69,132,66,0,63,31],
    [539,1,135,65,0,67,31],
    [1621,69,138,67,0,67,32],
    [1482,69,137,67,0,70,32],
    [136,69,133,66,0,66,32],
    [1087,1,135,65,0,68,31],
    [1,1,133,62,0,64,28],
    [1753,1,136,66,0,68,32],
    [268,1,131,63,0,68,28],
    [1899,69,128,67,0,63,32],
    [1,69,133,66,0,65,31],
    [136,1,130,63,0,62,29],
    [812,1,137,65,0,68,31],
    [1891,1,133,66,0,67,31],
    [1224,1,128,65,0,65,31],
    [1619,1,132,66,0,65,31],
    [271,69,136,66,0,67,32]
];

imsFrames[37]=[
    [1909,68,137,67,0,68,32],
    [407,68,135,66,0,66,32],
    [1891,1,134,65,0,67,31],
    [544,68,135,66,0,68,32],
    [1621,1,131,65,0,66,31],
    [1754,1,135,65,0,67,31],
    [138,68,132,65,0,68,31],
    [1368,68,131,66,0,67,31],
    [1,68,135,65,0,67,31],
    [681,68,136,66,0,68,31],
    [1092,68,136,66,0,68,31],
    [943,1,127,65,0,67,31],
    [532,1,135,65,0,68,31],
    [819,68,135,66,0,68,31],
    [1484,1,135,65,0,67,31],
    [1772,68,135,67,0,68,32],
    [397,1,133,65,0,67,31],
    [1501,68,135,66,0,68,32],
    [1230,68,136,66,0,67,32],
    [260,1,135,65,0,67,31],
    [669,1,135,65,0,66,31],
    [1,1,122,63,0,54,31],
    [1205,1,137,65,0,69,31],
    [1344,1,138,65,0,69,31],
    [125,1,133,64,0,64,30],
    [1072,1,131,65,0,65,31],
    [806,1,135,65,0,68,31],
    [956,68,134,66,0,68,32],
    [1638,68,132,67,0,66,32],
    [272,68,133,65,0,66,31]
];

imsFrames[38]=[
    [1,407,134,66,0,68,33],
    [137,407,132,66,0,64,31],
    [278,68,134,65,0,66,31],
    [275,613,132,68,0,66,32],
    [267,339,137,66,0,68,32],
    [139,68,137,65,0,69,31],
    [1,544,136,67,0,67,32],
    [140,339,125,66,0,64,32],
    [278,544,136,67,0,68,32],
    [139,544,137,67,0,68,32],
    [271,407,135,66,0,67,32],
    [136,475,137,66,0,68,32],
    [1,475,133,66,0,68,32],
    [1,135,136,65,0,67,31],
    [137,613,136,67,0,67,32],
    [1,339,137,66,0,68,32],
    [273,135,135,66,0,66,31],
    [139,135,132,66,0,66,32],
    [1,203,132,66,0,67,32],
    [270,203,135,66,0,67,31],
    [136,271,129,66,0,66,32],
    [1,613,134,67,0,66,31],
    [135,203,133,66,0,67,32],
    [1,68,136,65,0,67,31],
    [276,1,131,65,0,65,31],
    [1,1,136,64,0,69,31],
    [275,475,139,67,0,69,32],
    [139,1,135,64,0,67,31],
    [1,271,133,66,0,64,32],
    [267,271,131,66,0,64,32]
];

imsFrames[39]=[
    [1,749,206,66,0,102,32],
    [202,138,196,65,0,101,31],
    [208,612,202,67,0,102,32],
    [200,205,199,65,0,102,31],
    [1,407,204,66,0,103,32],
    [210,886,207,67,0,103,32],
    [1,544,208,65,0,104,31],
    [207,272,205,65,0,101,31],
    [207,407,204,66,0,100,31],
    [1,272,204,65,0,101,31],
    [1,138,199,64,0,101,30],
    [1,475,201,67,0,103,32],
    [204,475,201,67,0,100,32],
    [1,886,207,66,0,103,32],
    [1,339,205,65,0,102,31],
    [1,612,205,66,0,103,31],
    [208,339,203,66,0,101,31],
    [209,681,206,66,0,104,31],
    [1,817,203,67,0,102,32],
    [209,749,206,66,0,102,32],
    [1,681,206,66,0,102,31],
    [211,544,205,66,0,102,31],
    [206,817,207,66,0,102,31],
    [1,205,197,65,0,97,31],
    [268,1,135,65,0,68,31],
    [134,1,132,66,0,68,32],
    [137,69,133,67,0,68,32],
    [1,1,131,66,0,64,32],
    [1,69,134,66,0,65,32],
    [272,69,134,67,0,68,32]
];

imsFrames[40]=[
    [1,1,66,65,0,32,31],
    [69,1,55,56,0,25,25],
    [126,1,66,66,0,33,31],
    [194,1,68,66,0,34,32],
    [264,1,63,66,0,33,31],
    [329,1,66,61,0,32,27],
    [397,1,66,66,0,33,31],
    [465,1,66,66,0,33,31],
    [533,1,64,66,0,32,32],
    [599,1,65,65,0,34,31],
    [666,1,67,65,0,33,31],
    [735,1,62,65,0,32,31],
    [799,1,62,59,0,31,28],
    [863,1,66,65,0,33,31],
    [931,1,66,65,0,34,31],
    [1,69,63,66,0,33,31],
    [66,69,66,66,0,33,32],
    [134,69,67,64,0,33,32],
    [203,69,67,66,0,33,31],
    [272,69,65,65,0,32,31],
    [339,69,66,66,0,34,32],
    [407,69,63,65,0,32,31],
    [472,69,66,66,0,33,32],
    [540,69,63,66,0,33,32],
    [605,69,67,67,0,33,32],
    [674,69,67,66,0,33,31],
    [743,69,63,66,0,33,32],
    [808,69,57,65,0,29,31],
    [867,69,63,65,0,30,31],
    [932,69,63,62,0,31,27]
];

imsFrames[41]=[
    [1,1,61,62,0,29,28],
    [64,1,61,66,0,28,31],
    [127,1,63,66,0,30,32],
    [192,1,59,62,0,29,28],
    [253,1,67,65,0,33,31],
    [322,1,67,65,0,32,31],
    [391,1,60,62,0,34,28],
    [453,1,65,66,0,33,31],
    [520,1,65,66,0,32,31],
    [587,1,66,65,0,33,31],
    [655,1,65,66,0,32,32],
    [722,1,68,66,0,33,31],
    [792,1,64,64,0,32,30],
    [858,1,67,65,0,33,31],
    [927,1,67,65,0,33,31],
    [996,1,60,56,0,29,26],
    [1058,1,66,66,0,32,31],
    [1126,1,67,66,0,33,32],
    [1195,1,68,66,0,33,31],
    [1265,1,63,62,0,31,28],
    [1330,1,67,66,0,33,31],
    [1399,1,68,67,0,33,32],
    [1469,1,67,65,0,33,31],
    [1538,1,68,67,0,33,32],
    [1608,1,64,63,0,31,31],
    [1674,1,68,65,0,33,31],
    [1744,1,65,62,0,33,28],
    [1811,1,68,62,0,34,28],
    [1881,1,65,65,0,33,31],
    [1948,1,60,61,0,29,27]
];

imsFrames[42]=[
    [1,1,64,66,0,32,32],
    [67,1,63,65,0,33,31],
    [132,1,68,65,0,34,31],
    [202,1,61,67,0,29,32],
    [265,1,65,66,0,30,32],
    [332,1,63,65,0,32,31],
    [397,1,61,66,0,31,32],
    [460,1,62,65,0,33,31],
    [524,1,66,66,0,34,32],
    [592,1,65,65,0,34,30],
    [659,1,67,66,0,33,32],
    [728,1,64,65,0,32,31],
    [794,1,62,62,0,29,29],
    [858,1,62,62,0,31,28],
    [922,1,61,65,0,31,31],
    [985,1,67,66,0,33,32],
    [1054,1,66,66,0,32,31],
    [1122,1,67,63,0,33,29],
    [1191,1,64,65,0,32,30],
    [1257,1,66,66,0,32,31],
    [1325,1,53,62,0,26,28],
    [1380,1,60,66,0,29,31],
    [1442,1,62,65,0,30,31],
    [1506,1,63,65,0,30,31],
    [1571,1,62,66,0,30,32],
    [1635,1,50,61,0,24,28],
    [1687,1,65,65,0,32,30],
    [1754,1,65,66,0,34,31],
    [1821,1,60,62,0,29,28],
    [1883,1,64,65,0,32,31]
];

imsFrames[43]=[
    [612,68,62,66,0,32,32],
    [346,68,66,66,0,34,32],
    [860,1,65,65,0,32,31],
    [534,1,63,64,0,33,29],
    [667,1,63,65,0,34,31],
    [332,1,63,63,0,32,28],
    [131,1,62,62,0,29,31],
    [414,68,63,66,0,29,31],
    [277,68,67,66,0,33,31],
    [813,68,68,67,0,33,33],
    [927,1,66,65,0,34,31],
    [479,68,67,66,0,33,32],
    [207,68,68,66,0,34,32],
    [743,68,68,66,0,34,32],
    [676,68,65,66,0,32,32],
    [138,68,67,66,0,33,31],
    [64,1,65,59,0,32,28],
    [548,68,62,66,0,29,31],
    [953,68,67,67,0,33,32],
    [1,68,66,66,0,33,32],
    [599,1,66,65,0,33,31],
    [883,68,68,67,0,34,32],
    [69,68,67,66,0,32,32],
    [263,1,67,63,0,33,31],
    [790,1,68,65,0,33,31],
    [464,1,68,64,0,34,31],
    [732,1,56,65,0,28,31],
    [397,1,65,64,0,31,30],
    [195,1,66,62,0,34,28],
    [1,1,61,57,0,30,27]
];

imsFrames[44]=[
    [599,68,68,66,0,35,31],
    [329,68,63,66,0,33,32],
    [245,1,67,63,0,33,28],
    [1,1,59,60,0,27,25],
    [206,68,59,66,0,29,31],
    [127,1,55,62,0,28,28],
    [933,68,70,68,0,34,33],
    [70,68,67,66,0,33,32],
    [139,68,65,66,0,31,32],
    [462,68,66,66,0,33,32],
    [806,68,57,67,0,28,32],
    [62,1,63,62,0,32,28],
    [1,68,67,65,0,33,31],
    [394,68,66,66,0,33,31],
    [724,1,66,65,0,33,31],
    [926,1,63,65,0,30,31],
    [669,68,67,67,0,34,32],
    [587,1,66,65,0,33,31],
    [530,68,67,66,0,34,31],
    [865,68,66,68,0,33,33],
    [738,68,66,67,0,32,32],
    [520,1,65,65,0,32,31],
    [382,1,67,64,0,34,29],
    [859,1,65,65,0,32,31],
    [655,1,67,65,0,33,31],
    [314,1,66,64,0,34,32],
    [451,1,67,64,0,33,30],
    [267,68,60,66,0,29,32],
    [792,1,65,65,0,32,31],
    [184,1,59,62,0,30,28]
];

imsFrames[45]=[
    [408,68,62,66,0,30,32],
    [403,1,68,64,0,34,31],
    [134,1,63,62,0,32,32],
    [806,1,67,65,0,33,31],
    [473,1,64,64,0,31,29],
    [472,68,68,66,0,34,32],
    [203,68,66,66,0,32,31],
    [271,68,67,66,0,33,31],
    [337,1,64,64,0,33,31],
    [133,68,68,66,0,33,31],
    [611,68,66,66,0,33,31],
    [542,68,67,66,0,33,31],
    [944,1,62,65,0,29,31],
    [743,68,69,67,0,34,32],
    [1,1,63,61,0,30,30],
    [269,1,66,63,0,33,30],
    [608,1,65,65,0,33,31],
    [875,1,67,65,0,33,31],
    [885,68,67,67,0,33,32],
    [539,1,67,65,0,33,31],
    [69,68,62,66,0,30,32],
    [1,68,66,66,0,33,32],
    [340,68,66,66,0,33,32],
    [675,1,64,65,0,32,31],
    [814,68,69,67,0,35,33],
    [199,1,68,63,0,34,30],
    [954,68,65,67,0,32,32],
    [741,1,63,65,0,33,31],
    [679,68,62,67,0,28,33],
    [66,1,66,62,0,33,28]
];

imsFrames[46]=[
    [1,1,136,66,0,69,32],
    [139,1,129,65,0,66,30],
    [270,1,130,67,0,61,32],
    [402,1,135,66,0,66,31],
    [539,1,136,65,0,68,31],
    [677,1,136,66,0,67,31],
    [815,1,136,66,0,67,32],
    [953,1,135,65,0,68,31],
    [1090,1,136,67,0,66,33],
    [1228,1,138,65,0,69,31],
    [1368,1,135,65,0,69,31],
    [1505,1,135,66,0,66,31],
    [1642,1,133,65,0,65,31],
    [1777,1,134,65,0,67,31],
    [1913,1,134,66,0,68,32],
    [1,70,136,66,0,68,31],
    [139,70,137,65,0,68,31],
    [278,70,129,66,0,64,31],
    [409,70,137,66,0,69,31],
    [548,70,134,66,0,66,32],
    [684,70,138,63,0,69,29],
    [824,70,130,66,0,67,31],
    [956,70,136,66,0,67,31],
    [1094,70,131,66,0,67,32],
    [1227,70,135,66,0,67,32],
    [1364,70,131,66,0,65,32],
    [1497,70,137,65,0,69,31],
    [1636,70,136,66,0,69,32],
    [1774,70,135,65,0,68,31],
    [1911,70,132,66,0,66,31]
];

imsFrames[47]=[
    [1221,1,131,66,0,66,32],
    [670,1,136,65,0,69,31],
    [1637,69,137,68,0,68,33],
    [1776,69,132,68,0,67,32],
    [138,1,130,62,0,64,28],
    [1502,69,133,68,0,68,32],
    [1,69,133,66,0,65,32],
    [410,69,134,66,0,67,32],
    [1364,69,136,67,0,67,32],
    [272,69,136,66,0,67,31],
    [1091,69,135,67,0,66,32],
    [680,69,135,66,0,68,31],
    [546,69,132,66,0,64,32],
    [136,69,134,66,0,65,32],
    [402,1,130,65,0,64,31],
    [1895,1,136,66,0,67,32],
    [1228,69,134,67,0,67,32],
    [1084,1,135,66,0,68,32],
    [953,69,136,67,0,67,32],
    [1354,1,131,66,0,66,31],
    [1,1,135,62,0,67,28],
    [270,1,130,64,0,61,31],
    [1624,1,136,66,0,68,31],
    [1762,1,131,66,0,64,31],
    [1487,1,135,66,0,68,32],
    [534,1,134,65,0,68,31],
    [1910,69,126,68,0,57,33],
    [948,1,134,65,0,65,31],
    [817,69,134,67,0,67,32],
    [808,1,138,65,0,69,31]
];

imsFrames[48]=[
    [941,1,136,65,0,68,32],
    [1199,69,138,67,0,69,32],
    [1352,1,137,65,0,69,31],
    [399,69,125,66,0,58,31],
    [1339,69,131,67,0,64,32],
    [526,69,132,66,0,67,31],
    [261,69,136,66,0,67,32],
    [275,1,133,64,0,67,29],
    [123,69,136,66,0,67,32],
    [931,69,133,67,0,64,32],
    [139,1,134,64,0,68,30],
    [671,1,132,65,0,65,31],
    [1864,69,134,67,0,67,33],
    [796,69,133,66,0,68,31],
    [805,1,134,65,0,65,31],
    [1,69,120,66,0,54,32],
    [1491,1,136,66,0,67,31],
    [410,1,131,65,0,67,31],
    [1604,69,135,67,0,67,32],
    [543,1,126,65,0,61,32],
    [1629,1,137,66,0,68,32],
    [1904,1,133,66,0,65,32],
    [1,1,136,62,0,67,28],
    [1741,69,121,67,0,57,33],
    [1472,69,130,67,0,67,32],
    [1768,1,134,66,0,68,32],
    [1216,1,134,65,0,68,31],
    [1079,1,135,65,0,67,32],
    [1066,69,131,67,0,63,33],
    [660,69,134,66,0,66,31]
];

imsFrames[49]=[
    [141,135,131,65,0,64,32],
    [140,543,134,67,0,67,32],
    [1,338,137,66,0,68,32],
    [140,338,136,66,0,67,32],
    [278,338,136,66,0,68,31],
    [136,68,136,65,0,69,31],
    [1,406,137,66,0,69,31],
    [274,68,133,65,0,67,31],
    [272,612,136,68,0,68,33],
    [1,474,132,66,0,63,31],
    [275,406,135,66,0,67,31],
    [140,406,133,66,0,65,32],
    [1,612,135,67,0,66,32],
    [138,612,132,67,0,67,32],
    [125,202,134,66,0,67,32],
    [1,543,137,67,0,68,32],
    [261,202,132,66,0,64,31],
    [267,1,132,65,0,65,31],
    [1,270,137,66,0,69,32],
    [140,270,132,66,0,68,31],
    [1,202,122,65,0,54,30],
    [274,135,135,65,0,66,31],
    [1,135,138,65,0,70,31],
    [274,270,136,66,0,67,31],
    [1,68,133,65,0,67,31],
    [131,1,134,65,0,68,31],
    [273,474,135,67,0,67,32],
    [135,474,136,66,0,66,31],
    [1,1,128,62,0,69,30],
    [276,543,131,67,0,66,32]
];

imsFrames[50]=[
    [139,1,131,60,0,66,25],
    [132,334,135,66,0,67,31],
    [133,266,137,65,0,68,31],
    [269,334,120,66,0,61,32],
    [1,470,130,67,0,64,33],
    [133,608,136,68,0,68,33],
    [1,65,134,64,0,65,31],
    [273,402,135,66,0,66,31],
    [1,402,135,66,0,67,31],
    [1,266,130,65,0,68,31],
    [1,1,136,60,0,68,29],
    [137,65,138,65,0,69,32],
    [277,65,131,65,0,68,31],
    [138,132,135,65,0,67,31],
    [272,1,120,62,0,54,28],
    [270,199,134,65,0,65,31],
    [138,402,133,66,0,67,31],
    [1,539,136,67,0,67,32],
    [133,470,134,67,0,68,32],
    [269,470,126,67,0,57,33],
    [1,132,135,65,0,66,31],
    [139,539,134,67,0,67,32],
    [1,608,130,67,0,69,32],
    [275,539,136,67,0,69,32],
    [272,266,137,66,0,69,31],
    [271,608,135,68,0,66,33],
    [1,334,129,66,0,64,32],
    [275,132,134,65,0,68,31],
    [138,199,130,65,0,64,31],
    [1,199,135,65,0,67,31]
];

imsFrames[51]=[
    [140,335,136,66,0,68,32],
    [137,540,136,67,0,69,32],
    [1,199,135,65,0,68,31],
    [139,403,133,66,0,64,31],
    [278,335,132,66,0,64,31],
    [1,403,136,66,0,68,32],
    [136,65,138,64,0,70,30],
    [136,471,135,66,0,67,32],
    [1,471,133,66,0,68,31],
    [276,65,133,65,0,68,31],
    [133,1,136,62,0,68,28],
    [138,199,137,65,0,69,31],
    [278,132,136,65,0,68,31],
    [274,403,133,66,0,65,32],
    [141,132,135,65,0,67,31],
    [1,335,137,66,0,68,32],
    [277,199,119,66,0,54,31],
    [1,132,138,65,0,69,31],
    [1,540,134,67,0,68,32],
    [1,267,137,66,0,68,31],
    [140,267,135,66,0,67,31],
    [275,540,135,67,0,68,32],
    [1,65,133,64,0,67,31],
    [1,1,130,61,0,65,27],
    [1,609,137,67,0,67,32],
    [271,1,134,62,0,67,28],
    [140,609,135,68,0,66,33],
    [273,471,138,67,0,69,32],
    [277,267,130,66,0,65,31],
    [277,609,135,68,0,67,33]
];

imsFrames[52]=[
    [136,337,136,66,0,67,32],
    [273,405,137,66,0,69,32],
    [1,473,130,66,0,61,32],
    [137,405,134,66,0,66,32],
    [140,67,134,65,0,68,31],
    [264,610,136,68,0,68,33],
    [1,67,137,65,0,68,31],
    [266,1,133,64,0,64,30],
    [274,337,139,66,0,69,31],
    [133,473,137,66,0,68,32],
    [276,67,137,65,0,68,31],
    [1,405,134,66,0,67,32],
    [137,134,135,65,0,68,31],
    [274,134,137,65,0,69,31],
    [272,473,134,66,0,67,32],
    [135,541,133,67,0,67,32],
    [1,541,132,66,0,66,32],
    [1,610,136,67,0,68,32],
    [276,269,134,66,0,68,32],
    [270,541,135,67,0,67,32],
    [139,610,123,67,0,57,33],
    [1,134,134,65,0,66,31],
    [1,1,136,62,0,67,28],
    [273,201,135,66,0,67,32],
    [1,201,132,66,0,64,32],
    [137,269,137,66,0,68,31],
    [1,337,133,66,0,64,31],
    [1,269,134,66,0,69,31],
    [135,201,136,66,0,68,32],
    [139,1,125,62,0,69,28]
];

imsFrames[53]=[
    [274,134,133,65,0,65,31],
    [139,201,136,65,0,68,31],
    [1,201,136,65,0,68,31],
    [1,472,137,66,0,68,32],
    [274,404,134,66,0,65,32],
    [260,609,138,68,0,69,33],
    [277,201,133,65,0,67,30],
    [1,134,136,65,0,68,31],
    [137,67,135,65,0,68,31],
    [133,1,134,64,0,68,30],
    [1,67,134,64,0,67,29],
    [269,1,137,64,0,68,31],
    [138,404,134,66,0,66,32],
    [1,404,135,66,0,68,32],
    [1,540,136,66,0,68,32],
    [139,134,133,65,0,64,31],
    [278,472,134,66,0,68,32],
    [140,472,136,66,0,67,32],
    [1,1,130,61,0,64,28],
    [279,336,134,66,0,68,31],
    [274,67,127,65,0,65,31],
    [138,268,136,66,0,68,31],
    [140,336,137,66,0,68,32],
    [276,268,134,66,0,68,31],
    [278,540,135,67,0,66,32],
    [1,268,135,66,0,68,32],
    [128,609,130,68,0,67,33],
    [1,609,125,68,0,63,33],
    [1,336,137,66,0,68,31],
    [139,540,137,66,0,69,32]
];

imsFrames[54]=[
    [1,135,135,65,0,66,31],
    [137,612,130,68,0,62,33],
    [1,406,132,66,0,67,31],
    [274,406,137,66,0,68,32],
    [277,338,132,66,0,68,32],
    [138,338,137,66,0,68,31],
    [263,543,129,67,0,61,32],
    [277,68,138,65,0,68,31],
    [138,1,131,63,0,66,28],
    [269,612,132,68,0,68,33],
    [138,474,135,66,0,67,32],
    [1,1,135,62,0,67,28],
    [1,68,137,65,0,69,31],
    [1,474,135,66,0,67,31],
    [135,406,137,66,0,68,32],
    [1,338,135,66,0,67,31],
    [131,202,130,66,0,68,31],
    [138,270,136,66,0,68,31],
    [1,270,135,66,0,67,31],
    [271,1,136,65,0,68,31],
    [140,68,135,65,0,69,31],
    [275,135,134,65,0,66,31],
    [126,543,135,67,0,67,32],
    [1,202,128,65,0,65,31],
    [1,612,134,67,0,67,32],
    [1,543,123,67,0,57,33],
    [275,474,137,67,0,68,32],
    [138,135,135,65,0,68,31],
    [276,270,137,66,0,68,31],
    [263,202,137,66,0,68,32]
];

imsFrames[55]=[
    [1909,69,134,67,0,66,33],
    [1504,69,126,67,0,67,33],
    [687,69,136,66,0,68,32],
    [1225,1,139,65,0,69,31],
    [956,1,135,65,0,68,31],
    [1093,1,130,65,0,68,31],
    [825,69,134,66,0,67,32],
    [553,69,132,66,0,67,31],
    [961,69,130,66,0,66,31],
    [1772,69,135,67,0,66,32],
    [418,69,133,66,0,64,32],
    [408,1,129,65,0,65,31],
    [1366,69,136,66,0,68,31],
    [1230,69,134,66,0,68,32],
    [273,1,133,64,0,68,30],
    [1,1,134,63,0,66,28],
    [1093,69,135,66,0,66,32],
    [816,1,138,65,0,69,31],
    [678,1,136,65,0,67,31],
    [539,1,137,65,0,69,31],
    [1632,69,138,67,0,69,33],
    [1635,1,137,66,0,68,32],
    [1,69,139,66,0,69,31],
    [142,69,135,66,0,67,31],
    [1907,1,134,66,0,68,32],
    [1774,1,131,66,0,67,32],
    [1366,1,136,65,0,67,31],
    [1504,1,129,66,0,67,31],
    [137,1,134,63,0,66,31],
    [279,69,137,66,0,68,32]
];

imsFrames[56]=[
    [1,1,129,57,0,62,27],
    [1213,1,132,65,0,66,30],
    [1347,1,131,65,0,62,31],
    [937,1,136,65,0,69,31],
    [820,69,138,66,0,69,32],
    [1075,1,136,65,0,68,31],
    [1358,69,136,67,0,68,32],
    [960,69,130,66,0,66,31],
    [1772,69,132,68,0,67,32],
    [267,1,126,65,0,58,31],
    [1906,69,137,68,0,68,33],
    [132,1,133,65,0,66,31],
    [542,69,136,66,0,66,31],
    [1496,69,135,67,0,67,32],
    [395,1,134,65,0,66,31],
    [805,1,130,65,0,64,31],
    [680,69,138,66,0,69,32],
    [1228,69,128,67,0,63,33],
    [404,69,136,66,0,67,32],
    [1893,1,133,66,0,68,31],
    [1633,69,137,67,0,68,32],
    [1480,1,135,66,0,68,31],
    [1617,1,137,66,0,68,31],
    [1756,1,135,66,0,67,31],
    [136,69,130,66,0,68,32],
    [531,1,139,65,0,70,31],
    [1092,69,134,67,0,67,32],
    [268,69,134,66,0,64,32],
    [1,69,133,66,0,64,32],
    [672,1,131,65,0,64,31]
];

imsFrames[57]=[
    [138,405,127,66,0,62,32],
    [267,405,134,66,0,67,32],
    [276,134,138,65,0,69,31],
    [137,541,136,67,0,68,32],
    [1,201,132,65,0,66,31],
    [1,405,135,66,0,67,32],
    [266,610,137,68,0,68,33],
    [267,1,133,64,0,67,31],
    [1,134,135,65,0,66,31],
    [139,67,138,65,0,69,31],
    [1,473,132,66,0,68,31],
    [1,1,129,62,0,63,28],
    [278,337,136,66,0,67,32],
    [1,541,134,67,0,66,32],
    [273,473,133,66,0,67,32],
    [139,337,137,66,0,68,32],
    [1,67,136,65,0,69,31],
    [275,541,131,67,0,67,32],
    [135,201,137,66,0,69,31],
    [138,610,126,67,0,57,33],
    [1,610,135,67,0,68,33],
    [274,201,135,66,0,67,32],
    [1,337,136,66,0,68,32],
    [270,269,138,66,0,70,31],
    [279,67,134,65,0,65,31],
    [134,269,134,66,0,66,32],
    [138,134,136,65,0,68,30],
    [1,269,131,66,0,66,32],
    [132,1,133,64,0,64,31],
    [135,473,136,66,0,67,32]
];

imsFrames[58]=[
    [1,266,134,65,0,66,31],
    [275,402,133,66,0,69,31],
    [1,470,138,66,0,69,32],
    [271,199,137,65,0,68,31],
    [140,402,133,66,0,67,32],
    [1,402,137,66,0,68,32],
    [137,266,133,65,0,68,31],
    [137,65,131,64,0,65,29],
    [275,132,137,65,0,69,31],
    [141,470,137,66,0,69,32],
    [1,65,134,63,0,69,28],
    [277,538,136,66,0,67,32],
    [137,538,138,66,0,70,32],
    [1,538,134,66,0,67,31],
    [280,470,136,66,0,67,32],
    [264,606,136,67,0,68,32],
    [268,1,130,62,0,63,28],
    [1,1,134,62,0,67,28],
    [137,1,129,62,0,62,28],
    [1,334,137,66,0,68,32],
    [270,65,136,65,0,67,31],
    [1,606,125,67,0,57,33],
    [139,132,134,65,0,67,31],
    [128,606,134,67,0,66,32],
    [1,132,136,65,0,67,31],
    [140,334,138,66,0,69,32],
    [272,266,137,66,0,67,31],
    [138,199,131,65,0,64,32],
    [1,199,135,65,0,67,31],
    [280,334,135,66,0,67,31]
];

imsFrames[59]=[
    [273,1,134,64,0,66,30],
    [1,539,137,67,0,69,32],
    [1,1,133,62,0,67,28],
    [134,608,137,68,0,69,33],
    [1,608,131,67,0,66,32],
    [139,335,129,66,0,63,31],
    [273,608,134,68,0,67,32],
    [138,268,136,65,0,69,31],
    [136,1,135,63,0,66,28],
    [1,268,135,65,0,67,31],
    [278,403,136,66,0,67,31],
    [276,268,133,65,0,67,31],
    [139,403,137,66,0,69,31],
    [132,134,129,65,0,64,31],
    [140,471,133,66,0,67,31],
    [1,471,137,66,0,67,32],
    [275,471,137,66,0,69,32],
    [273,67,136,65,0,67,31],
    [136,67,135,65,0,66,31],
    [1,67,133,65,0,67,30],
    [1,134,129,65,0,66,31],
    [140,539,137,67,0,68,32],
    [1,403,136,66,0,68,32],
    [279,539,138,67,0,68,32],
    [1,201,134,65,0,67,31],
    [270,335,135,66,0,67,32],
    [1,335,136,66,0,69,32],
    [137,201,130,65,0,67,31],
    [263,134,134,65,0,68,31],
    [269,201,134,65,0,67,31]
];

imsFrames[60]=[
    [403,69,134,66,0,66,32],
    [956,1,134,65,0,66,31],
    [539,69,136,66,0,69,32],
    [677,69,135,67,0,67,32],
    [1092,1,135,65,0,68,31],
    [140,69,124,66,0,63,31],
    [275,1,130,65,0,65,31],
    [819,1,135,65,0,69,31],
    [1218,69,132,67,0,66,32],
    [138,1,135,65,0,67,31],
    [1490,69,133,67,0,66,32],
    [266,69,135,66,0,68,32],
    [542,1,138,65,0,69,31],
    [407,1,133,65,0,64,31],
    [1090,69,126,67,0,67,33],
    [814,69,138,67,0,69,32],
    [1229,1,133,65,0,67,31],
    [1352,69,136,67,0,67,32],
    [1625,69,134,68,0,66,32],
    [682,1,135,65,0,68,31],
    [1761,69,119,68,0,57,33],
    [1907,1,139,66,0,70,32],
    [1633,1,134,66,0,66,32],
    [954,69,134,67,0,66,31],
    [1364,1,134,66,0,67,31],
    [1,1,135,62,0,68,28],
    [1500,1,131,66,0,64,32],
    [1882,69,136,68,0,66,33],
    [1769,1,136,66,0,67,31],
    [1,69,137,66,0,69,32]
];

imsFrames[61]=[
    [550,69,135,66,0,66,32],
    [411,69,137,66,0,69,31],
    [140,69,133,66,0,65,32],
    [1,1,134,62,0,66,28],
    [1902,69,138,68,0,69,33],
    [137,1,138,65,0,68,32],
    [275,69,134,66,0,65,31],
    [551,1,137,65,0,69,31],
    [1226,69,137,67,0,68,32],
    [1,69,137,66,0,69,32],
    [1632,69,133,67,0,66,32],
    [824,69,133,66,0,66,32],
    [959,69,137,66,0,70,32],
    [687,69,135,66,0,67,31],
    [1635,1,135,66,0,68,31],
    [1911,1,134,66,0,66,32],
    [956,1,134,66,0,69,32],
    [415,1,134,65,0,67,30],
    [277,1,136,65,0,68,31],
    [1767,69,133,68,0,66,32],
    [1501,69,129,67,0,64,32],
    [821,1,133,66,0,67,32],
    [1359,1,137,66,0,68,31],
    [1772,1,137,66,0,68,31],
    [1498,1,135,66,0,66,32],
    [1098,69,126,67,0,57,33],
    [690,1,129,65,0,66,32],
    [1230,1,127,66,0,67,32],
    [1092,1,136,66,0,67,31],
    [1365,69,134,67,0,66,32]
];

imsFrames[62]=[
    [1,1,131,64,0,66,30],
    [134,1,130,65,0,66,31],
    [266,1,134,66,0,66,31],
    [1,69,133,65,0,66,31],
    [136,69,134,65,0,66,31],
    [272,69,136,65,0,68,31],
    [1,136,131,65,0,67,31],
    [134,136,137,67,0,68,33],
    [273,136,135,66,0,67,32],
    [1,205,131,65,0,67,31],
    [134,205,134,65,0,69,31],
    [270,205,133,66,0,66,31],
    [1,273,132,65,0,67,31],
    [135,273,137,66,0,68,31],
    [274,273,135,66,0,67,32],
    [1,341,129,66,0,64,31],
    [132,341,134,66,0,68,32],
    [268,341,138,65,0,68,31],
    [1,409,131,65,0,63,31],
    [134,409,135,65,0,68,31],
    [271,409,136,66,0,68,32],
    [1,477,135,67,0,67,32],
    [138,477,136,66,0,67,32],
    [276,477,130,65,0,66,30],
    [1,546,135,66,0,68,32],
    [138,546,134,68,0,66,32],
    [274,546,134,66,0,66,31],
    [1,616,138,66,0,69,31],
    [141,616,131,65,0,62,31],
    [274,616,131,65,0,64,31]
];

imsFrames[63]=[
    [140,337,133,66,0,66,32],
    [270,135,133,65,0,66,32],
    [272,405,137,66,0,69,31],
    [1,202,134,65,0,66,31],
    [1,610,137,67,0,68,32],
    [1,473,133,66,0,68,31],
    [1,269,136,65,0,68,31],
    [127,1,133,65,0,67,31],
    [134,405,136,66,0,67,31],
    [136,473,133,66,0,65,31],
    [1,405,131,66,0,63,31],
    [271,473,132,66,0,65,31],
    [1,68,126,65,0,59,31],
    [1,541,134,66,0,66,31],
    [129,68,132,65,0,64,31],
    [134,135,134,65,0,67,31],
    [275,337,135,66,0,66,32],
    [277,269,133,66,0,67,31],
    [139,269,136,66,0,67,31],
    [263,68,136,65,0,67,31],
    [140,610,136,67,0,67,32],
    [278,610,135,67,0,66,32],
    [262,1,136,65,0,67,31],
    [1,1,124,65,0,56,31],
    [1,135,131,65,0,68,31],
    [1,337,137,66,0,67,32],
    [271,202,135,65,0,67,31],
    [137,202,132,65,0,67,31],
    [274,541,135,67,0,67,32],
    [137,541,135,66,0,69,32]
];

imsFrames[64]=[
    [1,1,136,61,0,66,27],
    [545,68,132,66,0,65,32],
    [1,68,135,66,0,68,32],
    [1226,68,136,66,0,68,31],
    [1504,1,132,65,0,65,31],
    [1638,1,133,65,0,64,31],
    [138,68,132,66,0,67,31],
    [814,68,131,66,0,65,32],
    [1773,1,134,65,0,67,31],
    [266,1,137,64,0,68,31],
    [1909,1,136,65,0,67,31],
    [676,1,131,65,0,62,31],
    [542,1,132,65,0,67,31],
    [679,68,133,66,0,66,31],
    [947,68,138,66,0,68,32],
    [809,1,138,65,0,69,31],
    [1087,68,137,66,0,68,31],
    [1365,1,137,65,0,69,31],
    [1639,68,126,67,0,64,32],
    [272,68,135,66,0,69,32],
    [139,1,125,62,0,56,28],
    [1229,1,134,65,0,68,31],
    [1364,68,135,67,0,66,32],
    [949,1,137,65,0,68,31],
    [1767,68,133,67,0,69,32],
    [409,68,134,66,0,67,32],
    [1501,68,136,67,0,65,32],
    [1902,68,136,68,0,67,33],
    [1088,1,139,65,0,69,31],
    [405,1,135,64,0,69,31]
];

imsFrames[65]=[
    [1,68,127,65,0,64,32],
    [1,1,135,63,0,66,29],
    [1906,1,133,65,0,65,32],
    [1635,1,134,65,0,67,31],
    [1771,1,133,65,0,66,31],
    [1363,1,134,65,0,66,31],
    [1499,1,134,65,0,68,32],
    [1488,68,133,67,0,65,33],
    [1216,68,131,67,0,67,32],
    [943,68,136,67,0,67,32],
    [533,68,134,66,0,66,31],
    [817,1,135,65,0,67,31],
    [1349,68,137,67,0,68,32],
    [669,68,134,66,0,67,32],
    [410,1,136,65,0,69,31],
    [1623,68,137,67,0,68,32],
    [805,68,136,66,0,67,31],
    [548,1,131,65,0,69,31],
    [130,68,137,66,0,69,32],
    [1762,68,138,67,0,69,32],
    [408,68,123,66,0,56,32],
    [1091,1,134,65,0,68,31],
    [681,1,134,65,0,68,31],
    [1902,68,136,68,0,67,33],
    [954,1,135,65,0,68,31],
    [138,1,133,64,0,66,30],
    [1081,68,133,67,0,66,32],
    [269,68,137,66,0,69,31],
    [273,1,135,64,0,68,30],
    [1227,1,134,65,0,67,31]
];

imsFrames[66]=[
    [1,135,136,65,0,67,31],
    [1,406,133,66,0,65,32],
    [1,1,133,61,0,66,27],
    [136,406,130,66,0,65,32],
    [275,338,131,66,0,66,32],
    [277,135,133,65,0,67,31],
    [135,611,135,67,0,66,32],
    [139,338,134,66,0,68,31],
    [267,474,130,66,0,63,31],
    [1,68,131,65,0,67,31],
    [1,542,135,66,0,67,31],
    [134,474,131,66,0,65,32],
    [1,474,131,66,0,66,31],
    [268,406,136,66,0,68,32],
    [273,68,135,65,0,68,31],
    [1,338,136,66,0,67,31],
    [1,270,137,66,0,68,32],
    [278,542,135,67,0,68,32],
    [272,1,131,65,0,65,31],
    [140,270,132,66,0,66,31],
    [136,1,134,65,0,68,31],
    [274,270,136,66,0,68,31],
    [134,68,137,65,0,68,31],
    [138,542,138,67,0,69,32],
    [139,202,134,65,0,67,31],
    [1,611,132,67,0,68,32],
    [272,611,138,67,0,69,32],
    [1,202,136,65,0,67,31],
    [139,135,136,65,0,68,31],
    [275,202,139,66,0,69,32]
];

imsFrames[67]=[
    [404,68,133,66,0,65,32],
    [1360,1,134,65,0,67,31],
    [1496,1,129,65,0,66,31],
    [1223,1,135,65,0,66,31],
    [943,68,137,67,0,68,32],
    [1905,68,129,68,0,63,33],
    [1,68,129,65,0,64,31],
    [1766,1,133,65,0,67,31],
    [1901,1,134,65,0,66,31],
    [127,1,130,62,0,64,28],
    [1218,68,137,67,0,68,32],
    [676,68,133,66,0,69,31],
    [1493,68,136,67,0,67,32],
    [811,68,130,66,0,68,32],
    [946,1,138,65,0,68,31],
    [1631,68,132,67,0,68,32],
    [808,1,136,65,0,68,31],
    [539,68,135,66,0,69,31],
    [1765,68,138,67,0,68,32],
    [266,68,136,66,0,67,31],
    [671,1,135,65,0,67,31],
    [132,68,132,66,0,65,31],
    [535,1,134,65,0,66,31],
    [395,1,138,65,0,69,31],
    [1357,68,134,67,0,67,32],
    [259,1,134,65,0,68,31],
    [1,1,124,62,0,68,28],
    [1627,1,137,65,0,69,31],
    [1082,68,134,67,0,68,32],
    [1086,1,135,65,0,69,31]
];

imsFrames[68]=[
    [272,405,132,66,0,62,32],
    [1,473,133,66,0,67,31],
    [134,405,136,66,0,68,31],
    [1,610,137,67,0,69,32],
    [134,134,132,65,0,66,31],
    [140,610,134,67,0,66,32],
    [1,405,131,66,0,65,32],
    [1,67,135,65,0,68,31],
    [272,473,136,66,0,67,32],
    [275,67,137,65,0,68,31],
    [278,541,132,67,0,63,32],
    [139,541,137,66,0,68,31],
    [138,67,135,65,0,68,31],
    [137,1,136,64,0,67,31],
    [1,1,134,62,0,66,31],
    [276,337,137,66,0,68,32],
    [136,473,134,66,0,67,31],
    [1,337,137,66,0,68,31],
    [132,201,134,66,0,68,32],
    [141,269,134,66,0,68,32],
    [275,1,134,64,0,67,30],
    [268,201,138,66,0,68,31],
    [276,610,138,67,0,68,32],
    [1,134,131,65,0,64,31],
    [140,337,134,66,0,68,32],
    [277,269,135,66,0,67,32],
    [268,134,137,65,0,69,32],
    [1,269,138,66,0,68,32],
    [1,201,129,65,0,67,31],
    [1,541,136,66,0,68,32]
];

imsFrames[69]=[
    [276,336,133,66,0,65,32],
    [1,472,130,66,0,67,31],
    [140,404,135,66,0,67,32],
    [277,404,134,66,0,66,31],
    [265,1,135,64,0,68,29],
    [1,1,132,63,0,67,29],
    [1,404,137,66,0,69,32],
    [137,201,136,65,0,68,31],
    [133,472,137,66,0,68,31],
    [136,610,133,67,0,67,32],
    [135,1,128,63,0,62,29],
    [140,134,125,65,0,66,31],
    [271,610,137,68,0,68,33],
    [1,610,133,67,0,66,32],
    [1,67,135,64,0,68,31],
    [272,472,136,67,0,68,32],
    [1,134,137,65,0,68,31],
    [1,268,136,66,0,68,31],
    [1,541,132,67,0,65,32],
    [135,541,135,67,0,66,32],
    [139,336,135,66,0,68,31],
    [274,67,139,65,0,70,31],
    [138,67,134,65,0,68,31],
    [272,541,132,67,0,67,32],
    [267,134,134,65,0,67,31],
    [275,201,135,65,0,67,32],
    [139,268,136,66,0,67,31],
    [277,268,133,66,0,68,31],
    [1,336,136,66,0,67,31],
    [1,201,134,65,0,68,31]
];

imsFrames[70]=[
    [134,135,135,65,0,66,31],
    [1,612,138,67,0,70,32],
    [275,406,133,66,0,68,31],
    [137,474,136,67,0,67,32],
    [275,474,135,67,0,66,32],
    [271,135,131,65,0,67,31],
    [142,1,136,65,0,68,31],
    [1,1,139,65,0,70,31],
    [134,338,129,66,0,62,32],
    [280,1,133,65,0,66,31],
    [265,338,136,66,0,67,32],
    [1,543,134,67,0,66,32],
    [1,406,136,66,0,67,31],
    [279,612,136,67,0,67,32],
    [271,68,136,65,0,68,31],
    [139,406,134,66,0,67,32],
    [275,543,137,67,0,68,32],
    [275,202,136,66,0,67,32],
    [1,338,131,66,0,65,31],
    [137,543,136,67,0,67,33],
    [1,68,129,65,0,64,31],
    [1,202,133,66,0,67,32],
    [141,612,136,67,0,67,32],
    [136,202,137,66,0,68,32],
    [132,68,137,65,0,69,31],
    [1,270,134,66,0,67,32],
    [1,474,134,67,0,66,32],
    [137,270,132,66,0,63,32],
    [271,270,133,66,0,64,31],
    [1,135,131,65,0,64,31]
];

imsFrames[71]=[
    [279,405,134,66,0,67,32],
    [272,135,133,65,0,66,31],
    [277,610,136,67,0,70,32],
    [1,1,133,64,0,67,29],
    [1,202,131,65,0,62,31],
    [134,202,130,65,0,62,31],
    [140,405,137,66,0,68,32],
    [280,541,137,67,0,70,32],
    [136,135,134,65,0,68,31],
    [1,405,137,66,0,67,31],
    [1,473,134,66,0,67,32],
    [138,610,137,67,0,69,32],
    [272,68,134,65,0,66,31],
    [276,473,135,66,0,68,32],
    [1,541,137,66,0,69,31],
    [276,337,135,66,0,67,32],
    [1,610,135,67,0,67,32],
    [1,135,133,65,0,68,31],
    [136,1,131,64,0,68,30],
    [1,68,129,65,0,64,31],
    [1,269,135,66,0,67,32],
    [273,269,137,66,0,69,32],
    [132,68,138,65,0,69,31],
    [269,1,138,65,0,69,31],
    [139,337,135,66,0,66,32],
    [1,337,136,66,0,67,32],
    [138,269,133,66,0,67,31],
    [140,541,138,67,0,69,33],
    [266,202,132,65,0,69,31],
    [137,473,137,66,0,68,31]
];

imsFrames[72]=[
    [1,135,135,65,0,66,31],
    [1,543,136,67,0,67,32],
    [273,338,136,66,0,67,32],
    [131,202,134,65,0,66,31],
    [1,406,133,66,0,66,32],
    [274,135,130,65,0,64,31],
    [139,543,136,67,0,68,33],
    [136,406,134,66,0,66,32],
    [271,68,132,65,0,66,31],
    [272,406,137,66,0,67,32],
    [1,1,132,63,0,64,30],
    [1,612,136,67,0,68,32],
    [277,543,135,67,0,67,32],
    [1,474,136,66,0,67,32],
    [139,474,138,66,0,69,32],
    [136,338,135,66,0,67,31],
    [1,68,135,65,0,67,31],
    [267,202,137,66,0,68,32],
    [279,474,136,67,0,67,33],
    [138,68,131,65,0,68,30],
    [1,270,134,66,0,66,32],
    [137,270,132,66,0,66,32],
    [278,612,136,67,0,68,32],
    [1,338,133,66,0,64,31],
    [271,270,131,66,0,66,32],
    [273,1,138,65,0,69,31],
    [135,1,136,64,0,67,31],
    [1,202,128,65,0,65,31],
    [138,135,134,65,0,67,31],
    [139,612,137,67,0,69,32]
];

imsFrames[73]=[
    [1,609,137,67,0,70,33],
    [269,67,135,65,0,67,31],
    [1,67,131,65,0,68,31],
    [134,201,134,65,0,68,31],
    [1,268,134,65,0,66,31],
    [1,201,131,65,0,66,31],
    [270,201,136,65,0,67,31],
    [274,404,136,66,0,68,32],
    [1,472,135,66,0,68,32],
    [136,404,136,66,0,67,32],
    [271,134,130,65,0,67,31],
    [1,404,133,66,0,68,32],
    [140,1,135,64,0,67,30],
    [275,540,137,67,0,68,33],
    [270,472,135,66,0,68,31],
    [1,1,137,63,0,68,31],
    [1,540,136,66,0,68,32],
    [138,472,130,66,0,67,32],
    [140,336,135,66,0,66,32],
    [277,609,136,68,0,67,33],
    [140,609,135,68,0,66,33],
    [1,134,134,65,0,66,31],
    [137,268,135,66,0,68,32],
    [139,540,134,67,0,66,32],
    [137,134,132,65,0,66,31],
    [1,336,137,66,0,68,32],
    [134,67,133,65,0,67,31],
    [277,1,131,64,0,69,29],
    [274,268,134,66,0,69,32],
    [277,336,130,66,0,68,32]
];

imsFrames[74]=[
    [279,200,135,65,0,66,31],
    [138,540,138,67,0,70,32],
    [274,267,136,66,0,68,31],
    [272,609,137,67,0,70,32],
    [140,200,137,65,0,68,31],
    [1,66,132,63,0,65,30],
    [1,403,134,66,0,67,32],
    [273,403,133,66,0,67,32],
    [140,471,131,66,0,65,31],
    [279,335,136,66,0,67,32],
    [277,133,127,65,0,67,31],
    [270,1,132,63,0,66,28],
    [1,1,130,59,0,64,29],
    [137,403,134,66,0,65,32],
    [135,66,136,64,0,67,31],
    [1,609,133,67,0,68,32],
    [1,471,137,66,0,68,31],
    [140,335,137,66,0,68,32],
    [278,540,137,67,0,68,32],
    [1,267,133,66,0,67,32],
    [1,133,137,65,0,68,31],
    [136,609,134,67,0,68,32],
    [136,267,136,66,0,68,31],
    [133,1,135,63,0,67,31],
    [140,133,135,65,0,67,30],
    [273,471,135,67,0,68,32],
    [273,66,133,65,0,69,31],
    [1,540,135,67,0,66,32],
    [1,335,137,66,0,69,31],
    [1,200,137,65,0,69,30]
];

imsFrames[75]=[
    [1,1,134,65,0,66,31],
    [1,68,137,67,0,69,32],
    [1,137,136,67,0,69,32],
    [1,206,127,66,0,68,32],
    [1,274,132,66,0,67,32],
    [1,342,132,62,0,66,28],
    [1,406,133,65,0,67,31],
    [1,473,134,65,0,65,31],
    [1,540,134,65,0,68,31],
    [1,607,130,66,0,62,32],
    [1,675,132,61,0,65,30],
    [1,738,128,66,0,66,31],
    [1,806,133,67,0,66,32],
    [1,875,133,63,0,66,31],
    [1,940,132,66,0,65,32],
    [1,1008,135,65,0,67,31],
    [1,1075,133,65,0,68,31],
    [1,1142,136,66,0,67,31],
    [1,1210,129,66,0,67,31],
    [1,1278,134,64,0,68,31],
    [1,1344,136,62,0,68,28],
    [1,1408,137,65,0,68,31],
    [1,1475,131,66,0,66,32],
    [1,1543,136,66,0,68,32],
    [1,1611,136,67,0,67,32],
    [1,1680,134,68,0,66,33],
    [1,1750,135,65,0,68,31],
    [1,1817,137,67,0,69,32],
    [1,1886,131,63,0,64,28],
    [1,1951,135,66,0,66,31]
];

imsFrames[76]=[
    [274,134,135,65,0,66,31],
    [272,404,132,66,0,69,32],
    [133,608,140,67,0,69,32],
    [1,472,137,66,0,68,31],
    [1,201,133,65,0,66,31],
    [138,404,132,66,0,66,32],
    [1,1,135,63,0,67,29],
    [140,472,132,66,0,67,31],
    [1,404,135,66,0,67,32],
    [1,608,130,67,0,62,33],
    [138,1,135,63,0,67,30],
    [275,1,133,64,0,65,31],
    [268,540,135,66,0,67,31],
    [1,540,131,66,0,66,31],
    [134,540,132,66,0,65,32],
    [270,336,137,66,0,68,31],
    [137,67,136,65,0,68,31],
    [274,472,136,66,0,67,32],
    [275,67,133,65,0,67,31],
    [1,134,137,65,0,68,31],
    [1,67,134,65,0,67,31],
    [276,268,134,66,0,68,31],
    [1,268,135,66,0,66,31],
    [140,134,132,65,0,66,31],
    [136,201,137,65,0,68,31],
    [275,201,137,65,0,68,31],
    [1,336,130,66,0,65,32],
    [133,336,135,66,0,66,32],
    [138,268,136,66,0,68,31],
    [275,608,136,68,0,66,33]
];

imsFrames[77]=[
    [1,1,132,65,0,66,32],
    [135,1,135,64,0,69,32],
    [272,1,134,65,0,67,32],
    [1,68,136,66,0,68,31],
    [139,68,136,66,0,67,32],
    [277,68,134,66,0,65,32],
    [1,136,128,65,0,63,31],
    [131,136,139,67,0,70,32],
    [272,136,133,63,0,67,28],
    [1,205,134,64,0,67,30],
    [137,205,135,65,0,68,31],
    [274,205,135,65,0,69,31],
    [1,272,134,66,0,68,32],
    [137,272,134,65,0,66,31],
    [273,272,137,66,0,68,32],
    [1,340,131,65,0,65,31],
    [134,340,132,65,0,67,30],
    [268,340,134,65,0,66,31],
    [1,407,132,66,0,65,32],
    [135,407,135,66,0,67,32],
    [272,407,134,66,0,68,32],
    [1,475,134,64,0,67,30],
    [137,475,135,66,0,67,31],
    [274,475,136,66,0,67,31],
    [1,543,135,67,0,66,32],
    [138,543,132,66,0,67,31],
    [272,543,137,67,0,68,32],
    [1,612,138,66,0,68,32],
    [141,612,136,66,0,69,32],
    [279,612,135,65,0,66,31]
];

imsFrames[78]=[
    [1,1,125,62,0,66,30],
    [1076,1,132,65,0,66,31],
    [1082,69,134,66,0,68,31],
    [545,69,129,66,0,67,31],
    [676,69,133,66,0,65,32],
    [407,69,136,66,0,67,31],
    [811,69,131,66,0,65,31],
    [270,69,135,66,0,68,32],
    [809,1,128,65,0,66,31],
    [403,1,128,65,0,65,31],
    [1492,69,136,67,0,66,32],
    [128,1,137,63,0,68,29],
    [267,1,134,63,0,67,29],
    [671,1,136,65,0,67,31],
    [944,69,136,66,0,67,31],
    [134,69,134,66,0,67,32],
    [1630,69,135,67,0,66,32],
    [1354,69,136,67,0,68,32],
    [1,69,131,66,0,66,32],
    [533,1,136,65,0,68,31],
    [1897,1,135,66,0,68,31],
    [1767,69,129,67,0,64,33],
    [1760,1,135,66,0,67,32],
    [1625,1,133,66,0,66,32],
    [939,1,135,65,0,67,30],
    [1218,69,134,67,0,66,32],
    [1490,1,133,66,0,68,31],
    [1210,1,139,66,0,69,32],
    [1351,1,137,66,0,69,31],
    [1898,69,135,68,0,66,33]
];

imsFrames[79]=[
    [1777,1,134,65,0,66,32],
    [1635,68,134,67,0,66,33],
    [1,68,128,66,0,66,32],
    [141,1,129,64,0,65,31],
    [1908,68,135,67,0,69,32],
    [1507,1,134,65,0,66,31],
    [956,68,136,66,0,68,32],
    [816,68,138,66,0,68,31],
    [1643,1,132,65,0,67,31],
    [540,68,134,66,0,66,31],
    [1913,1,131,65,0,64,31],
    [820,1,137,65,0,69,31],
    [1362,68,133,66,0,65,32],
    [409,1,136,65,0,68,31],
    [272,1,135,65,0,68,31],
    [1368,1,137,65,0,68,31],
    [685,1,133,65,0,68,31],
    [1094,68,134,66,0,66,31],
    [1230,68,130,66,0,68,31],
    [1093,1,136,65,0,68,31],
    [676,68,138,66,0,68,32],
    [131,68,135,66,0,67,31],
    [1771,68,135,67,0,66,32],
    [1231,1,135,65,0,68,31],
    [959,1,132,65,0,66,30],
    [1497,68,136,67,0,68,32],
    [268,68,134,66,0,66,31],
    [1,1,138,64,0,69,31],
    [404,68,134,66,0,68,32],
    [547,1,136,65,0,67,31]
];

imsFrames[80]=[
    [275,1,133,63,0,66,31],
    [1,403,132,66,0,68,32],
    [135,403,137,66,0,68,32],
    [137,335,136,66,0,66,31],
    [138,1,135,63,0,66,28],
    [140,267,134,66,0,66,32],
    [1,335,134,66,0,66,31],
    [134,539,134,66,0,65,31],
    [1,66,137,64,0,67,31],
    [1,539,131,66,0,66,31],
    [1,607,132,67,0,68,32],
    [1,471,130,66,0,68,31],
    [272,133,133,65,0,67,31],
    [135,607,135,67,0,68,32],
    [133,471,135,66,0,67,32],
    [272,607,134,67,0,66,32],
    [1,133,131,65,0,64,31],
    [270,471,135,66,0,66,32],
    [270,539,134,66,0,68,32],
    [140,66,135,65,0,66,31],
    [277,66,135,65,0,69,31],
    [274,403,133,66,0,68,31],
    [134,133,136,65,0,67,31],
    [137,200,135,65,0,68,31],
    [276,267,137,66,0,67,32],
    [1,1,135,62,0,68,28],
    [274,200,134,65,0,67,31],
    [275,335,136,66,0,67,32],
    [1,200,134,65,0,69,31],
    [1,267,137,65,0,68,32]
];

imsFrames[81]=[
    [1,135,134,65,0,66,31],
    [1,474,128,66,0,68,32],
    [1,1,132,61,0,66,28],
    [131,474,134,66,0,67,31],
    [276,406,133,66,0,65,31],
    [1,406,135,66,0,67,31],
    [267,474,137,66,0,67,32],
    [140,68,132,65,0,65,31],
    [275,610,137,68,0,67,33],
    [135,1,133,63,0,68,28],
    [270,1,134,65,0,68,31],
    [1,542,135,66,0,67,31],
    [1,68,137,65,0,68,31],
    [138,542,134,66,0,67,32],
    [139,610,134,67,0,67,32],
    [273,338,138,66,0,69,31],
    [274,542,135,66,0,66,32],
    [138,406,136,66,0,68,32],
    [141,270,134,66,0,66,31],
    [135,202,136,66,0,67,32],
    [275,135,129,65,0,67,31],
    [137,135,136,65,0,67,31],
    [1,202,132,66,0,68,31],
    [273,202,135,66,0,65,31],
    [1,338,133,66,0,68,32],
    [274,68,129,65,0,67,31],
    [136,338,135,66,0,67,31],
    [277,270,132,66,0,66,32],
    [1,270,138,66,0,69,31],
    [1,610,136,67,0,68,32]
];

imsFrames[82]=[
    [1,474,133,66,0,69,32],
    [278,406,132,66,0,66,31],
    [140,406,136,66,0,68,32],
    [1,406,137,66,0,68,31],
    [138,338,135,66,0,67,31],
    [1,1,133,63,0,67,28],
    [138,68,132,65,0,66,31],
    [275,338,132,66,0,63,31],
    [273,1,136,65,0,67,30],
    [1,68,135,65,0,67,31],
    [275,542,134,67,0,68,32],
    [136,474,131,66,0,66,30],
    [269,474,136,66,0,68,32],
    [1,542,133,67,0,67,32],
    [272,68,133,65,0,67,31],
    [1,338,135,66,0,67,32],
    [136,542,137,67,0,68,32],
    [1,202,136,65,0,68,31],
    [136,1,135,64,0,66,30],
    [137,135,127,65,0,65,31],
    [1,611,138,67,0,69,32],
    [277,202,135,66,0,68,32],
    [1,270,136,66,0,67,32],
    [278,611,137,68,0,68,33],
    [141,611,135,67,0,67,32],
    [266,135,134,65,0,68,31],
    [139,270,133,66,0,67,32],
    [1,135,134,65,0,67,30],
    [274,270,137,66,0,69,32],
    [139,202,136,66,0,68,32]
];

imsFrames[83]=[
    [208,202,198,65,0,97,31],
    [1,405,196,66,0,101,31],
    [209,884,203,67,0,101,32],
    [1,609,203,66,0,101,32],
    [201,541,204,66,0,101,31],
    [1,746,197,67,0,94,32],
    [1,884,206,67,0,102,32],
    [191,1,207,65,0,104,31],
    [200,746,203,67,0,102,32],
    [1,68,198,65,0,101,31],
    [1,541,198,66,0,97,31],
    [1,815,204,67,0,100,32],
    [201,68,202,65,0,101,31],
    [206,609,202,66,0,102,31],
    [199,405,206,66,0,103,32],
    [1,953,206,67,0,103,32],
    [1,269,206,66,0,102,32],
    [1,337,207,66,0,103,32],
    [1,473,207,66,0,103,32],
    [1,1,188,64,0,89,29],
    [209,269,202,66,0,100,32],
    [207,815,204,67,0,101,32],
    [208,677,206,67,0,102,32],
    [210,337,206,66,0,103,31],
    [210,135,203,65,0,102,31],
    [1,135,207,65,0,103,31],
    [209,953,206,68,0,103,33],
    [1,677,205,66,0,101,32],
    [210,473,200,66,0,99,32],
    [1,202,205,65,0,102,31]

];

imsFrames[84]=[
    [66,65,62,63,0,30,31],
    [408,133,62,66,0,29,32],
    [668,65,55,65,0,28,31],
    [604,65,62,65,0,30,31],
    [130,65,62,63,0,31,28],
    [413,201,67,67,0,33,32],
    [472,133,68,66,0,33,31],
    [931,65,66,66,0,33,31],
    [1,65,63,63,0,33,30],
    [934,1,68,62,0,34,28],
    [868,1,64,62,0,31,28],
    [625,270,206,68,0,103,33],
    [194,65,205,65,0,101,31],
    [542,133,202,66,0,102,31],
    [746,133,200,66,0,99,31],
    [1,201,203,66,0,99,31],
    [206,201,205,66,0,103,32],
    [1,270,206,67,0,103,32],
    [201,133,205,66,0,102,32],
    [725,65,204,65,0,102,31],
    [1,133,198,66,0,98,31],
    [684,201,205,67,0,102,32],
    [209,270,205,67,0,102,32],
    [416,270,207,67,0,103,32],
    [482,201,200,67,0,102,32],
    [401,65,201,65,0,103,31],
    [218,1,211,52,0,104,25],
    [1,1,215,52,0,107,25],
    [648,1,218,53,0,108,25],
    [431,1,215,52,0,105,25]
];

	oG.imageVars={getImFrames:getImFramesLoc};
}(opdGame));



(function(oG){//checked
	var lArr=[];
	var sArr=[];
	var sdSeq=[];
	var sdArr=[];
	var nLoop=0;

	function initLoc(){
		for(var i=0;i<30;i++){
			sArr[i]=i;
			lArr[i]=0;
			sdSeq[i]=i;
			sdArr[i]=i;
		}
		sdSeq=opdLib.shuffleArray(sdSeq);
		sArr=opdLib.shuffleArray(sArr);
		nLoop=0;
		oG.model.sdCount=0;
	}

	function getRoundLoc(){
		if(oG.model.sdMode){
			return sdRound();
		}else{
			return stRound();
		}
	}

	function sdRound(){
		if(oG.model.sdCount<30){
			var sVar=sdSeq[oG.model.sdCount];
			sdArr=opdLib.shuffleArrayForceInitial(sdArr,sVar);
			oG.model.sdCount++;
			return sdArr.slice(0,8);
		}else{
			return [-1];
		}
	}

	function stRound(){
		var end=nLoop+8;
		var curRun=sArr.slice(nLoop,end);
		return curRun;
	}

	function hitLoc(){
		if(oG.model.sdMode){
		}else{
			if(checkGood())oG.model.sdStart=true;
			//oG.model.sdStart=true;

			var cur=sArr[nLoop];
			if(!oG.model.missBool){
				lArr[cur]--;
			}else{
				lArr[cur]=2;
			}
			if(lArr[cur]<=0){
				nLoop++;
				if(nLoop==23){
					nLoop=22;
					prodDrop(8);
				}
			}
			if(lArr[cur]===1)prodDrop(14);
			if(lArr[cur]==2)prodDrop(5);
		}
	}

	function prodDrop(gLen){
		var add=Math.floor(Math.random()*4);
		var len=gLen+add;
		var lim=nLoop+len;
		if(lim>29)lim=29;
		var tmp=sArr[nLoop];
		for(var i=nLoop;i<lim;i++){
			sArr[i]=sArr[i+1];
		}
		sArr[lim]=tmp;
	}

	function checkGood(){
		var i=0;
		if(oG.model.routineInd==8){
			if(oG.model.misses<2)return true;
		}
		if(oG.model.routineInd==15){
			if(oG.model.misses<3)return true;
		}
		if(oG.model.routineInd==30){
			if(oG.model.misses<7)return true;
		}
		if(nLoop==22){
			var cnt=0;
			for(i=0;i<8;i++){
				var cInd=lArr[nLoop+i];
				cnt+=cInd;
				if(cInd==2)return false;
			}
			if(cnt<5)return true;
		}
		return false;
	}

	function deitLoc(){
		oG.model.gameScore=oG.model.sdCount;
	}

	oG.metrics={init:initLoc,deit:deitLoc,getRound:getRoundLoc,hit:hitLoc};
}(opdGame));


(function(oG){//checked
	function OptionsPane(){
		this.Container_constructor();
		this.deadClickFun=this.deadClick.bind(this);
		this.exitClickFun=this.exitClick.bind(this);
		this.timClickFun=this.timClick.bind(this);
		this.setup();
	}

	var p=createjs.extend(OptionsPane,createjs.Container);

	var countActiveText='Countdown is active';
	var countDeactiveText='Countdown is not active';

	p.setup=function(){
		this.lOut=null;
		this.fullBack=new createjs.Shape();
		this.fullBack.alpha=0.3;
		this.backPane=new createjs.Shape();
		this.addChild(this.fullBack,this.backPane);

		this.titleText=new createjs.Text('Options','bold 28px Amaranth', '#333');
		opdLib.centerText(this.titleText);
		this.promptText=new createjs.Text('Click below to turn off the countdown timer','bold 20px Amaranth', '#333');
		opdLib.centerText(this.promptText);
		this.promptText.lineWidth=350;
		this.countText=new createjs.Text(countActiveText,'bold 20px Amaranth', '#333');
		opdLib.centerText(this.countText);

		this.backBut=new createjs.Sprite(oG.model.mainSprite);
		this.backBut.gotoAndStop('backBut');

		this.tim=new oG.Modules.SettingsBut('tim');

		this.addChild(this.backBut,this.tim,this.titleText,this.promptText,this.countText);

		this.visible=false;

		this.setupDisplay();
	};

	p.setupDisplay=function(){
		this.fullBack.graphics.clear();
		this.backPane.graphics.clear();
		if(oG.model.orientation===0){
			this.fullBack.graphics.beginFill('#000').drawRect(0,0,800,550);
			this.backPane.graphics.setStrokeStyle(3).beginFill('#fff').beginStroke('#222').drawRoundRect(200,150,400,320,24);
			opdLib.posItem(this.backBut,215,165);
			opdLib.posItem(this.tim,400,350);
			opdLib.posItem(this.titleText,400,225);
			opdLib.posItem(this.promptText,400,275);
			opdLib.posItem(this.countText,400,415);
		}else{
			this.fullBack.graphics.beginFill('#000').drawRect(0,0,550,800);
			this.backPane.graphics.setStrokeStyle(3).beginFill('#fff').beginStroke('#222').drawRoundRect(75,240,400,320,24);
			opdLib.posItem(this.backBut,90,255);
			opdLib.posItem(this.tim,275,440);
			opdLib.posItem(this.titleText,275,315);
			opdLib.posItem(this.promptText,275,365);
			opdLib.posItem(this.countText,275,505);
		}
	};

	p.deadClick=function(){
	};

	p.exitClick=function(){
		oG.view.titleView.closeOptionsPane();
	};

	p.timClick=function(){
		if(this.tim.active){
			this.tim.deactivate();
			this.countText.text=countDeactiveText;
			oG.model.optShowTimer=false;
		}else{
			this.tim.activate();
			this.countText.text=countActiveText;
			oG.model.optShowTimer=true;
		}
	};

	p.addLists=function(){
		this.tim.init();
		this.tim.addEventListener('click',this.timClickFun);
	};

	p.removeLists=function(){
		this.tim.deit();
		this.tim.removeEventListener('click',this.timClickFun);
	};

	p.updateSettings=function(){
		if(oG.model.optShowTimer){
			this.tim.activate();
			this.countText.text=countActiveText;
		}else{
			this.tim.deactivate();
			this.countText.text=countDeactiveText;
		}
	};

	p.init=function(){
		this.visible=true;
		createjs.Tween.removeTweens(this);
		opdLib.fadeIn(this,250,0);

		this.backPane.addEventListener('click',this.deadClickFun);
		this.fullBack.addEventListener('click',this.exitClickFun);
		this.updateSettings();
		this.backBut.addEventListener('click',this.exitClickFun);
		this.backBut.cursor='pointer';

		this.addLists();
	};

	p.deit=function(){
		clearTimeout(this.lOut);
		this.visible=false;
		this.backPane.removeEventListener('click',this.deadClickFun);
		this.fullBack.removeEventListener('click',this.exitClickFun);
		this.removeLists();
		this.backBut.removeEventListener('click',this.exitClickFun);
		this.backBut.cursor='default';

		this.tim.deactivate();
	};

	oG.Modules.OptionsPane=createjs.promote(OptionsPane,'Container');
}(opdGame));



(function(oG){//checked
	var OptionsSet=function(){
		this.Container_constructor();
		this.clickerFun=this.clicker.bind(this);
		this.overerFun=this.overer.bind(this);
		this.outerFun=this.outer.bind(this);
		this.setup();
	};
	var p=createjs.extend(OptionsSet,createjs.Container);
	var xArrL=[150,400,650,275,525,150,400,650];
	var yArrL=[265,265,265,375,375,485,485,485];
	var xArrP=[150,400,275,150,400,275,150,400];
	var yArrP=[285,285,395,505,505,615,725,725];

	//0 - char
	//1 - eng
	//2 - pin
	//3 - char pin
	//4 - char eng
	//5 - char eng pin
	//6 - eng pin
	//7 - none

	var charY=[0,0,0,-14,-12,-24,0,0];
	var charSize=[0.6,0,0,0.5,0.5,0.4,0,0];
	var engY=[9,7,9,9,28,33,24,9];
	var engSize=[0,24,0,0,24,18,24,0];
	var pinY=[9,9,9,28,9,14,-2,9];
	var pinSize=[0,0,26,22,0,22,26,0];

	p.setup=function(){
		this.bits=[];
		this.scrambleArr=[];
		for(var i=0;i<8;i++){
			this.scrambleArr[i]=i;
			this.bits[i]=new oG.Modules.OptionBit(i);
			this.addChild(this.bits[i]);
		}
		this.setupDisplay();
	};

	p.setupDisplay=function(){
		var i=0;
		if(oG.model.orientation===0){
			for(i=0;i<8;i++){
				opdLib.posItem(this.bits[i],xArrL[i],yArrL[i]);
			}
		}else{
			for(i=0;i<8;i++){
				opdLib.posItem(this.bits[i],xArrP[i],yArrP[i]);
			}
		}
	};

	p.orientationChange=function(){
		this.setupDisplay();
	};

	p.adjDisp=function(){
		var cDisp=oG.model.optView;
		var cY=charY[cDisp];
		var cS=charSize[cDisp];
		var eY=engY[cDisp];
		var eS=engSize[cDisp];
		var pY=pinY[cDisp];
		var pS=pinSize[cDisp];
		for(var i=0;i<8;i++)this.bits[i].adjDisp(cY,cS,eY,eS,pY,pS);
	};

	p.showSet=function(gArr){
		this.scrambleArr=opdLib.shuffleArray(this.scrambleArr);
		for(var i=0;i<8;i++){
			this.bits[this.scrambleArr[i]].showItem(gArr[i]);
			this.bits[i].visible=true;
			this.bits[i].front.visible=true;
		}
		this.cTar=this.scrambleArr[0];
	};

	p.addLists=function(){
		this.addEventListener('click',this.clickerFun);
		if(!oG.model.touchMode){
			this.addEventListener('mouseover',this.overerFun);
			this.addEventListener('mouseout',this.outerFun);
			this.cursor='pointer';
		}
	};

	p.removeLists=function(){
		this.removeEventListener('click',this.clickerFun);
		if(!oG.model.touchMode){
			this.removeEventListener('mouseover',this.overerFun);
			this.removeEventListener('mouseout',this.outerFun);
			this.cursor='default';
		}
	};

	p.clicker=function(e){
		this.removeLists();
		if(e.target.ind===this.cTar){
			this.removeRest();
			oG.view.gameView.correctHit();
		}else{
			this.bits[e.target.ind].visible=false;
			oG.view.gameView.missHit();
		}
	};

	p.removeRest=function(){
		for(var i=0;i<8;i++){
			this.bits[i].visible=false;
		}
		this.bits[this.cTar].visible=true;
	};

	p.removeAnother=function(){
		var removed=false;
		var lVar=0;
		while(removed===false&&lVar<8){
			if(this.bits[lVar].visible===true&&lVar!=this.cTar){
				removed=true;
				this.bits[lVar].visible=false;
			}
			lVar++;
		}
	};

	p.overer=function(e){
		e.target.front.visible=false;
	};

	p.outer=function(e){
		e.target.front.visible=true;
	};

	p.init=function(){
		for(var i=0;i<8;i++){
			this.bits[i].init();
		}
		this.adjDisp();
	};

	p.deit=function(){
		for(var i=0;i<8;i++){
			this.bits[i].deit();
		}
		this.removeLists();
	};

	oG.Modules.OptionsSet=createjs.promote(OptionsSet,'Container');
}(opdGame));

(function(oG){
	var OptionBit=function(gInd){
		this.Container_constructor();
		this.ind=gInd;
		this.setup();
	};
	var p=createjs.extend(OptionBit,createjs.Container);

	var BIT_WID=240;
	var BIT_HEI=100;

	p.setup=function(){
		this.mouseChildren=false;
		// var back=new createjs.Sprite(oG.model.mainSprite);
		var back=new createjs.Shape();
		back.graphics.beginStroke('#ffffff').beginFill('#fc0').drawRoundRect(-BIT_WID/2,-BIT_HEI/2,BIT_WID,BIT_HEI,20);
		this.front=new createjs.Shape();
		this.front.graphics.beginStroke('#ffffff').beginFill('#CCCCFF').drawRoundRect(-BIT_WID/2,-BIT_HEI/2,BIT_WID,BIT_HEI,20);
		// this.front=new createjs.Sprite(oG.model.mainSprite);
		// back.gotoAndStop('itemBack');
		// this.front.gotoAndStop('itemFront');
		opdLib.dispItem(back,this,0,0);
		opdLib.dispItem(this.front,this,0,0);

		this.pText=new createjs.Text('pinyin','bold 24px Ubuntu','#666');
		this.eText=new createjs.Text('english','bold 24px Cabin','#fff');
		opdLib.centerText(this.pText);
		opdLib.centerText(this.eText);
		this.addChild(this.pText);
		this.addChild(this.eText);
	};

	p.showItem=function(gInd){
		this.cText.gotoAndStop(gInd);
		this.eText.text=oG.model.textArray[gInd];
		this.pText.text=oG.model.pinArray[gInd];
	};

	p.adjDisp=function(cY,cS,eY,eS,pY,pS){
		if(cS===0){
			this.cText.visible=false;
		}else{
			this.cText.visible=true;
			this.cText.y=cY;
			this.cText.scaleX=this.cText.scaleY=cS;
		}
		if(eS===0){
			this.eText.visible=false;
		}else{
			this.eText.visible=true;
			this.eText.y=eY;
			this.eText.font='bold '+eS+'px Cabin';
		}
		if(pS===0){
			this.pText.visible=false;
		}else{
			this.pText.visible=true;
			this.pText.y=pY;
			this.pText.font='bold '+pS+'px Ubuntu';
		}
	};

	p.init=function(){
		this.front.visible=true;

		this.cText=new createjs.Sprite(oG.model.contentSpriteSheet);
		this.addChild(this.cText);
	};

	p.deit=function(){
		this.removeChild(this.cText);
		this.cText=null;
	};

	oG.Modules.OptionBit=createjs.promote(OptionBit,'Container');
}(opdGame));


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


(function(oG){//checked
	function PreloadView(){
		this.Container_constructor();
		this.loadLineFun=this.loadLine.bind(this);
		this.setup();
	}
	var p=createjs.extend(PreloadView,createjs.Container);

	p.setup=function(){
		this.preloadText=new createjs.Text('loading','bold 16px Arial','#555');
		opdLib.centerText(this.preloadText);
		this.preLoaderImage=new Image();
		this.preLoaderImage.src=oG.model.preLoaderImageSrc;
		this.preIm=new createjs.Bitmap(this.preLoaderImage);
		this.preloadBits=[];
		for(var i=0;i<8;i++){
			this.preloadBits[i]=new createjs.Shape();
			this.preloadBits[i].graphics.beginFill('#ccc').drawRoundRect(0,0,20,20,4);
			this.addChild(this.preloadBits[i]);
			this.preloadBits[i].visible=false;
		}
		this.addChild(this.preloadText,this.preIm);

		this.setupDisplay();
	};

	p.setupDisplay=function(){
		var i=0;
		if(oG.model.orientation===0){
			opdLib.posItem(this.preloadText,400,310);
			opdLib.posItem(this.preIm,300,210);
			for(i=0;i<8;i++){opdLib.posItem(this.preloadBits[i],314+i*22,320);}
		}else{
			opdLib.posItem(this.preloadText,275,435);
			opdLib.posItem(this.preIm,175,335);
			for(i=0;i<8;i++){opdLib.posItem(this.preloadBits[i],189+i*22,445);}
		}
	};

	p.orientationChange=function(){
		this.setupDisplay();
	};

	p.preloadError=function(){
		createjs.Ticker.removeEventListener('tick',this.loadLineFun);
		this.preloadText.text="Error - can't load";
		for(var i=0;i<8;i++){
			this.preloadBits[i].graphics.clear();
			this.preloadBits[i].visible=true;
		}
	};

	p.init=function(){
		this.loadLineVar=0;
		createjs.Ticker.addEventListener('tick',this.loadLineFun);
		oG.preloader.init();
	};

	p.loadLine=function(event){
		this.loadLineVar++;
		if(this.loadLineVar>28)this.loadLineVar=0;

		var bitVar=Math.floor(this.loadLineVar/2);
		for(var i=0;i<8;i++){
			if(bitVar<i){
				this.preloadBits[i].visible=false;
			}else{
				this.preloadBits[i].visible=true;
			}
		}
	};

	p.deit=function(){
		createjs.Ticker.removeEventListener('tick',this.loadLineFun);
		oG.preloader.deit();
	};

	oG.Views.PreloadView=createjs.promote(PreloadView,'Container');
}(opdGame));



(function(oG){//checked
	var ReviewView=function(){
		this.Container_constructor();
		this.clickerFun=this.clicker.bind(this);
		this.audioClickFun=this.audioClick.bind(this);
		this.setup();
	};
	var p=createjs.extend(ReviewView,createjs.Container);

	p.setup=function(){
		this.cText=null;
		this.audioBut=new createjs.Sprite(oG.model.mainSprite);
		this.audioBut.gotoAndStop('audBut');
		this.backBut=new oG.Modules.Button('textBack','title');
		this.againBut=new oG.Modules.Button('textAgain','content-review');

		this.backBack=new createjs.Shape();
		this.backPane=new createjs.Shape();
		this.textBack=new createjs.Shape();
		this.addChild(this.backBack,this.backPane,this.textBack);

		this.pinText=new createjs.Text('pinyin','bold 32px Ubuntu','#666');
		this.engText=new createjs.Text('english','bold 28px Cabin','#888');

		opdLib.centerText(this.pinText);
		opdLib.centerText(this.engText);

		this.lArr=opdLib.drawArrow(30,'#fff');
		this.rArr=opdLib.drawArrow(30,'#fff');
		this.lArr.mouseChildren=false;
		this.rArr.mouseChildren=false;
		this.lArr.int=1;
		this.rArr.int=-1;

		this.rArr.rotation=180;

		this.addChild(this.pinText,this.engText,this.lArr,this.rArr,this.backBut,this.audioBut);

		this.setupDisplay();
	};

	p.setupDisplay=function(){
		this.backBack.graphics.clear();
		this.textBack.graphics.clear();
		this.backPane.graphics.clear();
		if(oG.model.orientation===0){
			this.backBack.graphics.beginFill('#fff').drawRoundRect(267,62,266,216,30);
			this.textBack.graphics.setStrokeStyle(3).beginStroke('#fff').beginFill('#ddd').drawRoundRect(200,320,400,100,24);
			this.backPane.graphics.setStrokeStyle(2).beginStroke('#888').beginFill('#ddd').drawRoundRect(275,70,250,200,24);

			opdLib.posItem(this.pinText,400,370);
			opdLib.posItem(this.engText,400,400);
			opdLib.posItem(this.lArr,600,170);
			opdLib.posItem(this.rArr,200,170);
			opdLib.posItem(this.againBut,400,470);
			opdLib.posItem(this.backBut,400,500);
			opdLib.posItem(this.audioBut,367,235);

			if(this.cText!=null)opdLib.posItem(this.cText,400,170);
		}else{
			this.backBack.graphics.beginFill('#fff').drawRoundRect(142,177,266,216,30);
			this.textBack.graphics.setStrokeStyle(3).beginStroke('#fff').beginFill('#ddd').drawRoundRect(75,435,400,100,24);
			this.backPane.graphics.setStrokeStyle(2).beginStroke('#888').beginFill('#ddd').drawRoundRect(150,185,250,200,24);

			opdLib.posItem(this.pinText,275,485);
			opdLib.posItem(this.engText,275,515);
			opdLib.posItem(this.lArr,475,285);
			opdLib.posItem(this.rArr,75,285);
			opdLib.posItem(this.againBut,275,585);
			opdLib.posItem(this.backBut,275,625);
			opdLib.posItem(this.audioBut,242,350);

			if(this.cText!=null)opdLib.posItem(this.cText,275,285);
		}
	};

	p.orientationChange=function(){
		this.setupDisplay();
	};

	p.clicker=function(e){
		this.dVar+=e.target.int;
		if(this.dVar==30)this.dVar=0;
		if(this.dVar<0)this.dVar=29;
		this.dispItem();
	};

	p.dispItem=function(){
		this.cText.gotoAndStop(this.dVar);
		this.engText.text=oG.model.textArray[this.dVar];
		this.pinText.text=oG.model.pinArray[this.dVar];
	};

	p.addLists=function(){
		this.lArr.addEventListener('click',this.clickerFun);
		this.lArr.cursor='pointer';
		this.rArr.addEventListener('click',this.clickerFun);
		this.rArr.cursor='pointer';
	};

	p.removeLists=function(){
		this.lArr.removeEventListener('click',this.clickerFun);
		this.lArr.cursor='default';
		this.rArr.removeEventListener('click',this.clickerFun);
		this.rArr.cursor='default';
	};

	p.audioClick=function(){
		createjs.Sound.stop();
		if(oG.model.audioLoaded)createjs.Sound.play('s_'+this.dVar);
	};

	p.audButDisplay=function(disp){
		if(disp=='show'){
			this.audioBut.visible=true;
		}else{
			this.audioBut.visible=false;
		}
	};

	p.init=function(){
		this.cText=new createjs.Sprite(oG.model.contentSpriteSheet);
		if(oG.model.orientation===0){
			opdLib.dispItem(this.cText,this,400,170);
		}else{
			opdLib.dispItem(this.cText,this,275,285);
		}

		this.dVar=0;
		this.dispItem();

		this.backBut.init();
		this.againBut.init();
		this.audioBut.addEventListener('click',this.audioClickFun);
		this.audioBut.cursor='pointer';

		opdLib.fadeIn(this,300,200);

		this.addLists();
	};

	p.deit=function(){
		this.removeChild(this.cText);
		this.cText=null;

		this.backBut.deit();
		this.againBut.deit();

		this.audioBut.removeEventListener('click',this.audioClickFun);
		this.audioBut.cursor='default';

		this.removeLists();
	};

	oG.Views.ReviewView=createjs.promote(ReviewView,'Container');
}(opdGame));


(function(oG){//checked
	function ScorePane(){
		this.Container_constructor();
		this.submitClickFun=this.submitClick.bind(this);
		this.showFieldsFun=this.showFields.bind(this);
		this.keyPressFun=this.keyPress.bind(this);
		this.showFieldsTimeout=null;
		this.setup();
	}

	var p=createjs.extend(ScorePane,createjs.Container);
	var paneBord=8;

	p.setup=function(){
		this.fontOne='bold 16px Arial';
		this.fontOneColor='#333';
		this.fontTwo='bold 18px Arial';
		this.fontTwoColor='#444';
		this.paneLength='short';
		this.scoreLabelText1='Score';
		this.scoreLabelText2='Time';
		this.paneBorderColor='#666';
	};

	p.initialSetup=function(){
		this.inputActive=false;
		this.submitCallback=function(){};
		this.myCan=document.getElementById('myCanvas');
		this.entryPaneContainer=new createjs.Container();
		this.scoreDispContainer=new createjs.Container();

		this.submitBut=new createjs.Container();
		this.submitButBack=new createjs.Shape();
		this.scoreDisp1=new createjs.Text('0',this.fontOne,this.fontOneColor);
		this.scoreDisp2=new createjs.Text('0',this.fontOne,this.fontOneColor);

		this.entryPaneBack=new createjs.Shape();
		this.entryPane=new createjs.Shape();
		this.scoreDispPaneBack=new createjs.Shape();
		this.scoreDispPane=new createjs.Shape();

		this.submitText=new createjs.Text('Submit',this.fontTwo,this.fontTwoColor);
		this.nameLabel=new createjs.Text('Name',this.fontOne,this.fontOneColor);
		this.localLabel=new createjs.Text('Location',this.fontOne,this.fontOneColor);
		this.scoreLabel1=new createjs.Text(this.scoreLabelText1,this.fontOne,this.fontOneColor);
		this.scoreLabel2=new createjs.Text(this.scoreLabelText2,this.fontOne,this.fontOneColor);

		this.entryPaneContainer.addChild(this.entryPaneBack,this.entryPane);
		this.scoreDispContainer.addChild(this.scoreDispPaneBack,this.scoreDispPane);

		opdLib.centerText(this.submitText);
		opdLib.centerText(this.nameLabel);
		opdLib.centerText(this.localLabel);
		opdLib.centerText(this.scoreLabel1);
		opdLib.centerText(this.scoreLabel2);
		opdLib.centerText(this.scoreDisp1);
		opdLib.centerText(this.scoreDisp2);

		this.submitBut.cursor='pointer';
		this.submitButBack.graphics.beginFill('#ff8').drawRoundRect(-50,-20,100,40,12);
		opdLib.dispItem(this.submitButBack,this.submitBut,0,0);
		opdLib.dispItem(this.submitText,this.submitBut,0,8);

		this.entryPaneContainer.addChild(this.submitBut,this.nameLabel,this.localLabel);

		this.scoreDispContainer.addChild(this.scoreLabel1,this.scoreDisp1);
		if(this.paneLength=='long'){
			this.scoreDispContainer.addChild(this.scoreLabel2,this.scoreDisp2);
		}

		this.addChild(this.entryPaneContainer,this.scoreDispContainer);

		this.nDiv=document.createElement('input');
		this.nDiv.id='inputName';
		this.setInputStyle(this.nDiv);
		document.getElementById('containerDiv').appendChild(this.nDiv);
		this.lDiv=document.createElement('input');
		this.lDiv.id='inputLocal';
		this.setInputStyle(this.lDiv);
		document.getElementById('containerDiv').appendChild(this.lDiv);

		this.nObj=new createjs.DOMElement('inputName');
		this.lObj=new createjs.DOMElement('inputLocal');
		this.nCont=new createjs.Container();
		this.lCont=new createjs.Container();
		this.nCont.addChild(this.nObj);
		this.lCont.addChild(this.lObj);
		this.addChild(this.nCont);
		this.addChild(this.lCont);

		this.setupDisplay();
	};

	p.setupDisplay=function(){
		this.entryPaneBack.graphics.clear();
		this.entryPane.graphics.clear();
		this.scoreDispPaneBack.graphics.clear();
		this.scoreDispPane.graphics.clear();

		var entryPaneHeight=160;
		var entryPaneWidth=120;
		var scoreDispPaneHeight=0;
		var scoreDispPaneWidth=120;
		if(oG.model.orientation===0){
			opdLib.posItem(this.submitBut,0,110);
			opdLib.posItem(this.nameLabel,0,-40);//-90
			opdLib.posItem(this.localLabel,0,20);//-30

			this.nameElemX=-2;
			this.nameElemY=-20;
			this.localElemX=-2;
			this.localElemY=40;

			if(this.paneLength=='long'){
				opdLib.posItem(this.entryPaneContainer,90,340);
				opdLib.posItem(this.scoreDispContainer,90,176);

				scoreDispPaneHeight=150;
				opdLib.posItem(this.scoreLabel1,0,-35);//30
				opdLib.posItem(this.scoreDisp1,0,-10);//55
				opdLib.posItem(this.scoreLabel2,0,25);//85
				opdLib.posItem(this.scoreDisp2,0,50);//110
			}else{
				opdLib.posItem(this.entryPaneContainer,90,320);
				opdLib.posItem(this.scoreDispContainer,90,190);

				scoreDispPaneHeight=80;
				opdLib.posItem(this.scoreLabel1,0,-5);
				opdLib.posItem(this.scoreDisp1,0,20);
			}
		}else{
			entryPaneHeight=100;
			entryPaneWidth=260;
			scoreDispPaneHeight=100;

			opdLib.posItem(this.submitBut,0,-50);
			opdLib.posItem(this.nameLabel,-60,-8);
			opdLib.posItem(this.localLabel,50,-8);

			this.nameElemX=-60;
			this.nameElemY=14;
			this.localElemX=50;
			this.localElemY=14;

			if(this.paneLength=='long'){
				opdLib.posItem(this.entryPaneContainer,170,660);
				opdLib.posItem(this.scoreDispContainer,410,660);
				scoreDispPaneWidth=200;
				opdLib.posItem(this.scoreLabel1,-40,-8);
				opdLib.posItem(this.scoreDisp1,-40,18);
				opdLib.posItem(this.scoreLabel2,40,-8);
				opdLib.posItem(this.scoreDisp2,40,18);
			}else{
				opdLib.posItem(this.entryPaneContainer,200,660);
				opdLib.posItem(this.scoreDispContainer,400,660);
				scoreDispPaneWidth=130;
				opdLib.posItem(this.scoreLabel1,0,-8);
				opdLib.posItem(this.scoreDisp1,0,18);
			}
		}

		var wid=entryPaneWidth-paneBord;
		var hei=entryPaneHeight-paneBord;
		var sHei=scoreDispPaneHeight-paneBord;
		var sWid=scoreDispPaneWidth-paneBord;
		this.entryPaneBack.graphics.beginFill(this.paneBorderColor)
		.drawRoundRect(-entryPaneWidth/2,-entryPaneHeight/2,entryPaneWidth,entryPaneHeight,16);
		this.entryPane.graphics.beginFill('#fff').drawRoundRect(-wid/2,-hei/2,wid,hei,12);
		this.scoreDispPaneBack.graphics.beginFill(this.paneBorderColor)
		.drawRoundRect(-scoreDispPaneWidth/2,-scoreDispPaneHeight/2,scoreDispPaneWidth,scoreDispPaneHeight,16);
		this.scoreDispPane.graphics.beginFill('#fff').drawRoundRect(-sWid/2,-sHei/2,sWid,sHei,12);

		this.arrangePanes();
		this.updateInputs();
	};

	p.arrangePanes=function(){
		if(oG.model.orientation===0){
			if(this.inputActive){
				this.entryPaneContainer.visible=true;
				if(this.paneLength=='long'){
					opdLib.posItem(this.entryPaneContainer,90,340);
					opdLib.posItem(this.scoreDispContainer,90,176);
				}else{
					opdLib.posItem(this.entryPaneContainer,90,320);
					opdLib.posItem(this.scoreDispContainer,90,190);
				}
			}else{
				this.entryPaneContainer.visible=false;
				opdLib.posItem(this.scoreDispContainer,90,265);
			}
		}else{
			if(this.inputActive){
				this.entryPaneContainer.visible=true;
				if(this.paneLength=='long'){
					opdLib.posItem(this.entryPaneContainer,170,660);
					opdLib.posItem(this.scoreDispContainer,410,660);
				}else{
					opdLib.posItem(this.entryPaneContainer,200,660);
					opdLib.posItem(this.scoreDispContainer,400,660);
				}
			}else{
				this.entryPaneContainer.visible=false;
				opdLib.posItem(this.scoreDispContainer,275,660);
			}
		}
		opdLib.fadeIn(this.entryPaneContainer,300,200);
		opdLib.fadeIn(this.scoreDispContainer,300,200);
	};

	p.setInputVisibility=function(bool){
		this.inputActive=bool;
		if(bool){
			this.showFieldsTimeout=setTimeout(this.showFieldsFun,500);
			this.updateInputs();
		}
		this.arrangePanes();
	};

	p.showFields=function(){
		document.querySelector('input').autofocus=true;
		this.nDiv.style.display='block';
		this.lDiv.style.display='block';
	};

	p.updateInputs=function(){
		if(this.inputActive==true){
			var rat=oG.model.canvasRatio;
			var wid=Math.round(80*rat);
			var hei=Math.round(20*rat);
			var paneX=this.entryPaneContainer.x*rat;
			var paneY=this.entryPaneContainer.y*rat;
			var xOff=Math.round(this.myCan.offsetLeft-wid/2+paneX);
			var yOff=Math.round(this.myCan.offsetTop-hei/2+paneY);

			var newFontSize=Math.round(20*rat);
			newFontSize=Math.floor(newFontSize);

			this.nDiv.style.fontSize=newFontSize+'px';
			this.lDiv.style.fontSize=newFontSize+'px';

			this.nDiv.style.height=hei+'px';
			this.lDiv.style.height=hei+'px';
			this.nDiv.style.width=wid+'px';
			this.lDiv.style.width=wid+'px';

			this.nCont.x=Math.round(xOff+(this.nameElemX*rat));
			this.nCont.y=Math.round(yOff+(this.nameElemY*rat));
			this.lCont.x=Math.round(xOff+(this.localElemX*rat));
			this.lCont.y=Math.round(yOff+(this.localElemY*rat));
		}
	};

	p.endSubmit=function(){
		this.entryPaneContainer.visible=false;
		this.submitBut.removeEventListener('click',this.submitClickFun);
		this.nDiv.style.display='none';
		this.lDiv.style.display='none';
	};

	p.cleanInputs=function(){
		var nom=this.nObj.htmlElement.value;
		if(nom.length>12)nom=nom.slice(0,12);
		nom=nom.replace(/[^a-zA-Z ]/g, '');
		this.nObj.htmlElement.value=nom;
		var loc=this.lObj.htmlElement.value;
		if(loc.length>12)loc=loc.slice(0,12);
		loc=loc.replace(/[^a-zA-Z ]/g, '');
		this.lObj.htmlElement.value=loc;
	};

	p.keyPress=function(e){this.cleanInputs();};

	p.setCallback=function(newFun){this.submitCallback=newFun;};

	p.submitClick=function(event){
		this.cleanInputs();
		var nom=this.nObj.htmlElement.value;
		var loc=this.lObj.htmlElement.value;
		if(nom.length>0&&loc.length>0){
			this.endSubmit();
			this.submitCallback(nom,loc);
			this.inputActive=false;
		}
	};

	p.setInputStyle=function(div){
		div.setAttribute('type','text');
		div.setAttribute('maxlength',12);
		div.style.position='absolute';
		div.style.left=0;
		div.style.top=0;
		div.style.display='none';
		div.style.textAlign='center';
		div.style.fontFamily=this.fontTwo.split('px ')[1];
		div.style.textDecoration='none';
		div.style.border='1px solid #999';
		div.style.margin='0px';
		div.style.padding='0px';
	};

	p.init=function(){
		this.inputActive=false;
		document.addEventListener('keyup',this.keyPressFun);
		this.submitBut.addEventListener('click',this.submitClickFun);
		this.updateInputs();
	};

	p.deit=function(){
		if(this.showFieldsTimeout!=null)clearTimeout(this.showFieldsTimeout);
		this.inputActive=false;
		this.endSubmit();
		document.removeEventListener('keyup',this.keyPressFun);
	};

	oG.Modules.ScorePane=createjs.promote(ScorePane,'Container');
}(opdGame));


(function(oG){//checked
	function SettingsPane(){
		this.Container_constructor();
		this.deadClickFun=this.deadClick.bind(this);
		this.optClickFun=this.optClick.bind(this);
		this.tarClickFun=this.tarClick.bind(this);
		this.exitClickFun=this.exitClick.bind(this);
		this.audClickFun=this.audClick.bind(this);
		this.timClickFun=this.timClick.bind(this);
		this.setup();
	}

	var p=createjs.extend(SettingsPane,createjs.Container);

	p.setup=function(){
		this.fullBack=new createjs.Shape();
		this.backPane=new createjs.Shape();
		this.fullBack.alpha=0.1;
		this.backPane.alpha=0.9;

		this.addChild(this.fullBack,this.backPane);

		this.backBut=new createjs.Sprite(oG.model.mainSprite);
		this.backBut.gotoAndStop('backBut');
		opdLib.dispItem(this.backBut,this,65,475);

		this.tChar=new oG.Modules.SettingsBut('char');
		this.tPin=new oG.Modules.SettingsBut('pin');
		this.tEng=new oG.Modules.SettingsBut('eng');

		opdLib.dispItem(this.tChar,this,92,30);
		opdLib.dispItem(this.tPin,this,92,80);
		opdLib.dispItem(this.tEng,this,92,130);

		this.aud=new oG.Modules.SettingsBut('audio');
		this.tim=new oG.Modules.SettingsBut('tim');

		opdLib.dispItem(this.aud,this,92,200);
		opdLib.dispItem(this.tim,this,92,250);

		this.bChar=new oG.Modules.SettingsBut('char');
		this.bPin=new oG.Modules.SettingsBut('pin');
		this.bEng=new oG.Modules.SettingsBut('eng');

		opdLib.dispItem(this.bChar,this,92,330);
		opdLib.dispItem(this.bPin,this,92,380);
		opdLib.dispItem(this.bEng,this,92,430);

		this.visible=false;

		this.setupDisplay();
	};

	p.setupDisplay=function(){
		this.fullBack.graphics.clear();
		this.backPane.graphics.clear();
		var whys=[];
		if(oG.model.orientation===0){
			this.fullBack.graphics.beginFill('#000').drawRect(0,0,800,550);
			this.backPane.graphics.setStrokeStyle(3).beginFill('#fff').beginStroke('#222').drawRect(1,1,180,548);

			whys=[475,30,80,130,200,250,330,380,430];
		}else{
			whys=[620,175,225,275,345,395,475,525,575];
			this.fullBack.graphics.beginFill('#000').drawRect(0,0,550,800);
			this.backPane.graphics.setStrokeStyle(3).beginFill('#fff').beginStroke('#222').drawRect(1,1,180,798);
		}
		this.backBut.y=whys[0];
		this.tChar.y=whys[1];
		this.tPin.y=whys[2];
		this.tEng.y=whys[3];
		this.aud.y=whys[4];
		this.tim.y=whys[5];
		this.bChar.y=whys[6];
		this.bPin.y=whys[7];
		this.bEng.y=whys[8];
	};

	p.orientationChange=function(){
		this.setupDisplay();
	};

	p.deadClick=function(){
	};

	p.exitClick=function(){
		oG.view.gameView.closeSettingsPane();
	};

	p.tarClick=function(e){
		if(e.target.active){
			e.target.deactivate();
			oG.view.gameView.removeTarget(e.target.tar);
		}else{
			e.target.activate();
			oG.view.gameView.addTarget(e.target.tar);
		}
		oG.view.gameView.targetSet.adjDisp();
		oG.view.gameView.updateDispFromSettings();
	};

	p.optClick=function(e){
		if(e.target.active){
			e.target.deactivate();
			oG.view.gameView.removeOption(e.target.tar);
		}else{
			e.target.activate();
			oG.view.gameView.addOption(e.target.tar);
		}
		oG.view.gameView.optionsSet.adjDisp();
	};

	p.audClick=function(){
		if(this.aud.active){
			this.aud.deactivate();
			oG.model.optPlayAudio=false;
		}else{
			this.aud.activate();
			oG.model.optPlayAudio=true;
		}
	};

	p.timClick=function(){
		if(this.tim.active){
			this.tim.deactivate();
			oG.model.optShowTimer=false;
		}else{
			this.tim.activate();
			oG.model.optShowTimer=true;
		}
		oG.view.gameView.updateDispFromSettings();
	};

	p.addLists=function(){
		this.aud.init();
		this.tim.init();
		this.aud.addEventListener('click',this.audClickFun);
		this.tim.addEventListener('click',this.timClickFun);

		this.tChar.init();
		this.tPin.init();
		this.tEng.init();
		this.tChar.addEventListener('click',this.tarClickFun);
		this.tPin.addEventListener('click',this.tarClickFun);
		this.tEng.addEventListener('click',this.tarClickFun);

		this.bChar.init();
		this.bPin.init();
		this.bEng.init();
		this.bChar.addEventListener('click',this.optClickFun);
		this.bPin.addEventListener('click',this.optClickFun);
		this.bEng.addEventListener('click',this.optClickFun);
	};

	p.removeLists=function(){
		this.aud.deit();
		this.tim.deit();
		this.aud.removeEventListener('click',this.audClickFun);
		this.tim.removeEventListener('click',this.timClickFun);

		this.tChar.deit();
		this.tPin.deit();
		this.tEng.deit();
		this.tChar.removeEventListener('click',this.tarClickFun);
		this.tPin.removeEventListener('click',this.tarClickFun);
		this.tEng.removeEventListener('click',this.tarClickFun);

		this.bChar.deit();
		this.bPin.deit();
		this.bEng.deit();
		this.bChar.removeEventListener('click',this.optClickFun);
		this.bPin.removeEventListener('click',this.optClickFun);
		this.bEng.removeEventListener('click',this.optClickFun);
	};

	p.updateSettings=function(){
		if(oG.model.optPlayAudio)this.aud.activate();
		if(oG.model.optShowTimer)this.tim.activate();

	//0 - char
	//1 - eng
	//2 - pin
	//3 - char pin
	//4 - char eng
	//5 - char eng pin
	//6 - eng pin
	//7 - none

		switch(oG.model.tarView){
			case 0:
			this.tChar.activate();
			break;
			case 1:
			this.tEng.activate();
			break;
			case 2:
			this.tPin.activate();
			break;
			case 3:
			this.tChar.activate();
			this.tPin.activate();
			break;
			case 4:
			this.tChar.activate();
			this.tEng.activate();
			break;
			case 5:
			this.tChar.activate();
			this.tEng.activate();
			this.tPin.activate();
			break;
			case 6:
			this.tPin.activate();
			this.tEng.activate();
			break;
		}

		switch(oG.model.optView){
			case 0:
			this.bChar.activate();
			break;
			case 1:
			this.bEng.activate();
			break;
			case 2:
			this.bPin.activate();
			break;
			case 3:
			this.bChar.activate();
			this.bPin.activate();
			break;
			case 4:
			this.bChar.activate();
			this.bEng.activate();
			break;
			case 5:
			this.bChar.activate();
			this.bEng.activate();
			this.bPin.activate();
			break;
			case 6:
			this.bPin.activate();
			this.bEng.activate();
			break;
		}
	};

	p.init=function(){
		this.visible=true;
		createjs.Tween.removeTweens(this);
		opdLib.fadeIn(this,250,0);
		this.backPane.addEventListener('click',this.deadClickFun);
		this.fullBack.addEventListener('click',this.exitClickFun);
		this.updateSettings();
		this.backBut.addEventListener('click',this.exitClickFun);
		this.backBut.cursor='pointer';
		this.addLists();
	};

	p.deit=function(){
		this.visible=false;
		this.backPane.removeEventListener('click',this.deadClickFun);
		this.fullBack.removeEventListener('click',this.exitClickFun);
		this.removeLists();
		this.backBut.removeEventListener('click',this.exitClickFun);
		this.backBut.cursor='default';

		this.bChar.deactivate();
		this.bEng.deactivate();
		this.bPin.deactivate();
		this.tChar.deactivate();
		this.tEng.deactivate();
		this.tPin.deactivate();

		this.aud.deactivate();
		this.tim.deactivate();
	};

	oG.Modules.SettingsPane=createjs.promote(SettingsPane,'Container');
}(opdGame));

(function(oG){
	function SettingsBut(tar){
		this.Container_constructor();
		this.tar=tar;
		this.overerFun=this.overer.bind(this);
		this.outerFun=this.outer.bind(this);
		this.setup();
	}
	var p=createjs.extend(SettingsBut,createjs.Container);
	var WID=140;
	var HEI=40;

	p.setup=function(){
		this.active=false;
		this.mouseChildren=false;
		var back=new createjs.Shape();
		back.graphics.beginFill('gold').drawRoundRect(-WID/2,-HEI/2,WID,HEI,8);
		this.addChild(back);
		this.front=new createjs.Shape();
		this.front.graphics.setStrokeStyle(2).beginStroke('#777').drawRoundRect(-WID/2,-HEI/2,WID,HEI,8);
		this.addChild(this.front);
		this.front.visible=false;

		this.tickBit=new createjs.Sprite(oG.model.mainSprite);
		this.tickBit.gotoAndStop('miniTick');
		opdLib.dispItem(this.tickBit,this,35,-15);
		this.tickBit.visible=false;

		if(this.tar=='char'){
			var charBit=new createjs.Sprite(oG.model.mainSprite);
			charBit.gotoAndStop('charHan');
			opdLib.dispItem(charBit,this,-54,-17);
		}else{
			var str='';
			switch(this.tar){
				case 'eng':
				str='English';
				break;
				case 'pin':
				str='Pinyin';
				break;
				case 'audio':
				str='Audio';
				break;
				case 'tim':
				str='Timer';
				break;
			}
			var txt=new createjs.Text(str,'bold 20px Alegreya Sans','#111');
			opdLib.centerText(txt);
			opdLib.dispItem(txt,this,-20,7);
		}
	};

	p.activate=function(){
		this.active=true;
		this.tickBit.visible=true;
	};

	p.deactivate=function(){
		this.active=false;
		this.tickBit.visible=false;
	};

	p.overer=function(){
		this.front.visible=true;
	};

	p.outer=function(){
		this.front.visible=false;
	};

	p.init=function(){
		this.front.visible=false;
		if(!oG.model.touchMode){
			this.addEventListener('mouseover',this.overerFun);
			this.addEventListener('mouseout',this.outerFun);
			this.cursor='pointer';
		}
	};

	p.deit=function(){
		if(!oG.model.touchMode){
			this.removeEventListener('mouseover',this.overerFun);
			this.removeEventListener('mouseout',this.outerFun);
			this.cursor='default';
		}
	};

	oG.Modules.SettingsBut=createjs.promote(SettingsBut,'Container');
}(opdGame));


(function(oG){//checked
	var TargetSet=function(){
		this.Container_constructor();
		this.setup();
	};
	var p=createjs.extend(TargetSet,createjs.Container);

	//0 - char
	//1 - eng
	//2 - pin
	//3 - char pin
	//4 - char eng
	//5 - char eng pin
	//6 - eng pin
	//7 - none

	var charY=[0,0,0,-14,-12,-24,0,0];
	var charSize=[1,0,0,0.6,0.6,0.5,0,0];
	var engY=[9,9,9,9,34,40,28,9];
	var engSize=[0,30,0,0,20,20,24,0];
	var pinY=[9,9,9,34,9,18,-2,9];
	var pinSize=[0,0,32,24,0,24,32,0];

	var BACK_WID=334;
	var BACK_HEI=120;

	p.setup=function(){
		// var back=new createjs.Sprite(oG.model.mainSprite);
		// back.gotoAndStop('tarBack');

		var back=new createjs.Shape();
		back.graphics.setStrokeStyle(4);
		back.graphics.beginStroke('#666666').beginFill('#F9F9F9').drawRoundRect(-BACK_WID/2,-BACK_HEI/2,BACK_WID,BACK_HEI,36);

		opdLib.dispItem(back,this,-0,-0);
		this.pText=new createjs.Text('yán jiū shēng','bold 32px Ubuntu','#444');
		this.eText=new createjs.Text('measure word','bold 32px Cabin','#ccc');
		opdLib.centerText(this.pText);
		opdLib.centerText(this.eText);
		this.addChild(this.eText);
		this.addChild(this.pText);
	};

	p.showTarget=function(tVar){
		this.cText.gotoAndStop(tVar);
		this.eText.text=oG.model.textArray[tVar];
		this.pText.text=oG.model.pinArray[tVar];

		var oVar=Math.round(600*oG.model.gameSpeed);
		if(oVar>0){
			opdLib.fadeIn(this.pText,oVar,0);
			opdLib.fadeIn(this.cText,oVar,0);
			opdLib.fadeIn(this.eText,oVar,0);
		}
	};

	p.adjDisp=function(){
		var curMode=oG.model.tarView;
		if(curMode==7){
			this.visible=false;
		}else{
			this.visible=true;
		}
		var cSize=charSize[curMode];
		var eSize=engSize[curMode];
		var pSize=pinSize[curMode];
		if(cSize===0){
			this.cText.visible=false;
		}else{
			this.cText.visible=true;
			this.cText.y=charY[curMode];
			this.cText.scaleX=this.cText.scaleY=cSize;
		}
		if(eSize===0){
			this.eText.visible=false;
		}else{
			this.eText.visible=true;
			this.eText.y=engY[curMode];
			this.eText.font='bold '+eSize+'px Cabin';
		}
		if(pSize===0){
			this.pText.visible=false;
		}else{
			this.pText.visible=true;
			this.pText.y=pinY[curMode];
			this.pText.font='bold '+pSize+'px Ubuntu';
		}
	};

	p.startClear=function(){
		this.pText.alpha=0;
		this.cText.alpha=0;
		this.eText.alpha=0;
	};

	p.startUnClear=function(){
		opdLib.fadeIn(this.pText,800,0);
		opdLib.fadeIn(this.cText,800,0);
		opdLib.fadeIn(this.eText,800,0);
	};

	p.init=function(){
		this.cText=new createjs.Sprite(oG.model.contentSpriteSheet);
		opdLib.dispItem(this.cText,this,0,0);

		this.eText.text='';
		this.pText.text='';
		this.cText.alpha=0;

		this.adjDisp();
	};

	p.deit=function(){
		this.removeChild(this.cText);
		this.cText=null;
	};

	oG.Modules.TargetSet=createjs.promote(TargetSet,'Container');
}(opdGame));


(function(oG){//checked
	var tArr=[];
	var pArr=[];
	function getTextLoc($var){
		return tArr[$var];
	}

	function getPinLoc($var){
		return pArr[$var];
	}

	function getSectionLoc($var){
		var bs=$var*30;
		var t0=bs+1;
		var t1=bs+30;
		var out=t0+"-"+t1;
		return out;
	}

	tArr[0]=["eight","no","big","two","to open","to go","people","three","water","one","to eat",
"o clock","to read","many/much","good/nice","very","to come back","home","nine","cold","hot",
"on/above","ten","to be","book","four","too","I/me","below","small"];
	pArr[0]=["bā","bù","dà","èr","kāi","qù","rén","sān","shuǐ","yī","chī","diǎn","dú","duō","hǎo",
"hěn","huí","jiā","jiǔ","lěng","rè","shàng","shí","shì","shū","sì","tài","wǒ","xià","xiǎo"];

	tArr[1]=["to love","food","all","(quantifier)","dog","to drink","to look at","piece","inside","six","(question marker)","you","seven","he/him","to think","five","a few","to have","at","this","(belongs to)","can (ability)","how many","years/age","to call","to come","to buy","cat","not","to be able to"];
	pArr[1]=["ài","cài","dōu","gè","gǒu","hē","kàn","kuài","lǐ","liù","ma","nǐ","qī","tā","xiǎng","wǔ","xiē","yǒu","zài","zhè","de","huì","jǐ","sui","jiào","lái","mǎi","māo","méi","néng"];

	tArr[2]=["year","day","few, little","who","to listen","she/her","to write","month","to live","to do","father","edition/volume","computer","thing","happy","and","today","teacher","mother","rice","that","you (plural)","money","to know","what","fruit","classmate","to like","thanks","student"];
	pArr[2]=["nián","rì","shǎo","shuí","tīng","tā","xiě","yuè","zhù","zuò","bà ba","běn","diàn nǎo","dōng xi","gāo xìng","hé","jīn tiān","lǎo shī","mā ma","mǐ fàn","nà","nǐ men","qián","rèn shi","shén me","shuǐ guǒ","tóng xué","xǐ huan","xiè xie","xué shēng"];

	tArr[3]=["Beijing","tea","television","how many/much","son","restaurant","to work","name","friend","morning","to say","we, us","now","to study","chair","China","to sit","cup","to phone someone","movie","airplane","to see","zero","tomorrow","where","(suggestion)","apple","shop","time, when","they, them"];
	pArr[3]=["Běi jīng","chá","diàn shì","duō shao","ér zi","fàn diàn","gōng zuò","míng zi","péng you","shàng wǔ","shuō huà","wǒ men","xiàn zài","xué xí","yǐ zi","zhōng guó","zuò","bēi zi","dǎ diàn huà","diàn yǐng","fēi jī","kàn jiàn","líng","míng tiān","nǎ r","ne","píng guǒ","shāng diàn","shí hòu","tā men"];

	tArr[4]=["they/them (female)","afternoon","mister","week","school","clothing","doctor","good-bye","how","noon","Chinese character","yesterday","you\"re welcome","taxi","sorry","Chinese language","back","railway station","(past tense)","it doesn\"t matter","daughter","front","please","to sleep","weather","to rain","miss","hospital","how about","table"];
	pArr[4]=["tā men","xià wǔ","xiān sheng","xīng qī","xué xiào","yī fu","yī shēng","zài jiàn","zěn me","zhōng wǔ","zì","zuó tiān","bú kè qi","chū zū chē","duì bu qǐ","hàn yǔ","hòu miàn","huǒ chē zhàn","le","méi guān xi","nǚ ér","qián miàn","qǐng","shuì jiào","tiān qì","xià yǔ","xiǎo jiě","yī yuàn","zěn me yàng","zhuō zi"];


	tArr[5]=["(suggestion)","everyone","to tell","to reply","can (permission)","milk","to get sick","hey","eye","sport","do not","to wait","company","older sister","from","ticket","to give/send","to hope","already","to look for","boat","room","delicious","to think","busy","sunny","to dance","new","to swim","to prepare"];
	pArr[5]=["ba","dà jiā","gào su","huí dá","kě yǐ","niú nǎi","shēng bìng","wèi","yǎn jing","yùn dòng","bié","děng","gōng sī","jiě jie","lí","piào","sòng","xī wàng","yǐ jīng","zhǎo","chuán","fáng jiān","hǎo chī","jué de","máng","qíng","tiào wǔ","xīn","yóu yǒng","zhǔn bèi"];

	tArr[6]=["white","but","older brother","airport","lesson/class","woman","birthday","why?","lamb","again","long","younger brother","expensive","to introduce","pair/two of","beautiful","so","to wash","together","(continuing tense)","(quantifier - times)","very","number","coffee","every","last year","outside","family name","right side","bicycle"];
	pArr[6]=["bái","dàn shì","gē ge","jī chǎng","kè","nǚ rén","shēng rì","wèi shén me","yáng ròu","zài","cháng","dì di","guì","jiè shào","liǎng","piào liang","suǒ yǐ","xǐ","yī qǐ","zhe","cì","fēi cháng","hào","kā fēi","měi","qù nián","wài","xìng","yòu bian","zì xíng chē"];

	tArr[7]=["hundred","to arrive","to give","egg","quick","side","time","to ask","medicine","morning","to sing","first","(perfect tense)","to enter","road","wife","it","towards","meaning","really","from","minute","black","to begin","younger sister","to let/allow","to play","to rest","fish","to walk"];
	pArr[7]=["bǎi","dào","gěi","jī dàn","kuài","páng biān","shí jiān","wèn","yào","zǎo shang","chàng gē","dì yī","guò","jìn","lù","qī zi","tā","xiàng","yì si","zhēn","cóng","fēn zhōng","hēi","kāi shǐ","mèi mei","ràng","wán","xiū xi","yú","zǒu"];

	tArr[8]=["to help","(adverbial particle)","bus","(quantifier - clothes)","happy","to run","matter","question","to want, will","piece","to go out","right/correct","still","close/near","to travel","to get up","to play football","hour","cloudy","currently","wrong","waiter","red","exam","man","to go to work","to finish","snow","yuan (rmb)","most"];
	pArr[8]=["bāng zhù","de","gōng gòng qì chē","jiàn","kuài lè","pǎo bù","shì qing","wèn tí","yào","zhāng","chū","duì","hái","jìn","lǚ yóu","qǐ chuáng","tī zú qiú","xiǎo shí","yīn","zhèng zài","cuò","fú wù yuán","hóng","kǎo shì","nán rén","shàng bān","wán","xuě","yuán","zuì"];

	tArr[9]=["to compare with","(adverbial particle)","kilogram","classroom","tired","cheap","watch","watermelon","also","husband","to wear","towards","child","only/just","slow","thousand","question","to smile","because","to know","to play basketball","tall","to welcome","to be possible","you (formal)","body, health","evening","color","far","left side"];
	pArr[9]=["bǐ","de","gōng jīn","jiào shì","lèi","pián yi","shǒu biǎo","xī guā","yě","zhàng fu","chuān","duì","hái zi","jiù","màn","qiān","tí","xiào","yīn wèi","zhī dào","dǎ lán qiú","gāo","huān yíng","kě néng","nín","shēn tǐ","wǎn shang","yán sè","yuǎn","zuǒ bian"];


	tArr[10]=["maid/auntie","grass","animal","nation","foot","gift","fat","pair","banana","influence","office","except for","convenience","painting","to pass","at once","autumn","PE/sports","suitcase","to stand","must","light/lamp","to follow","badly/excessively","guest","south","voice","for","definitely","important"];
	pArr[10]=["ā yí","cǎo","dòng wù","guó jiā","jiǎo","lǐ wù","pàng","shuāng","xiāng jiāo","yǐng xiǎng","bàn gōng shì","chú le","fāng biàn","huà","jīng guò","mǎ shàng","qiū","tǐ yù","xíng li xiāng","zhàn","bì xū","dēng","gēn","jí","kè rén","nán","shēng yīn","wèi","yī dìng","zhòng yào"];

	tArr[11]=["short","bad (quality)","passage of text","past (time)","street","face","grape","driver","to believe","game","bag","word","to relax","to return","long (time)","satisfied","afterwards","hair","panda","to worry","to express/signify","place/location","more","season","mouth","to be sad","world","for","soon/a moment","mainly"];
	pArr[11]=["ǎi","chà","duàn","guò qù","jiē dào","liǎn","pú tao","sī jī","xiāng xìn","yóu xì","bāo","cí yǔ","fàng xīn","huán","jiǔ","mǎn yì","rán hòu","tóu fà","xióng māo","zháo jí","biǎo shì","dì fāng","gèng","jì jié","kǒu","nán guò","shì jiè","wèi  le","yī huì r","zhǔ yào"];

	tArr[12]=["quiet","shirt","how","to be scared","program","(quantifier - cars)","to ride","despite","to be careful","again","newspaper","to clean","nearby","to change","to hold/carry out","door/gate","serious","library","to choose","photo","other people","map","story/tale","simple","pants","grade/year in school","thin","west","constantly","attention"];
	pArr[12]=["ān jìng","chèn shān","duō me","hài pà","jié mù","liàng","qī","suī rán","xiǎo xīn","yòu","bào zhǐ","dǎ sǎo","fù jìn","huàn","jǔ xíng","mén","rèn zhēn","tú shū guán","xuǎn zé","zhào piàn","bié rén","dì tú","gù shi","jiǎn dān","kù zi","nián jí","shòu","xī","yī zhí","zhù yì"];

	tArr[13]=["to move","city","moreover","blackboard","to finish","neighbor","actually","sugar","shoe","would like to","by/be acted on","to bring","clean","meeting","to decide","bread","if","to finish","to require","only","refrigerator","email","to shut","to meet","chopsticks","bird","uncle","washroom","before","oneself"];
	pArr[13]=["bān","chéng shì","ér qiě","hēi bǎn","jié shù","lín jū","qí shí","táng","xié","yuàn yì","bèi","dài","gān jìng","huì yì","jué dìng","miàn bāo","rú guǒ","wán chéng","yāo qiú","zhǐ","bīng xiāng","diàn zǐ yóu jiàn","guān","jiàn miàn","kuài zi","niǎo","shū shu","xǐ shǒu jiān","yǐ qián","zì jǐ"];

	tArr[14]=["half","to appear","fever","flower","to borrow","green","pencil","pain","fresh","moon","to compare","cake","cold","nearly","lovely","clear","to get online","ten thousand","generally","finally","menu","winter","to concern","to teach","old","to climb up","math","summer","bank","recently"];
	pArr[14]=["bàn","chū xiàn","fā shāo","huā","jiè","lǜ","qiān bǐ","téng","xīn xiān","yuè liàng","bǐ jiào","dàn gāo","gǎn mào","jī hū","kě ài","míng bai","shàng wǎng","wàn","yī bān","zhōng yú","cài dān","dōng","guān xīn","jiāo","lǎo","pá shāng","shù xué","xià","yín háng","zuì jìn"];


	tArr[15]=["ah","story/layer","short/brief","juice","to connect","history","beer","to brush teeth","as/like","to use","to help","spring","to put","bad","manager","to sell","skirt","colleague","interesting","to grow","change","low","basis/root","chance","air conditioning","difficult","to be angry","(quantifier - people)","altogether","weekend"];
	pArr[15]=["a","céng","duǎn","guǒ zhī","jiē","lì shǐ","pí jiǔ","shuā yá","xiàng","yòng","bāng máng","chūn","fàng","huài","jīng lǐ","mài","qún zi","tóng shì","xìng qǔ","zhǎng","biàn huà","dī","gēn jù","jī huì","kōng tiáo","nán","shēng qì","wèi","yī gòng","zhōu mò"];

	tArr[16]=["hobby","supermarket","to exercise","still","to marry","to practice","Mandarin","level of ability","same","famous","full","clever","to divide","environment","old","hat","enthusiasm","suddenly","to need","to look after","to perform","subway","park","to examine","to cry","music","to make","culture","after","to wish"];
	pArr[16]=["ài hào","chāo shì","duàn liàn","hái shì","jié hūn","liàn xí","pǔ tōng huà","shuǐ píng","xiāng tóng","yǒu míng","bǎo","cōng ming","fēn","huán jìng","jiù","mào zǐ","rè qíng","tū rán","xū yào","zhào gù","biǎo yǎn","dì tiě","gōng yuán","jiǎn chá","kū","yīn yuè","shǐ","wén huà","yǐ hòu","zhù"];

	tArr[17]=["handle/act upon","score/grade","to be hungry","river","to solve","to know/understand","strange","sun","headmaster","to meet","north","plan","to review/revise","yellow","sentence","rice","to think","leg","glasses","camera","hotel","elevator","to blow","healthly","piece","youth","mobile phone","custom/tradition to","to think (wrongly)","dictionary"];
	pArr[17]=["bǎ","chéng jì","è","hé","jiě jué","liáo jiě","qí guài","tài yang","xiào zhǎng","yù dào","běi fāng","dǎ suàn","fù xí","huáng","jù zǐ","mǐ","rèn wéi","tuǐ","yǎn jìng","zhào xiàng jī","bīn guǎn","diàn tī","guā fēng","jiàn kāng","kuài","nián qīng","shǒu jī","xí guàn","yǐ wéi","zì diǎn"];

	tArr[18]=["class/group","to be late","ear","passport","festival","building","else/another","special","letter","more/to get over","match","to worry","to dare","or","to carve","noodle","easy","bowl","grandfather","kind","just","to understand","connection/relation","to speak","blue","to try hard","tree","to bathe","same","always"];
	pArr[18]=["bān","chí dào","ěr duo","hù zhào","jié rì","lóu","qí tā","tè bié","xìn","yuè","bǐ sài","dān xīn","gǎn","huò zhě","kè","miàn tiáo","róng yi","wǎn","yé ye","zhǒng","cái","dǒng","guān xì","jiǎng","lán","nǔ lì","shù","xǐ zǎo","yī yàng","zǒng shì"];

	tArr[19]=["method","kitchen","to discover","garden","often","horse","clear","to improve","news","cloud","nose","surely","just now","to remember","thirsty","grandmother","umbrella","to forget","at the same time","middle","to attend","east","regarding","corner","to leave","plate","comfortable","first","should","homework"];
	pArr[19]=["bàn fǎ","chú fáng","fā xiàn","huā yuán","jīng cháng","mǎ","qīng chǔ","tí gāo","xīn wén","yún","bí zi","dāng rán","gāng cái","jì de","kě","nǎi nǎi","sǎn","wàng jì","yī biān","zhōng jiān","cān jiā","dōng","guān yú","jiǎo","lí kāi","pán zi","shū fu","xiān","yīng gāi","zuò yè"];


	tArr[20]=["messy","to give","bright","a hundred million","two","fake","light","inside","to ring out","tired","field","enough","when","to get","lazy","to wear","to put up","to rub","sweat","soup","full","pig","salt","hard","while","to take off","to agree","to earn","sour","page"];
	pArr[20]=["luàn","jiāo","liàng","yì","liǎ","jiǎ","guāng","nèi","xiǎng","kùn","chǎng","gòu","dāng","dé","lǎn","dài","guà","cā","hàn","tāng","mǎn","zhū","yán","yìng","ér","tuō","xíng","zhuàn","suān","yè"];

	tArr[21]=["to lose","… times","thick","take","salty","wall","to taste","to do","to throw","to embrace","to hit","not to have","(tree measure word)","to die","deep","to guess","broken","narrow","to calculate","dirty","to lie","soft","hot","to connect","to wake up","fragrant","with","part","to repair","to send"];
	pArr[21]=["diū","bèi","hòu","qǔ","xián","qiáng","cháng","nòng","rēng","bào","zhuàng","wú","kē","sǐ","shēn","cāi","pò","zhǎi","suàn","zāng","tǎng","ruǎn","là","lián","xǐng","xiāng","yǔ","fèn","xiū","fā"];

	tArr[22]=["platform, table","each","to quarrel","mouth","to send","very","to drop","to push","to knock","by","province","and so on","piece","bitter","blood","to try","to talk","a trip","light","all over","to accompany","meal","of","according  to","knife","bottom","but","ah","circle","wide"];
	pArr[22]=["tái","gè","chǎo","zuǐ","jì","tǐng","diào","tuī","qiāo","yóu","shěng","děng","piān","kǔ","xuè","shì","tán","tàng","qīng","biàn","péi","dùn","zhī","yǐ","dāo","dǐ","què","ya","yuán","kuān"];

	tArr[23]=["rich","handsome","to do","surplus","seat","past","to raise","to pull","to point","to collect","dark","bouquet (flowers)","bridge","dream","fire","to stay","to rent","poor","stupid","crowd","to win","to lose","to pass time","to stroll","to deceive","here","there","all","Chinese language","just now"];
	pArr[23]=["fù","shuài","gàn","shèng","zuò","wǎng","tái","lā","zhǐ","shōu","àn","duǒ","qiáo","mèng","huǒ","liú","zū","qióng","bèn","qún","yíng","shū","guò","guàng","piàn","zhè r","nà r","yī qiè","zhōng wén","gāng gāng"];

	tArr[24]=["careful","task","to ensure","to stop","entrance","the last","countryside","calm","to reduce","to set out","difference","pressure","original","to oppose","to develop","have to","pitiful","number","to be surprised","taste","quality","recall","the earth","to increase","to lose","grandson","real","password","tour guide","tool"];
	pArr[24]=["zǐ xì","rèn wù","bǎo zhèng","tíng zhǐ","rù kǒu","zuì hòu","nóng cūn","lěng jìng","jiǎn shǎo","chū fā","qū bié","yā lì","yuán lái","fǎn duì","fā zhǎn","zhǐ hǎo","kě lián","hào mǎ","chī jīng","wèi dao","pǐn zhì","huí yì","dì qiú","zēng zhǎng","shī bài","sūn zi","shí zài","mì mǎ","dǎo yóu","gōng jù"];


	tArr[25]=["besides","happiness","humorous","mood","suddenly","attitude","condition","happy","feeling","to dress up","to get an injection","to be sorry","to be on time","to arrange","to remind","to support","income","change","effect","to clear up","aspect","general","temporarily","appearance","a plant","to pollute","sofa","to weep","performance","however"];
	pArr[25]=["bìng qiě","xìng fú","yōu mò","xīn qíng","hū rán","tài du","qíng kuàng","yú kuài","gǎn jué","dǎ bàn","dǎ zhēn","bào qiàn","àn shí","pái liè","tí xǐng","zhī chí","shōu rù","gǎi biàn","xiào guǒ","zhěng lǐ","fāng miàn","pǔ biàn","zàn shí","yàng zi","zhí wù","wū rǎn","shā fā","liú lèi","yǎn chū","rán ér"];

	tArr[26]=["to be familiar with","love","father","lion","monkey","ideal","life","because of","skin","purpose","master (post-grad)","society","to congratulate","air","visa","nervous","to constitute","economy","experience","result","shortcoming","tennis","to consider","belly","to achieve","to express","rule","plan","to hate","journalist"];
	pArr[26]=["shú xi","ài qíng","fù qin","shī zi","hóu zi","lǐ xiǎng","shēng huó","yóu yú","pí fū","mù di","shuò shì","shè huì","zhù hè","kōng qì","qiān zhèng","jǐn zhāng","zǔ chéng","jīng jì","jīng yàn","jié guǒ","quē diǎn","wǎng qiú","kǎo lǜ","dù zi","huò dé","biǎo dá","guī dìng","jì huà","tǎo yàn","jì zhě"];

	tArr[27]=["to prove","dictionary","honest","to misunderstand","to take off","distance","process","to suit","to notify","part","mirror","to read","to limit","to assemble","in passing","scenery","drink","dumplings","to encourage","children","regardless of …","century","strict","therefore","Beijing opera","relative","always","representative","price","excellence"];
	pArr[27]=["zhèng míng","cí diǎn","chéng shí","wù hui","qǐ fēi","jù lí","guò chéng","shì hé","tōng zhī","bù fèn","jìng zi","yuè dú","xiàn zhi","jí hé","shùn biàn","fēng jǐng","yǐn liào","jiǎo zi","gǔ lì","ér tóng","bù guǎn","shì jì","yán gé","yú shì","jīng jù","qīn qi","cóng lái","dài biǎo","jià gé","yōu xiù"];

	tArr[28]=["to use","to trust","to allow","free of charge","kilometer","essential","birth","to judge","everywhere","to work overtime","brave","very","doctor (Ph.D.)","formidable","to forgive","friendly","to reflect","to receive","so long as","It's a pity","leaf","qualified","to sympathize","otherwise","to discuss","difficulty","international","address","foundation","to fill a vacancy"];
	pArr[28]=["shǐ yòng","xìn rèn","yǔn xǔ","miǎn fèi","gōng lí","guān jiàn","chū shēng","pàn duàn","dào chù","jiā bān","yǒng gǎn","shí fēn","bó shì","lì hài","yuán liàng","yǒu hǎo","fǎn yìng","shòu dào","zhǐ yào","kě xī","yè zi","hé gé","tóng qíng","fǒu zé","shāng liang","kùn nan","guó jì","dì zhǐ","jī chǔ","tián kòng"];

	tArr[29]=["to copy","general idea","to arrange","dialogue","opposite","future","master","cheers","broadcast","a place to sit","to cause","at once","often","lawyer","to be proud","character","afraid","opinion","emotion","ripe","all","to disturb","nurse","according to","to tidy","professor","quantity","neat and tidy","direction","since"];
	pArr[29]=["fù yìn","dà gài","ān pái","duì huà","duì miàn","jiāng lái","shī fu","gān bēi","guǎng bō","zuò wèi","yǐn qǐ","dàng shí","wǎng wǎng","lǜ shī","dé yì","xìng gé","kǒng pà","yì jian","gǎn qíng","chéng shú","suǒ yǒu","dǎ rǎo","hù shi","àn zhào","shōu shí","jiào shòu","shù liàng","zhěng qí","fāng xiàng","jì rán"];


	tArr[30]=["condition","extremely","correct","to graduate","towel","law","activity","fluency","waste","ocean","temperature","actor","busy","toothpaste","characteristic","haircut","life","knowledge","exactly","joke","organization","to continue","to lack","patient","to chat","occupation","ability","temper","natural","scheduled flight"];
	pArr[30]=["tiáo jiàn","jí qí","zhèng què","bì yè","máo jīn","fǎ lǜ","huó dòng","liú lì","làng fèi","hǎi yáng","wēn dù","yǎn yuán","rè nao","yá gāo","tè diǎn","lǐ fà","shēng mìng","zhī shi","jiū jìng","xiào hua","zǔ zhī","jì xù","quē shǎo","nài xīn","liáo tiān","zhí yè","néng lì","pí qi","zì rán","háng bān"];

	tArr[31]=["to economize","famous","form","socks","police","language","to ask for time off","shopping","to stand up","to exceed","to be in progress","gradually","to invite","again","emphasis","smoothly","arrogant","senior","to clap","suitable","but, only","specially","idea","to conduct","mutually","asia","communication","still","fax","sad"];
	pArr[31]=["jié yuē","zhù míng","biǎo gé","wà zi","jǐng chá","yǔ yán","qǐng jià","gòu wù","qǐ lái","chāo guò","jìn xíng","zhú jiàn","yāo qǐng","chóng xīn","zhòng diǎn","shùn lì","jiāo ào","gāo jí","gǔ zhǎng","hé shì","bù guò","zhuān mén","zhú yi","jǔ bàn","hù xiāng","yà zhōu","jiāo liú","réng rán","chuán zhēn","shāng xīn"];

	tArr[32]=["author","confidence","to be worth","whole","secondly","exact","to the end","power","action","to include","impression","reason","in time","in addition","not only","regret","to attract","to persist","complex","doctor","money award","benefit","alone","safety","completely","reality","shy","furniture","respect","salary"];
	pArr[32]=["zuò zhě","xìn xīn","zhí dé","quán bù","qī cì","zhǔn què","dào dǐ","lì qì","dòng zuò","bāo kuò","yìn xiàng","yuán yīn","jí shí","lìng wài","bù dàn","hòu huǐ","xī yǐn","jiān chí","fù zá","dài fu","jiǎng jīn","hǎo chù","gū dān","ān quán","wán quán","shí jì","hài xiū","jiā jù","zūn zhòng","gōng zī"];

	tArr[33]=["dry","ordinarily","age","advertisement","local","gender","to sum up","thank","to become","to print","to enlarge","news report","to smoke","to recruit for a job","to supply","education","to take a walk","number","article","bored","warm","interesting","originally","magazine","material","as expected","normal","official","ethnic group","climate"];
	pArr[33]=["gān zào","píng shí","nián líng","guǎng gào","dàng dì","xìng bié","zǒng jié","gǎn xiè","chéng wéi","dǎ yìn","kuò dà","bào dǎo","chōu yān","zhāo pìn","tí gōng","jiào yu","sàn bù","shù zì","wén zhāng","wú liáo","nuǎn huo","yǒu qù","běn lái","zá zhì","cái liào","guǒ rán","zhèng cháng","zhèng shì","mín zú","qì hòu"];

	tArr[34]=["forever","active","popular","romantic","message","moist","to be excited","modern","to understand","to apply for","opposite","reliable","to prohibit","science","to fit with","careless","to experience","website","beauty","to translate","contact","to be sure","at least","art","range","to praise","audience","to explain","to visit","to invite to dinner"];
	pArr[34]=["yǒng yuǎn","huó pō","liú xíng","làng màn","xiāo xi","shī rùn","jī dòng","xiàn dài","lǐ jiě","shēn qǐng","xiāng fǎn","què shí","jìn zhǐ","kē xué","fǔ hé","cū xīn","jīng lì","wǎng zhàn","měi lì","fān yi","lián xì","kěn dìng","zhì shǎo","yì shu","fàn wéi","biǎo yáng","guān zhòng","jiě shì","fǎng wèn","qǐng kè"];


	tArr[35]=["responsibility","to adapt to","speed","to take seriously","key","the Great Wall","sunshine","casual","couldn't it be","unexpectedly","order","customer","to prepare for class","capital","trouble","exciting","major (college)","serious","height","abundant","initiative","to ride","perhaps","traffic","to replace","any","advantage","estimate","action","for example"];
	pArr[35]=["zé rèn","shì ying","sù dù","zhòng shi","yào shi","cháng chéng","yáng guāng","suí biàn","nán dào","jìng rán","shùn xu","gù kè","yù xí","shǒu dū","má fan","xìng fèn","zhuān yè","yán zhòng","gè zi","fēng fù","zhǔ dòng","chéng zuò","yě xǔ","jiāo tōng","dài tì","rèn hé","yōu diǎn","gū jì","zuò yòng","lì rú"];

	tArr[36]=["to protect","once in a while","shared, common","not only","among","to cultivate","content","had better …","on time","cool","to lose weight","to go on business","to make","ten million","dangerous","even if","to visit","friendship","to happen","but","afterwards","around","we, us","cough","therefore","to be in traffic","to increase","approximately","to lose hope","to seem"];
	pArr[36]=["bǎo hù","ǒu ěr","gòng tóng","bù jǐn","qī zhōng","yǎng chéng","nèi róng","zuì hǎo","zhǔn shí","liáng kuai","jiǎn féi","chū chāi","zhì zào","qiān wàn","wēi xiǎn","jí shǐ","cān guān","yǒu yí","fā shēng","kě shì","hòu lái","zhōu wéi","zán men","ké sòu","yīn cǐ","dǔ chē","zēng jiā","dà yuē","shī wàng","hǎo xiàng"];

	tArr[37]=["winter vacation","novel","especially","although","market","doubt","to be moved","to succeed","to discount","to criticize","technology","to sign up","to refuse","to accept","to postpone","ahead of schedule","to shake hands","to give up","on purpose","method","no matter what","diary","standard","forest","just in time","mother","to be worried","bottle","...even…","to study abroad"];
	pArr[37]=["hán jià","xiǎo shuō","yóu qí","jǐn guǎn","shì chǎng","huái yí","gǎn dòng","chéng gōng","dǎ zhé","pī píng","jì shu","bào míng","jù jué","jiē shòu","tuī chí","tí qián","wò shǒu","fàng qì","gù yì","fāng fǎ","wú lùn","rì jì","biāo zhǔn","sēn lín","zhèng hǎo","mǔ qin","fán nǎo","píng zi","shēn zhì","liú xué"];

	tArr[38]=["box","direct","view","genuine","courtesy","accumulation","a little","window","to compete","answer","to manage","splendidness","spirit","date, engagement","envy","tiger","to discuss","many","specific","grammar","explanation","to investigate","responsible","relaxed","exhausting","to pass","to apologize","Changjiang River","to lower","along with"];
	pArr[38]=["hé zi","zhí jiē","kàn fǎ","zhēn zhèng","lǐ mào","jī lěi","shāo wēi","chuāng hu","jìng zhēng","dá àn","guǎn lǐ","jīng cǎi","jīng shén","yuē huì","xiàn mu","lǎo hǔ","tǎo lùn","xǔ duō","xiáng xì","yǔ fǎ","shuō míng","diào chá","fù zé","qīng sōng","xīn kǔ","tōng guò","dào qiàn","cháng jiāng","jiàng dī","suí zhe"];

	tArr[39]=["to do business","(to) can’t stand","trash-bin","chocolate","almost","summer vacation","notebook","badminton","ping-pong","tomato","RMB","shop assistant","embassy","to joke","too late to","postgraduate","have to","credit card","gas station","plastic bag","to play the piano","there's still time","washing machine","(used for fractions)","to feel sick","food","biscuit","first of all","careless","restaurant, hotel"];
	pArr[39]=["zuò shēng yì","shòu bu liǎo","lā jī tǒng","qiǎo kē lì","chà bù duō","fàng shǔ jià","bǐ jì běn","yǔ máo qiú","pīng pāng qiú","xī hóng shì","rén mín bì","shòu huò yuán","dà shǐ guǎn","kāi wán xiào","lái bù jí","yán jiū shēng","bù dé bù","xìn yòng kǎ","jiā yóu zhàn","sù liào dài","tán gāng qín","lái dě jí","xǐ yī jī","fēn zhī","nán shòu","shí pǐn","bǐng gān","shǒu xiān","mǎ hu","fàn guǎn"];


	tArr[40]=["to ride","2nd, class B","convenient","foolish","to advise","foolish","a pile","to fight over","to tear open or down","to wave","to suffer from","to contribute","askew, devious","dense","soft, mushy","flat piece or slice","sweet (taste)","lid","second (of time)","to connect to","chest, bosom","festival","poem, poetry","to fish","small bell","to lock up","pot, pan","to rush","battle formation","3rd, grade C"];
	pArr[40]=["chéng","yǐ","biàn","shǎ","quàn","dāi","duī","qiǎng","chāi","huī","āi","juān","wāi","nóng","làn","piàn","tián","gài","miǎo","xì","xiōng","jié","shī","diào","líng","suǒ","guō","chuǎng","zhèn","bǐng"];

	tArr[41]=["to frighten","to blow air","laughter","circle","pagoda, tower","to marry (women)","(quantifier – meeting)","bank, beach","curved","to help with your arm","to do or make","to touch or feel","to murder","item or article","gun, rifle","upright, exactly","clique, group","diluted, weak","wolf","to throw or fling","to itch or tickle","to chop down","to state, to name","to crouch","heavy, serious","silver","apex, roof","to float","dragon","cubes of meat or veg"];
	pArr[41]=["xià","chuī","hā","quān","tǎ","jià","jiè","àn","wān","chān","gǎo","mō","shā","tiáo","qiāng","zhèng","pài","dàn","láng","shuǎi","yǎng","kǎn","chēng","dūn","zhòng","yín","dǐng","piāo","lóng","dīng"];

	tArr[42]=["to be able to","to dash water","to lean against","to call or shout"," to blurt out","cloth, to declare","to pat or clap","to block","to arrange","shake, to rock","to fall and break","square, direction","sunbathe, file share","confused","dynasty","some","root, basis","to leak (water or info)","hot to touch","to cook or boil","first, class A","to open (eye)","blind","to look at","tight, close","stomach","vinegar","copper (chemistry)","thunder","obedient (of a child)"];
	pArr[42]=["kè","chōng","píng","hǎn","rǎng","bù","pāi","dǎng","bǎi","yáo","shuāi","fāng","shài","yūn","cháo","mǒu","gēn","lòu","tàng","zhǔ","jiǎ","zhēng","xiā","qiáo","jǐn","wèi","cù","tóng","léi","guāi"];

	tArr[43]=["to move backwards","to urge","to freeze","to cut or slice","standard","county","to vomit","to bite","to hate","to take, hold, catch","to pick up","to rescue","tree trunk, plant stem","a stick or club","to lack","to fry","basin, flower pot","straight, fair","taxes","kind, type","to wind or rotate","lung","to smell bad","snake","to step on","to escape","to hear/smell, news","dew, nectar","(measure – for bits)","clown"];
	pArr[43]=["dǎo","cuī","dòng","qiē","zé","xiàn","tǔ","yǎo","hèn","ná","jiǎn","jiù","zhū","bàng","qiàn","chǎo","pén","zhí","shuì","lèi","rào","fèi","chòu","shé","cǎi","táo","wén","lù","kē","chǒu"];

	tArr[44]=["to lift, to elect","to stretch","booklet","to be equal to","kiss","group, circular","to boast","cover","delicate","to exist, to store","government","feeble","to copy, plagiarize","to take or pick","to tear","to support","slanting","pear","horizontal","superficial","to pan fry","purple","waist, lower back","thin, weak","to dress up, play role","to hand over","to tease","youth","non-, not-, un-","to scold"];
	pArr[44]=["jǔ","shēn","cè","pǐ","wěn","tuán","kuā","tào","nèn","cún","guān","ruò","chāo","zhāi","sī","zhī","xié","lí","héng","qiǎn","jiān","zǐ","yāo","báo","zhuāng","dì","dòu","qīng","fēi","mà"];


	tArr[45]=["to raise, promote","to roll up","pot","night","to take a wife","to read or study ","to support with hand","to criticize","to hinder","to carry","to insert","to put up","to break","to rest","hair, fur","to sprinkle","to pour liquid","to rise (prices, rivers)","to roll, get lost (rude)","a drop, to drip","to pull (animal)","to break into pieces","grain, granule","the back of the body","to take advantage of","to retreat","intoxicated","clock","to get rid of","mist"];
	pArr[45]=["shēng","juǎn","hú","yè","qǔ","niàn","fú","pī","lán","tí","chā","dā","duàn","xiē","máo","sǎ","jiāo","zhǎng","gǔn","dī","qiān","suì","lì","bèi","chèn","tuì","zuì","zhōng","chú","wù"];

	tArr[46]=["to bring about","staff","to publish","outstanding","diplomacy","to hinder","paternal aunt","objective","thief","to prolong","to establish","intense","surgical operation","to hit, attack","to resit","to be crowded","volleyball","to make better","punctuation","military skil","to lose heart","to treasure","trait","to manufacture","to paste or stick","luxurious","quality (of a thing)","to improve","promptly","to confront"];
	pArr[46]=["chǎn shēng","rén yuán","chū bǎn","zhuó yuè","wài jiāo","fáng ài","gū gu","kè guān","xiǎo tōu","yán cháng","jiàn lì","qiáng liè","shǒu shù","dǎ jī","dǐ zhì","yōng jǐ","pái qiú","gǎi shàn","biāo diǎn","wǔ shù","huī xīn","ài hù","tè zhēng","shēng chǎn","zhān tiē","háo huá","zhì liàng","jìn bù","lián máng","miàn duì"];

	tArr[47]=["hostage","to store up","courage","to coordinate","it is clear …","tone, note","wantonly","curious","young woman","wedding ceremony","banquet","to look ahead","common sense","glove","to correct","scheme or plan","cotton","to cure","to cherish","substance","toy","battery","to love dearly","to hope for","to sign (signature)","CV, résumé","ever since","favorable","surface","modern times"];
	pArr[47]=["rén zhì","chǔ bèi","yǒng qì","xié tiáo","kě jiàn","shēng diào","dà sì","hào qí","gū niang","hūn lǐ","yàn huì","zhǎn wàng","cháng shí","shǒu tào","gǎi zhèng","fāng àn","mián huā","zhì liáo","ài xī","wù zhì","wán jù","diàn chí","téng ài","pàn wàng","qiān zì","jiǎn lì","zì cóng","liáng hǎo","biǎo miàn","jìn dài"];

	tArr[48]=["solemn","there is no need","envelope","busy phone line","reliable","marriage","perfect","room (in a house)","ingenious","straightforward","landlord","procedures","to inquire about","to promote","check (bank)","daily","compassion","vivid","use (noun)","transmitter-receiver","cereals","urgent","share (stock market)","automatic","to state clearly","to compensate","keyboard","long distance","only if","surface area"];
	pArr[48]=["yán sù","hé bì","xìn fēng","zhàn xiàn","kě kào","hūn yīn","wán měi","wū zi","qiǎo miào","gān cuì","fáng dōng","shǒu xù","dǎ ting","tí chàng","zhī piào","rì cháng","ài xīn","shēng dòng","yòng tú","diàn tái","liáng shi","jǐn jí","gǔ piào","zì dòng","biǎo míng","péi cháng","jiàn pán","cháng tú","chú fēi","miàn jī"];

	tArr[49]=["at the time needed","to seem","preferential","companion","admire","signal (phone)","primary","hardworking","to constitute","solid","staunch","elephant","to console","to make perfect","quietly","to express thanks","war","finger","to carry out","outline","schedule","reign","style","light refreshments","details","victory","facial expression","qualifications","to import","to face something"];
	pArr[49]=["lín shí","fǎng fú","yōu huì","huǒ bàn","pèi fú","xìn hào","chū jí","kè kǔ","hé chéng","gù tǐ","jiān qiáng","dà xiàng","ān wèi","wán shàn","qiāo qiāo","gǎn jī","zhàn zhēng","shóu zhǐ","zhí xíng","tí gāng","rì chéng","cháo dài","yàng shì","diǎn xin","xì jié","shèng lì","biǎo qíng","zī gé","jìn kǒu","miàn lín"];


	tArr[50]=["just in case","dear, beloved","know (from learning)","to export","awful","lawful","large scale","install","sharp-pointed","try one’s best","psychological","long-standing","drama","pattern","calendar","match (fire)","to nod","to leave out","order, sequence","to be proud","slim","to show","a bank account","hurriedly","super","to fit","balcony","leader","bone","mouse (computing)"];
	pArr[50]=["wàn yī","qīn ài","tǐ huì","chū kǒu","kě pà","hé fǎ","dà xíng","ān zhuāng","jiān ruì","jìn lì","xīn lǐ","yōu jiǔ","xì jù","fāng shì","rì lì","huǒ chái","diǎn tóu","shěng lüè","zhì xù","zì háo","miáo tiao","biǎo xiàn","zhàng hù","gán jǐn","chāo jí","pèi hé","yáng tái","líng dǎo","gǔ tou","shǔ biāo"];

	tArr[51]=["volume, bulk","... let alone …","diligent","to quarrel","to absorb","to train","to deal with","complete","regularly","living room","to the full","to construct","to grasp","to know well","to describe","to relax","date (calendar)","sign, symbol","to appreciate","active","flexible","to respond","cord, string","as for ...","vegetables","otherwise ...","funding","at once","post office","inspire"];
	pArr[51]=["tǐ jī","hé kuàng","qín fèn","chǎo jià","xī shōu","péi yǎng","chú lǐ","wán zhěng","dìng qī","kè tīng","jǐn liàng","jiàn shè","bǎ wò","zhǎng wò","miáo xiě","fàng sōng","rì qī","biāo zhì","xīn shǎng","huó yuè","líng huó","dā yìng","shéng zi","zhì yú","shū cài","yào bú","zī jīn","gǎn kuài","yóu jú","gú wǔ"];

	tArr[52]=["bookshelf","information","outstanding","to handle","industrious","rational","basic","soldier","to suggest","thorough","to go back and forth","terrible","to sense","a license","democracy","to go sight-seeing","as usual","virus","to run into","system","to be conscious of","to melt","if","cautious","tofu","a loan (money)","prevention and cure","to employ","component","topic"];
	pArr[52]=["shū jià","xìn xī","chū sè","bàn lǐ","qín láo","hé lǐ","jī běn","shì bīng","jiàn yì","chè dǐ","wáng fǎn","kǒng bù","gǎn shòu","zhí zhào","mín zhǔ","yóu lǎn","zhào cháng","bìng dú","pèng jiàn","xì tǒng","zì jué","róng huà","yào shì","jǐn shèn","dòu fu","dài kuǎn","fáng zhì","gù yōng","líng jiàn","tí mù"];

	tArr[53]=["to download","to act as an agent","considerate","invasion","to manufacture","command","peace","nonsense","pass time","heart","essential","impressions","to receive guests","to register","data, numbers","era","advantageous","liquid","prince","fatigue","space (empty)","simply","to kidnap","honored","resource","garage","metal","New Year's Eve","change (money)","hunger"];
	pArr[53]=["xià zǎi","dài lǐ","tǐ tiē","qīn lüè","zhì zuò","mìng lìng","hé píng","fèi huà","dù guò","xīn zàng","bì xū","gán xiǎng","zhāo dài","guà hào","shù jù","shí dài","yǒu lì","yè tǐ","wáng zǐ","pí láo","kōng jiān","jiǎn zhí","bǎng jià","róng xìng","zī liào","chē kù","jīn shǔ","chú xī","líng qián","jī è"];

	tArr[54]=["profession","agent","amiable","elegant","seems as if","in the evening","to attend","to pass a test","to convene (meeting)","contract (business)","famous brand","tail","to construct","to take shape","treatment, salary","to turn a corner","to question","respect and love","to seem","proficient","independent","glass","leather shoes","free time","soap","complacent","honor","carriage","steel","snack"];
	pArr[54]=["yè wù","zhōng jiè","qīn qiè","yōu měi","shì de","bàng wǎn","chū xí","jí gé","zhào kāi","hé tong","míng pái","wěi ba","jiàn zhù","xíng chéng","dài yù","guǎi wān","tí wèn","jìng'ài","xiǎn dé","shú liàn","dú lì","bō li","pí xié","kòng xián","féi zào","zì mǎn","róng yù","chē xiāng","gāng tiě","líng shí"];


	tArr[55]=["spare time","personally","superiority","to spread","to embody","to close","simple, alone","business card","to leave","how","subtitle","treasured object","to approve","to control","number","whether (or not)","maybe not","core","silence","unique","cash","catch cold","energetic","classic works","neck","action","to pay attention to","expenses","weight","domain"];
	pArr[55]=["yè yú","qīn zì","yōu shì","chuán bō","tǐ xiàn","guān bì","dān chún","míng piàn","gào bié","rú hé","zì mù","bǎo bèi","pī zhǔn","kòng zhì","shù mǎ","shì fǒu","wèi bì","hé xīn","chén mò","dú tè","xiàn jīn","zháo liáng","jī jí","jīng diǎn","bó zi","xíng dòng","jiǎng jiū","fèi yòng","zhòng liàng","lǐng yù"];

	tArr[56]=["in one day","unpeaceful","center, heart","mighty","to infect","experience for self","to maintain","to part ways","monotonous","a person’s taste","take a group photo","philosophy","nowadays","posture","truth","fortunately","to undertake","clear-cut","evident","to spread","intense","unilateral","to hesitate","text message","energy","to observe","to input","to descend","youthfulness","superior quality"];
	pArr[56]=["yí dàn","bù ān","zhōng xīn","wěi dà","chuán rǎn","tǐ yàn","bǎo chí","fēn bié","dān diào","kǒu wèi","hé yǐng","zhé xué","rú jīn","zī shì","shí huà","xìng kuī","chéng dān","míng què","xiǎn rán","liú chuán","jī liè","piàn miàn","yóu yù","duǎn xìn","jīng lì","guān chá","shū rù","jiàng luò","qīng chūn","gāo dàng"];

	tArr[57]=["middle 3rd of month","accountant","to impart","to preserve","distributed","alone","to cooperate","sky","to put into practice","contrast","vibration","clear","scenery","to deep fry","to skim over","light (of food)","reality","to move","degree, extent","selfish","cosy","a pedestrian","to replenish","point of view","to take notes","software (computer)","to violate (a law)","soy sauce","next door","TV channel"];
	pArr[57]=["zhōng xún","kuài jì","chuán shòu","bǎo cún","fēn bù","dān dú","hé zuò","tiān kōng","shí jiàn","duì bǐ","zhèn dòng","míng xiǎn","jǐng sè","yóu zhá","liú lǎn","qīng dàn","xiàn shí","yí dòng","chéng dù","zì sī","shū shì","xíng rén","bǔ chōng","guān diǎn","jì lù","ruǎn jiàn","wéi fǎn","jiàng yóu","gé bì","pín dào"];

	tArr[58]=["unceasing","individual","legend","to show care","to jeopardize","consequences","attentive","throat","to strive","to treat or handle","to belong to","to describe","circumstances","composition, part","to report (news)","to hold an office","celebrity","to show","field, open land","proficient","to note or record","confidence","a course of lectures","diagnosis","exam paper","hot pepper, chili","regret, pity","dry land","forecast","frequently"];
	pArr[58]=["bú duàn","gè bié","chuán shuō","guān huái","wēi hài","hòu guǒ","zhōu dào","sǎng zi","fèn dòu","duì dài","shǔ yú","xíng róng","qíng jǐng","chéng fen","bào dào","dān rèn","míng xīng","xiǎn shì","tián yě","jīng tōng","jì lù","zì xìn","jiǎng zuò","zhěn duàn","shì juàn","là jiāo","yí hàn","lù dì","yù bào","pín fán"];

	tArr[59]=["as well as","tradition","champion","fate","seek advice from","variety","naive","counterpart","to enroll","form, shape","achievement","to report","teaching material","moment","comb","desert","phenomenon","discipline","numerous","to operate","to safeguard","arm","candle","butterfly","to be born","request","step by step","department","to be aimed at","to place an order"];
	pArr[59]=["yǐ jí","chuán tǒng","guàn jūn","mìng yùn","zī xún","pín zhǒng","tiān zhēn","duì fāng","lù qǔ","xíng shì","chéng guǒ","bào gào","jiào cái","shí kè","shū zi","shā mò","xiàn xiàng","jì lǜ","fēn fēn","jīng yíng","wéi hù","gē bo","là zhú","hú dié","dàn shēng","qǐng qiú","zhú bù","bù mén","zhēn duì","yù dìng"];


	tArr[60]=["unavoidable","since (an event)","to transmit","workplace","bilateral","scarf","valuable","opponent","ordinary","circumstances","to ignore","in a hurry","anger","fashionable","to come from","to imitate","beach","to register","truth","to call or address as","freedom","concept","angle, point of view","naughty","to look down on","bar, pub","one after another","revolution","to prevent","bright-colored"];
	pArr[60]=["bù miǎn","yǐ lái","chuán dì","dān wèi","shuāng fāng","wéi jīn","bǎo guì","duì shǒu","píng cháng","xíng shì","hū shì","jí máng","fèn nù","shí máo","lái zì","mó fǎng","shā tān","zhù cè","zhēn lǐ","chēng hu","zì yóu","guān niàn","jiǎo dù","tiáo pí","qīng shì","jiǔ bā","lù xù","gé mìng","yù fáng","xiān yàn"];

	tArr[61]=["otherwise","individual (person)","to take charge of","to distribute","to delete","package","to have insomnia","entertainment","lonely","target","equal","to record (sound)","sentiment","accomplishment","to challenge","future","vague","crafty","to link","true, real","curtains","tube, pipe","boss","delay","to talk nonsense","voluntary","mother's brother","action, behavior","to comment","to persuade"];
	pArr[61]=["bù rán","gè rén","zhǔ chí","fēn pèi","shān chú","bāo guǒ","shī mián","yú lè","jì mò","duì xiàng","píng děng","lù yīn","qíng xù","chéng jiù","tiǎo zhàn","wèi lái","mó hu","jiǎo huá","xiāng lián","zhēn shí","chuāng lián","guǎn zi","láo bǎn","dān wu","hú shuō","zì yuàn","jiù jiu","xíng wéi","yì lùn","shuō fú"];

	tArr[62]=["not equal to","silk","to exchange","to possess","to analyze","innovation","physical labor","to include","unit, entrance number","to feel wronged","with regards to","square (foot/meter)","public square","celebrate","image, form","a period in time","pillow","especially","corn, maize","get along with","blessings, wish well","to immigrate, migrant","to commemorate","lane, alley","sincere","to adjust","natural resource","to take turns","lightning","unfamiliar"];
	pArr[62]=["bù rú","sī chóu","jiāo huàn","jù bèi","fēn xī","chuàng xīn","láo dòng","bāo hán","dān yuán","wěi qu","duì yú","píng fāng","guáng chǎng","qìng zhù","xíng xiàng","shí qī","zhěn tou","gé wài","yù mǐ","xiāng chǔ","zhù fú","yí mín","jì niàn","hú tóng","chéng kěn","tiáo zhěng","zī yuán","lún liú","shǎn diàn","mò shēng"];

	tArr[63]=["rather than…","the slightest amount","individuality","communication","still or as before","to retain","to produce","excuse me","good and honest","to tell","to revolve around","to lose","huge","balance","good fortune","vast","president (company)","to establish","machine","grade, class","step, move","cherish","soccer fan","objective","equivalent to","muddled","thesis","sarcasm","to hide oneself","usual"];
	pArr[63]=["yǔ qí","sī háo","gè xìng","jiāo jì","yī rán","bǎo liú","chuàng zào","láo jià","shàn liáng","zhǔ fu","wéi rǎo","shī qù","jù dà","píng héng","xìng yùn","guǎng dà","zǒng cái","chéng lì","jī qì","dàng cì","bù zhòu","zhēn xī","qiú mí","mù biāo","xiāng dāng","hú tu","lùn wén","fěng cì","duǒ cáng","tōng cháng"];

	tArr[64]=["insufficient","subjective","apparently","insurance","to pass away","to breathe","to be good at","thanks to","to entrust","mother's mother","extensive","the present age","nature, character","altogether","unexpected","to admit, concede","to make money","instructor","fashion","suffering","catalog, list","relatively, opposite","pure, honest","party, gathering","muscle","fall behind, backward","to evaluate","tone, mood","style","pigeon, dove"];
	pArr[64]=["bù zú","zhǔ guān","sì hū","báo xiǎn","qù shì","hū xī","shàn yú","duō kuī","wěi tuō","lǎo lao","guǎng fàn","dāng dài","xìng zhì","zǒng gòng","yì wài","chéng rèn","zhèng qián","jiào liàn","shí shàng","tòng kǔ","mù lù","xiāng duì","chún jié","jù huì","jī ròu","luò hòu","píng jià","yǔ qì","fēng gé","gē zi"];


	tArr[65]=["to be fooled","need not","master, host","a fact","glossy","to arrive","steamed bun","superfluous","universe, cosmos","unexpectedly","tranquil","form, shape","smile","to think deeply","to bear, to support","policy","fundamental","a question","frenzied","overjoyed","at the moment","interrelated","magnetic tape","to synthesize","honest","beard","to calculate","trend","logic","suburbs"];
	pArr[65]=["shàng dàng","bù bì","zhǔ rén","shì shí","guāng huá","dào dá","bāo zi","duō yú","yǔ zhòu","jū rán","píng jìng","xíng zhuàng","wēi xiào","sī kǎo","chéng shòu","zhèng cè","gēn běn","yí wèn","fēng kuáng","tòng kuài","mù qián","xiāng guān","cí dài","zōng hé","lǎo shi","hú xū","jì suàn","qū shì","luó jí","jiāo qū"];

	tArr[66]=["duty","theme","New Year's Day","brothers","welcome!","to announce","to provoke","to cancel","at the same time","commodity","to threaten","temple","average","vile","pessimistic","effect, result","it is said that","government","slow-witted ","stone","pier","in length and breadth","rat or mouse","glue","peanut","property","ethics","collective, social","necklace","social custom"];
	pArr[66]=["yì wù","zhǔ tí","yuán dàn","xiōng di","guāng lín","gōng bù","cì jī","qǔ xiāo","tóng shí","shāng pǐn","wēi xié","sì miào","píng jūn","è liè","bēi guān","chéng xiào","jù shuō","zhèng fǔ","mù tou","shí tou","mǎ tou","zòng héng","láo shǔ","jiāo shuǐ","huā shēng","cái chǎn","dào dé","jí tǐ","xiàng liàn","fēng sú"];

	tArr[67]=["chairperson","optimistic","illumination","concrete, specific","to publish","even if","only, sole","business","religion","factory","meaning","a lesson, a moral","whole, entire","authority","furthermore","to go bankrupt","private citizen","procedure","rice crops","reason, cause","background, context","remember","topic","communications","to gather news","imposing","item, project","hazard","food","steamed bread"];
	pArr[67]=["zhǔ xí","lè guān","guāng míng","jù tǐ","fā biǎo","nǎ pà","wéi yī","shāng yè","zōng jiào","gōng chǎng","yì yì","jiào xùn","zhěng gè","quán lì","cǐ wài","pò chǎn","sī rén","chéng xù","dào gǔ","yuán gù","bèi jǐng","jì yì","huà tí","tōng xùn","cái fǎng","xióng wěi","xiàng mù","fēng xiǎn","shí wù","mán tou"];

	tArr[68]=["unanimous","thing, object","position, place","to amend","CD or DVD","skill, art, kung fu","ladle","chemistry","raw material","to be anxious","to agree","to negate","rainbow","thought, idea","prime minister","to miss, long to see","proverb","to touch, contact","right, privilege","tangerine","less important","satisfied","destruction","cube","quilt","credentials","reason, sense","no wonder that…","to concentrate","to garrison"];
	pArr[68]=["yí zhì","shì wù","wèi zhi","xiū gǎi","guāng pán","gōng fu","sháo zi","huà xué","yuán liào","fā chóu","tóng yì","fǒu dìng","cǎi hóng","sī xiǎng","zóng lǐ","xiǎng niàn","chéng yǔ","jiē chù","quán lì","jú zǐ","cì yào","mǎn zú","pò huài","lì fāng","bèi zi","zhèng jiàn","dào lǐ","nán guài","jí zhōng","zhù zhā"];

	tArr[69]=["to advocate","relaxation","to have bad luck","honor and glory","overall","open, public","overseas Chinese","developed (country)","to deny","honored guest","therefore","to practice (of trainee)","dormitory","at long last","desire","to receive (a visitor)","undergraduate course","rubber, eraser","shortcomings","to divorce","to praise","steady","absolute","to unify","equipment","proof","to resign","urgent","to adopt","ugly"];
	pArr[69]=["zhǔ zhāng","xiū xián","dǎo méi","guāng róng","quán miàn","gōng kāi","huá yì","fā dá","fǒu rèn","jiā bīn","yīn ér","shí xí","sù shè","zǒng suàn","yuàn wàng","jiē dài","běn kē","xiàng pí","máo bìng","lí hūn","chēng zàn","wěn dìng","jué duì","tǒng yī","shè bèi","zhèng jù","cí zhí","pò qiè","cái qǔ","nán kàn"];


	tArr[70]=["to argue","from now on","if, for example","finals (contest)","capability","principle","shiver","to tell or talk about","element, factor","to achieve","direct (film)","president (country)","to mature","to comply","ability","plain","handicapped","to skate","contradiction","definite","immediately","bamboo","to govern","head, brains","norms or customs","plan, to design","Chinese chess","to give one's respects","stage, section","at any time"];
	pArr[70]=["zhēng lùn","cóng cǐ","jiǎ rú","jué sài","gōng néng","yuán zé","fā dǒu","xù shù","yīn sù","shí xiàn","dáo yǎn","zóng tǒng","chéng zhǎng","fú cóng","bén lǐng","pǔ sù","cán jí","huá bīng","máo dùn","què dìng","lì jí","zhú zi","tǒng zhì","nǎo dai","guī ju","shè jì","xiàng qí","wèn hòu","jiē duàn","suí shí"];

	tArr[71]=["in advance","to enjoy","thus","fair","medicine (internal)","to take risks","to row a boat","to consult","to bring into play","to lead to","to shoot (gun)","to solicit","in a word, in short","to grasp firmly","damage","document, file","to look forward to","essence","a coin","right away","shortage","wing","modest","rule (science)","character (story)","to liberate","to coach, tutor","luck","transparent","to drive"];
	pArr[71]=["shì xiān","xiǎng shòu","cóng ér","gōng píng","nèi kē","mào xiǎn","huá chuán","cān kǎo","fā huī","dǎo zhì","shè jī","zhēng qiú","zǒng zhī","zhuā jǐn","sǔn shī","wén jiàn","qī dài","běn zhì","yìng bì","lì kè","quē fá","chì bǎng","xū xīn","guī lǜ","jué sè","jiě fàng","fú dǎo","yùn qi","tòu míng","jià shǐ"];

	tArr[72]=["to strive for","to pay","determination","physical strength","hasty","to suffer losses","to enlighten","to implement","to declare","household","workman","to deal with","each other","to reminice","ashamed","to invest","stationery","to resemble","to confirm","ancestral land","to wait for","structure","to shorten","impose a fine","capable","scale, extent","facilities","trade","to change, transform","transport"];
	pArr[72]=["zhēng qǔ","fù kuǎn","jué xīn","lì liàng","cōng máng","chī kuī","qǐ fā","shí xíng","xuān bù","jiā tíng","gōng rén","yìng fù","bí cǐ","huái niàn","cán kuì","tóu zī","wén jù","xiāng sì","què rèn","zǔ guó","děng dài","jié gòu","suō duǎn","fá kuǎn","néng gàn","guī mó","shè shī","mào yì","zhuǎn biàn","yùn shū"];

	tArr[73]=["formerly","military affairs","to invent","woman","to experiment","propaganda","housework","to imagine","to persist","whole entity","civilized","sales counter","after all","atmosphere, mood","to burn","theory","computer hardware","prominent","waiting","to constitute","to combine","to alleviate","to reduce","energy source","tongue","to contribute","to communicate","to put to use","dining-hall","charm"];
	pArr[73]=["cóng qián","jūn shì","fā míng","fù nǚ","shí yàn","xuān chuán","jiā wù","xiǎng xiàng","chí xù","zhéng tǐ","wén míng","guì tái","bì jìng","qì fēn","rán shāo","lǐ lùn","yìng jiàn","tū chū","děng hòu","zǔ hé","jié hé","huǎn jiě","suō xiǎo","néng yuán","shé tou","gòng xiàn","zhuǎn gào","yùn yòng","cān tīng","mèi lì"];

	tArr[74]=["expert","to engage in","centimeter","to participate in","receipt","territory","well-distributed","to copy, duplicate","unemployment","miracle","hometown","ruler (stationery)","industry","decade","delusion","what is known as","near, close to","to take a photograph","politics","proportion","warm","disaster","to adore","to register ","eyebrow","ancestor","rule","to symbolize","to meet, welcome","to elect"];
	pArr[74]=["zhuān jiā","cóng shì","lí mǐ","cān yù","fā piào","tǔ dì","jūn yún","fù zhì","shī yè","qí jì","jiā xiāng","chǐ zi","gōng yè","nián dài","huàn xiǎng","suǒ wèi","jiē jìn","shè yǐng","zhèng zhì","bǐ lì","wēn nuǎn","zāi hài","rè ài","dēng jì","méi mao","zǔ xiān","guī zé","xiàng zhēng","yíng jiē","xuán jǔ"];


	tArr[75]=["special topic","value, worth","to promote (an idea)","to use as an excuse","apartment building","over and over again","profits","truck","statement","flight of steps","potato","practical","to swear an oath","snack","age","quota","playground","clothing","period of time","pond","gentle","warm (welcome)","to equal","art","talented","stature, build","excessive","to avert","to prevent","cucumber"];
	pArr[75]=["zhuān tí","jià zhí","cù jìn","jiè kǒu","gōng yù","zài sān","lì rùn","kǎ chē","fā yán","tái jiē","tǔ dòu","shí yòng","xuān shì","xiǎo chī","nián jì","zhǐ biāo","cāo chǎng","fú zhuāng","qī jiān","chí zi","wēn róu","rè liè","děng yú","měi shù","yīng jùn","shēn cái","guò fèn","bì miǎn","zǔ zhǐ","huáng guā"];

	tArr[76]=["to concentrate","attempt","to induce","to pretend","abundant","rabbit","CE, AD, common era","initial","interest (on a loan)","nationality","geography","married woman","from beginning to end","term, semester","preferably","to accept a job offer","to develop, open up","inevitable","to guide, coach","to worry about","literature","even more","court of law","to consume","enthusiasm","coal","emperor","conclusion","approve","identity, status"];
	pArr[76]=["zhuān xīn","qǐ tú","cù shǐ","jiǎ zhuāng","chōng fēn","tù zi","gōng yuán","zuì chū","lì xī","guó jí","dì lǐ","tài tai","shǐ zhōng","xué qī","nìng kě","yìng pìn","kāi fā","bì rán","zhí dǎo","cāo xīn","wén xué","gèng jiā","fǎ yuàn","xiāo fèi","rè xīn","méi tàn","huáng dì","jié lùn","zàn chéng","shēn fèn"];

	tArr[77]=["talented person","company, enterprise","princess","peasant","benefit","to draw up","bedroom","toilet","on the contrary","region","spectacular","clip or folder","to exist","learning, science","to lift a ban","handwork, by hand","for example","to digest (food)","empress, consort","myth","jar, can","criminal","to economize","hero","bee","to negotiate","to praise","to be allergic","to lag behind","to repeat"];
	pArr[77]=["rén cái","qǐ yè","gōng zhǔ","nóng mín","lì yì","zhì dìng","wò shì","cè suǒ","fǎn ér","dì qū","zhuàng guān","jiā zi","cún zài","xué shù","kāi fàng","shǒu gōng","bǐ rú","xiāo huà","huáng hòu","shén huà","guàn tóu","zuì fàn","jié shěng","yīng xióng","mì fēng","tán pàn","zàn měi","guò mǐn","tuì bù","chóng fù"];

	tArr[78]=["population","full of","agriculture","make use of","system, institution","repeatedly","ancient","blunt, candid","learning","to guard","to respect","to feel happy","necessary","decline an invitation","measure, step to take","efficiency","to have no way to do","to constitute","gasoline","test","condition, state","indeed","nerve","sturdy","shoulder","nutrition","to be overdue","to lose the way","to bring about","gold"];
	pArr[78]=["rén kǒu","chōng mǎn","nóng yè","lì yòng","zhì dù","fǎn fù","gǔ lǎo","tǎn shuài","xué wen","shǒu hù","zūn jìng","kāi xīn","bì yào","tuī cí","cuò shī","xiào lǜ","wú cóng","gòu chéng","qì yóu","cè yàn","zhuàng kuàng","dí què","shén jīng","jiē shi","jiān bǎng","yíng yǎng","guò qī","mí lù","zào chéng","huáng jīn"];

	tArr[79]=["mankind","the others","scissors","madam","house pet","wheat","confused","protest","to extend","benefit","to reform","enemy","wisdom","once, already","fruit, gains","to link up","profound","physics","justification","secret","too bad","prosperous","to pay the bill","to edit","to do business","to decorate","to train, to drill","to escape","to comply with","mistake"];
	pArr[79]=["rén lèi","qí yú","jiǎn dāo","nǚ shì","chǒng wù","xiǎo mài","huāng zhāng","kàng yì","tuī guǎng","shōu huò","gǎi gé","dí rén","zhì huì","céng jīng","guǒ shí","gōu tōng","shēn kè","wù lǐ","lǐ yóu","mì mì","zāo gāo","fán róng","jié zhàng","biān jí","yíng yè","zhuāng shì","xùn liàn","táo bì","zūn shǒu","cuò wù"];


	tArr[80]=["human life","work (of art)","accidentaly","adequate","every","prospects","to work hard for","ancient times","carpet","intimate","difference","to apply or use","to conduct","to catch and hold on","to recommend","receipt","to improve","cannot help but","customs (border)","to die out","dust","roast duck","special","state, condition","mysterious","difficult (task)","to blame (someone)","debate","to reach","rapid"];
	pArr[80]=["rén shēng","zuò pǐn","ǒu rán","chōng zú","fán shì","qián tú","lì zhēng","gǔ dài","dì tǎn","mì qiè","chā bié","yìng yòng","zhǐ huī","jiē zhe","tuī jiàn","shōu jù","gǎi jìn","wú nài","hǎi guān","xiāo miè","huī chén","kǎo yā","tè dìng","zhuàng tài","shén mì","jiān jù","zé bèi","biàn lùn","dá dào","xùn sù"];

	tArr[81]=["human affairs","one's conduct","fork (for eating)","response","classical","position, status","determined","expert","life expectancy","to spread out","shadow, reflection","romantic love","to resume","ring (for finger)","drawer","to summarize","weapon, arms","seafood","to disappear","to permeate","to climb a mountain","particular","secretary","until now","to load or unload","to inquire","course (education)","modest","to retire","firecrackers"];
	pArr[81]=["rén shì","zuò wéi","chā zi","fǎn yìng","gú diǎn","dì wèi","jiān jué","dà fāng","shòu mìng","zhǎn kāi","yǐng zi","liàn ài","huī fù","jiè zhi","chōu ti","gài kuò","wǔ qì","hǎi xiān","xiāo shī","shèn tòu","pá shān","tè shū","mì shū","zhì jīn","zhuāng xiè","xún wèn","kè chéng","qiān xū","tuì xiū","biān pào"];

	tArr[82]=["product","a character (novel)","to write an essay","note (paper) ","to overcome","in any case","to sustain injuries","fixed, regular","earthquake","to seek","to exhibit","to emphasize","cautious","to give up smoking","to do manual labor","abstract","to hub","to line up","countless","intelligence","concept","exchange rate","specially","to combine","to break away from","difficult","industry","riddle","to pursue","to sell, sales"];
	pArr[82]=["chán pǐn","rén wù","zuò wén","biàn tiáo","kè fú","fǎn zhèng","shòu shāng","gù dìng","dì zhèn","xún zhǎo","zhán lǎn","qiáng diào","shèn zhòng","jiè yān","dǎ gōng","chōu xiàng","yōng bào","pái duì","wú shù","zhì lì","gài niàn","huì lǜ","tè yì","lián hé","tuō lí","jiān kǔ","háng yè","mí yǔ","zhuī qiú","xiāo shòu"];

	tArr[83]=["a lifetime","no end of trouble","impatience","it doesn’t matter","not necessarily","amazing","to try one’s hardest","club (group or place)","museum","bathroom","PRC National Day","tai chi","young fellow","kindergarten","opening ceremony","cannot bear","to have dealings with","motorbike","ambulance","articles for daily use","jeans","to look down upon","mineral spring water","Sunday","wear a necktie","ordinary people","to hate to part with","can't say for sure","an adolescent","microphone"];
	pArr[83]=["yí bèi zi","bù dé liǎo","bú nài fán","bú yào jǐn","bú jiàn dé","liǎo bù qǐ","shǐ jìn ér","jù lè bù","bó wù guǎn","wèi shēng jiān","guó qìng jié","tài jí quán","xiǎo huǒ zi","yòu ér yuán","kāi mù shì","rěn bú zhù","dǎ jiāo dào","mó tuō chē","jiù hù chē","rì yòng pǐn","niú zǎi kù","kàn bù qǐ","kuàng quán shuǐ","lǐ bài tiān","xì lǐng dài","lǎo bǎi xìng","shě bù dé","shuō bú dìng","qīng shào nián","mài kè fēng"];

	tArr[84]=["ton","(grunt of agreement)","island","width of cloth, size","equal","place, office","to wrap around","peach","cave, hole","ash","to fear","gym","battery charger","cartoon","engineer","manual labor","volunteer","no wonder!","to sneeze","to say hello","postcard","home room teacher","boarding pass","coward","commentator","drama series","bon voyage","sorry, embarrassed","historical/scenic spot","highway"];
	pArr[84]=["dūn","āi","dǎo","fú","píng","suǒ","pī","táo","dòng","huī","wèi","jiàn shēn fáng","chōng diàn qì","dòng huà piàn","gōng chéng shī","gàn huó ér","zhì yuàn zhě","guài bù dé","dǎ pēn tì","dǎ zhāo hu","míng xìn piàn","bān zhǔ rèn","dēng jī pái","dǎn xiáo guǐ","jiě shuō yuán","lián xù jù","yī lù píng'ān","bù hǎo yì si","míng shèng gǔ jì","gāo sù gōng lù"];


	oG.textContent={getSection:getSectionLoc,getText:getTextLoc,getPin:getPinLoc};
}(opdGame));


(function(oG){//checked
	function TitleView(){
		this.Container_constructor();
		this.openOptionsPaneFun=this.openOptionsPane.bind(this);
		this.setup();
	}
	var p=createjs.extend(TitleView,createjs.Container);

	p.setup=function(){
		this.title=new createjs.Sprite(oG.model.mainSprite);
		this.title.gotoAndStop('title');
		this.charBut=new oG.Modules.Button('textChars','content-chars');
		this.optionsBut=new oG.Modules.Button('textOptions','optionsClick');
		this.englishBut=new oG.Modules.Button('textEnglish','content-english');
		this.reviewBut=new oG.Modules.Button('textReview','content-review');

		this.optionsPane=new oG.Modules.OptionsPane();

		this.addChild(this.title,this.charBut,this.englishBut,this.optionsBut,this.reviewBut,this.optionsPane);
		var dummyText1=new createjs.Text('.','bold 12px Alegreya Sans','#444');
		var dummyText2=new createjs.Text('.','bold 12px Amaranth','#444');
		var dummyText3=new createjs.Text('.','bold 12px Ubuntu','#444');
		var dummyText4=new createjs.Text('.','bold 12px Cabin','#444');
		dummyText1.alpha=0.01;
		dummyText2.alpha=0.01;
		dummyText3.alpha=0.01;
		dummyText4.alpha=0.01;
		this.addChild(dummyText1,dummyText2,dummyText3,dummyText4);

		this.setupDisplay();
	};

	p.setupDisplay=function(){
		if(oG.model.orientation===0){
			opdLib.posItem(this.title,250,140);
			opdLib.posItem(this.charBut,400,300);
			opdLib.posItem(this.englishBut,400,366);
			opdLib.posItem(this.optionsBut,400,432);
			opdLib.posItem(this.reviewBut,400,498);

			this.charBut.scaleX=this.charBut.scaleY=1;
			this.englishBut.scaleX=this.englishBut.scaleY=1;
			this.optionsBut.scaleX=this.optionsBut.scaleY=1;
			this.reviewBut.scaleX=this.reviewBut.scaleY=1;
		}else{
			opdLib.posItem(this.title,130,255);
			opdLib.posItem(this.charBut,280,430);
			opdLib.posItem(this.englishBut,280,523);
			opdLib.posItem(this.optionsBut,280,616);
			opdLib.posItem(this.reviewBut,280,709);

			this.charBut.scaleX=this.charBut.scaleY=1.4;
			this.englishBut.scaleX=this.englishBut.scaleY=1.4;
			this.optionsBut.scaleX=this.optionsBut.scaleY=1.4;
			this.reviewBut.scaleX=this.reviewBut.scaleY=1.4;
		}
	};

	p.orientationChange=function(){
		this.setupDisplay();
		this.optionsPane.setupDisplay();
	};

	p.openOptionsPane=function(){
		this.optionsPane.init();
		this.optionsBut.removeEventListener('click',this.openOptionsPaneFun);
	};

	p.closeOptionsPane=function(){
		this.optionsPane.deit();
		this.optionsBut.addEventListener('click',this.openOptionsPaneFun);
	};

	p.init=function(){
		this.charBut.init();
		this.englishBut.init();
		this.reviewBut.init();
		this.optionsBut.init();

		this.optionsBut.addEventListener('click',this.openOptionsPaneFun);

		opdLib.fadeIn(this.charBut,400,0);
		opdLib.fadeIn(this.englishBut,400,100);
		opdLib.fadeIn(this.optionsBut,400,200);
		opdLib.fadeIn(this.reviewBut,400,300);
	};

	p.deit=function(){
		this.charBut.deit();
		this.englishBut.deit();
		this.reviewBut.deit();
		this.optionsBut.deit();

		this.optionsBut.removeEventListener('click',this.openOptionsPaneFun);
	};

	oG.Views.TitleView=createjs.promote(TitleView,'Container');
}(opdGame));

(function(oG){
	function Button(sprSrc,tar){
		this.Container_constructor();
		this.sprSrc=sprSrc;
		this.tar=tar;
		this.clickerFun=this.clicker.bind(this);
		this.overerFun=this.overer.bind(this);
		this.outerFun=this.outer.bind(this);
		this.setup();
	}
	var p=createjs.extend(Button,createjs.Container);

	var BUT_WID=200;
	var BUT_HEI=64;

	p.setup=function(){
		var back=new createjs.Shape();
		back.graphics.beginFill('#fc0').drawRoundRect(-BUT_WID/2,-BUT_HEI/2,BUT_WID,BUT_HEI,16);
		this.addChild(back);
		this.front=new createjs.Shape();
		this.front.graphics.beginFill('#222').drawRoundRect(-BUT_WID/2,-BUT_HEI/2,BUT_WID,BUT_HEI,16);
		this.addChild(this.front);

		var txt=new createjs.Sprite(oG.model.mainSprite);
		txt.gotoAndStop(this.sprSrc);
		opdLib.dispItem(txt,this,-63,-18);
	};

	p.clicker=function(){
		this.front.visible=true;
		if(this.tar!="optionsClick")oG.view.changeView(this.tar);
	};

	p.overer=function(){
		this.front.visible=false;
	};

	p.outer=function(){
		this.front.visible=true;
	};

	p.init=function(){
		this.front.visible=true;
		this.addEventListener('click',this.clickerFun);
		if(!oG.model.touchMode){
			this.addEventListener('mouseover',this.overerFun);
			this.addEventListener('mouseout',this.outerFun);
			this.cursor='pointer';
		}
	};

	p.deit=function(){
		this.removeEventListener('click',this.clickerFun);
		if(!oG.model.touchMode){
			this.removeEventListener('mouseover',this.overerFun);
			this.removeEventListener('mouseout',this.outerFun);
			this.cursor='default';
		}
	};

	oG.Modules.Button=createjs.promote(Button,'Container');
}(opdGame));


(function(oG){//checked
	function View(){
		this.Container_constructor();
		this.newViewFun=this.newView.bind(this);
		this.orientationChange=this.orientationChangeFun.bind(this);
		this.updateResize=this.updateResizeFun.bind(this);
		this.setup();
	}
	var p=createjs.extend(View,createjs.Container);

	p.setup=function(){
	};

	p.init=function(){
		this.preloadView=new oG.Views.PreloadView();
		this.cView=this.preloadView;
		this.newViewVar=this.preloadView;
		this.changeView('preload');
	};

	p.preloadComplete=function(){
		this.titleView=new oG.Views.TitleView();
		this.gameView=new oG.Views.GameView();
		this.contentView=new oG.Views.ContentView();
		this.reviewView=new oG.Views.ReviewView();
		this.endView=new oG.Views.EndView();

		this.mainBack=new createjs.Sprite(oG.model.mainSprite);
		this.mainBack.gotoAndStop('back');
		this.addChild(this.mainBack);

		this.myBorder=new createjs.Shape();
		this.addChild(this.myBorder);

		this.setupDisplay();
	};

	p.setupDisplay=function(){
		this.myBorder.graphics.clear();
		if(oG.model.orientation===0){
			opdLib.posItem(this.mainBack,0,0);
			this.mainBack.scaleX=1;
			this.mainBack.scaleY=1;
		}else{
			this.myBorder.graphics.setStrokeStyle(4).beginStroke('#333');
			this.myBorder.graphics.moveTo(2,2).lineTo(2,798);
			this.myBorder.graphics.moveTo(2,2).lineTo(548,2);
			this.myBorder.graphics.moveTo(548,2).lineTo(548,798);
			this.mainBack.scaleX=8/5.5;
			this.mainBack.scaleY=8/5.5;
			opdLib.posItem(this.mainBack,-120,0);
		}
	};

	p.changeView=function($view){
		this.newViewVar=$view;
		this.cView.deit();
		createjs.Tween.get(this.cView,{loop:false}).to({alpha:0},150).call(this.newViewFun);
	};

	p.newView=function(){
		this.removeChild(this.cView);
		switch(this.newViewVar){
			case 'preload':
			this.cView=this.preloadView;
			break;
			case 'title':
			this.cView=this.titleView;
			break;
			case 'game':
			this.cView=this.gameView;
			break;
			case 'content-chars':
			this.gameView.setTarget(0);
			oG.model.optPlayAudio=false;
			oG.controller.setContentLoadedTarget('game');
			this.cView=this.contentView;
			break;
			case 'content-audio':
			this.gameView.setTarget(2);
			oG.model.optPlayAudio=true;
			oG.controller.setContentLoadedTarget('game');
			this.cView=this.contentView;
			break;
			case 'content-english':
			this.gameView.setTarget(1);
			oG.model.optPlayAudio=false;
			oG.controller.setContentLoadedTarget('game');
			this.cView=this.contentView;
			break;
			case 'content-review':
			this.cView=this.contentView;
			oG.model.optPlayAudio=false;
			oG.controller.setContentLoadedTarget('review');
			break;
			case 'end':
			this.cView=this.endView;
			break;
			case 'review':
			this.cView=this.reviewView;
			break;
			default:
			break;
		}
		this.addChild(this.cView);
		this.cView.alpha=1;
		this.cView.init();
	};

	p.updateResizeFun=function(){
		oG.model.canvasRatio=opdWrapper.getCanvasRatio();
		if(oG.model.preloadComplete){
			oG.view.endView.scorePane.updateInputs();
		}
	};

	p.orientationChangeFun=function(){
		oG.model.orientation=opdWrapper.getOrientation();
		if(oG.model.preloadComplete){
			this.setupDisplay();
			this.titleView.orientationChange();
			this.gameView.orientationChange();
			this.contentView.orientationChange();
			this.reviewView.orientationChange();
			this.endView.orientationChange();

		}else{
			this.preloadView.orientationChange();
		}
	};

	oG.View=createjs.promote(View,'Container');
}(opdGame));



document.addEventListener('DOMContentLoaded',function(){opdGame.init();});
