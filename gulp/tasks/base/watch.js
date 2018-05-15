var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('watch', function() {
  gulp.watch('./src/css/**/*.scss', ['dev-sass']);
  gulp.watch('./src/js/**/*.js', ['dev-scripts']);
  gulp.watch(['./src/*.html', './src/partials/*.html'], ['dev-fileinclude']);
});


