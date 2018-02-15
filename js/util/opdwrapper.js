
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

