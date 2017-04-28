(function () {
  'use strict';

  angular
    .module('repeatdemo', [])
    // Directive test 1
    .directive('card', function () {
      return {
        restrict: 'E',
        scope: false,
        replace: true,
        template: '<koa-card heading="{{heading}}" image="{{image}}"></koa-card>'
      };
    })
    // Directive working test 2
    .directive('listen', function () {
      return {
        restrict: 'EA',
        scope: true,
        link: function (scope, element, attrs) {
          console.log("element", element[0]);
          // Replace polymer variables
          element[0].heading = attrs.headingb;
          element[0].image = attrs.imageb;
        }
      };
    })
    .controller('repeatdemoController', loadFunction);

  loadFunction.$inject = ['$scope', 'structureService', '$location', '$http'];

  function loadFunction($scope, structureService, $location, $http) {
    //Register upper level modules
    structureService.registerModule($location, $scope, 'repeatdemo');

    // Load sample remote data
    $scope.sampleData = [];
    $http.get('https://jsonplaceholder.typicode.com/photos').then(function (response) {
      for (var i = 0; i < 12; i++) {
        $scope.sampleData.push(response.data[i]);
      }
      console.log($scope.sampleData);
    });

  }

}());
