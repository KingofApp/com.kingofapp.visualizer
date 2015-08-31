angular
  .controller('googlemapCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location', '$routeParams'];

function loadFunction($scope, structureService, $location, $routeParams){
  //Register upper level modules
  structureService.registerModule($location,$scope,"googlemap");
  $scope.map = {center: {latitude: 39.5577, longitude: -114.0088 }, zoom: 14 };
  $scope.options = {scrollwheel: false};
  $scope.marker = [{
        id: 1,
        latitude: 39.5577,
        longitude: -114.0088,
        title: 'm',
        show:true,
        options:{"labelContent":"Markers id 3",
                 "labelAnchor":"26 0",
                 "labelClass":"marker-labels"}
      }]
}
