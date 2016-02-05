'use strict';

angular
  .controller('polymerMenuCtrl', loadFunction);

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
    angular.forEach(structureService.getChildren("/"), function(value, key) {
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

  function setMenu(menu) {
    $scope.polymermenu.menu = menu;
  }
}
