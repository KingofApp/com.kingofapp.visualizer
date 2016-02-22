'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var eslint = require('gulp-eslint');
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

  gulp.watch(['app/**/*', '!app/bower_components/**/*'], browserSync.reload);
});

// Lint Javascript
gulp.task('lint', function() {
  return gulp.src(['**/*.js', '**/*.html'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
