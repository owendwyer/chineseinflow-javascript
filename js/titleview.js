
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
			opdLib.posItem(this.title,250,205);
			opdLib.posItem(this.charBut,400,350);
			opdLib.posItem(this.englishBut,400,390);
			opdLib.posItem(this.optionsBut,400,430);
			opdLib.posItem(this.reviewBut,400,470);

			this.charBut.scaleX=this.charBut.scaleY=1;
			this.englishBut.scaleX=this.englishBut.scaleY=1;
			this.optionsBut.scaleX=this.optionsBut.scaleY=1;
			this.reviewBut.scaleX=this.reviewBut.scaleY=1;
		}else{
			opdLib.posItem(this.title,130,255);
			opdLib.posItem(this.charBut,280,420);
			opdLib.posItem(this.englishBut,280,475);
			opdLib.posItem(this.optionsBut,280,530);
			opdLib.posItem(this.reviewBut,280,585);

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

	var BUT_WID=126;
	var BUT_HEI=36;

	p.setup=function(){
		var back=new createjs.Shape();
		back.graphics.beginFill('gold').drawRoundRect(-BUT_WID/2,-BUT_HEI/2,BUT_WID,BUT_HEI,8);
		this.addChild(back);
		this.front=new createjs.Shape();
		this.front.graphics.beginFill('#222').drawRoundRect(-BUT_WID/2,-BUT_HEI/2,BUT_WID,BUT_HEI,8);
		this.addChild(this.front);

		var txt=new createjs.Sprite(oG.model.mainSprite);
		txt.gotoAndStop(this.sprSrc);
		opdLib.dispItem(txt,this,-BUT_WID/2,-BUT_HEI/2);
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
