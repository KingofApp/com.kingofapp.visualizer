(function() {
  'use strict';

  angular
    .module('king.loaders.common')
    .directive('eventListener', function($rootScope) {
      return function($scope, element, attrs) {

        element.on('click', "[ng-click]", ngClickWrapper);
        element.on('change', "[ng-model]", ngModelWrapper);

        function ngClickWrapper(e) {
          var scopeElement = document.querySelector('.' + $rootScope.current);
          var scope = angular.element(scopeElement).scope();
          var functionName = $(this).attr('ng-click').replace(/(\(.*?\))/, '');
          scope[functionName]();
          e.stopPropagation();
        }
        
        function ngModelWrapper() {
          var scopeElement = document.querySelector('.' + $rootScope.current);
          var scope = angular.element(scopeElement).scope();
          var model = $(this).attr('ng-model').split('.');
          scope[model[0]][model[1]] = $(this).val();
        }
      };
    });


}());
