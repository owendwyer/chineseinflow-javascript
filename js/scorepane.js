
(function(oG){//checked
	function ScorePane(){
		this.Container_constructor();
		this.submitClickFun=this.submitClick.bind(this);
		this.showFieldsFun=this.showFields.bind(this);
		this.keyPressFun=this.keyPress.bind(this);
		this.showFieldsTimeout=null;
		this.setup();
	}

	var p=createjs.extend(ScorePane,createjs.Container);
	var paneBord=8;

	p.setup=function(){
		this.fontOne='bold 16px Arial';
		this.fontOneColor='#333';
		this.fontTwo='bold 18px Arial';
		this.fontTwoColor='#444';
		this.paneLength='short';
		this.scoreLabelText1='Score';
		this.scoreLabelText2='Time';
		this.paneBorderColor='#666';
	};

	p.initialSetup=function(){
		this.inputActive=false;
		this.submitCallback=function(){};
		this.myCan=document.getElementById('myCanvas');
		this.entryPaneContainer=new createjs.Container();
		this.scoreDispContainer=new createjs.Container();

		this.submitBut=new createjs.Container();
		this.submitButBack=new createjs.Shape();
		this.scoreDisp1=new createjs.Text('0',this.fontOne,this.fontOneColor);
		this.scoreDisp2=new createjs.Text('0',this.fontOne,this.fontOneColor);

		this.entryPaneBack=new createjs.Shape();
		this.entryPane=new createjs.Shape();
		this.scoreDispPaneBack=new createjs.Shape();
		this.scoreDispPane=new createjs.Shape();

		this.submitText=new createjs.Text('Submit',this.fontTwo,this.fontTwoColor);
		this.nameLabel=new createjs.Text('Name',this.fontOne,this.fontOneColor);
		this.localLabel=new createjs.Text('Location',this.fontOne,this.fontOneColor);
		this.scoreLabel1=new createjs.Text(this.scoreLabelText1,this.fontOne,this.fontOneColor);
		this.scoreLabel2=new createjs.Text(this.scoreLabelText2,this.fontOne,this.fontOneColor);

		this.entryPaneContainer.addChild(this.entryPaneBack,this.entryPane);
		this.scoreDispContainer.addChild(this.scoreDispPaneBack,this.scoreDispPane);

		opdLib.centerText(this.submitText);
		opdLib.centerText(this.nameLabel);
		opdLib.centerText(this.localLabel);
		opdLib.centerText(this.scoreLabel1);
		opdLib.centerText(this.scoreLabel2);
		opdLib.centerText(this.scoreDisp1);
		opdLib.centerText(this.scoreDisp2);

		this.submitBut.cursor='pointer';
		this.submitButBack.graphics.beginFill('#ff8').drawRoundRect(-50,-20,100,40,12);
		opdLib.dispItem(this.submitButBack,this.submitBut,0,0);
		opdLib.dispItem(this.submitText,this.submitBut,0,8);

		this.entryPaneContainer.addChild(this.submitBut,this.nameLabel,this.localLabel);

		this.scoreDispContainer.addChild(this.scoreLabel1,this.scoreDisp1);
		if(this.paneLength=='long'){
			this.scoreDispContainer.addChild(this.scoreLabel2,this.scoreDisp2);
		}

		this.addChild(this.entryPaneContainer,this.scoreDispContainer);

		this.nDiv=document.createElement('input');
		this.nDiv.id='inputName';
		this.setInputStyle(this.nDiv);
		document.getElementById('containerDiv').appendChild(this.nDiv);
		this.lDiv=document.createElement('input');
		this.lDiv.id='inputLocal';
		this.setInputStyle(this.lDiv);
		document.getElementById('containerDiv').appendChild(this.lDiv);

		this.nObj=new createjs.DOMElement('inputName');
		this.lObj=new createjs.DOMElement('inputLocal');
		this.nCont=new createjs.Container();
		this.lCont=new createjs.Container();
		this.nCont.addChild(this.nObj);
		this.lCont.addChild(this.lObj);
		this.addChild(this.nCont);
		this.addChild(this.lCont);

		this.setupDisplay();
	};

	p.setupDisplay=function(){
		this.entryPaneBack.graphics.clear();
		this.entryPane.graphics.clear();
		this.scoreDispPaneBack.graphics.clear();
		this.scoreDispPane.graphics.clear();

		var entryPaneHeight=160;
		var entryPaneWidth=120;
		var scoreDispPaneHeight=0;
		var scoreDispPaneWidth=120;
		if(oG.model.orientation===0){
			opdLib.posItem(this.submitBut,0,110);
			opdLib.posItem(this.nameLabel,0,-40);//-90
			opdLib.posItem(this.localLabel,0,20);//-30

			this.nameElemX=-2;
			this.nameElemY=-20;
			this.localElemX=-2;
			this.localElemY=40;

			if(this.paneLength=='long'){
				opdLib.posItem(this.entryPaneContainer,90,340);
				opdLib.posItem(this.scoreDispContainer,90,176);

				scoreDispPaneHeight=150;
				opdLib.posItem(this.scoreLabel1,0,-35);//30
				opdLib.posItem(this.scoreDisp1,0,-10);//55
				opdLib.posItem(this.scoreLabel2,0,25);//85
				opdLib.posItem(this.scoreDisp2,0,50);//110
			}else{
				opdLib.posItem(this.entryPaneContainer,90,320);
				opdLib.posItem(this.scoreDispContainer,90,190);

				scoreDispPaneHeight=80;
				opdLib.posItem(this.scoreLabel1,0,-5);
				opdLib.posItem(this.scoreDisp1,0,20);
			}
		}else{
			entryPaneHeight=100;
			entryPaneWidth=260;
			scoreDispPaneHeight=100;

			opdLib.posItem(this.submitBut,0,-50);
			opdLib.posItem(this.nameLabel,-60,-8);
			opdLib.posItem(this.localLabel,50,-8);

			this.nameElemX=-60;
			this.nameElemY=14;
			this.localElemX=50;
			this.localElemY=14;

			if(this.paneLength=='long'){
				opdLib.posItem(this.entryPaneContainer,170,660);
				opdLib.posItem(this.scoreDispContainer,410,660);
				scoreDispPaneWidth=200;
				opdLib.posItem(this.scoreLabel1,-40,-8);
				opdLib.posItem(this.scoreDisp1,-40,18);
				opdLib.posItem(this.scoreLabel2,40,-8);
				opdLib.posItem(this.scoreDisp2,40,18);
			}else{
				opdLib.posItem(this.entryPaneContainer,200,660);
				opdLib.posItem(this.scoreDispContainer,400,660);
				scoreDispPaneWidth=130;
				opdLib.posItem(this.scoreLabel1,0,-8);
				opdLib.posItem(this.scoreDisp1,0,18);
			}
		}

		var wid=entryPaneWidth-paneBord;
		var hei=entryPaneHeight-paneBord;
		var sHei=scoreDispPaneHeight-paneBord;
		var sWid=scoreDispPaneWidth-paneBord;
		this.entryPaneBack.graphics.beginFill(this.paneBorderColor)
		.drawRoundRect(-entryPaneWidth/2,-entryPaneHeight/2,entryPaneWidth,entryPaneHeight,16);
		this.entryPane.graphics.beginFill('#fff').drawRoundRect(-wid/2,-hei/2,wid,hei,12);
		this.scoreDispPaneBack.graphics.beginFill(this.paneBorderColor)
		.drawRoundRect(-scoreDispPaneWidth/2,-scoreDispPaneHeight/2,scoreDispPaneWidth,scoreDispPaneHeight,16);
		this.scoreDispPane.graphics.beginFill('#fff').drawRoundRect(-sWid/2,-sHei/2,sWid,sHei,12);

		this.arrangePanes();
		this.updateInputs();
	};

	p.arrangePanes=function(){
		if(oG.model.orientation===0){
			if(this.inputActive){
				this.entryPaneContainer.visible=true;
				if(this.paneLength=='long'){
					opdLib.posItem(this.entryPaneContainer,90,340);
					opdLib.posItem(this.scoreDispContainer,90,176);
				}else{
					opdLib.posItem(this.entryPaneContainer,90,320);
					opdLib.posItem(this.scoreDispContainer,90,190);
				}
			}else{
				this.entryPaneContainer.visible=false;
				opdLib.posItem(this.scoreDispContainer,90,265);
			}
		}else{
			if(this.inputActive){
				this.entryPaneContainer.visible=true;
				if(this.paneLength=='long'){
					opdLib.posItem(this.entryPaneContainer,170,660);
					opdLib.posItem(this.scoreDispContainer,410,660);
				}else{
					opdLib.posItem(this.entryPaneContainer,200,660);
					opdLib.posItem(this.scoreDispContainer,400,660);
				}
			}else{
				this.entryPaneContainer.visible=false;
				opdLib.posItem(this.scoreDispContainer,275,660);
			}
		}
		opdLib.fadeIn(this.entryPaneContainer,300,200);
		opdLib.fadeIn(this.scoreDispContainer,300,200);
	};

	p.setInputVisibility=function(bool){
		this.inputActive=bool;
		if(bool){
			this.showFieldsTimeout=setTimeout(this.showFieldsFun,500);
			this.updateInputs();
		}
		this.arrangePanes();
	};

	p.showFields=function(){
		document.querySelector('input').autofocus=true;
		this.nDiv.style.display='block';
		this.lDiv.style.display='block';
	};

	p.updateInputs=function(){
		if(this.inputActive==true){
			var rat=oG.model.canvasRatio;
			var wid=Math.round(80*rat);
			var hei=Math.round(20*rat);
			var paneX=this.entryPaneContainer.x*rat;
			var paneY=this.entryPaneContainer.y*rat;
			var xOff=Math.round(this.myCan.offsetLeft-wid/2+paneX);
			var yOff=Math.round(this.myCan.offsetTop-hei/2+paneY);

			var newFontSize=Math.round(20*rat);
			newFontSize=Math.floor(newFontSize);

			this.nDiv.style.fontSize=newFontSize+'px';
			this.lDiv.style.fontSize=newFontSize+'px';

			this.nDiv.style.height=hei+'px';
			this.lDiv.style.height=hei+'px';
			this.nDiv.style.width=wid+'px';
			this.lDiv.style.width=wid+'px';

			this.nCont.x=Math.round(xOff+(this.nameElemX*rat));
			this.nCont.y=Math.round(yOff+(this.nameElemY*rat));
			this.lCont.x=Math.round(xOff+(this.localElemX*rat));
			this.lCont.y=Math.round(yOff+(this.localElemY*rat));
		}
	};

	p.endSubmit=function(){
		this.entryPaneContainer.visible=false;
		this.submitBut.removeEventListener('click',this.submitClickFun);
		this.nDiv.style.display='none';
		this.lDiv.style.display='none';
	};

	p.cleanInputs=function(){
		var nom=this.nObj.htmlElement.value;
		if(nom.length>12)nom=nom.slice(0,12);
		nom=nom.replace(/[^a-zA-Z ]/g, '');
		this.nObj.htmlElement.value=nom;
		var loc=this.lObj.htmlElement.value;
		if(loc.length>12)loc=loc.slice(0,12);
		loc=loc.replace(/[^a-zA-Z ]/g, '');
		this.lObj.htmlElement.value=loc;
	};

	p.keyPress=function(e){this.cleanInputs();};

	p.setCallback=function(newFun){this.submitCallback=newFun;};

	p.submitClick=function(event){
		this.cleanInputs();
		var nom=this.nObj.htmlElement.value;
		var loc=this.lObj.htmlElement.value;
		if(nom.length>0&&loc.length>0){
			this.endSubmit();
			this.submitCallback(nom,loc);
			this.inputActive=false;
		}
	};

	p.setInputStyle=function(div){
		div.setAttribute('type','text');
		div.setAttribute('maxlength',12);
		div.style.position='absolute';
		div.style.left=0;
		div.style.top=0;
		div.style.display='none';
		div.style.textAlign='center';
		div.style.fontFamily=this.fontTwo.split('px ')[1];
		div.style.textDecoration='none';
		div.style.border='1px solid #999';
		div.style.margin='0px';
		div.style.padding='0px';
	};

	p.init=function(){
		this.inputActive=false;
		document.addEventListener('keyup',this.keyPressFun);
		this.submitBut.addEventListener('click',this.submitClickFun);
		this.updateInputs();
	};

	p.deit=function(){
		if(this.showFieldsTimeout!=null)clearTimeout(this.showFieldsTimeout);
		this.inputActive=false;
		this.endSubmit();
		document.removeEventListener('keyup',this.keyPressFun);
	};

	oG.Modules.ScorePane=createjs.promote(ScorePane,'Container');
}(opdGame));
