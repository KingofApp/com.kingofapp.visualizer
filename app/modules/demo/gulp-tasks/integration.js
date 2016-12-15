'use strict';

var gulp = require('gulp'),
	jsonTransform = require('gulp-json-transform'),
	beautify = require('gulp-beautify'),
	gutil = require('gulp-util');

require('gulp-watch');

var moduleRoute = {
    'path': '/menu-abcd/demo',
    'bgImage': '',
    'bgColor': ''
};

var moduleSetup = {};

gulp.task('watch-bower', function() {
    gulp.watch('bower.json', function() {
      gutil.log(gutil.colors.yellow('Remember! You have to include the changes also in config.json'));
      gutil.log(gutil.colors.yellow('- More info: http://docs.kingofapp.com/modules/'));
    });
});

gulp.task('read-config', function() {
  gulp.src('./config.json')
    .pipe(jsonTransform(function(moduleConfig) {
        var keys = ['name', 'identifier', 'type', 'icon', 'showOn', 'view', 'files', 'scope', 'config', 'libs'];
        
        keys.forEach(function(key) {
          moduleSetup[key] = moduleConfig[key];
        });

      return moduleConfig;
  }));
});

gulp.task('install', ['read-config'], function() {
  
  function RouteValidation(currentRoutes, newRoute) {
    var wasAdded = false;
    for (var i = 0; i < currentRoutes.length; i++) {
      wasAdded = currentRoutes[i].path === newRoute.path;
    }
    if (!wasAdded) {
      currentRoutes.push(newRoute);
    }
    return currentRoutes;
  }

  gulp.src('../../core/structure.json')
    .pipe(jsonTransform(function(data) {
        var allRoutes = data.modules['/menu-abcd'].scope.menuItems;

        data.modules['/menu-abcd/demo'] = moduleSetup;
        data.modules['/menu-abcd'].scope.menuItems = RouteValidation(allRoutes, moduleRoute);
        return data;
    }))
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('../../core/'));

});


gulp.task('watch-config', ['install'], function() {
    gulp.watch('config.json', ['install']);
});