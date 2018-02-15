
(function(oG){//checked
oG.model={
	version:'v4.7',
	orientation:0,
	canvasRatio:1,

	preloadComplete:false,
	mainSprite:null,

	loadTarget:'',
	contentSpriteSheet:null,
	textArray:[],
	pinArray:[],
	contentLim:0,
	contentCode:0,
	contentTitle:'title here',
	audioLoaded:false,

	routineInd:0,
	gameTime:0,
	gameScore:0,
	gameSpeed:1,

	missBool:false,
	misses:0,
	sdMode:false,
	sdStart:false,
	sdCount:0,
	tarView:-1,
	optView:-1,
	selView:-1,

	optPlayAudio:false,
	optShowTimer:true,

	mainSpriteSrc:'mainSprite.png',

	//comment out these and then set values below to match host
	preLoaderImageSrc:'./res/loadingTitle.png',
	resFolder:'./res/',
	imsFolder:'./content/ims/',
	audFolder:'./content/aud/',

	/*preLoaderImageSrc:'https://www.chineseinflow.com/res/loadingTitle.png',
	resFolder:'https://www.chineseinflow.com/res/',
	imsFolder:'https://www.chineseinflow.com/content/ims/',
	audFolder:'https://www.chineseinflow.com/content/aud/',*/

	siteUrlFull:'https://www.chineseinflow.com',
	scoresUrl:'https://www.chineseinflow.com/php/scores_all.php',
	siteUrl:'www.chineseinflow.com',
	scoresTable:'chinese_scores',
	gameType:1,

	siteLock:false,
	touchMode:false
};
}(opdGame));


//this gets the highscore stuff using model.scoresUrl and model.scoresTable
(function(oG){
	var myReq=new XMLHttpRequest();
	var callback=function(jsonArr){};

	function getScoresLoc(getType,playerName,playerLocation){
		myReq=new XMLHttpRequest();
		myReq.addEventListener('readystatechange',gotScores);
		myReq.open('POST',oG.model.scoresUrl,true);
		myReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		var dMoves=0;

		var myVars='name='+playerName;
		myVars+='&local='+playerLocation;
		myVars+='&score='+oG.model.gameScore;
		myVars+='&date='+new Date().getTime();
		myVars+='&time='+oG.model.gameTime;
		myVars+='&moves='+dMoves;
		myVars+='&content='+oG.model.contentCode;
		myVars+='&table='+oG.model.scoresTable;
		myVars+='&inBool='+getType;
		myVars+='&gameType='+oG.model.gameType;

		myReq.send(myVars);
	}

	function gotScores(){
		if(myReq.readyState==4&&myReq.status==200){
			var jsonArr=JSON.parse(myReq.responseText);
			callback(jsonArr);
			myReq.removeEventListener('readystatechange',gotScores);
		}
	}

	function setCallbackLoc(myFun){callback=myFun;}

	oG.scoresModel={
		getScores:getScoresLoc,
		setCallback:setCallbackLoc
	};

}(opdGame));
