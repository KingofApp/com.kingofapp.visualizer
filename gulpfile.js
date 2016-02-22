'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var del = require('del');
var eslint = require('gulp-eslint');
var path = require('path');
var reload = browserSync.reload;
var DIST = 'dist';

var dist = function(subpath) {
  return !subpath ? DIST : path.join(DIST, subpath);
};

// Watch files for changes & reload
gulp.task('serve', function() {
  browserSync({
    port: 9001,
    notify: true,
    logPrefix: 'KOA',
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: function(snippet) {
          return snippet;
        }
      }
    },
    server: {
      baseDir: ['app']
    }
  });

  gulp.watch(['app/**/*', '!app/bower_components/**/*'], reload);
});

// Clean output directory
gulp.task('clean', function() {
  return del(['.tmp', dist()]);
});

// Lint Javascript
gulp.task('lint', function() {
  return gulp.src(['gulpfile.js', 'app/**/{*.js,*.html}'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
