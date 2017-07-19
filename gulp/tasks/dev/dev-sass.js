var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    order = require("gulp-order"),
    source = require('vinyl-source-stream'),
    plugins = gulpLoadPlugins();

function onError(error) {
  plugins.notify().write(error.message);
  this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('dev-sass', function() {
  gulp.src(['./src/css/main.scss'])
  .pipe(plugins.sass({
    outputStyle: 'expanded' // nested, expanded, compact, compressed
  }).on('error', onError))
  .pipe(plugins.autoprefixer())
  .pipe(plugins.concat('style.css'))
  .pipe(gulp.dest('dist/styles'))
  .pipe(plugins.notify('Styles Gulped'));
});
