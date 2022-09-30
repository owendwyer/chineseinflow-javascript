
(function(oG){//checked
	function EndView(){
		this.Container_constructor();
		this.gotScores=this.gotScoresFun.bind(this);
		this.sendNewHighScoreFun=this.sendNewHighScore.bind(this);
		this.setup();
	}
	var p=createjs.extend(EndView,createjs.Container);

	p.setup=function(){
		this.showInput=false;
		this.scoresSent=false;

		this.againBut=new oG.Modules.Button('textAgain','game');
		this.backBut=new oG.Modules.Button('textBack','title');

		this.scorePane=new oG.Modules.ScorePane();
		this.scorePane.fontOne='bold 16px Amaranth';
		this.scorePane.fontOneColor='#333';
		this.scorePane.fontTwo='bold 18px Amaranth';
		this.scorePane.fontTwoColor='#444';
		this.scorePane.paneLength='long';
		this.scorePane.scoreLabelText1='Round';
		this.scorePane.scoreLabelText2='Time';
		this.scorePane.initialSetup();

		this.myScoresTable=new oG.Modules.HighScoresTable();
		this.myScoresTable.titleFont='bold 32px Alegreya Sans';
		this.myScoresTable.titleFontColor='#000';
		this.myScoresTable.titlesFont='bold 22px Amaranth';
		this.myScoresTable.titlesFontColor='#222';
		this.myScoresTable.fieldsFont='bold 20px Amaranth';
		this.myScoresTable.fieldsFontColor='#333';
		this.myScoresTable.backPaneColor='#eee';
		this.myScoresTable.backPaneBorderColor='#444';
		this.myScoresTable.backPaneBorderWidth=5;
		this.myScoresTable.tableType='timeRound';
		this.scorePane.paneBorderColor='#ccc';
		this.myScoresTable.initialSetup();

		this.scorePane.setCallback(this.sendNewHighScoreFun);
		oG.scoresModel.setCallback(this.gotScores);

		this.addChild(this.myScoresTable,this.againBut,this.backBut,this.scorePane);

		this.setupDisplay();
	};

	p.setupDisplay=function(){
		if(oG.model.orientation===0){
			opdLib.posItem(this.againBut,315,500);
			opdLib.posItem(this.backBut,525,500);
			this.myScoresTable.y=10;
		}else{
			opdLib.posItem(this.againBut,170,750);
			opdLib.posItem(this.backBut,380,750);
			this.myScoresTable.y=20;
		}
	};

	p.orientationChange=function(){
		this.setupDisplay();
		this.myScoresTable.setupDisplay();
		this.scorePane.setupDisplay();
	};

	p.sendNewHighScore=function(nom,local){
		this.scoresSent=true;
		this.showInput=false;
		oG.scoresModel.getScores(1,nom,local);
		this.scorePane.setInputVisibility(false);
	};

	p.gotScoresFun=function(jsonArr){
		var len=jsonArr.scores.length;
		this.showInput=true;
		if(len>25){
			var minScore=jsonArr.scores[len-1].Score;
			var minTime=jsonArr.scores[len-1].Tome;
			if(oG.model.gameScore>minScore||oG.model.gameScore==minScore&&oG.model.gameTime<=minTime){
				this.showInput=true;
			}else{
				this.showInput=false;
			}
		}
		if(this.scoresSent)this.showInput=false;
		if(this.showInput){
			this.scorePane.setInputVisibility(true);
		}
		this.myScoresTable.showScores(jsonArr);
	};

	p.init=function(){
		this.showInput=false;
		this.scoresSent=false;
		this.againBut.init();
		this.backBut.init();
		opdLib.fadeIn(this,500,200);
		opdLib.fadeIn(this.backBut,500,700);
		opdLib.fadeIn(this.againBut,500,700);
		opdLib.fadeIn(this.scorePane,500,1600);

		this.scorePane.init();
		this.scorePane.scoreDisp1.text=oG.model.gameScore;
		this.scorePane.scoreDisp2.text=oG.model.gameTime;

		this.myScoresTable.init();

		oG.scoresModel.getScores(0,'','');

		opdWrapper.lock();
	};

	p.deit=function(){
		this.againBut.deit();
		this.backBut.deit();
		opdWrapper.unlock();
		this.myScoresTable.deit();
		this.scorePane.deit();
	};

	oG.Views.EndView=createjs.promote(EndView,'Container');
}(opdGame));
