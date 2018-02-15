
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
