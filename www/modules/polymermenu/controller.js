(function() {
  'use strict';

  angular
    .module('polymermenu', [])
    .controller('PolymermenuController', loadFunction);

  loadFunction.$inject = ['$q', '$rootScope', '$scope', 'structureService', '$location'];

  function loadFunction($q, $rootScope, $scope, structureService, $location) {
    //Register upper level modules
    structureService.registerModule($location, $scope, 'polymermenu');
    $scope.showBack = false;
    if(structureService.getMenuItems().indexOf($location.$$path) === -1 && $rootScope.current != 'polymermenu'){
      $scope.showBack = true;
    }
    $scope.goBack = function() {
      var tempUrl = angular.copy($rootScope.backUrl);
      if (tempUrl.length - 2 > -1) {
        $rootScope.backUrl.pop();
        $location.path(tempUrl[tempUrl.length - 2]);
      }
    };

    $q.all({
      menu: getMenu()
    }).then(function(data) {
      setMenu(data.menu);
    });

    function getMenu() {
      var menu = new Array(0);
      var trExp = /[\/\s]+/gi;
      //Dummy element to prevent scroll to top
      menu.push({
        text: "Dummy",
        icon: "",
        url: "#" ,
        backgroundImage: "",
        backgroundColor: "",
        class: "dummy"
      });
      angular.forEach($scope.polymermenu.modulescope.menuItems, function(value, key) {
        structureService.getModule(value.path).then(function(module) {
          var color = (value.bgColor) ? '#' + value.bgColor.replace('#','') : '';
          var currentClass = ($location.path() === value.path) ? 'selectedpmenu' : '';
          menu.push({
            text: module.name,
            icon: getIcon(module.icon),
            url: "#" + value.path,
            backgroundImage: value.bgImage,
            backgroundColor: color,
            class: currentClass
          });

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
