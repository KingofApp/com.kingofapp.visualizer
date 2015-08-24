(function(){
  'use strict';

  angular
    .module('king.loaders.common')
    .config(registerProviders)
  registerProviders.$inject = ['$controllerProvider', '$provide', '$compileProvider', '$filterProvider'];

  function registerProviders($controllerProvider, $provide, $compileProvider, $filterProvider) {


    // $loadOnDemandProvider.config([
    //             {
    //                 name: 'demand',
    //                 script: 'modules/firebase/factory.js'
    //             }
    //         ]);
    [
      {name: 'controller', provider: $controllerProvider, method: 'register'  },
      {name: 'service',    provider: $provide,            method: 'service'   },
      {name: 'factory',    provider: $provide,            method: 'factory'   },
      {name: 'value',      provider: $provide,            method: 'value'     },
      {name: 'directive',  provider: $compileProvider,    method: 'directive' },
      {name: 'filter',     provider: $filterProvider,     method: 'register'  }
    ].forEach(function(row){
      angular['_'+row.name] = angular[row.name];         // Let's keep the older references.
      angular[row.name] = function(name, constructor){   // Provider-based controller,service,factory,value,directive, ?filter
        row.provider[row.method](name, constructor);
        return(this);
      }
    });

  }

}());
