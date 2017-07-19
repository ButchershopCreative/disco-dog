var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('live-connect', function() {
  connect.server({
    root: './',
    port: 8080,
    livereload: true
  });
});
