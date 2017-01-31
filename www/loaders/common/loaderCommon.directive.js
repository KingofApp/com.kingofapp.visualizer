(function() {
  'use strict';
  // Include js scripts from angular
  // USAGE:
  // Controller -> $scope.scripts = ["wordpressposts.items="+JSON.stringify(elements)+";"];
  // Html       -> <div poly-scripts scripts="scripts"></div>
  angular
    .module('king.loaders.common')
    .directive('polyScripts', function() {
      var updateScripts = function(element) {
        return function(scripts) {
          element.empty();
          angular.forEach(scripts, function(source, key) {
            var scriptTag = angular.element(document.createElement('script'));
            source = '//@ sourceURL=' + key + '\n' + source;
            scriptTag.text(source);
            element.append(scriptTag);
          });
        };
      };

      return {
        restrict: 'EA',
        scope: {
          scripts: '='
        },
        link: function(scope, element) {
          scope.$watch('scripts', updateScripts(element));
        }
      };
    });
}());
