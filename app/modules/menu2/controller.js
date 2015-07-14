angular
.controller('Menu2Ctrl', Menu2Ctrl);

Menu2Ctrl.$inject = ['$scope','$rootScope', 'structureService'];

function Menu2Ctrl($scope, $rootScope, structureService) {
  console.log("Menu2Ctrl loaded");
  $scope.rightVisible = false;
  //debugger;
  $scope.menu=structureService.getMenu();
  //console.log($scope.module);

  $scope.showRight = function(e) {
                  $scope.rightVisible = true;
                  e.stopPropagation();
              };
  $scope.close = function() {
    $scope.rightVisible = false;
  };
  $rootScope.$on("documentClicked", function _close() {
      $scope.$apply(function() {
          $scope.close();
      });
  });


}
