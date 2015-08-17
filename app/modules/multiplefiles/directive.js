angular
  .directive('directive', function($compile) {
    return {
      template: 'Element with {{multiplefiles.variable}}'
    };
  })
  .directive('directivecompile', function($compile) {
      return {
        link: function(scope, element) {
          var template = '<p>P test</p>';
          var $template = angular.element(template);
          $compile($template);
          element.append($template);
        }
      };
  });
