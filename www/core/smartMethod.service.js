(function() {
  'use strict';

  angular
    .module('king.core.smartMethodService', [])
    .factory('smartMethodService', smartMethodService);

  smartMethodService.$inject = ['$rootScope', '$q'];
  function smartMethodService($rootScope, $q) {

    var methods = {};

    return {
      subscribe : subscribe,
      execute   : execute
    };

    function subscribe(type, method) {
      if (!methods[type]) methods[type] = [];
      methods[type].push(method);
    }

    function execute(type, methodData) {
      getBest(type, methodData)
      .then(function(best) {
        delete($rootScope.response);
        if (!best.method) $rootScope.response = { paymentMethod: 'not found', success: false };
        else              executeBestMethod(best);
      });

      function executeBestMethod(best) {
        best.method.execute(methodData, function(response) {
          $rootScope.response    = angular.copy(response);
          $rootScope.paymentData = angular.copy(response.paymentData);
        });
      }
    }

    function getBest(type, methodData) {
      var best         = { method: null, value: 0 };
      var deferred     = $q.defer();
      var methodsArray = [];

      if (methods[type]) {
        for (var i = 0; i < methods[type].length; i++) {
          methodsArray.push(methods[type][i].evaluate(methodData, checkBetter));
        }
      }

      $q.all(methodsArray)
      .then(function() {
        deferred.resolve(best);
      })
      .catch(deferred.reject);

      return deferred.promise;

      function checkBetter(value) {
        if (value > best.value) {
          best = {
            method: methods[type][i],
            value: value
          }
        }
      }

    }


  }

}());
