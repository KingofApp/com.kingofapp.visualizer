(function() {
  'use strict';
  //TODO Style following https://github.com/johnpapa/angular-styleguide
  angular
    .module('king.loaders.common')
    .run(function($rootScope, $translate) {
      $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
        $translate.refresh();
      });
      $rootScope.lang = 'en';
    })
    .factory('koa.translator.error.handler', function($q, $log) {
      return function(part, lang) {
        $log.error('The "' + part + '/' + lang + '" part was not loaded.');
        return $q.when({});
      };
    });
}());


