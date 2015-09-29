(function(){
  'use strict';

  angular
    .module('king.loaders.common')
    .config(setDefaultPaths)
  setDefaultPaths.$inject = ['$routeProvider', '$sceProvider'];

  function setDefaultPaths($routeProvider, $sceProvider) {

    $sceProvider.enabled(false);
    //Default Route
    $routeProvider
      // .when('/', {
      //   redirectTo: '/menu'
      // })
      .otherwise({
        templateUrl   : 'loaders/common/loaderCommon.view.html',
        controller : 'commonLoaderCtrl',
        action     : "section-view2"
      });
  }

}());
