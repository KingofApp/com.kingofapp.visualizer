(function() {
  'use strict';

  angular
    .module('king.core.storageService', [])
    .factory('storageService', storageService);

  storageService.$inject = ['$indexedDB', '$q'];

  function storageService($indexedDB, $q) {
    var myObjectStore = {};
    var objectName = 'modules';

    init();

    return {
      get: get,
      set: set
    };

    function get() {
      var deferred = $q.defer();
      myObjectStore.getAll().then(function(results) {
        deferred.resolve(results)
      });
      return deferred.promise;
    }

    function set(key,value) {
      var deferred = $q.defer();
      myObjectStore.insert({"key":key, "value": value}).then(function(e) {
        deferred.resolve(e)
      });
      return deferred.promise;
    }

    function init() {
      myObjectStore = $indexedDB.objectStore(objectName);
    }
  }

}());
