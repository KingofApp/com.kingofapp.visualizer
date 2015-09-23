// https://angular-translate.github.io/docs/#/guide
angular
  .controller('translationTestCtrl', loadFunction)

loadFunction.$inject = ['$scope', '$location', 'structureService', '$translate'];

function loadFunction($scope, $location, structureService, $translate) {

  //Register upper level modules
  structureService.registerModule($location,$scope,"translationtest");
  $scope.state = 'es';

  $scope.changeState = function() {
      $scope.state = $scope.state === 'en' ? 'es' : 'en';
      $translate.use($scope.state);
      structureService.setLang($scope.state)
  }

}
