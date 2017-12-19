'use strict';

// Dependencies
var gulp       = require('gulp')
var nodemon    = require('nodemon')
var opn        = require('opn')
var livereload = require('gulp-livereload')
var path       = require('path')
var config     = require('../config.json')
var start      = true

// Serve project and watch files for changes
gulp.task('serve', ['lint'], function() {
  gulp.watch(config.lint, ['lint']);

  livereload.listen()
  // Serve project
  nodemon({
    script: path.resolve(__dirname, '..', config.services, 'server.js'),
    stdout: false,
    ext: 'js json html css',
    watch: path.resolve(__dirname, '..', config.folder)
  })
  // Watch changes
  .on('readable', function() {
    this.stdout.on('data', function(chunk) {
      livereload.reload()
      process.stdout.write(chunk)
      if (start) {
        opn('http://localhost:' + config.port)
        start = false
      }
    })
  })
})
