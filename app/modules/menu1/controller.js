angular
  .controller('Menu1Ctrl', Menu1Ctrl);

Menu1Ctrl.$inject = ['$scope','$rootScope', 'structureService'];

function Menu1Ctrl($scope, $rootScope, structureService) {

  console.log("Menu1CTrl loaded");

  $scope = {
    leftVisible: false,
    menu       : structureService.getMenu(),
    showLeft   : showLeftFn,
    close      : closeFn
  };

  function showLeft(e) {
    $scope.leftVisible = true;
    e.stopPropagation();
  }

  function close() {
    $scope.leftVisible = false;
  }

  $rootScope.$on("documentClicked", function _close() {
      $scope.$apply(function() {
          $scope.close();
      });
  });
}
