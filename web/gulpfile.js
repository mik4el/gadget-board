'use strict'
var gulp = require('gulp'),
    del = require('del'),
    typescript = require('gulp-typescript'),
    tscConfig = require('./tsconfig.json'),
    sourcemaps = require('gulp-sourcemaps'),
    tslint = require('gulp-tslint'),
    embedTemplates = require('gulp-angular-embed-templates'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    CacheBuster = require('gulp-cachebust')
;

var cachebust = new CacheBuster();


// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('static/dist/**/*');
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['gadget_board_frontend/**/*', '!gadget_board_frontend/**/*.ts', '!gadget_board_frontend/**/*.html'], { base : './' })
    .pipe(gulp.dest('static/dist'))
});

// copy dependencies dirs
gulp.task('copy:lib_dirs', ['clean'], function() {
  return gulp.src([
        'node_modules/rxjs/**/*',
        'node_modules/angular2-jwt/**/*',
        'node_modules/@angular/**/*',
        'node_modules/bootstrap/**/*',
        'node_modules/jquery/**/*',
        'node_modules/jasmine-core/**/*'
        ], { base : './node_modules/'})
    .pipe(gulp.dest('static/dist/lib'))
});

// copy dependencies one file only
gulp.task('copy:lib_files', ['clean'], function() {
  return gulp.src([
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js'
        ])
    .pipe(gulp.dest('static/dist/lib'))
});

// linting
gulp.task('tslint', function() {
  return gulp.src('gadget_board_frontend/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
  var files = tscConfig.files;
  return gulp
    .src(files)
    .pipe(embedTemplates({sourceType:'ts'}))
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('static/dist'));
});

// TypeScript compile
gulp.task('compile:prod', ['clean'], function () {
  var files = tscConfig.files;
  files.push("!gadget_board_frontend/**/*.spec.ts"); // exclude test files
  return gulp
    .src(files)
    .pipe(embedTemplates({sourceType:'ts'}))
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('static/dist'));
});

gulp.task('compress', ['compile'], function() {
  return gulp.src('static/dist/gadget_board_frontend/app.js')
    .pipe(uglify())
    .pipe(cachebust.resources())
    .pipe(gulp.dest('static/dist/gadget_board_frontend'));
});

gulp.task('minify-css', ['copy:assets'], function() {
  return gulp.src('static/dist/gadget_board_frontend/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(cachebust.resources()) 
    .pipe(gulp.dest('static/dist/gadget_board_frontend'));
});

gulp.task('cachebust', ['minify-css', 'compress'], function () {
    return gulp.src('templates/*.html')
        .pipe(cachebust.references())       
        .pipe(gulp.dest('templates/dist'));
});

gulp.task('assets', ['compress', 'minify-css', 'cachebust', 'copy:lib_files',  'copy:lib_dirs', 'copy:assets']);
gulp.task('build', ['compile', 'assets']);
gulp.task('build-prod', ['compile:prod', 'assets']);
gulp.task('default', ['build']);