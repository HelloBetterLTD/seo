'use strict';

import path from 'path';
import gulp from 'gulp';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

console.log(__dirname + "\n\n\n");

const scssFiles = [
    path.join(__dirname, 'client/src/styles/bundle.scss')
];


gulp.task('scss', function () {
    gulp.src(scssFiles)
        .pipe(sourcemaps.init())
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename({extname: '.min.css'}))
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(gulp.dest('./client/dist'));
});

gulp.task('scss:w', function () {
    gulp.watch([
        path.join(__dirname, 'client/src/styles/bundle.scss'),
        path.join(__dirname, 'client/src/styles/**/*.scss')
    ], ['scss']);
});

/**
 *   Bundle JS files
 *   Need browserify or webpack to work
 */
const jsFiles = [
    path.join(__dirname, 'client/src/**/*.js'),
    path.join(__dirname, 'client/src/**/**/*.js'),
    path.join(__dirname, 'client/src/**/**/**/*.js')
];

gulp.task('js', function () {
    return gulp.src(jsFiles)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./client/dist'));
});


gulp.task('js:w', function () {
    gulp.watch(jsFiles, ['js']);
});

gulp.task('watch', function () {
    gulp.watch([
        jsFiles,
        path.join(__dirname, 'client/src/styles/*.scss'),
        path.join(__dirname, 'client/src/styles/**/*.scss')
    ], ['default']);
});

gulp.task('default', ['scss', 'js']);