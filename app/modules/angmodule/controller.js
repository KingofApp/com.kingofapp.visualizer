angular
//.module('myApp.angmode', ['ngRoute'])
.controller('AngmoduleCtrl', loadFunction);


loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location){
  console.log("Dentro de AngModuleCtrl");
  $scope.test = "URLqwdqw";

  structureService.getCurrent( $location, function(moduleInfo){
  	  $scope.custom = moduleInfo.scope.custom;
    });

}
