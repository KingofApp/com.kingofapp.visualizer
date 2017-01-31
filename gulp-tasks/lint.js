'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

// Lint JavaScript
gulp.task('lint', function() {
  var filesToLint = [
    'gulpfile.js',
    'gulp-tasks/**/*.js',
    'www/**/*.{html,js}',
    '!www/bower_components/**/*',
    '!www/modules/**/*',
    '!www/themes/**/*',
    '!www/spinners/**/*'
  ];

  return gulp.src(filesToLint)
             .pipe(eslint())
             .pipe(eslint.format())
             .pipe(eslint.failAfterError());
});
