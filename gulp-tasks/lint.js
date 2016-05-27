'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

// Lint JavaScript
gulp.task('lint', function() {
  var filesToLint = [
    'gulpfile.js',
    'gulp-tasks/**/*.js',
    'app/**/{*.js,*.html}'
  ];

  return gulp.src(filesToLint)
             .pipe(eslint())
             .pipe(eslint.format())
             .pipe(eslint.failAfterError());
});
