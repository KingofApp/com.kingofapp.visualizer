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
        var elem = document.createElement('div');
        elem.innerHTML = '<google-map fit-to-markers zoom="15"><google-map-marker longitude="' + $scope.lon + '" latitude="' + $scope.lat + '"></google-map-marker></google-map>';
        document.querySelector('.googlemap').appendChild(elem);
      }
    };
  }

}());
