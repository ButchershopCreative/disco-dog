var gulp = require('gulp');

gulp.task('dev-images', function() {
  return gulp.src([
    './src/img/**/*'
  ])
  .pipe(gulp.dest('dist/img'));
});
