(function() {
  'use strict';

  angular
    .module('static_404', [])
    .controller('Static_404Controller', loadFunction);

  loadFunction.$inject = ['$scope', 'structureService', '$location'];

  function loadFunction($scope, structureService, $location) {
    //Register upper level modules
    structureService.registerModule($location, $scope, 'static_404');

    $scope.mainurl = structureService.get().config.index;
  }

}());
