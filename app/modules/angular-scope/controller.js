angular
  .controller('angularScopeCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location){
  //Register upper level modules
  structureService.getCurrentModules( $location, function(modules){
    angular.forEach(modules, function(value, key) {
      if(modules[key+1]){
        $scope[modules[key+1].identifier+'Template'] = value.view;
      }
    });
  });


  //Read module config parameters
  structureService.getCurrent( $location, function(moduleInfo){
      $scope.angularscope = {
        custom:moduleInfo.name
      }
    });

}
