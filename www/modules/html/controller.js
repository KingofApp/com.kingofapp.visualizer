(function() {
  'use strict';

  angular
    .module('html', [])
    .controller('HtmlController', loadFunction);

  loadFunction.$inject = ['$scope', 'structureService', '$location', '$translate'];

  function loadFunction($scope, structureService, $location, $translate) {
    //Register upper level modules
    structureService.registerModule($location, $scope, 'html');
    $translate.use("ru");
  }

}());
