const gulp = require('gulp');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var jshint = require('gulp-jshint');
var inject = require('gulp-inject-string');
var notify = require('gulp-notify');
var argv = require('yargs').argv;
var bump = require('gulp-bump');
var tap = require("gulp-tap");
var jeditor = require("gulp-json-editor");
var scp = require('gulp-scp2');
var remoteHost='68.183.163.177';
var remoteUsername='owen';

var blankFile='/home/owen/cur/gtle/src/lib/util/blankfile.js';
var gamesDir='/var/www/gamestolearnenglish/html/games/';
var distDir='/home/owen/cur/gtle/dist/games/';
var pagesJsonDir='/home/owen/cur/gtle/src/';

var localBaseURL='http://localhost:8080/gtle/src/';
var serverBaseURL='https://www.gamestolearnenglish.com/';

var tarLine="<script src='js/1_model.js'></script>";
var repLine0="<script src='js/";
var repLine1="'></script>";

module.exports = {
	dist:function(pack,callback){
		bumpMinorDist(pack,function(version){
			combine(pack,version,function(){
				callback(version);
			});
		});
	},
	newFile:function(arg,callback){
		newFile(arg,function(){
			callback();
		});
	},
	bumpMajor:function(pack){
		gulp.src(pack.where+'/package.json')
		.pipe(bump({type:'major'}))
		.pipe(gulp.dest('./'));
	},
	bumpMinor:function(pack){
		gulp.src(pack.where+'/package.json')
		.pipe(bump({type:'minor'}))
		.pipe(gulp.dest('./'));
	},
	uploadCur:function(pack,callback){
		var upFile=distDir+pack.workingDir+'/js/all.min.'+pack.version+'.js';
		uploader(upFile,pack.workingDir,'/js',function(){
			callback();
		});
	},
	uploadRes:function(pack,arg,callback){
		var upFile=distDir+pack.workingDir+'/res/'+arg;
		uploader(upFile,pack.workingDir,'/res',function(){
			callback();
		});
	},
	updateGameJS:function(pack,callback){
		var cur=require(pagesJsonDir+'pages.json');
		cur[pack.workingDir].curVersion=pack.version;
		gulp.src(pagesJsonDir+'pages.json')
		.pipe(jeditor({
			[pack.workingDir]:cur[pack.workingDir]
		}))
		.pipe(gulp.dest(pagesJsonDir))
		.pipe(tap(function(){
			callback()
		}));
	},
	makeTestHTML:function(pack,callback){
		var cur=require(pagesJsonDir+'pages.json');
		cur.testPage.curVersion='/games/'+pack.workingDir+'/js/all.min.'+pack.version;
		gulp.src(pagesJsonDir+'pages.json')
		.pipe(jeditor({
			'testPage':cur.testPage
		}))
		.pipe(gulp.dest(pagesJsonDir))
		.pipe(tap(function(){
			callback()
		}));
	},
	test:function(pack,callback){
		combine(pack,pack.version,function(){
			callback();
		});
	}
};

function uploader(upFile,workingDir,endDir,callback){
	var remote=gamesDir+workingDir+endDir;
	var local=distDir+workingDir+endDir;
	console.log('uploading',upFile);
	console.log('to',remote);
	return gulp.src(upFile)
	.pipe(gulp.dest(local))
	.pipe(scp({
		host:remoteHost,
		username:remoteUsername,
		agent:process.env["SSH_AUTH_SOCK"],
		dest:remote,
		watch: function(client) {
			client.on('end', function() {
			    console.log('upload complete');
				callback();
			});
		}
	}));
}

function bumpMinorDist(pack,callback){
	return gulp.src(pack.where+'/package.json')
	.pipe(bump({type:'minor'}))
	.pipe(gulp.dest('./'))
        .pipe(tap(function(file){
		var json = JSON.parse(String(file.contents));
		version = json.version;
		callback(json.version);
        }));
}

function combine(pack,version,callback){
	return gulp.src(pack.myFiles)
	.pipe(inject.replace(localBaseURL,serverBaseURL))
	.pipe(inject.replace("version:''","version:'"+version+"'"))
	.pipe(inject.replace('siteLock:false','siteLock:true'))
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./'))
	.pipe(uglify())
	.pipe(rename('all.min.'+version+'.js'))
	.pipe(gulp.dest(distDir+pack.workingDir+'/js'))
	.pipe(tap(function(){
		console.log('success : all.min.'+version+'.js');
		callback();
	}));
}

function newFile(fName,callback){
	if(fName===undefined){
		console.log("use '--n [filename]' to specify the file to make");
	}else{
		gulp.src(blankFile)
		.pipe(rename(fName+'.js'))
		.pipe(gulp.dest('./js'));
		gulp.src('./index.html') 				.pipe(inject.replace(tarLine,tarLine+'\n\t'+repLine0+fName+'.js'+repLine1))
		.pipe(gulp.dest('./'))
		.pipe(tap(function(file){
			console.log('file created - '+fName);
			callback();
		}));
	}
}

