var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('watch', function() {
  gulp.watch('./src/css/**/*.scss', ['styles']);
  gulp.watch('./src/js/**/*.js', ['scripts']);
  gulp.watch(['./src/*.html', './src/partials/*.html'], ['fileinclude']);
});


