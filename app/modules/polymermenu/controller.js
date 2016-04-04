(function() {
  'use strict';

  angular
    .module('polymermenu', [])
    .controller('PolymermenuController', loadFunction);

  loadFunction.$inject = ['$q', '$scope', 'structureService', '$location'];

  function loadFunction($q, $scope, structureService, $location) {
    //Register upper level modules
    structureService.registerModule($location, $scope, 'polymermenu');

    $q.all({
      menu: getMenu()
    }).then(function(data) {
      setMenu(data.menu);
    });

    function getMenu() {
      var menu = new Array(0);
      var trExp = /[\/\s]+/gi;
      angular.forEach(structureService.getChildren($scope.polymermenu.modulescope.path), function(value, key) {
        structureService.getModule(key).then(function(module) {
          if (module.showOn && module.showOn.menu) {
            var slug = value.name.replace(trExp, '-');
            menu.push({
              text: value.name,
              icon: getIcon(value.icon),
              url: '#' + key,
              class: slug
            });
          }
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
