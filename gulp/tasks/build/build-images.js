var gulp = require('gulp'),
    image = require('gulp-image');

gulp.task('build-images', function() {
    return gulp.src([
        './src/img/**/*'
    ])
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            guetzli: false,
            gifsicle: true,
            svgo: true,
            concurrent: 10
        }))
        .pipe(gulp.dest('dist/img'));
});
