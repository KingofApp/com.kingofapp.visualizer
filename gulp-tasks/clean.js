'use strict';

var gulp = require('gulp');
var del = require('del');

try {
  var dist = require('./dist');
  // Clean output directory
  gulp.task('clean', function() {
    return del([dist()]);
  });
} catch (e) {
  if (e instanceof Error && e.code === 'MODULE_NOT_FOUND')
    console.log('Not loading dist!');
  else
    throw e;
}
