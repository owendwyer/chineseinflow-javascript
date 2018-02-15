
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
