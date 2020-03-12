
var gulp = require('gulp');
var argv = require('yargs').argv;
var pjson = require('./package.json');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var tap = require("gulp-tap");
var jshint = require('gulp-jshint');

gulp.task('list',function(done){
	console.log('tasks');
	console.log('dist');
	console.log('test');
	done();
});


gulp.task('test',function(done){
	gulp.src(pjson.myFiles)
	.pipe(concat('tmp.js'))
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(tap(function(){
		console.log('finished');
		done();
	}));
});

gulp.task('dist',function(done){
	gulp.src(pjson.myFiles)
	.pipe(concat('all.'+pjson.version+'.js'))
	.pipe(gulp.dest('./dist/'))
	.pipe(uglify())
	.pipe(rename('all.min.'+pjson.version+'.js'))
	.pipe(gulp.dest('./dist/'))
	.pipe(tap(function(){
		console.log('success : all.min.'+pjson.version+'.js');
		done();
	}));
});




