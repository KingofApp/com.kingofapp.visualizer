angular
  .controller('multiplefilesCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location){
  //Register upper level modules
  structureService.registerModule($location,$scope,"multiplefiles");
  $scope.multiplefiles.variable = 'personal scope';

}
