'use strict';

var gulp    = require('gulp');
var path    = require('path');
var babel   = require('gulp-babel');
var react   = require('gulp-react');
var foreach = require('gulp-foreach');


var scriptsPath = 'www/modules/**/*.jsx';

gulp.task('transpile', function() {
  gulp.watch(scriptsPath, transpileFile);
});

gulp.task('transpile-single', function() {
  gulp.src(scriptsPath)
  .pipe(foreach(function(stream, file) {
    transpileFile(file);
  }));
});

function transpileFile(file) {
  // Workaround to keep original folder structure
  var currentDirectory = path.dirname(file.path);
  var sourceDirectory = 'www';
  var index = currentDirectory.indexOf(sourceDirectory);
  var relativeDirectory = currentDirectory.slice(index + sourceDirectory.length + 1);
  return gulp.src(file.path)
    .pipe(react({harmony: false, es6module: true}))
    .pipe(babel({presets: ['es2015', 'react']}))
    .pipe(gulp.dest('www/' + relativeDirectory));
}
