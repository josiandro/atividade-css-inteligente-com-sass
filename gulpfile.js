'use strict';

var gulp 	 = require('gulp');
var sass 	 = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var htmlmin  = require('gulp-htmlmin');
var del      = require('del');

gulp.task('sass', function () {
	return gulp.src('./source/scss/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./source/scss'));
});

gulp.task('minify-css', function () {
	return gulp.src('./source/scss/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-html', function () {
	return gulp.src('./source/index.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('del',function(){
	del('./source/scss/style.css');
});

gulp.task('sass:watch', function () {
	gulp.watch('./source/scss/**/*.scss', ['sass']);
	gulp.watch('./source/scss/*.css', ['minify-css','del']);
	gulp.watch('./source/index.html', ['minify-html']);
});