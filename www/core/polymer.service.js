(function () {
  'use strict';

  angular
    .module('king.core.structureService')
    .factory('$polymer', $polymer);

  $polymer.$inject = ['$q'];

  function $polymer($q) {
    return {
      importHref: importHref,
      updateStyles: $q.when(Polymer).then(function(){ Polymer.updateStyles() }),
      setCustomStyle: setCustomStyle
      };

      function importHref(href, onload, onerror) {
      var l = document.createElement('link');
      l.rel = 'import';
      l.href = href;
      var self = this;
      if (onload) {
        l.onload = function (e) {
          return onload.call(self, e);
        };
      }
      if (onerror) {
        l.onerror = function (e) {
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
