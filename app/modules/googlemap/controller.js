angular
  .controller('googlemapCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location', '$routeParams'];

function loadFunction($scope, structureService, $location, $routeParams){
  //Register upper level modules
  structureService.registerModule($location,$scope,"googlemap");
  $scope.map = {center: {
      latitude  : $scope.googlemap.modulescope.lat,
      longitude : $scope.googlemap.modulescope.lon
    },
    zoom : parseInt($scope.googlemap.modulescope.zoom, 10)
  };
  $scope.marker = [{
        id: 1,
        latitude  :  $scope.googlemap.modulescope.lat,
        longitude :  $scope.googlemap.modulescope.lon
      }]
}
