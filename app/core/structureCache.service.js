(function() {
  'use strict';

  angular
    .module('king.core.structureService.cache', [])
    .factory('cachedLibs', cachedLibs, [])
    .factory('cachedLocations', cachedLocations, [])
    .factory('cachedModules', cachedModules, []);

  function cachedLibs() {
    var cachedLibs = [];

    return {
      get: getLibs,
      set: setLibs
    };

    function getLibs() {
      return cachedLibs;
    }

    function setLibs(libs) {
      cachedLibs = libs;
    }
  }

  function cachedLocations() {
    var cachedLocations = {};

    return {
      reset: resetLocations,
      get: getLocations,
      getOne: getLocation,
      setOne: setLocation
    };

    function resetLocations() {
      cachedLocations = {};
    }

    function getLocations() {
      return cachedLocations;
    }

    function getLocation(path) {
      return cachedLocations[path];
    }

    function setLocation(path, value) {
      cachedLocations[path] = value;
    }
  }

  function cachedModules() {
    var cachedModules = {};

    return {
      getOne: getModule,
      setOne: setModule
    };

    function getModule(path) {
      return cachedModules[path];
    }

    function setModule(path, value) {
      cachedModules[path] = value;
    }
  }

}());
