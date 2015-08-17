angular
.controller('staticFeedCtrl', staticFeedCtrl);

staticFeedCtrl.$inject = ['$scope','$http', '$location', 'structureService'];

function staticFeedCtrl($scope, $http, $location, structureService) {
  //Register upper level modules
  structureService.registerModule($location,$scope,"angularstaticfeed");
  
}
