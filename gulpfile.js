// SASS configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

// board, public sass styles:
gulp.task('sass', function(cb) {
    gulp.src('src/css/board_styles/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css/board_styles/css'));
    gulp.src('public/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
    cb();
});
// board, public sass styles watch:
gulp.task('sasswatch', gulp.series('sass', function(cb) {
    gulp.watch(['src/css/board_styles/scss/*.scss','public/scss/*.scss'], gulp.series('sass'));
    cb();
}));
