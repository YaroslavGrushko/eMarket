// SASS configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(cb) {
    gulp.src('public/board_styles/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/board_styles/css'));
    cb();
});

gulp.task('default', gulp.series('sass', function(cb) {
    gulp.watch('public/board_styles/scss/*.scss', gulp.series('sass'));
    cb();
}));