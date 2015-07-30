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
      if(modules[key].identifier=="angularscope"){
        $scope.angularscope = {
          custom:modules[key].name
        };
      }
    });
  });



}
