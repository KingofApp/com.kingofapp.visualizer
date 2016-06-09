(function() {
  'use strict';

  angular
    .module('googlemap')
    .directive('googleMap', googleMapDirective);

  function googleMapDirective() {
    return {
      replace: false,
      restrict: 'A',
      scope: {
        lat: '=',
        lon: '=',
        zoom: '='
      },
      controller: function($scope) {

        $scope.$on("koaAppRendered", loadGooglemap);
        loadGooglemap();

        function loadGooglemap() {
          if (document.querySelector('.googlemap')) {
            var elem = document.createElement('div');
            elem.innerHTML = '<google-map fit-to-markers zoom="15"><google-map-marker longitude="' + $scope.lon + '" latitude="' + $scope.lat + '"></google-map-marker></google-map>';
            document.querySelector('.googlemap').appendChild(elem);
          }
        }
      }
    };
  }

}());
