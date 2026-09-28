(function() {
  'use strict';

  angular.module('compilationfeed', [])
    .controller('CompilationFeedController', loadFunction);

  loadFunction.$inject = ['$scope', '$http', '$location', 'structureService', '$interval'];

  function loadFunction($scope, $http, $location, structureService, $interval) {
    structureService.registerModule($location, $scope, 'compilationfeed');
    var appLocale = String(structureService.getLang() || navigator.language || 'en-US').toLowerCase().replace('-', '_');
    var locale = appLocale.indexOf('es') === 0 ? 'es_ES' : 'en_US';
    var base = String($scope.compilationfeed.modulescope.apiBase || 'https://api.kingofapp.com').replace(/\/$/, '');
    var token = String($scope.compilationfeed.modulescope.token || '').trim();
    var timer;

    $scope.feed = { loading: true, error: false, configured: !!token, data: null, labels: null };
    $http.get('modules/compilationfeed/locale/' + locale + '.json').then(function(response) {
      $scope.feed.labels = response.data;
      if (token) refresh(); else $scope.feed.loading = false;
    }, function() {
      $scope.feed.loading = false;
      $scope.feed.error = true;
    });

    function refresh() {
      if (!token || !$scope.feed.labels) return;
      $http.get(base + '/public/compilation-feed/status', {
        cache: false,
        headers: { 'X-Compilation-Feed-Token': token }
      })
        .then(function(response) {
          $scope.feed.data = response.data;
          $scope.feed.error = false;
        }, function() { $scope.feed.data = null; $scope.feed.error = true; })
        .finally(function() { $scope.feed.loading = false; });
    }

    timer = $interval(refresh, 10000);
    $scope.$on('$destroy', function() { if (timer) $interval.cancel(timer); });
  }
}());
