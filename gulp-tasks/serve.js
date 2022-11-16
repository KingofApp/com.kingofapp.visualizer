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
    },
    ui: {
      port: 3002
    }
  });
};

// Serve project and watch files for changes
gulp.task('serve', gulp.series('lint', function() {
  serve(['www']);

  gulp.watch(['www/core/structure.json'], reload);
  gulp.watch(['www/**/*.{html,js}', '!www/bower_components/**/*'], gulp.series('lint', reload));
  gulp.watch(['www/styles/**/*.css'], reload);
  gulp.watch(['www/images/**/*'], reload);
}));
