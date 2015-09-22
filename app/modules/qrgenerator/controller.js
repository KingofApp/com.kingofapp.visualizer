angular
  .controller('qrgeneratorCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location', 'fireService'];

function loadFunction($scope, structureService, $location, fireService){
  //Register upper level modules
  structureService.registerModule($location,$scope,"qrgenerator");

  if($scope.qrgenerator.modulescope.datasource){
    //NOTE: Pasar a promesa
    fireService.setFirebaseSource($scope.qrgenerator.modulescope.datasource);
    $scope.qrgenerator.list = fireService.getData();
  }
//TODO:
//Hacer bonito con paper-item
//Popup para mostrar Qr.

}
