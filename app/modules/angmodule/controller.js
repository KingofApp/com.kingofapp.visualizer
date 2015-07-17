angular
//.module('myApp.angmode', ['ngRoute'])
.controller('AngmoduleCtrl', loadFunction);


loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location){
 structureService.getCurrent( $location, function(moduleInfo){
   //OYE QUE MODULO TENGO ANTES DE ESTE? - $scope.{{NOMBREDEMODULO}} = actualmodulo.view
  //  var split = $location.$$path.split("/");
   $scope.menu1Template = moduleInfo.view;
  //  if(split[split.length-1]=='angmodule'){
  //    console.log("No Cargo");
  //  }else{
  //    console.log("Cargo el ultimo");
  //    //$scope.angmoduleTemplate = moduleInfo.view;
  //  }

 });

  console.log("Dentro de AngModuleCtrl");
  //** REVISAR LA LLAMADA A GETCURRENT
  structureService.getCurrent( $location, function(moduleInfo){
      $scope.angmodule = {
        test:"URLqwdqw NO",
        custom:moduleInfo.scope.custom
      }
    });

}
