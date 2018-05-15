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

gulp.task('build', function() {
  runSequence(
    'build-html',
    'build-images',
    'build-sass',
    'build-scripts',
    'build-fonts',
  );

});

gulp.task('default',
  [
    'build-fonts',
    'dev-fileinclude',
    'dev-images',
    'dev-scripts',
    'dev-sass',
    'live-connect',
    'live-watch'
  ]);

