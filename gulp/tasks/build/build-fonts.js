var gulp = require('gulp');

// Copies over fonts to dist
gulp.task('build-fonts', function() {
  return gulp.src([
    './src/fonts/*'
  ])
  .pipe(gulp.dest('dist/fonts'));
});
