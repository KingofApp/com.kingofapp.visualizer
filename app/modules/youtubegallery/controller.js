angular
  .controller('youtubeGalleryCtrl', loadFunction);

loadFunction.$inject = ['$http','$scope', 'structureService', '$location', 'x2js', '$routeParams'];

function loadFunction($http, $scope, structureService, $location, x2js, $routeParams){
  //Register upper level modules
  structureService.registerModule($location,$scope,"youtubegallery");

  $http.get('https://www.youtube.com/feeds/videos.xml',{  params: {
          channel_id : $scope.youtubegallery.modulescope.channelid
      }}
    ).success(function(data){
      var json = x2js.xml2json( x2js.parseXmlString(data) );
      console.log("JSON", json.feed.entry);
      var elements = [];
      angular.forEach( json.feed.entry, function(item){
        elements.push({ link :  $scope.youtubegallery.modulescope.galleryurl+'?video='+item.videoId.__text,
          title : item.title,
          img   : item.group.thumbnail._url
        });
      });
      $scope.youtubegallery.items = elements;
    }).error(function(data, error){
    	$scope.youtubegallery.message = 'Opps! There was a problem loading the feed!';

    });
}
