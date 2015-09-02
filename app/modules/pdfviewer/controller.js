angular
  .controller('pdfviewerCtrl', loadFunction);

loadFunction.$inject = ['$scope', 'structureService', '$location'];

function loadFunction($scope, structureService, $location){
  //Register upper level modules
  structureService.registerModule($location,$scope,"pdfviewer");

  $scope.pdfUrl = $scope.pdfviewer.modulescope.value;
  $scope.scroll = 0;
  $scope.loading = 'loading';
  $scope.ready='';

  $scope.getNavStyle = function(scroll) {
    if(scroll > 100) return 'pdf-controls fixed';
    else return 'pdf-controls';
  }

  $scope.onError = function(error) {
    console.log(error);
  }

  $scope.onLoad = function() {
    $scope.loading = '';
    $scope.ready = '<p class="ready">Ready!</p>';
  }
}
