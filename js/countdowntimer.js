

(function(oG){//checked
	var CountdownTimer=function(){
		this.Container_constructor();
		this.countdownFun=this.countdown.bind(this);
		this.setup();
	};
	var p=createjs.extend(CountdownTimer,createjs.Container);

	p.setup=function(){
		this.countdownVar=0;
		this.countdownAddVar=0;

		var countdownBack=new createjs.Sprite(oG.model.mainSprite);
		countdownBack.gotoAndStop('countdownBack');
		var countdownFront=new createjs.Sprite(oG.model.mainSprite);
		countdownFront.gotoAndStop('countdownFront');

		this.myMask=new createjs.Shape();
		this.myMask.graphics.beginFill('#ccc').drawRect(0,-10,550,40);

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
			if(bWidth>4){
				this.myMask.x=-550+bWidth;
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
