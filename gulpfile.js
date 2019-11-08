// SASS configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(cb) {
    gulp.src('src/css/board_styles/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css/board_styles/css'));
        // .pipe(gulp.dest('srs/css'));
    cb();
});

gulp.task('default', gulp.series('sass', function(cb) {
    gulp.watch('src/css/board_styles/scss/*.scss', gulp.series('sass'));
    cb();
}));