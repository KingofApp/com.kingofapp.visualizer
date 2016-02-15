'use strict';
// NOTE: A service to intercept data from the original structure used by structureService.
angular
  .module('king.core.structureHooksService', [])
  .factory('structureHooks', structureHooksService);

structureHooksService.$inject = [];

function structureHooksService() {
  var injectableData = {
    config: {
      index: ''
    },
    modules: {
      '/404': error404()
    }
  };


  return {
    setIndex: setIndex,
    getIndex: getIndex,
    getModules: getModules,
    addModule: addModule
  };

  function getIndex() {
    return injectableData.config.index;
  }

  function getModules() {
    return injectableData.modules;
  }

  function addModule(module) {
    angular.forEach(module, function(value, key) {
      injectableData.modules[key] = value;
    });
  }

  // TODO: Create removeModule() function

  function setIndex(newIndex) {
    injectableData.config.index = newIndex;
  }

  function error404() {
    return {
      name: '404 Not found',
      identifier: 'static_404',
      type: 'A',
      showOn: {
        menu: false,
        market: false,
        dragDrop: false
      },
      view: 'modules/static_404/index.html',
      files: ['modules/static_404/controller.js'],
      scope: {
        'config': 'x'
      }
    };
  }
}
