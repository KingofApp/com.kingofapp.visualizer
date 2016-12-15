'use strict'
var gulp = require('gulp');

require('./gulp-tasks/lint.js');
require('./gulp-tasks/documentation.js');
require('./gulp-tasks/testing.js');
require('./gulp-tasks/integration.js');
require('./gulp-tasks/distribution.js');

gulp.task('distribution', ['dist-zip']);
gulp.task('default', ['watch-documentation', 'watch-bower', 'watch-config']);