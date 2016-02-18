(function() {
  'use strict';

  angular
    .module('html', [])
    .controller('HtmlController', loadFunction);

  loadFunction.$inject = ['$scope', 'structureService', '$location'];

  function loadFunction($scope, structureService, $location) {
    //Register upper level modules
    structureService.registerModule($location, $scope, 'html');
  }

}());
