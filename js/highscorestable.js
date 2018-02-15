
(function(oG){//checked
	var monthText=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var LINE_HEIGHT=38;

	function HighScoresTable(){
		this.Container_constructor();
		this.startUpFun=this.startUp.bind(this);
		this.stopUpFun=this.stopUp.bind(this);
		this.startDownFun=this.startDown.bind(this);
		this.stopDownFun=this.stopDown.bind(this);
		this.scrollUpFun=this.scrollUp.bind(this);
		this.scrollDownFun=this.scrollDown.bind(this);
		this.setup();
	}
	var p=createjs.extend(HighScoresTable,createjs.Container);

	p.setup=function(){
		this.addScoresFunction=function(){};
		this.rowsCount=0;
		this.fieldsMade=false;
		this.rows=8;
		this.tableType='scores';
		this.titleFont='bold 32px Arial';
		this.titleFontColor='#000';
		this.titlesFont='bold 22px Arial';
		this.titlesFontColor='#222';
		this.fieldsFont='bold 20px Arial';
		this.fieldsFontColor='#333';
		this.backPaneColor='#fff';
		this.backPaneAlpha=0.3;
		this.backPaneBorderColor='#000';
		this.backPaneBorderWidth=0;
	};

	p.initialSetup=function(){
		this.backPane=new createjs.Shape();

		this.titleText=new createjs.Text('',this.titleFont,this.titleFontColor);
		opdLib.centerText(this.titleText);

		this.titlesContainer=new createjs.Container();
		this.fieldsContainer=new createjs.Container();

		this.fieldsMask=new createjs.Shape();
		this.fieldsContainer.mask=this.fieldsMask;

		this.backPane.alpha=this.backPaneAlpha;

		this.myUpBut=opdLib.drawArrow(28,'#ff8');
		this.myDownBut=opdLib.drawArrow(28,'#ff8');
		this.myUpBut.rotation=-90;
		this.myDownBut.rotation=90;
		this.myUpBut.cursor='pointer';
		this.myDownBut.cursor='pointer';

		switch(this.tableType){
			case 'time':
			this.titleLabels=['Name','Time','Date','Location'];
			this.xInd=[94,214,305,415];
			this.addScoresFunction=this.addScoresFunTime;
			break;
			case 'timeRound':
			this.titleLabels=['Name','Time','Round','Date','Location'];
			this.xInd=[72,170,240,320,420];
			this.addScoresFunction=this.addScoresFunTimeRound;
			break;
			case 'movesTime':
			this.titleLabels=['Name','Moves','Time','Date','Location'];
			this.xInd=[77,175,245,320,420];
			this.addScoresFunction=this.addScoresFunMovesTime;
			break;
			case 'scoreMoves':
			this.titleLabels=['Name','Score','Moves','Date','Location'];
			this.xInd=[77,175,245,320,420];
			this.addScoresFunction=this.addScoresFunScoreMoves;
			break;
			case 'scoreTime':
			this.titleLabels=['Name','Score','Time','Date','Location'];
			this.xInd=[77,175,245,320,420];
			this.addScoresFunction=this.addScoresFunScoreTime;
			break;
			default:
			//'scores'
			this.titleLabels=['Name','Score','Date','Location'];
			this.xInd=[94,214,305,415];
			this.addScoresFunction=this.addScoresFunScores;
			break;
		}

		this.columns=this.titleLabels.length;

		this.tFields=[];
		this.titles=[];
		for(var i=0;i<this.columns;i++){
			this.titles[i]=new createjs.Text(this.titleLabels[i],this.titlesFont,this.titlesFontColor);
			this.titlesContainer.addChild(this.titles[i]);
			this.titles[i].x=this.xInd[i];
			opdLib.centerText(this.titles[i]);

			this.tFields[i]=new createjs.Text('',this.fieldsFont,this.fieldsFontColor);
			this.fieldsContainer.addChild(this.tFields[i]);
			this.tFields[i].maxWidth=150;
			this.tFields[i].lineHeight=LINE_HEIGHT;
			this.tFields[i].x=this.xInd[i];
			opdLib.centerText(this.tFields[i]);
		}

		this.addChild(this.backPane,this.titlesContainer,this.fieldsContainer,this.titleText);
		this.addChild(this.myUpBut,this.myDownBut);

		this.setupDisplay();
	};

	p.setupDisplay=function(){
		if(oG.model.orientation===0){
			this.fieldsMask.graphics.clear().beginFill('#000').drawRect(160,130,600,296);
			opdLib.posItem(this.titleText,415,64);
			opdLib.posItem(this.titlesContainer,168,109);
			this.baseY=151;
			this.fieldsX=168;
			opdLib.posItem(this.myUpBut,730,200);
			opdLib.posItem(this.myDownBut,730,310);
		}else{
			this.fieldsMask.graphics.clear().beginFill('#000').drawRect(35,260,600,296);
			opdLib.posItem(this.titleText,278,194);
			opdLib.posItem(this.titlesContainer,31,239);
			this.baseY=281;
			this.fieldsX=31;
			opdLib.posItem(this.myUpBut,275,32);
			opdLib.posItem(this.myDownBut,275,118);
		}
		opdLib.posItem(this.fieldsContainer,this.fieldsX,this.baseY);
		this.drawBackPane();
		this.setMinY();
	};

	p.drawBackPane=function(){
		this.backPane.graphics.clear().beginFill(this.backPaneColor);
		if(this.backPaneBorderWidth>0){
			this.backPane.graphics.setStrokeStyle(this.backPaneBorderWidth).beginStroke(this.backPaneBorderColor);
		}
		if(oG.model.orientation===0){
			this.backPane.graphics.drawRoundRect(170,20,500,426,24);
		}else{
			this.backPane.graphics.drawRoundRect(25,150,500,426,24);
		}
		this.backPane.alpha=this.backPaneAlpha;
	};

	p.setMinY=function(){
		if(this.rowsCount<=this.rows){
			this.minY=this.baseY;
		}else{
			this.minY=this.baseY-((this.rowsCount-8)*LINE_HEIGHT);
		}
	};

	p.showScores=function(jsonArr){
		this.jsonArr=jsonArr;
		this.addScoresFunction();
		this.setMinY();
	};

	p.startUp=function(event){
		this.delta=0;
		createjs.Ticker.addEventListener('tick',this.scrollUpFun);
		this.myUpBut.addEventListener('mouseout',this.stopUpFun);
	};

	p.stopUp=function(event){
		if(!oG.model.touchMode){
			createjs.Ticker.removeEventListener('tick',this.scrollUpFun);
			this.myUpBut.removeEventListener('mouseout',this.stopUpFun);
		}
		if(this.delta===0){
			for(var i=0;i<this.rows;i++){this.scrollUp();}
		}
		this.delta=0;
	};

	p.startDown=function(event){
		this.delta=0;
		createjs.Ticker.addEventListener('tick',this.scrollDownFun);
		this.myDownBut.addEventListener('mouseout',this.stopDownFun);
	};

	p.stopDown=function(event){
		if(!oG.model.touchMode){
			createjs.Ticker.removeEventListener('tick',this.scrollDownFun);
			this.myDownBut.removeEventListener('mouseout',this.stopDownFun);
		}
		if(this.delta===0){
			for(var i=0;i<this.rows;i++){this.scrollDown();}
		}
		this.delta=0;
	};

	p.scrollUp=function(){
		this.delta++;
		this.fieldsContainer.y+=LINE_HEIGHT;
		if(this.fieldsContainer.y>=this.baseY){
			this.fieldsContainer.y=this.baseY;
			createjs.Ticker.removeEventListener('tick',this.scrollUpFun);
			this.myUpBut.removeEventListener('mouseout',this.stopUpFun);
		}
	};

	p.scrollDown=function(){
		this.delta++;
		this.fieldsContainer.y-=LINE_HEIGHT;
		if(this.fieldsContainer.y<=this.minY){
			this.fieldsContainer.y=this.minY;
			createjs.Ticker.removeEventListener('tick',this.scrollDownFun);
			this.myDownBut.removeEventListener('mouseout',this.stopDownFun);
		}
	};

	p.addLists=function(){
		if(!oG.model.touchMode){
			this.myUpBut.addEventListener('mousedown',this.startUpFun);
			this.myDownBut.addEventListener('mousedown',this.startDownFun);
		}
		this.myUpBut.addEventListener('click',this.stopUpFun);
		this.myDownBut.addEventListener('click',this.stopDownFun);
	};

	p.removeLists=function(){
		if(!oG.model.touchMode){
			this.myUpBut.removeEventListener('mousedown',this.startUpFun);
			this.myDownBut.removeEventListener('mousedown',this.startDownFun);
		}
		this.myUpBut.removeEventListener('click',this.stopUpFun);
		this.myDownBut.removeEventListener('click',this.stopDownFun);
	};

	p.init=function(){
		this.delta=0;
		this.rowsCount=0;
		opdLib.posItem(this.fieldsContainer,this.fieldsX,this.baseY);
		this.titleText.text='Content : '+oG.model.contentTitle;
		this.addLists();
	};

	p.deit=function(){
		this.rowsCount=0;
		this.removeLists();
	};

	p.addScoresFunMovesTime=function(){
		var i=0;
		for(i=0;i<this.tFields.length;i++)this.tFields[i].text='';
		var myDate=new Date();
		this.rowsCount=this.jsonArr.scores.length;
		for(i=0;i<this.rowsCount;i++){
			myDate.setTime(this.jsonArr.scores[i].Dote);
			var myMon=monthText[myDate.getMonth()];
			var myDay=myDate.getDate();
			this.tFields[0].text+=this.jsonArr.scores[i].Nom+'\r\n';
			this.tFields[1].text+=this.jsonArr.scores[i].Muves+'\r\n';
			this.tFields[2].text+=this.jsonArr.scores[i].Tome+'s\r\n';
			this.tFields[3].text+=myDay+'-'+myMon+'\r\n';
			this.tFields[4].text+=this.jsonArr.scores[i].Local+'\r\n';
		}
	};

	p.addScoresFunScoreMoves=function(){
		var i=0;
		for(i=0;i<this.tFields.length;i++)this.tFields[i].text='';
		var myDate=new Date();
		this.rowsCount=this.jsonArr.scores.length;
		for(i=0;i<this.rowsCount;i++){
			myDate.setTime(this.jsonArr.scores[i].Dote);
			var myMon=monthText[myDate.getMonth()];
			var myDay=myDate.getDate();
			this.tFields[0].text+=this.jsonArr.scores[i].Nom+'\r\n';
			this.tFields[1].text+=this.jsonArr.scores[i].Score+'\r\n';
			this.tFields[2].text+=this.jsonArr.scores[i].Muves+'\r\n';
			this.tFields[3].text+=myDay+'-'+myMon+'\r\n';
			this.tFields[4].text+=this.jsonArr.scores[i].Local+'\r\n';
		}
	};

	p.addScoresFunScoreTime=function(){
		var i=0;
		for(i=0;i<this.tFields.length;i++)this.tFields[i].text='';
		var myDate=new Date();
		this.rowsCount=this.jsonArr.scores.length;
		for(i=0;i<this.rowsCount;i++){
			myDate.setTime(this.jsonArr.scores[i].Dote);
			var myMon=monthText[myDate.getMonth()];
			var myDay=myDate.getDate();
			this.tFields[0].text+=this.jsonArr.scores[i].Nom+'\r\n';
			this.tFields[1].text+=this.jsonArr.scores[i].Score+'\r\n';
			this.tFields[2].text+=this.jsonArr.scores[i].Tome+'\r\n';
			this.tFields[3].text+=myDay+'-'+myMon+'\r\n';
			this.tFields[4].text+=this.jsonArr.scores[i].Local+'\r\n';
		}
	};

	p.addScoresFunTimeRound=function(){
		var i=0;
		for(i=0;i<this.tFields.length;i++)this.tFields[i].text='';
		var myDate=new Date();
		this.rowsCount=this.jsonArr.scores.length;
		for(i=0;i<this.rowsCount;i++){
			myDate.setTime(this.jsonArr.scores[i].Dote);
			var myMon=monthText[myDate.getMonth()];
			var myDay=myDate.getDate();
			this.tFields[0].text+=this.jsonArr.scores[i].Nom+'\r\n';
			this.tFields[1].text+=this.jsonArr.scores[i].Tome+'s\r\n';
			this.tFields[2].text+=this.jsonArr.scores[i].Score+'\r\n';
			this.tFields[3].text+=myDay+'-'+myMon+'\r\n';
			this.tFields[4].text+=this.jsonArr.scores[i].Local+'\r\n';
		}
	};

	p.addScoresFunScores=function(){
		var i=0;
		for(i=0;i<this.tFields.length;i++)this.tFields[i].text='';
		var myDate=new Date();
		this.rowsCount=this.jsonArr.scores.length;
		for(i=0;i<this.rowsCount;i++){
			myDate.setTime(this.jsonArr.scores[i].Dote);
			var myMon=monthText[myDate.getMonth()];
			var myDay=myDate.getDate();
			this.tFields[0].text+=this.jsonArr.scores[i].Nom+'\r\n';
			this.tFields[1].text+=this.jsonArr.scores[i].Score+'\r\n';
			this.tFields[2].text+=myDay+'-'+myMon+'\r\n';
			this.tFields[3].text+=this.jsonArr.scores[i].Local+'\r\n';
		}
	};

	p.addScoresFunTime=function(){
		var i=0;
		for(i=0;i<this.tFields.length;i++)this.tFields[i].text='';
		var myDate=new Date();
		this.rowsCount=this.jsonArr.scores.length;
		for(i=0;i<this.rowsCount;i++){
			myDate.setTime(this.jsonArr.scores[i].Dote);
			var myMon=monthText[myDate.getMonth()];
			var myDay=myDate.getDate();
			this.tFields[0].text+=this.jsonArr.scores[i].Nom+'\r\n';
			this.tFields[1].text+=this.jsonArr.scores[i].Tome+'\r\n';
			this.tFields[2].text+=myDay+'-'+myMon+'\r\n';
			this.tFields[3].text+=this.jsonArr.scores[i].Local+'\r\n';
		}
	};

	oG.Modules.HighScoresTable=createjs.promote(HighScoresTable,'Container');
}(opdGame));
