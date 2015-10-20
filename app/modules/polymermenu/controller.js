'use strict';
angular
  .controller('polymerMenuCtrl', loadFunction);

loadFunction.$inject = ['$q', '$scope', 'structureService', '$location'];

function loadFunction($q, $scope, structureService, $location) {
  //Register upper level modules
  structureService.registerModule($location, $scope, 'polymermenu');

  $q.all({
        menu: getMenu()
      })
      .then(function(data){
        setMenu(data.menu);
  });

  function getMenu(){
    var menu = new Array(0);
      angular.forEach(structureService.getChildren($scope.polymermenu.modulescope.path), function(value, key) {
        structureService.getModule(key).then(function(module) {
          if (!module.hidden) {
            menu.push({
              text: value.name,
              url: '#' + key,
            });
          }
        });
    });
    return menu;
  }

  function setMenu(menu){
    $scope.polymermenu.menu = menu;
  }

}
