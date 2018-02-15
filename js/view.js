
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
