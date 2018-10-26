const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const concat = require('gulp-concat');

gulp.task('compile:angular', () =>
    gulp.src([
        './node_modules/angular/angular.min.js',
        './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
    ])
        .pipe(concat('angular.js'))
        .pipe(gulp.dest('./public/build/'))
);


gulp.task('compile:app', () =>
    gulp.src([
        './public/app/app.js',
        './public/app/**/*Module.js',
        './public/app/**/*State.js'
    ])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/build/'))
);


gulp.task('watch:compile', () => {
    gulp.watch('./public/app/**/*.js', gulp.series('compile:app'));
});