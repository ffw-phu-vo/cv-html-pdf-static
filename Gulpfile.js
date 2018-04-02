/*jslint indent: 2 */
'use strict';

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  src = {
    html: './demo-pages/**/*.html',
    scss: './scss/**/*.scss',
    css: './css/**/*.css',
    javascript: './js/*.js'
  };

// Task for local, static development.
gulp.task('local-development', ['sass-dev'], function () {
  browserSync({
    server: "./"
  });

  gulp.watch(src.scss, ['sass-dev']);
  gulp.watch(src.css, reload);
  gulp.watch(src.html, reload);
  gulp.watch(src.javascript, reload);
});

// Sass watch, compile css when sass is changed.
gulp.task('sass-watch', ['sass-dev'], function () {
  gulp.watch(src.scss, ['sass-dev']);
});

// Task for compiling sass in development mode with all features enabled.
gulp.task('sass-dev', function () {
  gulp.src('./scss/{,*/}*.{scss,sass}')
    // .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer({browsers: ['safari >= 8', 'last 3 versions', '> 2%']}))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
});

// Default task.
gulp.task('default', ['local-development']);
