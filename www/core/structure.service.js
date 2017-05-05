(function() {
  'use strict';

  angular
    .module('king.core.structureService', ['king.core.structureService.cache'])
    .factory('structureService', structureService);

  structureService.$inject = ['$q', '$translatePartialLoader', '$translate', 'structureHooks', '$rootScope', '$filter', '$polymer', 'cachedLibs', 'cachedLocations', 'cachedModules'];

  function structureService($q, $translatePartialLoader, $translate, structureHooks, $rootScope, $filter, $polymer, cachedLibs, cachedLocations, cachedModules) {
    var listeners = [];
    var lang;
    var visitedLocations = [];
    var menuItems = [];
    var data = {};

    $rootScope.transitionOn = true;

    if ($rootScope.appJsonStructure) {
      set($rootScope.appJsonStructure);
    } else {
      data = {
        'config': {
          'index': '/',
          'lang': ['EN']
        }
      };
      $rootScope.transitionOn = true;
    }

    return {
      get: get,
      set: set,
      getConfig: getConfig,
      getMenuItems: getMenuItems,
      setCssVariables: setCssVariables,
      setColors: setColors,
      getColors: getColors,
      setFonts: setFonts,
      getFonts: getFonts,
      setImages: setImages,
      getImages: getImages,
      setModules: setModules,
      setSpinner: setSpinner,
      launchSpinner: launchSpinner,
      getIndex: getIndex,
      getVisitedLocations: getVisitedLocations,
      getCachedLocations: cachedLocations.get,
      getCachedLibs: cachedLibs.get,
      setCachedLibs: cachedLibs.set,
      setVisitedLocations: setVisitedLocations,
      getLang: getLang,
      setLang: setLang,
      getModule: getModule,
      getCurrentModules: getCurrentModules,
      getChildren: getChildren,
      validateScope: validateScope,
      registerModule: registerModule,
      update: update,
      onChange: onChange
    };

    function get() {
      return data;
    }

    function set(newData) {
      cachedLocations.reset();
      data = newData;

      setHooks();
      $rootScope.$broadcast('menuUpdated');
    }

    function getConfig() {
      return data.config;
    }

    function setCssVariables(config) {
      if (config === null) {
        config = getConfig();
      }
      console.log('setColors');

      setColors(config.colors);
      setImages(config.images);
      setFonts(config.fonts);
    }

    function getColors() {
      return data.config.colors;
    }

    function setColors(colors) {
      cachedLocations.reset();

      if (colors === null) {
        colors = getColors();
      }

      $polymer.setCustomStyle('--primary-text-color', colors.primaryTextColor);
      $polymer.setCustomStyle('--primary-background-color', colors.primaryBackgroundColor);
      $polymer.setCustomStyle('--secondary-text-color', colors.secondaryTextColor);
      $polymer.setCustomStyle('--disabled-text-color', colors.disabledTextColor);
      $polymer.setCustomStyle('--divider-color', colors.dividerColor);
      $polymer.setCustomStyle('--light-primary-color', colors.lightPrimaryColor);
      $polymer.setCustomStyle('--dark-primary-color', colors.darkPrimaryColor);
      $polymer.setCustomStyle('--accent-color', colors.accentColor);
      $polymer.setCustomStyle('--light-accent-color', colors.lightAccentColor);
      $polymer.setCustomStyle('--dark-accent-color', colors.darkAccentColor);
      $polymer.setCustomStyle('--error-color', colors.errorColor);
      $polymer.setCustomStyle('--background-color', colors.backgroundColor);


      $polymer.setCustomStyle('--primary-color', colors.primaryColor);
      $polymer.setCustomStyle('--primary-background-color', LightenDarkenColor(colors.primaryColor, 0.95));
      $polymer.setCustomStyle('--primary-active-color', LightenDarkenColor(colors.primaryColor, -0.2));
      $polymer.setCustomStyle('--primary-border-color', LightenDarkenColor(colors.primaryColor, -0.2));
      $polymer.setCustomStyle('--success-color', colors.successColor);
      $polymer.setCustomStyle('--success-background-color', LightenDarkenColor(colors.successColor, 0.95));
      $polymer.setCustomStyle('--success-active-color', LightenDarkenColor(colors.successColor, -0.2));
      $polymer.setCustomStyle('--success-border-color', LightenDarkenColor(colors.successColor, -0.2));
      $polymer.setCustomStyle('--info-color', colors.infoColor);
      $polymer.setCustomStyle('--info-background-color', LightenDarkenColor(colors.infoColor, 0.95));
      $polymer.setCustomStyle('--info-active-color', LightenDarkenColor(colors.infoColor, -0.2));
      $polymer.setCustomStyle('--info-border-color', LightenDarkenColor(colors.infoColor, -0.2));
      $polymer.setCustomStyle('--warning-color', colors.warningColor);
      $polymer.setCustomStyle('--warning-background-color', LightenDarkenColor(colors.warningColor, 0.95));
      $polymer.setCustomStyle('--warning-active-color', LightenDarkenColor(colors.warningColor, -0.2));
      $polymer.setCustomStyle('--warning-border-color', LightenDarkenColor(colors.warningColor, -0.2));
      $polymer.setCustomStyle('--danger-color', colors.dangerColor);
      $polymer.setCustomStyle('--danger-background-color', LightenDarkenColor(colors.dangerColor, 0.95));
      $polymer.setCustomStyle('--danger-active-color', LightenDarkenColor(colors.dangerColor, -0.2));
      $polymer.setCustomStyle('--danger-border-color', LightenDarkenColor(colors.dangerColor, -0.2));
      $polymer.setCustomStyle('--bg-primary', colors.bgPrimary);


      if (colors.toolbarColor) {
        $polymer.setCustomStyle('--toolbar-color', colors.toolbarColor);
      }

      $polymer.updateStyles();
    }

    function LightenDarkenColor(hex, lum) {
        // var usePound = false;
        // if (col[0] == '#') {
        //     col = col.slice(1);
        //     usePound = true;
        // }
        //
        // var num = parseInt(col, 16);
        // var r = (num >> 16) + amt;
        // if (r > 255) r = 255;
        // else if  (r < 0) r = 0;
        // var b = ((num >> 8) & 0x00FF) + amt;
        // if (b > 255) b = 255;
        // else if  (b < 0) b = 0;
        // var g = (num & 0x0000FF) + amt;
        // if (g > 255) g = 255;
        // else if (g < 0) g = 0;
        // // return (usePound?'#':'') + (g | (b << 8) | (r << 16)).toString(16);
        // return (usePound?'#':'') + String('000000' + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);

        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
          hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = '#', c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ('00'+c).substr(c.length);
        }

        return rgb;

    }

    function getFonts() {
      return data.config.fonts;
    }

    function setFonts(fonts) {
      cachedLocations.reset();

      if (fonts === null) {
        fonts = getFonts();
      }
      $polymer.setCustomStyle('--primary-font-family', fonts.primaryFontFamily.name);
      $polymer.setCustomStyle('--title-font-family', fonts.titleFontFamily.name);

      $polymer.updateStyles();
    }

    function getImages() {
      return data.config.images;
    }

    function setImages(images) {
      cachedLocations.reset();

      if (images === null) {
        images = getImages();
      }

      var backgroundImage = images.background ? 'url("' + images.background + '")' : 'none';
      $polymer.setCustomStyle('--background-image', backgroundImage);

      $polymer.updateStyles();
    }

    function setModules(newData) {
      cachedLocations.reset();
      data.modules = newData;
      setHooks();
    }

    function setSpinner(newData) {
      data.config.spinner = newData;
    }

    function launchSpinner(selector) {
      // LEGACY 01/08/2016
      var spinner;

      if (!data.config.spinner || !data.config.spinner.path) {
        spinner = {
          'identifier': 'koapp-spinner-android',
          'path': $filter('loadUrl')('spinners/koapp-spinner-android/koapp-spinner-android.html')
        };
      } else {
        spinner = data.config.spinner;
      }
      // var spinner = data.config.spinner;
      $polymer.importHref(spinner.path, function() {
        if (document.querySelector(selector)) {
          var spinnerContainer = document.querySelector(selector);
          var spinnerElement = document.createElement(spinner.identifier);
          spinnerContainer.appendChild(spinnerElement);
          spinnerElement.active = true;
        }
      });
    }

    function populateMenuItems() {
      _.filter(data.modules, function(item) {
        if (item && item.canContain) menuItems = _.union(menuItems, _.flattenDeep(_.map(item.scope.menuItems, 'path')));
      });
    }

    function setHooks() {
      if (structureHooks.getIndex() !== '') {
        data.config.indexOld = data.config.index;
        data.config.index = structureHooks.getIndex();
      }
      angular.forEach(structureHooks.getModules(), function(module, path) {
        data.modules[path] = module;
      });
      populateMenuItems();
    }

    function getMenuItems() {
      return menuItems;
    }

    function getIndex() {
      return data.config.index;
    }

    function getVisitedLocations() {
      return visitedLocations;
    }

    function setVisitedLocations(locations) {
      visitedLocations = locations;
    }

    function getLang() {
      if (lang) {
        return lang;
      } else {
        return data.config.lang[0];
      }
    }

    function setLang(locale) {
      lang = locale;
    }

    function getChildren(menuPath) {
      var menu = {};
      angular.forEach(data.modules, function(data, path) {
        if (path.indexOf(menuPath) > -1) {
          menu[path] = data;
        }
      });
      return menu;
    }

    function getModule(path) {
      var deferred = $q.defer();
      if (cachedLocations.getOne(path)) {
        deferred.resolve(cachedLocations.getOne(path));
      } else {
        findRoute(path, data.modules, function(module) {
          if (!data.modules[path]) {
            deferred.reject('Error - Module ' + path + ' not found');
          } else {

            if (!cachedModules.getOne(module.identifier)) {

              setLang(data.config.lang[0]);

              var deviceDir = $rootScope.partialDir ? $rootScope.partialDir + '/' : '';
              $translatePartialLoader.addPart(deviceDir + stripPath(module.view));

              cachedModules.setOne(module.identifier, true);
            }

            cachedLocations.setOne(path, module);
            deferred.resolve(cachedLocations.getOne(path));
          }
        });
      }
      return deferred.promise;
    }

    function getCurrentModules($location, callback) {
      var moduleList = [];
      var path = $location.$$path;
      var split = path.split('/');

      angular.forEach(split.reverse(), function(value) {
        if (value !== '') {
          findRoute(path, data.modules, function(module) {
            moduleList.push(module);
          });
          path = path.replace(new RegExp('\/' + value + '$'), '');
        }
      });

      callback(moduleList);
    }

    function validateScope(module) {
      var empty = true;
      angular.forEach(module.scope, function(value) {
        if (value && value !== '') {
          empty = false;
        }
      });
      if (empty) {
        return 'core/missing.html';
      }
      return module.view;
    }

    function registerModule($location, $scope, item) {
      getCurrentModules($location, function(modules) {
        angular.forEach(modules, function(value, key) {
          if (modules[key + 1]) {
            $scope[modules[key + 1].identifier + 'Template'] = validateScope(modules[key]);
          }
          if (modules[key].identifier === item) {
            $scope[item] = {
              custom: modules[key].name,
              icon: modules[key].icon,
              modulescope: modules[key].scope
            };
          }
        });
      });
    }

    function update(newData) {
      if (newData) {
        data = newData;
        angular.forEach(listeners, function(listener) {
          if (listener) {
            listener(newData);
          }
        });
      } else {
        return {
          message: 'Structure data should not be null',
          error: true
        };
      }
    }
    function stripPath(original) {
      original = original.replace('http://', '');
      var pieces = original.split('/');
      pieces.pop();
      if (pieces[0] !== 'modules' && pieces[0] !== 'services') {
        pieces.shift();
      }
      return pieces.join('/');
    }

    function onChange(callback) {
      listeners.push(callback);
    }

    function findRoute(path, structure, callback) {
      if (structure && structure[path]) {
        callback(structure[path]);
      } else {
        callback(new Error('No module found in path ' + path));
      }
    }
  }

}());
