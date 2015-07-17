angular
  .controller('Menu1Ctrl', Menu1Ctrl);

Menu1Ctrl.$inject = ['$scope','$rootScope', '$location', 'structureService'];

function Menu1Ctrl($scope, $rootScope, $location, structureService) {
  // structureService.getCurrent( $location, function(moduleInfo){
  //   $scope.menu1Template = moduleInfo.view;
  // });
  console.log("Menu1CTrl loaded");
  //$scope.menu1Template =
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
