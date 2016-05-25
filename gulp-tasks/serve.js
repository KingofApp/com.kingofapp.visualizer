'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var serve = function(baseDir) {
  browserSync({
    port: 9001,
    notify: false,
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
      baseDir: baseDir,
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  });
};

// Serve project and watch files for changes
gulp.task('serve', ['lint'], function() {
  serve(['app']);

  gulp.watch(['app/core/structure.json'], reload);
  gulp.watch(['app/**/*.html', '!app/bower_components/**/*.html'], ['lint', reload]);
  gulp.watch(['app/**/*.js', '!app/bower_components/**/*.js'], ['lint', reload]);
  gulp.watch(['app/styles/**/*.css'], reload);
  gulp.watch(['app/images/**/*'], reload);
});
