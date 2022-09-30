
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
