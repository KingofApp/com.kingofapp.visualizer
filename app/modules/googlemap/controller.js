angular
  .controller('googlemapCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location', '$routeParams'];

function loadFunction($scope, structureService, $location, $routeParams){
  //Register upper level modules
  structureService.registerModule($location,$scope,"googlemap");

}
