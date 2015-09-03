angular
  .controller('flickrFeedCtrl', loadFunction);

loadFunction.$inject = ['$http','$scope', 'structureService', '$location'];

function loadFunction($http, $scope, structureService, $location){
  //Register upper level modules
  structureService.registerModule($location,$scope,"flickrfeed");
  $http.jsonp('https://api.flickr.com/services/rest/',{  params: {
        format: 'json',     // Optional.
        api_key: $scope.flickrfeed.modulescope.accesstoken,
        jsoncallback: 'JSON_CALLBACK',
        photoset_id: $scope.flickrfeed.modulescope.photosetid,
        method: 'flickr.photosets.getPhotos',
        per_page: $scope.flickrfeed.modulescope.results,
        page: '1'
    }})
    .success(function(data){
      console.log("data:",data.photoset);
    	$scope.flickrfeed.items = data.photoset.photo;
    }).error(function(data, error){
    	$scope.flickrfeed.message = 'Opps! There was a problem loading the feed!';

    });
}
