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
      //Read OWN module config parameters
      if(modules[key].identifier=="angularstaticfeed"){
        $scope.staticfeed = {
          custom : modules[key].name,
          feed   : modules[key].scope.feed
        }
      }
    });
  });
}
