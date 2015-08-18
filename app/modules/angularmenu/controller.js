angular
  .controller('Menu1Ctrl', Menu1Ctrl)
  // .filter('nospace', function () {
  //   return function (value) {
  //       return (!value) ? '' : value.replace(/ /g, '');
  //   };
  // })
  .directive("menu", function() {
    return {
      restrict: "E",
      template: "<div ng-class='{ show: visible, left: alignment === \"left\", right: alignment === \"right\" }' ng-transclude></div>",
      transclude: true,
                scope: {
                    visible: "=",
                    alignment: "@"
                }
    };
  });

Menu1Ctrl.$inject = ['$scope','$rootScope', '$location', 'structureService'];

function Menu1Ctrl($scope, $rootScope, $location, structureService) {
  //Register upper level modules
  structureService.registerModule($location,$scope,"angularmenu");

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
