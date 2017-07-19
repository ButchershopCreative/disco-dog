var gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    htmlmin = require('gulp-htmlmin');

gulp.task('build-html', function() {
  gulp.src(['./src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'));
});
