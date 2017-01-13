var gulp = require('gulp'),
    browserify = require('browserify'),
    connect = require('gulp-connect'),
    cssnano = require('gulp-cssnano'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    order = require("gulp-order"),
    source = require('vinyl-source-stream'),
    plugins = gulpLoadPlugins();

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

// Sass Styles . styles is only one level deep. CSS will be library assets
// that will compile first
gulp.task('styles', function() {
  gulp.src([
      'css/*.css',
      'css/*.scss'
  ])
  .pipe(plugins.sass({
    outputStyle: 'expanded' // nested, expanded, compact, compressed
  }).on('error', onError))
  .pipe(plugins.autoprefixer())
  .pipe(plugins.concat('style.css'))
  .pipe(cssnano())
  .pipe(gulp.dest('dist/styles'))
  .pipe(plugins.notify('Styles Gulped'));
});


// Only used for live reload. Looks for compiled file ./dist
// change in liveConnect task.
gulp.task('html', function() {
  gulp.src('*.html')
    .pipe(connect.reload())
    .pipe(plugins.notify('HTML Reloaded'));
});

gulp.task('serve', function() {
  connect.server({
    root: './'
  });
  gulp.watch('css/*.scss', ['styles']);
  gulp.watch('js/*.js', ['scripts']);
});

gulp.task('liveConnect', function() {
  connect.server({
    root: './',
    port: 8080,
    livereload: true
  });
  gulp.watch('css/*.scss', ['styles']);
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('*.html', ['html']);
  gulp.watch(['dist/**/*.js', 'dist/**/*.css'], ['html']);

});

gulp.task('default', [ 'scripts', 'styles', 'serve']);
gulp.task('live', ['liveConnect', 'styles', 'scripts']);
