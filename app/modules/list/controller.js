
angular.controller('listCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location', 'fireService'];

function loadFunction($scope, structureService, $location, fireService){
  //Register upper level modules
  structureService.registerModule($location,$scope,"list");
  $scope.list.list = fireService.getData();
}
