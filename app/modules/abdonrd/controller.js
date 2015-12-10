angular
  .controller('abdonrdCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location) {
  //Register upper level modules
  structureService.registerModule($location, $scope, 'abdonrd');
}
