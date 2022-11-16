(function() {
  'use strict';

  angular
    .module('demo', [])
    .controller('demoController', loadFunction);

  loadFunction.$inject = ['$scope', 'structureService', '$location', '$translate'];

  function loadFunction($scope, structureService, $location, $translate) {
    // Register upper level modules
    structureService.registerModule($location, $scope, 'demo', $translate.use());
    // --- Start demoController content ---
    console.info('Hi! from demoController');
    var lang = $translate.use();
    console.log(lang);
    // --- End demoController content ---
  }
}());
