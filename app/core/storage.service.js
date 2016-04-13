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
      getAll: getAll,
      init: init,
      del: del,
      get: get,
      set: set
    };

    function getAll() {
      var deferred = $q.defer();
      myObjectStore.getAll().then(function(results) {
        deferred.resolve(results)
      });
      return deferred.promise;
    }

    function get(key) {
      var deferred = $q.defer();
      myObjectStore.find(key).then(function(cursor) {
        deferred.resolve(cursor);
      });
      return deferred.promise;
    }
    function del(key) {
      var deferred = $q.defer();
      myObjectStore.delete(key).then(function(cursor) {
        deferred.resolve(cursor);
      });
      return deferred.promise;
    }

    function set(key, value) {
      var deferred = $q.defer();
      myObjectStore.insert({
        "key": key,
        "value": value
      }).then(function(e) {
        deferred.resolve(e)
      });
      return deferred.promise;
    }

    function init(name) {
      if (name) {
        objectName = name;
      }
      myObjectStore = $indexedDB.objectStore(objectName);

    }
  }

}());
