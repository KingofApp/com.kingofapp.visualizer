angular
  .controller('translationTestCtrl', loadFunction)

loadFunction.$inject = ['$scope', '$location', 'structureService', '$timeout', '$translatePartialLoader', '$translate'];

function loadFunction($scope, $location, structureService, $timeout, $translatePartialLoader, $translate) {
  //NOTE: Esto para dentro del registerModule a ver si podemos no lodear al $translatePartialLoader
  //NOTE: Que pasa con modulos anidados? - carga 2 loaders o solo 1?
  $translatePartialLoader.addPart('translationtest');
  $translate.refresh();

  //NOTE: Lo pasamos a un runner
//   app.run(function ($rootScope, $translate) {
//   $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
//     $translate.refresh();
//   });
// });
  //Register upper level modules
  structureService.registerModule($location,$scope,"translationtest");
  $scope.state = 'en';

  $scope.changeState = function() {
      $scope.state = $scope.state === 'en' ? 'es' : 'en';
      $translate.use($scope.state);
  }

}
