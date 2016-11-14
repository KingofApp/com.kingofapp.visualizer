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
      $polymer.setCustomStyle('--primary-color', colors.primaryColor);
      $polymer.setCustomStyle('--light-primary-color', colors.lightPrimaryColor);
      $polymer.setCustomStyle('--dark-primary-color', colors.darkPrimaryColor);
      $polymer.setCustomStyle('--accent-color', colors.accentColor);
      $polymer.setCustomStyle('--light-accent-color', colors.lightAccentColor);
      $polymer.setCustomStyle('--dark-accent-color', colors.darkAccentColor);
      $polymer.setCustomStyle('--error-color', colors.errorColor);
      $polymer.setCustomStyle('--background-color', colors.backgroundColor);

      if (colors.toolbarColor) {
        $polymer.setCustomStyle('--toolbar-color', colors.toolbarColor);
      }

      $polymer.updateStyles();
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

            // Load translation files
            if (!cachedModules.getOne(module.identifier)) {
              var type = (module.moduleFolder) ? module.moduleFolder : 'modules';
              var deviceDir = $rootScope.partialDir ? $rootScope.partialDir + '/' : '';
              $translatePartialLoader.addPart(deviceDir + type + '/' + module.identifier);

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
      // console.log("ModuleLIST",moduleList);
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
