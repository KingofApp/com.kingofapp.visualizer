angular
.controller('rssCtrl', rssCtrl);

rssCtrl.$inject = ['$scope','$http', '$location', 'structureService'];

function rssCtrl($scope, $http, $location, structureService) {
  //Register upper level modules
structureService.registerModule($location,$scope,"rss");

    $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": $scope.rss.modulescope.feed } })
      .success(function(data) {
        $scope.rssTitle   = data.responseData.feed.title;
        $scope.rssUrl     = data.responseData.feed.feedUrl;
        $scope.rssSiteUrl = data.responseData.feed.link;
        $scope.entries    = data.responseData.feed.entries;
      })
      .error(function(data) {
        console.log("ERROR: " + data);
      });


}
