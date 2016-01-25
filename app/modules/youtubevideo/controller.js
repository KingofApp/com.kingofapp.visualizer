angular
  .controller('youtubevideoCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location', '$routeParams'];

function loadFunction($scope, structureService, $location, $routeParams){
  //Register upper level modules
  structureService.registerModule($location,$scope,"youtubevideo");

  $scope.youtubevideo.videoid = ($location.search().video) ?
                                  $location.search().video :
                                  $scope.youtubevideo.modulescope.videoid;

}
