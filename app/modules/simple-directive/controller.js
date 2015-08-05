angular
  .controller('simpledirectiveCtrl', loadFunction)
  .directive('clickMe',
          function () {
              return {
                  link : function (scope, element) {
                    console.log("FAAFDDFS");
                      element.bind('click', function () {
                          alert('Clicked: ' + element.text());
                      });
                  },
              };
          }
      );
  .directive('mydirective', function() {
    return {
      template: 'Name: {{simpledirective.name}} Address: {{simpledirective.address}}'
    };
  });
loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location){
  //Register upper level modules
  structureService.registerModule($location,$scope,"simpledirective");
  //$compileProvider.lazyDirective.apply(null, 'clickMe');
  $scope.simpledirective = {
    name: 'Name',
    address: 'Address'
  };

}
function function_name(argument) {
  // body...
}

// $compileProvider.directive.apply(null, directive);
