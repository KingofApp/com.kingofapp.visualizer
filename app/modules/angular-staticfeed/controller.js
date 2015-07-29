angular
.controller('staticFeedCtrl', staticFeedCtrl);

staticFeedCtrl.$inject = ['$scope','$http', '$location', 'structureService'];

function staticFeedCtrl($scope, $http, $location, structureService) {
  //Register upper level modules
  structureService.getCurrentModules( $location, function(modules){
    angular.forEach(modules, function(value, key) {
      if(modules[key+1]){
        $scope[modules[key+1].controller+'Template'] = value.view;
      }
    });
  });

  //** NOTE esto no funciona porque cuando esta anidado lee el current del otro

  //Read module config parameters
  structureService.getCurrent( $location, function(moduleInfo){
    $scope.staticfeed = {
      custom : moduleInfo.name,
      feed   : moduleInfo.scope.feed
    }
    // $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": moduleInfo.scope.feed } })
    //   .success(function(data) {
    //     $scope.rssTitle   = data.responseData.feed.title;
    //     $scope.rssUrl     = data.responseData.feed.feedUrl;
    //     $scope.rssSiteUrl = data.responseData.feed.link;
    //     $scope.entries    = data.responseData.feed.entries;
    //   })
    //   .error(function(data) {
    //     console.log("ERROR: " + data);
    //   });

  });
}
