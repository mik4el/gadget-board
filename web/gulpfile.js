const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const tsconfig = require('tsconfig-glob');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('static/dist/**/*');
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['gadget_board_frontend/**/*', '!gadget_board_frontend/**/*.ts'], { base : './' })
    .pipe(gulp.dest('static/dist'))
});

// copy dependencies dirs
gulp.task('copy:lib_dirs', ['clean'], function() {
  return gulp.src([
        'node_modules/rxjs/**/*',
        'node_modules/angular2-in-memory-web-api/**/*',
        'node_modules/angular2-jwt/**/*',
        'node_modules/@angular/**/*',
        'node_modules/bootstrap/**/*',
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
  return gulp
    .src(tscConfig.files)
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('static/dist'));
});

// update the tsconfig files based on the glob pattern
gulp.task('tsconfig-glob', function () {
  return tsconfig({
    configPath: '.',
    indent: 2
  });
});

gulp.task('build', ['compile', 'copy:lib_files',  'copy:lib_dirs', 'copy:assets']);
gulp.task('default', ['build']);