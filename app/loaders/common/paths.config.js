(function(){
  'use strict';

  angular
    .module('king.loaders.common')
    .config(setDefaultPaths);
  setDefaultPaths.$inject = ['$routeProvider', '$sceProvider', '$analyticsProvider'];

  function setDefaultPaths($routeProvider, $sceProvider, $analyticsProvider) {
    $sceProvider.enabled(false);
    $analyticsProvider.firstPageview(true);
    //Default Route
    $routeProvider
      .otherwise({
        templateUrl   : 'loaders/common/loaderCommon.view.html',
        controller : 'commonLoaderCtrl',
        action     : "section-view2"
      });
  }

}());
