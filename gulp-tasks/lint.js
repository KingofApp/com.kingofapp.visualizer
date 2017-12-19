'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var config = require('../config.json');

// Lint JavaScript
gulp.task('lint', function() {
  return gulp.src(config.lint)
             .pipe(eslint())
             .pipe(eslint.format())
             .pipe(eslint.failAfterError());
});
