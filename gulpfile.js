const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const concat = require('gulp-concat');

gulp.task('compile:js', () =>
    gulp.src(['./resources/js/app/*.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/build/'))
);


gulp.task('watch:compile', () => {
    gulp.watch('./resources/js/app/**/*.js', ['compile:js']);
});