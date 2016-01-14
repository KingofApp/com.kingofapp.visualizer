'use strict';

angular
  .controller('Menu1Ctrl', Menu1Ctrl)
  .directive("menu", menu);

function menu() {
  return {
    restrict: "E",
    template: "<div ng-class='{ show: visible, left: alignment === \"left\", right: alignment === \"right\" }' ng-transclude></div>",
    transclude: true,
    scope: {
        visible: "=",
        alignment: "@"
    }
  };
}

Menu1Ctrl.$inject = ['$scope','$rootScope', '$location', 'structureService'];

function Menu1Ctrl($scope, $rootScope, $location, structureService) {
  //Register upper level modules
  structureService.registerModule($location,$scope,"angularmenu");

  $scope.leftVisible = false;
  $scope.menu        = getMenu();
  $scope.showLeft    = showLeftFn;
  $scope.close       = closeFn;

  function showLeftFn(e) {
    $scope.leftVisible = true;
    e.stopPropagation();
  }

  function closeFn() {
    $scope.leftVisible = false;
  }

  function getMenu() {
    var menu = new Array(0);
    var trExp = /[\/\s]+/gi;
    angular.forEach(structureService.getChildren($scope.angularmenu.modulescope.path), function(value, key) {
      structureService.getModule(key).then(function(module) {
        if (module.showOn && module.showOn.menu) {
          var slug = value.name.replace(trExp, '-');
          menu.push({
            text: value.name,
            url: '#' + key,
            class: slug
          });
        }
      });
    });
    return menu;
  }
  $rootScope.$on("documentClicked", function _close() {
      $scope.$apply(function() {
          $scope.close();
      });
  });
}
