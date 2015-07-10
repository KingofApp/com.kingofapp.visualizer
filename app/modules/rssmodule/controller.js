angular
.controller('RssmoduleCtrl', RssmoduleCtrl);

RssmoduleCtrl.$inject = ['$scope','$http', '$location', 'structureService'];

function RssmoduleCtrl($scope, $http, $location, structureService) {
  $scope.init = function() {

    structureService.getCurrent( $location, function(moduleInfo){

      $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": moduleInfo.scope.feed } })
        .success(function(data) {
          $scope.rssTitle   = data.responseData.feed.title;
          $scope.rssUrl     = data.responseData.feed.feedUrl;
          $scope.rssSiteUrl = data.responseData.feed.link;
          $scope.entries    = data.responseData.feed.entries;
        })
        .error(function(data) {
          console.log("ERROR: " + data);
        });
    });

  };
}
