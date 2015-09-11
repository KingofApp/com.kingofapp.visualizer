
angular.controller('firebaseCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location','fireService', '$document'];

function loadFunction($scope, structureService, $location, fireService, $document){
  //Register upper level modules
  structureService.registerModule($location,$scope,"firebase");
  //NOTE: Pasar a promesa.
  fireService.setFirebaseSource($scope.firebase.modulescope.src);
  $scope.firebase.data = fireService.getData();
}
