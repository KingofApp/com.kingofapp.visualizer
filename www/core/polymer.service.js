(function() {
  'use strict';

  angular
    .module('king.core.structureService')
    .factory('$polymer', $polymer);

  $polymer.$inject = [];

  function $polymer() {
    return {
      importHref: importHref,
      updateStyles: async() => {
                        console.log("waiting for polymer to be defined");
                        while(typeof Polymer === 'undefined') // define the condition as you like
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        console.log("Polymer is defined and the function updateStyles in now called. Styles in the app may adjust during this ");
                        Polymer.updateStyles();
                    },
      setCustomStyle: setCustomStyle
    };

    function importHref(href, onload, onerror) {
      var l = document.createElement('link');
      l.rel = 'import';
      l.href = href;
      var self = this;
      if (onload) {
        l.onload = function(e) {
          return onload.call(self, e);
        };
      }
      if (onerror) {
        l.onerror = function(e) {
          return onerror.call(self, e);
        };
      }
      document.head.appendChild(l);
      return l;
    }

    function setCustomStyle(variableKey, variableValue) {
      Polymer.StyleDefaults.customStyle[variableKey] = variableValue;
    }
  }

}());
