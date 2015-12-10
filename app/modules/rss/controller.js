angular
  .controller('rssCtrl', rssCtrl);

rssCtrl.$inject = ['$scope', '$http', '$location', 'structureService', '$filter'];

function rssCtrl($scope, $http, $location, structureService, $filter) {
  //Register upper level modules
  structureService.registerModule($location, $scope, 'rss');

  $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load', {
      params: {
        'v': '1.0',
        'q': $scope.rss.modulescope.feed,
        'callback': 'JSON_CALLBACK'
      }
    })
    .success(function(data) {
      $scope.rssTitle = data.responseData.feed.title;
      $scope.rssUrl = data.responseData.feed.feedUrl;
      $scope.rssSiteUrl = data.responseData.feed.link;
      $scope.entries = data.responseData.feed.entries;
    })
    .error(function(data) {
      $scope.rss.message = $filter('translate')('rss.feed.error');
    });
}
