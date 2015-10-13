angular
  .controller('grouplistCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location){
  //Register upper level modules
  structureService.registerModule($location,$scope,"grouplist");
  // $scope.scripts = ["grouplist.items="+JSON.stringify($scope.grouplist.modulescope.sections)+";"];
}
