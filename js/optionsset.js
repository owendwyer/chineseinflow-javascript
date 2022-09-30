

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
