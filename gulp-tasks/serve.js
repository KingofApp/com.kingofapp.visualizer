'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var baseDir = ['www'];

gulp.task('reload', function(done) {
  reload();
  done();
});

gulp.task('browserSync', function(done) {
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
  done();
});

gulp.task('watcher', function(done) {
  gulp.watch('www/core/structure.json', gulp.parallel('reload'));
  gulp.watch(['www/**/*.{html,js}', '!www/bower_components/**/*'], gulp.parallel('lint', 'reload'));
  gulp.watch('www/styles/**/*.css', gulp.parallel('reload'));
  gulp.watch('www/images/**/*', gulp.parallel('reload'));

  done();
});

// Serve project and watch files for changes
gulp.task('serve', gulp.parallel('lint', 'browserSync', 'watcher'));
