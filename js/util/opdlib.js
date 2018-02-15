
var opdLib={
	capitalize:function(){
    		return this.charAt(0).toUpperCase()+this.slice(1);
	},
	
	capitalizeFirst:function(inText){
    		return inText.charAt(0).toUpperCase()+inText.slice(1);
	},

	spacedCapitalize:function(inText){
		 return inText.replace(/(?:^|\s)\S/g,function(a){return a.toUpperCase();});
	},

	removeRightClick:function(){
		//$('body').attr('oncontextmenu','return false');
		document.oncontextmenu=function(){return false;};
	},

	getRandomInteger:function(lim){
		return Math.floor(Math.random()*lim);
	},

	shuffleArray:function(array){
		for(i=array.length-1;i>0;i--){
        		j=Math.floor(Math.random()*(i+1));
        		var temp=array[i];
        		array[i]=array[j];
        		array[j]=temp;
    		}
    		return array;
	},

	invertArray:function(array){
		var invArr=[];
		for(i=0;i<array.length;i++){
			invArr[array[i]]=i;
		}
    		return invArr;
	},

	fadeIn:function($item,$time,$delay){
		$item.alpha=0;
		createjs.Tween.get($item,{override:true}).wait($delay).to({alpha:1},$time);
	},

	fadeOut:function($item,$time,$delay){
		createjs.Tween.get($item,{override:true}).wait($delay).to({alpha:0},$time);
	},

	fadeInOut:function($item,$time1,$delay,$time2){
		$item.alpha=0;
		createjs.Tween.removeTweens($item);
		createjs.Tween.get($item,{override:true}).to({alpha:1},$time1).wait($delay).to({alpha:0},$time2);
	},

	fadeInOutDelayed:function($item,$delay1,$time1,$delay2,$time2){
		$item.alpha=0;
		createjs.Tween.removeTweens($item);
		createjs.Tween.get($item,{override:true}).wait($delay1).to({alpha:1},$time1).wait($delay2).to({alpha:0},$time2);
	},

	arraySameCheck:function(array1,array2){
		var out=true;
		if(array1.length!=array2.length)out=false;
		for(var i=0;i<array1.length;i++){
			if(array1[i]!=array2[i])out=false;
		}
		return out;
	},

	shuffleArrayDifferent:function(array){
		var newArr=[];
		for(var i=0;i<array.length;i++)newArr[i]=array[i];
		do{
			newArr=opdLib.shuffleArray(newArr);
		}while(opdLib.arraySameCheck(newArr,array));
    		return newArr;
	},

	shuffleArrayForceInitial:function(array,initial){
	    	for(var i=array.length-1;i>0;i--){
			var j=Math.floor(Math.random() * (i + 1));
			var temp=array[i];
			array[i]=array[j];
			array[j]=temp;
	    	}
		var pos=0;
		for(i=0;i<array.length;i++){
			if(array[i]===initial){pos=i;}
		}
		var tmp=array[0];
		array[0]=array[pos];
		array[pos]=tmp;
	    	return array;
	},

	shuffleArrayKeepInitial:function(array,initial){
		initial--;
	    	for(var i=array.length-1;i>initial;i--){
			var j=Math.ceil(Math.random()*(i-initial))+initial;
			var temp=array[i];
			array[i]=array[j];
			array[j]=temp;
	    	}
	    	return array;
	},

	shuffleArrayForceFinal:function(array,final){
		var pos=0;
		var i=0;
	    	for(i=array.length-1;i>0;i--){
			var j=Math.floor(Math.random()*(i+1));
			var temp=array[i];
			array[i]=array[j];
			array[j]=temp;
	    	}
		for(i=0;i<array.length;i++){
			if(array[i]===final){pos=i;}
		}
		var tmp=array[array.length-1];
		array[array.length-1]=array[pos];
		array[pos]=tmp;
	    	return array;
	},

	doesArrayContain:function(item,array){
		for(var i=0;i<array.length;i++){
			if(item==array[i])return true;
		}
		return false;
	},

	drawArrow:function(size,color){
		var outShape=new createjs.Shape();
		outShape.graphics.beginFill(color);
		outShape.graphics.arc(0,0,size*0.56,-1,1);
		outShape.graphics.arc(-size,size,size*0.40,1,Math.PI);
		outShape.graphics.arc(-size,-size,size*0.40,Math.PI,-1);
		outShape.graphics.closePath();
		return outShape;
	},

	scaleImage:function(im,maxLen){
		var myRatio=0;
		if(im.image.width>im.image.height){
			myRatio=maxLen/im.image.width;
		}else{
			myRatio=maxLen/im.image.height;
		}
		im.scaleX=myRatio;
		im.scaleY=myRatio;
		im.x=(maxLen-(im.image.width*myRatio))/2;
		im.y=(maxLen-(im.image.height*myRatio))/2;
	},

	dispItem:function($item,$tar,$x,$y){
		$tar.addChild($item);
		$item.x=$x;
		$item.y=$y;
	},

	posItem:function($item,$x,$y){
		$item.x=$x;
		$item.y=$y;
	},

	centerText:function($txt){
		$txt.textBaseline='center';
		$txt.textAlign='center';
	},

	centerItemFromWidth:function($item,$width){
		$item.x=$width/2-$item.image.width/2;
	},

	makeRectangle:function($wid,$hei,$rnd,$col){
		var shape=new createjs.Shape();
		shape.graphics.beginFill($col);
		shape.graphics.drawRoundRect(-$wid/2,-$hei/2,$wid,$hei,$rnd);
		return shape;
	},

	getArrayPosition:function(gArr,gPos){
		var pos=0;
		for(var i=0;i<gArr.length;i++){
			if(gArr[i]===gPos)pos=i;
		}
		return pos;
	}
};

(function(oL){
	oL.timer=function($callback){
		var timeout, started, remaining, callback=$callback, running=false;

		this.start=function($delay){	
			if(running){
				clearTimeout(timeout);
			}
			running=true;
			remaining=$delay;
			timeout=setTimeout(localFunction,remaining);
			started=new Date();
		};

		this.pause=function(){
			if(running){
				clearTimeout(timeout);
				remaining-=new Date()-started;
			}
		};

		this.unpause=function(){
			if(running){
				timeout=setTimeout(localFunction,remaining);
				started=new Date();
			}
		};

		this.clear=function(){		
			if(running){
				clearTimeout(timeout);
				running=false;
			}
		};

		function localFunction(){
			running=false;
			$callback();
		}
	};
}(opdLib));

