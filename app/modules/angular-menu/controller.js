angular
  .controller('Menu1Ctrl', Menu1Ctrl);

Menu1Ctrl.$inject = ['$scope','$rootScope', '$location', 'structureService'];

function Menu1Ctrl($scope, $rootScope, $location, structureService) {
  //Register upper level modules
  structureService.getCurrentModules( $location, function(modules){
    angular.forEach(modules, function(value, key) {
      if(modules[key+1]){
        $scope[modules[key+1].identifier+'Template'] = value.view;
      }
      if(modules[key].identifier=="angularmenu"){
        $scope.angularmenu = {
          custom:modules[key].name
        };
      }
    });
  });

  $scope.leftVisible = false;
  $scope.menu        = structureService.getMenu();
  $scope.showLeft    = showLeftFn;
  $scope.close       = closeFn;

  function showLeftFn(e) {
    $scope.leftVisible = true;
    e.stopPropagation();
  }

  function closeFn() {
    $scope.leftVisible = false;
  }

  $rootScope.$on("documentClicked", function _close() {
      $scope.$apply(function() {
          $scope.close();
      });
  });
}
