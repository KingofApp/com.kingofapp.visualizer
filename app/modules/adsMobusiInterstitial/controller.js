(function(){
  angular
    .controller('AdsMobusiInterstitialCtrl', loadFunction);

  loadFunction.$inject = ['$scope', '$location', '$http', '$timeout', 'structureService'];

  function loadFunction($scope, $location, $http, $timeout, structureService) {
    //Register upper level modules
    structureService.registerModule($location, $scope, 'adsMobusiInterstitial');

    $http({
      method: 'POST',
      url: 'http://apps.mobusi.com/sdk/service.php',
      headers: {
        'token': $scope.adsMobusiInterstitial.modulescope.token || 'mau27sh4bdka3u6hg:;shsg2d733;sosdj_shshsiwh5',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: $.param({
        'mkt'   : '0A9HOC0000000042',
        'format': 3
      })
    })
    .success(function(data) {
      $scope.adsMobusiInterstitial = data;
      $scope.adsMobusiInterstitial.showflag = true;
      $timeout(hideAd, 5*1000);
    })
    .error(console.error);

    function hideAd(){
      $scope.$apply(function(){
        $scope.adsMobusiInterstitial.showflag = false;
      });
    }

  }
}());
