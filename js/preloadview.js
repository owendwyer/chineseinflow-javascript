
(function(oG){//checked
	function PreloadView(){
		this.Container_constructor();
		this.loadLineFun=this.loadLine.bind(this);
		this.setup();
	}
	var p=createjs.extend(PreloadView,createjs.Container);

	p.setup=function(){
		this.preloadText=new createjs.Text('loading','bold 16px Arial','#555');
		opdLib.centerText(this.preloadText);
		this.preLoaderImage=new Image();
		this.preLoaderImage.src=oG.model.preLoaderImageSrc;
		this.preIm=new createjs.Bitmap(this.preLoaderImage);
		this.preloadBits=[];
		for(var i=0;i<8;i++){
			this.preloadBits[i]=new createjs.Shape();
			this.preloadBits[i].graphics.beginFill('#ccc').drawRoundRect(0,0,20,20,4);
			this.addChild(this.preloadBits[i]);
			this.preloadBits[i].visible=false;
		}
		this.addChild(this.preloadText,this.preIm);

		this.setupDisplay();
	};

	p.setupDisplay=function(){
		var i=0;
		if(oG.model.orientation===0){
			opdLib.posItem(this.preloadText,400,310);
			opdLib.posItem(this.preIm,300,210);
			for(i=0;i<8;i++){opdLib.posItem(this.preloadBits[i],314+i*22,320);}
		}else{
			opdLib.posItem(this.preloadText,275,435);
			opdLib.posItem(this.preIm,175,335);
			for(i=0;i<8;i++){opdLib.posItem(this.preloadBits[i],189+i*22,445);}
		}
	};

	p.orientationChange=function(){
		this.setupDisplay();
	};

	p.preloadError=function(){
		createjs.Ticker.removeEventListener('tick',this.loadLineFun);
		this.preloadText.text="Error - can't load";
		for(var i=0;i<8;i++){
			this.preloadBits[i].graphics.clear();
			this.preloadBits[i].visible=true;
		}
	};

	p.init=function(){
		this.loadLineVar=0;
		createjs.Ticker.addEventListener('tick',this.loadLineFun);
		oG.preloader.init();
	};

	p.loadLine=function(event){
		this.loadLineVar++;
		if(this.loadLineVar>28)this.loadLineVar=0;

		var bitVar=Math.floor(this.loadLineVar/2);
		for(var i=0;i<8;i++){
			if(bitVar<i){
				this.preloadBits[i].visible=false;
			}else{
				this.preloadBits[i].visible=true;
			}
		}
	};

	p.deit=function(){
		createjs.Ticker.removeEventListener('tick',this.loadLineFun);
		oG.preloader.deit();
	};

	oG.Views.PreloadView=createjs.promote(PreloadView,'Container');
}(opdGame));
