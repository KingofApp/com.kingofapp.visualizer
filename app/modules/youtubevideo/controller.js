angular
  .controller('youtubevideoCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location', '$routeParams'];

function loadFunction($scope, structureService, $location, $routeParams){
  //Register upper level modules
  structureService.registerModule($location,$scope,"youtubevideo");
  console.log("Param", $routeParams);
  if($location.search().video){
    $scope.youtubevideo.videoid = $location.search().video;
  }else if($scope.youtubevideo.modulescope.videoid){
    $scope.youtubevideo.videoid = $scope.youtubevideo.modulescope.videoid;
  }else{
    $scope.youtubevideo.message = "Error, video not found";
  }

}
