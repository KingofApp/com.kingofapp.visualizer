(function(){
  'use strict';

  angular
    .module("king.loaders.angular", ['ngRoute'])
    .directive("myDirective", myDirective);

  myDirective.$inject = ['structureService', '$location', '$compile', '$http'];

  function myDirective(structureService, $location, $compile, $http){
    return {
      link: link
    };
    function link(scope, elm, attr, contrl) {
      structureService.getCurrent($location, function(module){
        $http.get(module.view).then(function(response){
          elm.html(response.data);
          $compile(elm.contents())(scope);

        });
      });

    }

  };
}());
