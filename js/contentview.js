
(function(oG){
	function ContentView(){
		this.Container_constructor();
		this.clickerFun=this.clicker.bind(this);
		this.overerFun=this.overer.bind(this);
		this.outerFun=this.outer.bind(this);
		this.tockerFun=this.tocker.bind(this);
		this.lClickFun=this.lClick.bind(this);
		this.rClickFun=this.rClick.bind(this);
		this.setup();
	}
	var p=createjs.extend(ContentView,createjs.Container);

	var stringDefault='Choose a set of characters';

	var setTitles=["HSK 1+2","HSK 3","HSK 4a","HSK 4b","HSK 5a","HSK 5b","HSK 5c","HSK 5d","HSK 5e"];

	p.setup=function(){
		this.cItems=[];
		this.lOut=null;
		this.back=new createjs.Shape();
		this.back.alpha=0.5;
		this.topPane=new createjs.Shape();

		this.loadingText=new createjs.Text('loading','bold 34px Cabin','#333');
		opdLib.centerText(this.loadingText);
		this.loadingText.textAlign='left';

		this.addChild(this.back,this.topPane,this.loadingText);

		this.itemsContainer=new createjs.Container();
		for(var i=0;i<10;i++){
			this.cItems[i]=new oG.Modules.ContentItem();
			this.itemsContainer.addChild(this.cItems[i]);
		}

		this.titleText=new createjs.Text(stringDefault,'bold 20px Cabin','#333');
		this.titleOver=new createjs.Text('','bold 32px Cabin','#333');
		opdLib.centerText(this.titleText);
		opdLib.centerText(this.titleOver);

		this.h1Text=new createjs.Text('','bold 44px Cabin','#333');
		opdLib.centerText(this.h1Text);

		this.lArr=new opdLib.drawArrow(20,'#ffc');
		this.lArr.rotation=180;
		this.rArr=new opdLib.drawArrow(20,'#ffc');

		this.addChild(this.itemsContainer,this.titleText,this.titleOver,this.h1Text,this.lArr,this.rArr);

		this.contentInd=0;

		this.setupDisplay();

		this.setDisplay();
	};

	p.setupDisplay=function(){
		var i=0;
		this.back.graphics.clear();
		this.topPane.graphics.clear();
		if(oG.model.orientation===0){
			this.back.graphics.setStrokeStyle(8).beginStroke('#333').beginFill('#fff').drawRoundRect(80,60,640,460,60);
			this.topPane.graphics.setStrokeStyle(3).beginStroke('#777').beginFill('#fff').drawRoundRect(200,35,400,80,30);
			opdLib.posItem(this.loadingText,320,315);
			opdLib.posItem(this.titleText,400,81);
			opdLib.posItem(this.titleOver,400,85);
			opdLib.posItem(this.h1Text,400,195);
			opdLib.posItem(this.lArr,260,178);
			opdLib.posItem(this.rArr,540,178);

			for(i=0;i<10;i++){
				if(i<5){
					this.cItems[i].setColor('#ffc');
					opdLib.dispItem(this.cItems[i],this.itemsContainer,130+i*110,250);
				}
				if(i>=5){
					this.cItems[i].setColor('#ff5');
					opdLib.dispItem(this.cItems[i],this.itemsContainer,130+(i-5)*110,360);
				}
			}
		}else{
			this.back.graphics.setStrokeStyle(8).beginStroke('#333').beginFill('#fff').drawRoundRect(60,100,430,640,60);
			this.topPane.graphics.setStrokeStyle(3).beginStroke('#777').beginFill('#fff').drawRoundRect(125,60,300,80,30);
			opdLib.posItem(this.loadingText,195,340);
			opdLib.posItem(this.titleText,275,106);
			opdLib.posItem(this.titleOver,275,110);
			opdLib.posItem(this.h1Text,275,220);
			opdLib.posItem(this.lArr,135,203);
			opdLib.posItem(this.rArr,415,203);

			for(i=0;i<2;i++){
					this.cItems[i].setColor('#ffc');
					opdLib.dispItem(this.cItems[i],this.itemsContainer,170+i*110,270);
			}
			for(i=2;i<5;i++){
					this.cItems[i].setColor('#ffa');
					opdLib.dispItem(this.cItems[i],this.itemsContainer,-105+i*110,380);
			}
			for(i=5;i<7;i++){
					this.cItems[i].setColor('#ff7');
					opdLib.dispItem(this.cItems[i],this.itemsContainer,-380+i*110,490);
			}
			for(i=7;i<10;i++){
					this.cItems[i].setColor('#ff5');
					opdLib.dispItem(this.cItems[i],this.itemsContainer,-655+i*110,600);
			}
		}
	};

	p.orientationChange=function(){
		this.setupDisplay();
	};

	p.setDisplay=function(){
		this.h1Text.text=setTitles[this.contentInd];
		var bs=this.contentInd*10;
		var i=0;
		if(this.contentInd<8){
			for(i=0;i<10;i++){
				this.cItems[i].setInd(i+bs);
				this.cItems[i].visible=true;
			}
		}else{
			for(i=0;i<5;i++){
				this.cItems[i].setInd(i+bs);
				this.cItems[i+5].visible=false;
			}
		}
		opdLib.fadeIn(this.itemsContainer,200,50);
	};

	p.lClick=function(){
		this.contentInd--;
		if(this.contentInd<0)this.contentInd=8;
		this.setDisplay();
	};

	p.rClick=function(){
		this.contentInd++;
		if(this.contentInd>8)this.contentInd=0;
		this.setDisplay();
	};

	p.clicker=function(e){
		e.target.front.visible=false;
		oG.controller.loadContent(e.target.ind);
		this.removeLists();
		this.itemsContainer.visible=false;
		this.loadingText.visible=true;
		this.loadProgressVar=0;
		this.h1Text.visible=false;
		this.lArr.visible=false;
		this.rArr.visible=false;
		opdLib.fadeIn(this.loadingText,200,300);
		createjs.Ticker.addEventListener('tick',this.tockerFun);
	};

	p.tocker=function(event){
		var pText='loading';
		this.loadProgressVar++;
		if(this.loadProgressVar>30)this.loadProgressVar=0;
		for(i=0;i<this.loadProgressVar;i+=3)pText+='.';
		this.loadingText.text=pText;
	};

	p.overer=function(e){
		e.target.front.visible=true;
		this.titleOver.visible=true;
		this.titleOver.text=this.getTitleString(e.target.ind);
		this.titleText.visible=false;
	};

	p.getTitleString=function(ind){
		var ini=0;
		if(ind<5){
			ini=ind+1;
			return "HSK1 - part "+ini;
		}
		if(ind<10){
			ini=ind-4;
			return "HSK2 - part "+ini;
		}
		if(ind<20){
			ini=ind-9;
			return "HSK3 - part "+ini;
		}
		if(ind<40){
			ini=ind-19;
			return "HSK4 - part "+ini;
		}
		ini=ind-39;
		return "HSK5 - part "+ini;
	};

	p.outer=function(e){
		e.target.front.visible=false;
		this.titleOver.visible=false;
		this.titleText.visible=true;
	};

	p.addLists=function(){
		this.itemsContainer.addEventListener('click',this.clickerFun);
		if(!oG.model.touchMode){
			this.itemsContainer.addEventListener('mouseover',this.overerFun);
			this.itemsContainer.addEventListener('mouseout',this.outerFun);
			this.itemsContainer.cursor='pointer';
		}
		this.lArr.addEventListener('click',this.lClickFun);
		this.rArr.addEventListener('click',this.rClickFun);
		this.lArr.cursor='pointer';
		this.rArr.cursor='pointer';
	};

	p.removeLists=function(){
		this.itemsContainer.removeEventListener('click',this.clickerFun);
		if(!oG.model.touchMode){
			this.itemsContainer.removeEventListener('mouseover',this.overerFun);
			this.itemsContainer.removeEventListener('mouseout',this.outerFun);
			this.itemsContainer.cursor='default';
		}
		this.lArr.removeEventListener('click',this.lClickFun);
		this.rArr.removeEventListener('click',this.rClickFun);
		this.lArr.cursor='default';
		this.rArr.cursor='default';
	};

	p.init=function(){
		this.itemsContainer.visible=true;
		this.loadingText.visible=false;
		this.titleOver.visible=false;
		this.titleText.visible=true;
		this.h1Text.visible=true;
		this.lArr.visible=true;
		this.rArr.visible=true;
		this.addLists();
	};

	p.deit=function(){
		clearTimeout(this.lOut);
		this.removeLists();
		createjs.Ticker.removeEventListener('tick',this.tockerFun);
		createjs.Tween.removeTweens(this.loadingText);
	};

	oG.Views.ContentView=createjs.promote(ContentView,'Container');
}(opdGame));

