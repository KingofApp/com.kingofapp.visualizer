angular
  .controller('grouplistCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location){
  //Register upper level modules
  structureService.registerModule($location,$scope,"grouplist");
  console.log($scope.grouplist.modulescope);
  var list = [];
  angular.forEach($scope.grouplist.modulescope.sections, function(value, key){
    if(structureService.get().modules[value.replace(/#/g, '')]){
      var name = structureService.get().modules[value.replace(/#/g, '')].name;
      list.push( { name:name, url:value.replace(/#/g, '') } );
    }

  });
  $scope.grouplist.modulescope.newsections=list;
}
