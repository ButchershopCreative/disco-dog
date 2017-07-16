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
  gulp.watch('./src/css/**/*.scss', ['styles']);
  gulp.watch('./src/js/**/*.js', ['scripts']);
  gulp.watch(['./src/*.html', './src/partials/*.html'], ['fileinclude', 'html']);
  gulp.watch(['./dist/**/*.js', './dist/**/*.css'], ['html']); // Needs to watch when its compiled
});

