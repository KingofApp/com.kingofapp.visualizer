(function() {
  'use strict';

  angular
    .module('googlemap', [])
    .controller('GooglemapController', loadFunction);

  loadFunction.$inject = ['$scope', 'structureService', '$location'];

  function loadFunction($scope, structureService, $location) {
    //Register upper level modules
    structureService.registerModule($location, $scope, 'googlemap');
  }

}());
