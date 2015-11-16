angular
  .controller('googlemapCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location', '$routeParams'];

function loadFunction($scope, structureService, $location, $routeParams){
  //Register upper level modules
  structureService.registerModule($location,$scope,"googlemap");
  $scope.map = {center: {
      latitude  : parseInt($scope.googlemap.modulescope.lat, 10),
      longitude : parseInt($scope.googlemap.modulescope.lon, 10)
    },
    zoom : parseInt($scope.googlemap.modulescope.zoom, 10)
  };
  $scope.marker = [{
        id: 1,
        latitude  :  parseInt($scope.googlemap.modulescope.lat, 10),
        longitude :  parseInt($scope.googlemap.modulescope.lon, 10)
      }]
}
