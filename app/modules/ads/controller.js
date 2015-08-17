angular
  .controller('AdsCtrl', loadFunction)

loadFunction.$inject = ['$scope', '$location', 'structureService', '$timeout'];

function loadFunction($scope, $location, structureService, $timeout) {
  //Register upper level modules
  structureService.registerModule($location,$scope,"ads");

  $scope.ads.showflag = true;
   $timeout(function(){
     $scope.$apply(function()
     {
       $scope.ads.showflag = false;
     });
   }, 2000);

}
