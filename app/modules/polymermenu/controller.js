(function() {
  'use strict';

  angular
    .module('polymermenu', [])
    .controller('PolymermenuController', loadFunction);

  loadFunction.$inject = ['$q', '$scope', 'structureService', '$location'];

  function loadFunction($q, $scope, structureService, $location) {
    //Register upper level modules
    structureService.registerModule($location, $scope, 'polymermenu');
    $scope.showBack = false;

    if(structureService.getMenuItems().indexOf($location.$$path) === -1){
      $scope.showBack = true;
    }
    $scope.goBack = function() {
      window.history.back()
    };

    $q.all({
      menu: getMenu()
    }).then(function(data) {
      setMenu(data.menu);
    });

    function getMenu() {
      var menu = new Array(0);
      var trExp = /[\/\s]+/gi;
      var index = 0;
      angular.forEach($scope.polymermenu.modulescope.menuItems, function(value, key) {
        structureService.getModule(value).then(function(module) {
            menu.push({
              text: module.name,
              icon: getIcon(module.icon),
              url: "#" + value,
              backgroundImage: $scope.polymermenu.modulescope.backgroundImages[index],
              backgroundColor: $scope.polymermenu.modulescope.backgroundColors[index]
            });
            index++;
        });
      });
      return menu;
    }

    function getIcon(icon) {
      if ($scope.polymermenu.modulescope.showicons) {
        return icon;
      }
      return '';
    }

    function setMenu(menu) {
      $scope.polymermenu.menu = menu;
    }
  }

}());
