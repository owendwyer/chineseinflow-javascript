
(function(oG){//checked
	var TargetSet=function(){
		this.Container_constructor();
		this.setup();
	};
	var p=createjs.extend(TargetSet,createjs.Container);

	//0 - char
	//1 - eng
	//2 - pin
	//3 - char pin
	//4 - char eng
	//5 - char eng pin
	//6 - eng pin
	//7 - none

	var charY=[0,0,0,-14,-12,-24,0,0];
	var charSize=[1,0,0,0.6,0.6,0.5,0,0];
	var engY=[9,9,9,9,34,40,28,9];
	var engSize=[0,30,0,0,20,20,24,0];
	var pinY=[9,9,9,34,9,18,-2,9];
	var pinSize=[0,0,32,24,0,24,32,0];

	p.setup=function(){
		var back=new createjs.Sprite(oG.model.mainSprite);
		back.gotoAndStop('tarBack');
		opdLib.dispItem(back,this,-180,-70);
		this.pText=new createjs.Text('yán jiū shēng','bold 32px Ubuntu','#444');
		this.eText=new createjs.Text('measure word','bold 32px Cabin','#ccc');
		opdLib.centerText(this.pText);
		opdLib.centerText(this.eText);
		this.addChild(this.eText);
		this.addChild(this.pText);
	};

	p.showTarget=function(tVar){
		this.cText.gotoAndStop(tVar);
		this.eText.text=oG.model.textArray[tVar];
		this.pText.text=oG.model.pinArray[tVar];

		var oVar=Math.round(600*oG.model.gameSpeed);
		if(oVar>0){
			opdLib.fadeIn(this.pText,oVar,0);
			opdLib.fadeIn(this.cText,oVar,0);
			opdLib.fadeIn(this.eText,oVar,0);
		}
	};

	p.adjDisp=function(){
		var curMode=oG.model.tarView;
		if(curMode==7){
			this.visible=false;
		}else{
			this.visible=true;
		}
		var cSize=charSize[curMode];
		var eSize=engSize[curMode];
		var pSize=pinSize[curMode];
		if(cSize===0){
			this.cText.visible=false;
		}else{
			this.cText.visible=true;
			this.cText.y=charY[curMode];
			this.cText.scaleX=this.cText.scaleY=cSize;
		}
		if(eSize===0){
			this.eText.visible=false;
		}else{
			this.eText.visible=true;
			this.eText.y=engY[curMode];
			this.eText.font='bold '+eSize+'px Cabin';
		}
		if(pSize===0){
			this.pText.visible=false;
		}else{
			this.pText.visible=true;
			this.pText.y=pinY[curMode];
			this.pText.font='bold '+pSize+'px Ubuntu';
		}
	};

	p.startClear=function(){
		this.pText.alpha=0;
		this.cText.alpha=0;
		this.eText.alpha=0;
	};

	p.startUnClear=function(){
		opdLib.fadeIn(this.pText,800,0);
		opdLib.fadeIn(this.cText,800,0);
		opdLib.fadeIn(this.eText,800,0);
	};

	p.init=function(){
		this.cText=new createjs.Sprite(oG.model.contentSpriteSheet);
		opdLib.dispItem(this.cText,this,0,0);

		this.eText.text='';
		this.pText.text='';
		this.cText.alpha=0;

		this.adjDisp();
	};

	p.deit=function(){
		this.removeChild(this.cText);
		this.cText=null;
	};

	oG.Modules.TargetSet=createjs.promote(TargetSet,'Container');
}(opdGame));
