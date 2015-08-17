angular
  .controller('AdsCtrl', loadFunction)

loadFunction.$inject = ['$scope', '$location', 'structureService', '$timeout', '$translatePartialLoader', '$translate'];

function loadFunction($scope, $location, structureService, $timeout, $translatePartialLoader, $translate) {
  //Register upper level modules
  $translatePartialLoader.addPart('ads');
  $translate.refresh();
  structureService.registerModule($location,$scope,"ads");
  // // configures staticFilesLoader
  //  customLoader.useStaticFilesLoader({
  //    prefix: 'module/ads/locale/locale-',
  //    suffix: '.json'
  //  });
  //  // load 'en' table on startup
  //  customLoader.preferredLanguage('en');


  $scope.ads.showflag = true;
   $timeout(function(){
     $scope.$apply(function()
     {
       $scope.ads.showflag = false;
     });
   }, 2000);

}
