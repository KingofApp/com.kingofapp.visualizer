angular
.controller('RssmoduleCtrl', ['$scope','$http','moduleScopeService', function($scope, $http, moduleScopeService) {
  $scope.init = function() {
    //Getter of ModuleInfo to moduleScopeService
    var moduleInfo = moduleScopeService.getModule();
    console.log("dentro de rssmodule");
      $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": moduleInfo.scope.feed } })
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
