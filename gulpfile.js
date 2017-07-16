var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    connect = require('gulp-connect'),
    cssnano = require('gulp-cssnano'),
    fileinclude = require('gulp-file-include'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    order = require("gulp-order"),
    requireDir  = require( 'require-dir' ),
    runSequence = require( 'run-sequence' );
    source = require('vinyl-source-stream'),
    plugins = gulpLoadPlugins();

// Require all tasks.
requireDir( './gulp/tasks', { recurse: true } );

gulp.task('vendor', function() {
  gulp.src([
      //add sources here
  ])
    .bundle()
    .pipe(source('vendor.js'))
    .pipe(gulp.dest('dist/scripts'));
});

// Gulp include partial files
gulp.task('fileinclude', function() {
  gulp.src(['./src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('test', function() {
  runSequence(
    'build-images',
    'build-sass',
    'build-scripts',
    'build-fonts',
    'dev-fileinclude',
    'live-connect',
    'live-watch'
  );

});


gulp.task('default',
  [
    'fileinclude',
    'fonts',
    'images',
    'scripts',
    'styles',
  ]);
gulp.task('live',
  [
    'fileinclude',
    'fonts',
    'images',
    'styles',
    'scripts'
  ]);


