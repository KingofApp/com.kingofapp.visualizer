angular
  .controller('youtubeGalleryCtrl', loadFunction);

loadFunction.$inject = ['$http','$scope', 'structureService', '$location', 'x2js', '$routeParams'];

function loadFunction($http, $scope, structureService, $location, x2js, $routeParams){
  //Register upper level modules
  structureService.registerModule($location,$scope,"youtubegallery");

  console.log("Params", $routeParams.param);
  console.log("Variablita", $location.search().param);

  $http.get('https://www.youtube.com/feeds/videos.xml',{  params: {
          channel_id : $scope.youtubegallery.modulescope.channelid
      }}
    ).success(function(data){
      var json = x2js.xml2json( x2js.parseXmlString(data) );

    	$scope.youtubegallery.items = json.feed.entry;
    }).error(function(data, error){
    	$scope.youtubegallery.message = 'Opps! There was a problem loading the feed!';

    });
}
