(function() {
  'use strict';

  angular
    .module('html', [])
    .controller('HtmlController', loadFunction);

  loadFunction.$inject = ['$scope', 'structureService', '$location', 'paymentService'];

  function loadFunction($scope, structureService, $location, paymentService) {
    //Register upper level modules
    structureService.registerModule($location, $scope, 'html');
    $scope.pay = paymentService.init;
  }

}());
