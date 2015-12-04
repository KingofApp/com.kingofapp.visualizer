(function(){
  'use strict';

  angular
    .module('king.loaders.common')
    .config(setDefaultPaths);
  setDefaultPaths.$inject = ['$routeProvider', '$sceProvider'];

  function setDefaultPaths($routeProvider, $sceProvider) {
    $sceProvider.enabled(false);
    // $analyticsProvider.firstPageview(true);
    // googleAnalyticsCordovaProvider.trackingId = "UA-54151479-2";
    //Default Route
    $routeProvider
      .otherwise({
        templateUrl   : 'loaders/common/loaderCommon.view.html',
        controller : 'commonLoaderCtrl',
        action     : "section-view2"
      });
  }

}());
