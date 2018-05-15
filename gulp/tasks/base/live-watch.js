var gulp = require('gulp'),
    connect = require('gulp-connect');

// Only used for live reload. Looks for compiled file in root
// change in liveConnect task.
gulp.task('html', function() {
  gulp.src('*.html')
    .pipe(connect.reload())
    .pipe(plugins.notify('HTML Reloaded'));
});

gulp.task('live-watch', function() {
  gulp.watch('./src/css/**/*.scss', ['dev-sass']);
  gulp.watch('./src/js/**/*.js', ['dev-scripts']);
  gulp.watch(['./src/*.html', './src/partials/*.html'], ['dev-fileinclude', 'dev-html']);
  gulp.watch(['./dist/**/*.js', './dist/**/*.css'], ['dev-html']); // Needs to watch when its compiled
});

