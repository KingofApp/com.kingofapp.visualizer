angular
  .controller('filtersCtrl', loadFunction)
  .filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
  });
loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location){
  //Register upper level modules
  structureService.registerModule($location,$scope,"filters");

}
