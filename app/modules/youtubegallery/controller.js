angular
  .controller('youtubeGalleryCtrl', loadFunction);

loadFunction.$inject = ['$http','$scope', 'structureService', '$location', '$routeParams'];

function loadFunction($http, $scope, structureService, $location, $routeParams){
  //Register upper level modules
  structureService.registerModule($location,$scope,"youtubegallery");

  $http.get('https://www.googleapis.com/youtube/v3/search',{  params: {
          channelId : $scope.youtubegallery.modulescope.channelid,
          part:"snippet",
          order:"date",
          key:$scope.youtubegallery.modulescope.token
      }}
    ).success(function(data){

      var elements = [];
      angular.forEach( data.items, function(item){
        if(item.id.videoId){
          elements.push({ link :  $scope.youtubegallery.modulescope.singleurl+'?video='+item.id.videoId,
            title : item.snippet.title,
            img   : item.snippet.thumbnails.medium.url
          });
        }
      });
      $scope.youtubegallery.items = elements;
    }).error(function(data, error){
    	$scope.youtubegallery.message = 'Opps! There was a problem loading the feed!';
    });
}
