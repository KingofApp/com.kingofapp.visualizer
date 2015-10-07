angular
  .controller('polymerMenuCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location) {
  //Register upper level modules
  structureService.registerModule($location, $scope, 'polymermenu');

  // TODO: Simplifie polymer data loading
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

  $scope.polymermenu.menu = menu;
}
