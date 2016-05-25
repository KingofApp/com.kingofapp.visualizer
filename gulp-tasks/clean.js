'use strict';

var gulp = require('gulp');
var del = require('del');

var dist = require('./dist');

// Clean output directory
gulp.task('clean', function() {
  return del([dist()]);
});
