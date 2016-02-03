angular
  .controller('instagramFeedCtrl', loadFunction);

loadFunction.$inject = ['$http', '$scope', 'structureService', '$filter', '$location'];

function loadFunction($http, $scope, structureService, $filter, $location) {
  //Register upper level modules
  structureService.registerModule($location, $scope, 'instagramfeed');

  $http.jsonp('https://api.instagram.com/v1/users/' + $scope.instagramfeed.modulescope.userid + '/media/recent/?callback=JSON_CALLBACK&access_token=' + $scope.instagramfeed.modulescope.accesstoken)
    .success(function(data) {
      $scope.instagramfeed.items = data.data;
    }).error(function(data, error) {
      $scope.instagramfeed.message = $filter('translate')('instagram.feed.error');
    });
}
