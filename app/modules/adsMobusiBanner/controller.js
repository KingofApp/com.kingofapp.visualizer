(function(){
  angular
    .controller('AdsMobusiBannerCtrl', loadFunction);

  loadFunction.$inject = ['$scope', '$location', '$http', '$interval', 'structureService'];

  function loadFunction($scope, $location, $http, $interval, structureService) {
    //Register upper level modules
    structureService.registerModule($location, $scope, 'adsMobusiBanner');

    var interval = $interval(reloadAd, 30*1000);
    reloadAd();

    function reloadAd(){
      $http({
        method: 'POST',
        url: 'http://apps.mobusi.com/sdk/service.php',
        headers: {
          'token': $scope.adsMobusiBanner.modulescope.token || 'mau27sh4bdka3u6hg:;shsg2d733;sosdj_shshsiwh5',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: $.param({
          'mkt'   : '0A9HOC0000000042',
          'format': 1
        })
      })
      .success(function(data) {
        $scope.ads = data;
      }).error(console.error);
    }

    $scope.$on('$locationChangeStart', function() {
      $interval.cancel(interval);
    });

  }
}());
