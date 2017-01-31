'use strict';

var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    debug = require('gulp-debug');

gulp.task('lint', function() {
  var filesToLint = [
    '**/*.{html,js}',
    '!tests/protractor.conf.js',
    '!dist/**/*',
    '!docs/**/*',
    '!node_modules/**/*',
    '!tmp/**/*'
  ];

  return gulp.src(filesToLint)
            .pipe(debug({title: 'eslint (Scope):'}))
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
});
