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
        transclude: false,
        link: function (scope, element, attrs) {
          
          for (var attr in attrs) {
            if (typeof attrs[attr] === 'string') angular.element(element).find('.'+ attr).html(attrs[attr]);
          }

          //TODO: Create dynamic polymer element assignation
          element[0].heading = attrs['koaHeading'];
          element[0].image = attrs['koaImage'];

          element.on('click', '[ng-click]', ngClickWrapper);
          function ngClickWrapper(e) {

            // Clean function name
            var functionName = $(this).attr('ng-click').replace(/(\(.*?\))/, '');

            //Match params
            // var paramsList = getParams($(this).attr('ng-click'), scope);
            console.log("Click handled by directive");
            scope[functionName](e);

            // $scope.$apply();
            e.stopPropagation();
          }
        }
      };
    })
    .controller('repeatdemoController', loadFunction);

  loadFunction.$inject = ['$scope', 'structureService', '$location', '$http'];

  function loadFunction($scope, structureService, $location, $http) {
    //Register upper level modules
    structureService.registerModule($location, $scope, 'repeatdemo');

    loadData();
    $scope.doSomething = function(e) {
      console.log("E",e);
    }
    $scope.remove = function(e) {
      console.log("E", e);
      // console.log("Parent", angular.element( e.currentTarget  ).parent().parent());
     angular.element( e.currentTarget  ).parent().parent().remove();
    }
    $scope.update = function(e) {
      loadData();
    }

    function loadData() {
          // Load sample remote data
        $scope.sampleData = [];
        $http.get('https://jsonplaceholder.typicode.com/photos').then(function (response) {
          for (var i = 0; i < 12; i++) {
            $scope.sampleData.push(response.data[i]);
          }
          console.log($scope.sampleData);
        });
    }
  }

}());
