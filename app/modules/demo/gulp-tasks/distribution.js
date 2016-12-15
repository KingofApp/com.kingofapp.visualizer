'use strict';

var gulp = require('gulp'),
    notify = require('gulp-notify'),
    fileSize = require('gulp-filesize'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    exec = require('child_process').exec,
    strip = require('gulp-strip-comments'),
    beautify = require('gulp-beautify'),
    pkg = require('../package.json'),
    del = require('del'),
    gulpif = require('gulp-if'),
    desktopNotifications = require('../../../../config').features.desktopNotifications;


gulp.task('clone-dist', function() {
  return gulp.src(['./**/*', '!./node_modules/**', '!./dist/**', '!./tmp/**'])
    .pipe(gulp.dest('tmp/dist'));
});

gulp.task('clean-dist', ['clone-dist'], function() {
  return gulp.src(['tmp/dist/**/*.+(js|json|html)', '!tmp/dist/docs/**/*'])
    .pipe(strip())
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('tmp/dist'));
});

gulp.task('build-zip', ['clean-dist'], function(cb) {
  var zipCommand = 'cd tmp/dist && zip -r module.zip ** -x \\*log\\* -x \\*tmp\\* -x \\*node_modules\\* -x \\*dist\\*';
  exec(zipCommand, {maxBuffer: 3000 * 1024}, function(err, stdout, stderr) {
      gutil.log(stdout);
      gutil.log(stderr);
    cb(err);
  });
});

gulp.task('move-zip', ['build-zip'], function() {
  gulp.src('tmp/dist/module.zip')
    .pipe(rename(pkg.name + '_' + pkg.version + '.zip'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean-tmp', ['move-zip'], function(done) {
  del(['tmp/dist']);
  done();
});

gulp.task('size-zip', ['clean-tmp'], function() {
    gulp.src('dist/' + pkg.name + '_' + pkg.version + '.zip')
    .pipe(fileSize());
});

gulp.task('dist-zip', ['size-zip'], function() {
  return gulp.src('Gulpfile.js')
    .pipe(gulpif(desktopNotifications, notify({
      title: 'King of App - Module Generator',
      message: pkg.name + ' v' + pkg.version + ' is ready for distribution!',
      icon: 'https://avatars1.githubusercontent.com/u/7260905?v=3&s=200',
      sound: true
    }
  )));
});