
var opdGame={};
opdGame.active=false;
opdGame.Views={};
opdGame.Modules={};

document.addEventListener('DOMContentLoaded',function(){opdGame.init();});

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
