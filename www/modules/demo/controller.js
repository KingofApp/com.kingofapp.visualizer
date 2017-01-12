(function() {
  'use strict';

  angular
    .module('demo', [])
    .controller('demoController', loadFunction);

  loadFunction.$inject = ['$scope', 'structureService', '$location'];

  function loadFunction($scope, structureService, $location) {
    // Register upper level modules
    structureService.registerModule($location, $scope, 'demo');
    // --- Start demoController content ---
    console.info('Hi! from demoController');
    // --- End demoController content ---
  }
}());
