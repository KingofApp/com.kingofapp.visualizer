(function(){
  'use strict';

  angular
    .module('king.loaders.common')
    .config(setTranslatorConfig)
    .run(function ($rootScope, $translate) {
      $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
        $translate.refresh();
      });
      $rootScope.lang='en';
    });
  setTranslatorConfig.$inject = ['$translateProvider'];

  function setTranslatorConfig($translateProvider) {
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/app/modules/{part}/locale/locale-{lang}.json'
    });
    
    $translateProvider.preferredLanguage("en");

  }

}());
