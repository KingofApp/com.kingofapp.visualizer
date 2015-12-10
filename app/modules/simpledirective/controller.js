angular
  .controller('simpledirectiveCtrl', loadFunction)
  .directive('directive', function($compile) {
    return {
      template: 'Element with {{simpledirective.variable}}'
    };
  })
  .directive('directivecompile', function($compile) {
      return {
        link: function(scope, element) {
          var template = '<p>P test</p>';
          var $template = angular.element(template);
          $compile($template);
          element.append($template);
        }
      };
  });
loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location){
  //Register upper level modules
  structureService.registerModule($location,$scope,"simpledirective");
  $scope.simpledirective.variable = 'personal scope';

}
