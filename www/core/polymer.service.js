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
                        while(typeof Polymer === 'undefined');
                        await new Promise(resolve => setTimeout(resolve, 1000));
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
