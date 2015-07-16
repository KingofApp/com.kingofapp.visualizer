angular
//.module('myApp.angmode', ['ngRoute'])
.controller('AngmoduleCtrl', loadFunction);


loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location){
  $scope["template"+0]="modules/angmodule/index.html";
  console.log("Dentro de AngModuleCtrl");
  $scope.test = "URLqwdqw";
  structureService.getCurrent( $location, function(moduleInfo){
  	  $scope.custom = moduleInfo.scope.custom;
      $scope.test=moduleInfo.scope.custom;
    });

}
