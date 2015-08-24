
angular.controller('firebaseCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location','fireService'];

function loadFunction($scope, structureService, $location, fireService){
  //Register upper level modules
  structureService.registerModule($location,$scope,"firebase");
$scope.firebase.data = fireService.getData();
}
