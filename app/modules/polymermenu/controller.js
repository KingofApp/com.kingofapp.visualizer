angular
  .controller('polymerMenuCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location) {
  //Register upper level modules
  structureService.registerModule($location, $scope, 'polymermenu');

  //NOTE: Simplifie polymer data loading
  var menu = new Array(0);
  angular.forEach(structureService.getChildren($scope.polymermenu.modulescope.path), function(value, key) {
    this.push({
      text: value.name,
      url: '/app/#' + key,
    });
  }, menu);

  $scope.polymermenu.menu = menu;
}
