var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    runSequence = require( 'run-sequence' ),
    gulpLoadPlugins = require('gulp-load-plugins'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    plugins = gulpLoadPlugins();

function onError(error){
  plugins.notify().write(error.message);
  this.emit('end'); // Keep gulp from hanging on this task
}

// Build browserify and jsx
gulp.task('build-scripts', function() {
  browserify({
    entries: ['./src/js/index.js'],
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify.configure({
    presets : ["es2015"]
  }))
  .bundle()
  .on('error', onError)
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('dist/scripts'))
  .pipe(plugins.notify('Scripts Built'));
});
