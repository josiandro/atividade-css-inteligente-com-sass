'use strict';

var gulp 	 = require('gulp');
var sass 	 = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var htmlmin  = require('gulp-htmlmin');

gulp.task('sass', function () {
	return gulp.src('./source/scss/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-css',['sass'] , function () {
	return gulp.src('./source/scss/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-html', function () {
	return gulp.src('./source/index.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./source/scss/**/*.scss', ['sass', 'minify-css']);
	gulp.watch('./source/index.html', ['minify-html']);
});