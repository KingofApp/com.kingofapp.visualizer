'use strict';

var gulp = require('gulp'),
    jsonTransform = require('gulp-json-transform'),
    fs = require('fs'),
    jsesc = require('jsesc'),
    replace = require('gulp-replace'),
    beautify = require('gulp-beautify'),
    jsdoc = require('gulp-jsdoc3'),
    debug = require('gulp-debug');

require('gulp-watch');

gulp.task('watch-documentation', function() {
    gulp.watch(['./docs/es_ES.md', './docs/en_US.md'], function() {
      gulp.src('config.json')
      .pipe(jsonTransform(function(data) {
          var docEs = fs.readFileSync('./docs/es_ES.md', 'utf8');
          var docEn = fs.readFileSync('./docs/en_US.md', 'utf8');

          data.documentation['es-ES'] = jsesc(docEs, {'json': true, 'wrap': false});
          data.documentation['en-US'] = jsesc(docEn, {'json': true, 'wrap': false});

          return data;
      }))
      .pipe(replace(/\\\\/g, '\\'))
      .pipe(beautify({indentSize: 2}))
      .pipe(gulp.dest('./'));
    });
});

gulp.task('jsdoc', function(cb) {
  var config = require('../docs/jsdoc.json');
  return gulp.src(['docs/jsdoc.md', './**/*.js', '!./gulp-tasks/**', '!./docs/**', '!./dist/**', '!./node_modules/**', '!./test/**.js', '!Gulpfile.js'], {read: false})
    .pipe(debug({title: 'JSDoc (Scope):'}))
    .pipe(jsdoc(config, cb));
});