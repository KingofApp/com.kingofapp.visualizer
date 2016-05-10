(function() {
  'use strict';

  angular
    .module('king.core.structureService', [])
    .factory('structureService', structureService);

  structureService.$inject = ['$q', '$translatePartialLoader', '$translate', 'structureHooks', '$rootScope'];

  function structureService($q, $translatePartialLoader, $translate, structureHooks, $rootScope) {
    var listeners = [];
    var lang;
    var cachedLocations = {};
    var cachedLibs = [];
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
      setLoader: setLoader,
      getIndex: getIndex,
      getVisitedLocations: getVisitedLocations,
      getCachedLocations: getCachedLocations,
      getCachedLibs: getCachedLibs,
      setCachedLibs: setCachedLibs,
      setVisitedLocations: setVisitedLocations,
      getLang: getLang,
      setLang: setLang,
      getModule: getModule,
      getCurrentModules: getCurrentModules,
      getChildren: getChildren,
      validateScope: validateScope,
      registerModule: registerModule,
      loadconfig: loadconfig,
      update: update,
      onChange: onChange
    };

    function get() {
      return data;
    }

    function set(newData) {
      cachedLocations = {};
      data = newData;

      setLoader(data.config.loader);
      setHooks();
      $rootScope.$broadcast('menuUpdated');
    }

    function getConfig() {
      return data.config;
    }

    function setCustomStyle(variableKey, variableValue) {
      Polymer.StyleDefaults.customStyle[variableKey] = variableValue;
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
      cachedLocations = {};

      if (colors === null) {
        colors = getColors();
      }

      setCustomStyle('--primary-text-color', colors.primaryTextColor);
      setCustomStyle('--primary-background-color', colors.primaryBackgroundColor);
      setCustomStyle('--secondary-text-color', colors.secondaryTextColor);
      setCustomStyle('--disabled-text-color', colors.disabledTextColor);
      setCustomStyle('--divider-color', colors.dividerColor);
      setCustomStyle('--primary-color', colors.primaryColor);
      setCustomStyle('--light-primary-color', colors.lightPrimaryColor);
      setCustomStyle('--dark-primary-color', colors.darkPrimaryColor);
      setCustomStyle('--accent-color', colors.accentColor);
      setCustomStyle('--light-accent-color', colors.lightAccentColor);
      setCustomStyle('--dark-accent-color', colors.darkAccentColor);
      setCustomStyle('--error-color', colors.errorColor);
      setCustomStyle('--background-color', colors.backgroundColor);

      if (colors.toolbarColor) {
        setCustomStyle('--toolbar-color', colors.toolbarColor);
      }

      Polymer.updateStyles();
    }

    function getFonts() {
      return data.config.fonts;
    }

    function setFonts(fonts) {
      cachedLocations = {};

      if (fonts === null) {
        fonts = getFonts();
      }

      setCustomStyle('--primary-font-family', fonts.primaryFontFamily.name);
      setCustomStyle('--title-font-family', fonts.titleFontFamily.name);

      Polymer.updateStyles();
    }

    function getImages() {
      return data.config.images;
    }

    function setImages(images) {
      cachedLocations = {};

      if (images === null) {
        images = getImages();
      }

      var backgroundImage = images.background ? 'url("' + images.background + '")' : 'none';

      setCustomStyle('--background-image', backgroundImage);

      Polymer.updateStyles();
    }

    function setModules(newData) {
      cachedLocations = {};
      data.modules = newData;
      setHooks();
    }

    function setLoader(src) {
      if (src) {
        $rootScope.loader = src;
      } else {
        //Default Loader
        $rootScope.loader = 'images/loader.gif';
      }
    }

    function populateMenuItems() {
      _.filter(data.modules, function(item) {
        if (item.canContain) menuItems = _.union(menuItems, item.scope.menuItems);
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

    function getCachedLocations() {
      return cachedLocations;
    }

    function getCachedLibs() {
      return cachedLibs;
    }

    function setVisitedLocations(locations) {
      visitedLocations = locations;
    }

    function setCachedLibs(libs) {
      cachedLibs = libs;
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

    function loadconfig() {
      $translate.use(getLang());
      // $rootScope.config = { googleAnalytics: data.config.googleAnalytics };
      // $rootScope.$watch('data.config.googleAnalytics', function(prev,next) {
      //   ga('create', $rootScope.config.googleAnalytics, { 'cookieDomain': 'none' });
      // });
    }

    function getModule(path) {
      var deferred = $q.defer();
      if (cachedLocations[path]) {
        deferred.resolve(cachedLocations[path]);
      } else {
        findRoute(path, data.modules, function(module) {
          if (!data.modules[path]) {
            deferred.reject('Error - Module ' + path + ' not found');
          } else {
            cachedLocations[path] = module;
            deferred.resolve(cachedLocations[path]);
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
          path = path.replace('/' + value, '');
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
            var type = (modules[key].moduleFolder) ? modules[key].moduleFolder : 'modules';
            var deviceDir = $rootScope.partialDir ? $rootScope.partialDir + '/' : '';
            $translatePartialLoader.addPart(deviceDir + type + '/' + item);
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
