var gulp = require('gulp');
var browserify = require('browserify');
var connect = require('gulp-connect');
var cssnano = require('gulp-cssnano');
var gulpLoadPlugins = require('gulp-load-plugins');
var order = require("gulp-order");
var source = require('vinyl-source-stream');
var plugins = gulpLoadPlugins();

function onError(error){
  plugins.notify().write(error.message);
  this.emit('end'); // Keep gulp from hanging on this task
}

//Build browserify and jsx
gulp.task('scripts', function() {
  browserify({
    entries: ['./js/index.js'],
    extensions: ['.js'],
    debug: true
  })
  .bundle()
  .on('error', onError)
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist/scripts'))
  .pipe(plugins.notify('Scripts Gulped'));
});

gulp.task('vendor', function() {
  gulp.src([
      //add sources here
  ])
    .bundle()
    .pipe(source('vendor.js'))
    .pipe(gulp.dest('dist/scripts'));
});

//Sass Styles
gulp.task('styles', function() {
  gulp.src(['css/*.scss'])
  .pipe(plugins.sass({
    outputStyle: 'expanded' // nested, expanded, compact, compressed
  }).on('error', onError))
  .pipe(plugins.autoprefixer())
  .pipe(order([
    'css/**/*.css'
  ]))
  .pipe(plugins.concat('style.css'))
  .pipe(cssnano())
  .pipe(gulp.dest('dist/styles'))
  .pipe(plugins.notify('Styles Gulped'));
});

gulp.task('serve', function() {
  connect.server({
    root: './',
  });
  gulp.watch('css/*.scss', ['styles']);
  gulp.watch('js/*.js', ['scripts']);
});

gulp.task('default', [ 'scripts', 'styles', 'serve']);
