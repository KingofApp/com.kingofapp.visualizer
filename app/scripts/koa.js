(function() {
  'use strict';

  window.koa = {
    theme: theme('paper')
  };

  function theme(themeName) {
    var _theme = themeName;
    var listeners = new Array(0);

    return {
      get: get,
      set: set,
      onChange: onChange
    };

    function get() {
      return _theme;
    }

    function set(themeName) {
      _theme = themeName;

      listeners.forEach(function(_themeChanged) {
        _themeChanged(_theme);
      });
    }

    function onChange(_themeChanged) {
      listeners.push(_themeChanged);
      _themeChanged(_theme);
    }
  }
}());
