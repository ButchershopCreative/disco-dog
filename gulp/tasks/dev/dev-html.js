var gulp = require('gulp'),
    fileinclude = require('gulp-file-include');

// Gulp include partial files
gulp.task('dev-html', function() {
  gulp.src(['./src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});