(function(oG){//checked
	function ContentItem(){
		this.Container_constructor();
		this.ind=0;
		this.setup();
	}
	var p=createjs.extend(ContentItem,createjs.Container);

	p.setup=function(){
		this.mouseChildren=false;
		var back=new createjs.Shape();
		back.graphics.setStrokeStyle(2);
		back.graphics.beginStroke('#666').beginFill('#ccccff').drawRoundRect(0,0,100,100,16);
		back.alpha=0.5;
		this.addChild(back);

		this.front=new createjs.Shape();
		this.addChild(this.front);
		this.front.visible=false;

		this.topText=new createjs.Text('100','bold 20px Cabin','#555');
		this.botText=new createjs.Text('to 300','bold 20px Cabin','#555');
		opdLib.centerText(this.topText);
		opdLib.centerText(this.botText);
		opdLib.dispItem(this.topText,this,50,34);
		opdLib.dispItem(this.botText,this,50,60);

		this.txt=new createjs.Sprite(oG.model.mainSprite);
		opdLib.dispItem(this.txt,this,0,0);
	};

	p.setColor=function(gCol){
		this.front.graphics.beginStroke('#aaa').beginFill(gCol).drawRoundRect(0,0,100,100,16);
	};

	p.setInd=function(tar){
		this.ind=tar;
		var bInd=tar+1;
		var leTar='contentBit'+bInd;
		this.txt.gotoAndStop(leTar);
		var bs=tar*30;
		var t1=bs+1;
		var t2=bs+30;
		this.topText.text=t1;
		this.botText.text="to "+t2;
	};

	oG.Modules.ContentItem=createjs.promote(ContentItem,'Container');
}(opdGame));
