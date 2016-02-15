angular
  .controller('static_404Ctrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location', '$routeParams'];

function loadFunction($scope, structureService, $location, $routeParams) {
  //Register upper level modules
  structureService.registerModule($location, $scope, 'static_404');
  $scope.mainurl = structureService.get().config.index;
}
