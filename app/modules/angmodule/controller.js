angular
//.module('myApp.angmode', ['ngRoute'])
.controller('AngmoduleCtrl', loadFunction);


loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location){
  //Register upper level modules
  structureService.getCurrentModules( $location, function(modules){
    angular.forEach(modules, function(value, key) {
      if(modules[key+1]){
        $scope[modules[key+1].controller+'Template'] = value.view;
      }
    });
  });

  console.log("Dentro de AngModuleCtrl");
  //Read module config parameters
  structureService.getCurrent( $location, function(moduleInfo){
      $scope.angmodule = {
        test:"URLqwdqw NO",
        custom:moduleInfo.scope.custom
      }
    });

}
