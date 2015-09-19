angular
  .controller('flickrFeedCtrl', loadFunction);

loadFunction.$inject = ['$http','$scope', 'structureService', '$filter', '$location'];

function loadFunction($http, $scope, structureService, $filter, $location){
  //Register upper level modules
  $scope.concat=function(arg1,arg2) {
    console.log("dentro");
    return "nano";
  }
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
    	//$scope.flickrfeed.items = data.photoset.photo;
      var elements = [];
      angular.forEach( data.photoset.photo, function(item){
        elements.push({ img :  'https://farm'+item.farm+'.staticflickr.com/'+item.server+'/'+item.id+'_'+item.secret+'.jpg',
        title : item.title});
      });
      $scope.flickrfeed.items = elements;
    }).error(function(data, error){
    	$scope.flickrfeed.message = $filter('translate')('flickrfeed.feed.error');

    });
}
