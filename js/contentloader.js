
(function(oG){//checked
	function contentLoader(){
		this.EventDispatcher_constructor();
		this.imagesLoadedFun=this.imagesLoaded.bind(this);
		this.imagesLoadErrorFun=this.imagesLoadError.bind(this);
		this.audioLoadedFun=this.audioLoaded.bind(this);
		this.audioLoadErrorFun=this.audioLoadError.bind(this);
		this.setup();
	}
	var p=createjs.extend(contentLoader,createjs.EventDispatcher);

	p.setup=function(){
		this.myContentLoader=null;
		this.needToCheckContext=true;
		createjs.Sound.alternateExtensions=["mp3"];
	};

	p.loadContentSet=function(gVar){
		this.gVar=gVar;
		this.retriedOnce=false;
		this.retriedOnceAudio=false;
		
		if(this.needToCheckContext)this.checkContext();

		createjs.Sound.removeSound('soundId');
		oG.model.audioLoaded=false;

		if(this.myContentLoader!==null){this.clearupContentLoader();}

		this.loadImages();
	};

	//this is a fix for changes to chrome that require user gesture before audio can play
	p.checkContext=function(){
		this.needToCheckContext=false;
		try {
			if(createjs.WebAudioPlugin.context.state==="suspended"){
				createjs.WebAudioPlugin.context.resume();
			}
		}catch(e){
			// SoundJS context or web audio plugin may not exist
			console.error("There was an error while trying to resume the SoundJS Web Audio context...");
			console.error(e);
		}
	};

	p.loadImages=function(){
		this.myManifest=[{src:oG.model.imsFolder+'bc_'+this.gVar+'.png',id:'mySprite'}];
		this.myContentLoader=new createjs.LoadQueue(false);
		this.myContentLoader.addEventListener('error',this.imagesLoadErrorFun);
		this.myContentLoader.addEventListener('complete',this.imagesLoadedFun);
		this.myContentLoader.loadManifest(this.myManifest,true);
	};

	p.imagesLoadError=function(){
		this.clearupContentLoader();
		if(!this.retriedOnce){
			console.log('Load Error - retrying one time');
			this.retriedOnce=true;
			this.loadImages();
		}else{
			console.log('Load Error - giving up');
			oG.view.changeView('title');
		}
	};

	p.imagesLoaded=function(){
		var frms=oG.imageVars.getImFrames(this.gVar);
		oG.model.contentSpriteSheet=new createjs.SpriteSheet({
			images:[this.myContentLoader.getResult('mySprite')],
			frames:frms
		});
		this.myContentLoader.removeEventListener('complete',this.imagesLoadedFun);
		this.myContentLoader.removeEventListener('error',this.imagesLoadErrorFun);
		this.myContentLoader.destroy();
		this.myContentLoader=null;
		this.dispatchEvent('loadComplete');

		if(this.gVar<20){
			this.loadAudio();
		}
	};

	p.loadAudio=function(){
		var myAuSpri=oG.audioVars.getAudFrames(this.gVar);
		this.audManifest=[{src:oG.model.audFolder+'a_'+this.gVar+'.ogg',id:'soundId',data:{audioSprite:myAuSpri}}];
		this.myContentLoader=new createjs.LoadQueue(false);
		this.myContentLoader.installPlugin(createjs.Sound);
		this.myContentLoader.addEventListener('complete',this.audioLoadedFun);
		this.myContentLoader.addEventListener('error',this.audioLoadErrorFun);
		this.myContentLoader.loadManifest(this.audManifest,true);
	};

	p.audioLoadError=function(){
		this.clearupContentLoader();
		oG.model.audioLoaded=false;
		if(!this.retriedOnceAudio){
			console.log('Audio load failure - retrying once');
			this.retriedOnceAudio=true;
			this.loadAudio();
		}else{
			console.log('Audio load failure - giving up');
		}
	};

	p.audioLoaded=function(){
		oG.model.audioLoaded=true;
		this.clearupContentLoader();
		this.dispatchEvent('audComplete');
	};

	p.clearupContentLoader=function(){
		this.myContentLoader.removeEventListener('complete',this.audioLoadedFun);
		this.myContentLoader.removeEventListener('error',this.audioLoadErrorFun);
		this.myContentLoader.removeEventListener('complete',this.contentLoadedFun);
		this.myContentLoader.removeEventListener('error',this.imageLoadErrorFun);
		this.myContentLoader.destroy();
		this.myContentLoader=null;
	};

	oG.Modules.ContentLoader=createjs.promote(contentLoader,'EventDispatcher');
}(opdGame));
