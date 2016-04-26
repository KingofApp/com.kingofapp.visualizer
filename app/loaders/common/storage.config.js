(function() {
  'use strict';

  angular
    .module('king.loaders.common')
    .config(setStorageConfig);
  setStorageConfig.$inject = ['$indexedDBProvider'];

  function setStorageConfig($indexedDBProvider) {
    var databaseName = 'koappDB';
    var databaseVersion = 1;
    $indexedDBProvider
      .connection(databaseName)
      .upgradeDatabase(databaseVersion, function(event, db) {
        db.createObjectStore('modules', {
          keyPath: 'key'
        });
        db.createObjectStore('services', {
          keyPath: 'key'
        });
      });
  }
}());
