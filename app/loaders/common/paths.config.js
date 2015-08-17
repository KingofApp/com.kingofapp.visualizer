(function(){
  'use strict';

  angular
    .module('king.loaders.common')
    .config(setDefaultPaths);

  setDefaultPaths.$inject = ['$routeProvider','$controllerProvider', '$provide', '$compileProvider', '$sceProvider', '$translateProvider'];

  function setDefaultPaths($routeProvider, $controllerProvider, $provide, $compileProvider, $sceProvider, $translateProvider) {
    //NOTE: Movemos lo del translate a otro config con otro archivo
    //NOTE: Creamos un registerProviders en otro archivo
    //NOTE: Leer en desde structure service
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/app/modules/{part}/locale/locale-{lang}.json'
    });
    $translateProvider.preferredLanguage('en');
    $sceProvider.enabled(false);
    //Default Route
    $routeProvider
      .otherwise({
        templateUrl   : 'loaders/common/loaderCommon.view.html',
        controller : 'commonLoaderCtrl',
        action     : "section-view2"
      });

    [
      {name: 'controller', provider: $controllerProvider, method: 'register'  },
      {name: 'service',    provider: $provide,            method: 'service'   },
      {name: 'factory',    provider: $provide,            method: 'factory'   },
      {name: 'value',      provider: $provide,            method: 'value'     },
      {name: 'directive',  provider: $compileProvider,    method: 'directive'}
    ].forEach(function(row){
      angular['_'+row.name] = angular[row.name];         // Let's keep the older references.
      angular[row.name] = function(name, constructor){   // Provider-based controller,service,factory,value,directive, ?filter
        row.provider[row.method](name, constructor);
        return(this);
      }
    });

  }

}());
