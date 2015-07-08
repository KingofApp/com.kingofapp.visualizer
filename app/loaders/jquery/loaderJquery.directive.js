(function(){
  'use strict';

  angular
    .module("king.loaders.jquery", ['ngRoute'])
    .directive("loaderJquery", loaderJquery);

  loaderJquery.$inject = ['$http', '$compile'];

  function loaderJquery($http, $compile){
    return {
      scope: { module: '=' },
      link : link
    };

    function link(scope, elm, attr, contrl) {

      var $ = function (selector){
        return angular.element(elm).find(selector);
      }

      $http.get(scope.module.view).then(function(response){
        elm.html(response.data);
        $compile(elm.contents())(scope);
      });

      $http.get(scope.module.ctrl).then(function(response){
        var ctrl = new Function("$", "scope", response.data);
        console.log('scope', scope);
        ctrl($, scope);
      });
    }

  };

}());