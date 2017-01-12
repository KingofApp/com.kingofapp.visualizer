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
    });
}());
