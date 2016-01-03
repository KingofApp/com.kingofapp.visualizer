angular
  .controller('static_loginregisterCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location', '$routeParams'];

function loadFunction($scope, structureService, $location, $routeParams){
  //Register upper level modules
  structureService.registerModule($location,$scope,"static_loginregister");
  // $scope.mainurl = structureService.get().config.index;
}
