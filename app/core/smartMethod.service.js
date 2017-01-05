(function() {
  'use strict';

  angular
    .module('king.core.smartMethodService', [])
    .factory('smartMethodService', smartMethodService);

  smartMethodService.$inject = ['$q'];
  function smartMethodService($q) {

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
        console.log('best method', best);
        
        if (!best.method) console.log('redirect to', methodData.callback.fail);
        best.method.execute(methodData, function(response) {
          if (response.success) console.log('redirect to', methodData.callback.success);
          else                  console.log('redirect to', methodData.callback.fail);
        });
      });
    }

    function getBest(type, methodData) {
      var best         = { method: null, value: 0 };
      var deferred     = $q.defer();
      var methodsArray = [];

      for (var i = 0; i < methods[type].length; i++) {
        methodsArray.push(methods[type][i].evaluate(methodData, checkBetter));
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
