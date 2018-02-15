
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
