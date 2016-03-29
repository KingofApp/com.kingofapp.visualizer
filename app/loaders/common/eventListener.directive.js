(function() {
  'use strict';

  angular
    .module('king.loaders.common')
    .directive('eventListener', function($rootScope) {
      return function($scope, element, attrs) {

        element.on('click', '[ng-click]:not(div)', ngClickWrapper);
        element.on('change', '[ng-model]', ngModelWrapper);

        function ngClickWrapper(e) {
          var scopeElement = document.querySelector('.' + $rootScope.current);
          var scope = angular.element(scopeElement).scope();
          var functionName = $(this).attr('ng-click').replace(/(\(.*?\))/, '');

          //Match params
          var paramsList = getParams($(this).attr('ng-click'), scope);

          scope[functionName].apply(null, paramsList);

          $scope.$apply();
          e.stopPropagation();
        }

        function ngModelWrapper() {
          var scopeElement = document.querySelector('.' + $rootScope.current);
          var scope = angular.element(scopeElement).scope();
          var model = $(this).attr('ng-model').split('.');
          scope[model[0]][model[1]] = $(this).val();
        }

        function getParams(element, scope) {
          var params = element.match(/\((.*?)\)/)[1].split(',');
          var paramsList = [];
          angular.forEach(params, function(value) {
            value = value.trim();
            if (scope[value]) { // Is function from scope
              this.push(scope[value]);
            } else {
              this.push(value);
            }
          }, paramsList);

          return paramsList;
        }
      };
    });

}());
