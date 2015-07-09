angular
.controller('RssmoduleCtrl', ['$scope','$http', function($scope, $http) {
  $scope.init = function() {
      $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": "http://elpais.com/rss/elpais/portada.xml" } })
          .success(function(data) {
              $scope.rssTitle = data.responseData.feed.title;
              $scope.rssUrl = data.responseData.feed.feedUrl;
              $scope.rssSiteUrl = data.responseData.feed.link;
              $scope.entries = data.responseData.feed.entries;
          })
          .error(function(data) {
              console.log("ERROR: " + data);
          });
  }
}])
