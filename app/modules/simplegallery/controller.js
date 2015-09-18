angular
.controller('simplegalleryCtrl', staticFeedCtrl);

staticFeedCtrl.$inject = ['$scope','$http', '$location', 'structureService'];

function staticFeedCtrl($scope, $http, $location, structureService) {
  //Register upper level modules
  structureService.registerModule($location,$scope,"simplegallery");
  $scope.scripts = ["images.elements="+JSON.stringify($scope.simplegallery.modulescope.gallery)+";"];
}
