

(function(oG){//checked
	var ReviewView=function(){
		this.Container_constructor();
		this.clickerFun=this.clicker.bind(this);
		this.audioClickFun=this.audioClick.bind(this);
		this.setup();
	};
	var p=createjs.extend(ReviewView,createjs.Container);

	p.setup=function(){
		this.cText=null;
		this.audioBut=new createjs.Sprite(oG.model.mainSprite);
		this.audioBut.gotoAndStop('audBut');
		this.backBut=new oG.Modules.Button('textBack','title');
		this.againBut=new oG.Modules.Button('textAgain','content-review');

		this.backBack=new createjs.Shape();
		this.backPane=new createjs.Shape();
		this.textBack=new createjs.Shape();
		this.addChild(this.backBack,this.backPane,this.textBack);

		this.pinText=new createjs.Text('pinyin','bold 32px Ubuntu','#666');
		this.engText=new createjs.Text('english','bold 28px Cabin','#888');

		opdLib.centerText(this.pinText);
		opdLib.centerText(this.engText);

		this.lArr=opdLib.drawArrow(30,'#fff');
		this.rArr=opdLib.drawArrow(30,'#fff');
		this.lArr.mouseChildren=false;
		this.rArr.mouseChildren=false;
		this.lArr.int=1;
		this.rArr.int=-1;

		this.rArr.rotation=180;

		this.addChild(this.pinText,this.engText,this.lArr,this.rArr,this.againBut,this.backBut,this.audioBut);

		this.setupDisplay();
	};

	p.setupDisplay=function(){
		this.backBack.graphics.clear();
		this.textBack.graphics.clear();
		this.backPane.graphics.clear();
		if(oG.model.orientation===0){
			this.backBack.graphics.beginFill('#fff').drawRoundRect(267,62,266,216,30);
			this.textBack.graphics.setStrokeStyle(3).beginStroke('#fff').beginFill('#ddd').drawRoundRect(200,320,400,100,24);
			this.backPane.graphics.setStrokeStyle(2).beginStroke('#888').beginFill('#ddd').drawRoundRect(275,70,250,200,24);

			opdLib.posItem(this.pinText,400,370);
			opdLib.posItem(this.engText,400,400);
			opdLib.posItem(this.lArr,600,170);
			opdLib.posItem(this.rArr,200,170);
			opdLib.posItem(this.againBut,400,470);
			opdLib.posItem(this.backBut,400,510);
			opdLib.posItem(this.audioBut,367,235);

			if(this.cText!=null)opdLib.posItem(this.cText,400,170);
		}else{
			this.backBack.graphics.beginFill('#fff').drawRoundRect(142,177,266,216,30);
			this.textBack.graphics.setStrokeStyle(3).beginStroke('#fff').beginFill('#ddd').drawRoundRect(75,435,400,100,24);
			this.backPane.graphics.setStrokeStyle(2).beginStroke('#888').beginFill('#ddd').drawRoundRect(150,185,250,200,24);

			opdLib.posItem(this.pinText,275,485);
			opdLib.posItem(this.engText,275,515);
			opdLib.posItem(this.lArr,475,285);
			opdLib.posItem(this.rArr,75,285);
			opdLib.posItem(this.againBut,275,585);
			opdLib.posItem(this.backBut,275,625);
			opdLib.posItem(this.audioBut,242,350);

			if(this.cText!=null)opdLib.posItem(this.cText,275,285);
		}
	};

	p.orientationChange=function(){
		this.setupDisplay();
	};

	p.clicker=function(e){
		this.dVar+=e.target.int;
		if(this.dVar==30)this.dVar=0;
		if(this.dVar<0)this.dVar=29;
		this.dispItem();
	};

	p.dispItem=function(){
		this.cText.gotoAndStop(this.dVar);
		this.engText.text=oG.model.textArray[this.dVar];
		this.pinText.text=oG.model.pinArray[this.dVar];
	};

	p.addLists=function(){
		this.lArr.addEventListener('click',this.clickerFun);
		this.lArr.cursor='pointer';
		this.rArr.addEventListener('click',this.clickerFun);
		this.rArr.cursor='pointer';
	};

	p.removeLists=function(){
		this.lArr.removeEventListener('click',this.clickerFun);
		this.lArr.cursor='default';
		this.rArr.removeEventListener('click',this.clickerFun);
		this.rArr.cursor='default';
	};

	p.audioClick=function(){
		createjs.Sound.stop();
		if(oG.model.audioLoaded)createjs.Sound.play('s_'+this.dVar);
	};

	p.audButDisplay=function(disp){
		if(disp=='show'){
			this.audioBut.visible=true;
		}else{
			this.audioBut.visible=false;
		}
	};

	p.init=function(){
		this.cText=new createjs.Sprite(oG.model.contentSpriteSheet);
		if(oG.model.orientation===0){
			opdLib.dispItem(this.cText,this,400,170);
		}else{
			opdLib.dispItem(this.cText,this,275,285);
		}

		this.dVar=0;
		this.dispItem();

		this.backBut.init();
		this.againBut.init();
		this.audioBut.addEventListener('click',this.audioClickFun);
		this.audioBut.cursor='pointer';

		opdLib.fadeIn(this,300,200);

		this.addLists();
	};

	p.deit=function(){
		this.removeChild(this.cText);
		this.cText=null;

		this.backBut.deit();
		this.againBut.deit();

		this.audioBut.removeEventListener('click',this.audioClickFun);
		this.audioBut.cursor='default';

		this.removeLists();
	};

	oG.Views.ReviewView=createjs.promote(ReviewView,'Container');
}(opdGame));
